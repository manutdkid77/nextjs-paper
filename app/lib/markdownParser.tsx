import fs from "fs";
import matter from "gray-matter";
import { micromark } from "micromark";
import { gfm, gfmHtml } from "micromark-extension-gfm";

interface getAllContentFilesProps {
  sourceFolderPath: string;
  slugPathPrefix?: string;
}

interface getContentFileProps {
  sourceFolderPath: string;
  slug: string;
  slugPathPrefix?: string;
}

interface markdownToHtmlProps {
  content: string;
  allowDangerousHtml?: boolean;
}

export function getAllContentFiles({
  sourceFolderPath,
  slugPathPrefix,
}: getAllContentFilesProps) {
  const files = fs.readdirSync(sourceFolderPath);

  const contentFiles = files.map((fileName) => {
    let slug = fileName.replace(".md", "");
    if (slugPathPrefix) slug = `${slugPathPrefix}/${slug}`;
    const readFile = fs.readFileSync(
      `${sourceFolderPath}/${fileName}`,
      "utf-8"
    );
    const { data: frontmatter } = matter(readFile);
    return {
      slug,
      frontmatter,
    };
  });

  const contentFilesSortByDate = contentFiles.sort((a, b) => {
    const beforeDate = new Date(a.frontmatter.date).valueOf();
    const afterDate = new Date(b.frontmatter.date).valueOf();
    return afterDate - beforeDate;
  });

  return contentFilesSortByDate;
}

export function getContentFile({
  sourceFolderPath,
  slug,
  slugPathPrefix,
}: getContentFileProps) {
  const files = getAllContentFiles({ sourceFolderPath, slugPathPrefix });

  const fileIndex = files.findIndex(
    (x) => x.slug === `${slugPathPrefix}/${slug}`
  );

  let previousPage, nextPage;
  const previousFile = files[fileIndex - 1];
  const nextFile = files[fileIndex + 1];

  if (previousFile) {
    previousFile.slug;
    previousPage = {
      slug: previousFile.slug,
      title: previousFile.frontmatter.title,
    };
  }
  if (nextFile) {
    nextPage = { slug: nextFile.slug, title: nextFile.frontmatter.title };
  }

  const file = fs.readFileSync(`${sourceFolderPath}/${slug}.md`, "utf-8");

  const { data: frontmatter, content } = matter(file);
  let fileContent = {
    frontmatter,
    content,
    previousPage,
    nextPage,
  };

  return fileContent;
}

export function convertMarkdownToHtml({
  content,
  allowDangerousHtml,
}: markdownToHtmlProps) {
  return micromark(content, {
    allowDangerousHtml: allowDangerousHtml,
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });
}
