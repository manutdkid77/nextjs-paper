import PostNavigation from "@/app/components/PostNavigation";
import TagList from "@/app/components/TagList";
import {
  getContentFile,
  convertMarkdownToHtml,
} from "@/app/lib/markdownParser";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { frontmatter } = getContentFile({
    sourceFolderPath: "data/blogPosts",
    slug: params.slug,
  });
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `/blog/${params.slug}`,
    },
  };
}

export default function BlogPage({ params }: { params: { slug: string } }) {
  const { frontmatter, content, previousPage, nextPage } = getContentFile({
    sourceFolderPath: "data/blogPosts",
    slug: params.slug,
    slugPathPrefix: "/blog",
  });

  const htmlContent = convertMarkdownToHtml({
    content,
    allowDangerousHtml: true,
  });

  return (
    <article>
      <header className="mb-14">
        <h1 className="!my-0 pb-2.5">{frontmatter.title}</h1>
        <div className="text-sm antialiased opacity-60">
          <time>{frontmatter.date}</time>
          <span className="mx-1">&middot;</span>
          <span>{frontmatter.author}</span>
        </div>
      </header>

      <section dangerouslySetInnerHTML={{ __html: htmlContent }}></section>
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <TagList tags={frontmatter.tags} />
      )}
      <PostNavigation previousPage={previousPage} nextPage={nextPage} />
    </article>
  );
}
