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

  return contentFiles;
}

export function getContentFile({
  sourceFolderPath,
  slug,
  slugPathPrefix,
}: getContentFileProps) {
  const files = fs.readdirSync(sourceFolderPath);

  const fileIndex = files.findIndex((fileName) => fileName === `${slug}.md`);

  let previousPage, nextPage;
  const prevFileName = files[fileIndex - 1];
  const nextFileName = files[fileIndex + 1];

  if (prevFileName) {
    const previousFile = fs.readFileSync(
      `${sourceFolderPath}/${prevFileName}`,
      "utf-8"
    );
    const { data: frontmatter } = matter(previousFile);
    const slug = `${slugPathPrefix}/${prevFileName.replace(".md", "")}`;
    previousPage = { slug, title: frontmatter.title };
  }
  if (nextFileName) {
    const nextFIle = fs.readFileSync(
      `${sourceFolderPath}/${nextFileName}`,
      "utf-8"
    );
    const { data: frontmatter } = matter(nextFIle);
    const slug = `${slugPathPrefix}/${nextFileName.replace(".md", "")}`;
    nextPage = { slug, title: frontmatter.title };
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
