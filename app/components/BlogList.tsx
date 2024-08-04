import siteMetadata from "@/data/siteMetadata";

interface BlogListItem {
  slug: string;
  frontmatter: { [key: string]: any };
}

interface BlogListProps {
  contentFiles: Array<BlogListItem>;
}

export default function BlogList({ contentFiles }: BlogListProps) {
  return (
    <>
      {contentFiles.map((file) => {
        return (
          <section
            className="relative my-10 first-of-type:mt-0 last-of-type:mb-0"
            key={file.slug}
          >
            <h2 className="!my-0 pb-1 !leading-none">
              {file.frontmatter.title}
            </h2>
            {file.frontmatter.date && (
              <time className="text-sm antialiased opacity-60">
                {new Date(file.frontmatter.date).toLocaleDateString(
                  siteMetadata.locale,
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </time>
            )}
            <a className="absolute inset-0 text-[0]" href={file.slug}>
              {file.frontmatter.title}
            </a>
          </section>
        );
      })}
    </>
  );
}
