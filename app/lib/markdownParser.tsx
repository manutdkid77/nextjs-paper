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

interface getAllContentFilesByTagProps {
  tag: string;
  sourceFolderPath: string;
  slugPathPrefix?: string;
}

interface getAllTagsProps {
  sourceFolderPath: string;
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

export function getAllContentFilesByTag({
  tag,
  sourceFolderPath,
  slugPathPrefix,
}: getAllContentFilesByTagProps) {
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

  let contentFilesSortByDate = contentFiles.sort((a, b) => {
    const beforeDate = new Date(a.frontmatter.date).valueOf();
    const afterDate = new Date(b.frontmatter.date).valueOf();
    return afterDate - beforeDate;
  });

  tag = tag.toLocaleLowerCase().trim();

  contentFilesSortByDate = contentFilesSortByDate.filter(
    (x) =>
      x.frontmatter.tags &&
      x.frontmatter.tags.some(
        (y: string) => y.toLocaleLowerCase().trim() == tag
      )
  );

  return contentFilesSortByDate;
}

export function getAllTags({ sourceFolderPath }: getAllTagsProps) {
  const files = fs.readdirSync(sourceFolderPath);

  const contentFiles = files.map((fileName) => {
    const readFile = fs.readFileSync(
      `${sourceFolderPath}/${fileName}`,
      "utf-8"
    );
    const { data: frontmatter } = matter(readFile);
    return { frontmatter };
  });

  let distinctTags: Array<string> = [];

  for (let i = 0; i < contentFiles.length; i++) {
    let tags: Array<string> = contentFiles[i].frontmatter.tags;
    for (let j = 0; j < tags.length; j++) {
      const tag = tags[j];
      const tagPresent = distinctTags.some((x) => x === tag);
      if (!tagPresent) distinctTags.push(tag);
    }
  }

  return distinctTags;
}
