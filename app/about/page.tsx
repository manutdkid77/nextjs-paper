import { convertMarkdownToHtml, getContentFile } from "../lib/markdownParser";
import { genPageMetadata } from "../lib/seo";

export const metadata = genPageMetadata({
  title: "About",
});

export default function AboutPage() {
  const { frontmatter, content } = getContentFile({
    sourceFolderPath: "data/about",
    slug: "about",
  });

  const htmlContent = convertMarkdownToHtml({
    content,
    allowDangerousHtml: true,
  });

  return (
    <article>
      <header className="mb-14">
        <h1 className="!my-0 pb-2.5">{frontmatter.title}</h1>
      </header>

      <section dangerouslySetInnerHTML={{ __html: htmlContent }}></section>
    </article>
  );
}
