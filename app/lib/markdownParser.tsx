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
  fileExtension: string;
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
    const { data: frontmatter, content } = matter(readFile);
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
  fileExtension,
}: getContentFileProps) {
  const file = fs.readFileSync(`${sourceFolderPath}/${slug}.${fileExtension}`);

  const { data: frontmatter, content } = matter(file);
  return {
    frontmatter,
    content,
  };
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
