import BlogList from "@/app/components/BlogList";
import { getAllContentFilesByTag, getAllTags } from "@/app/lib/markdownParser";

export const generateStaticParams = async () => {
  //generate individual tag pages at build time
  const tags = getAllTags({
    sourceFolderPath: "data/blogPosts",
  });

  const paths = tags.map((tagName) => ({ tag: tagName }));
  return paths;
};

export default function Tag({ params }: { params: { tag: string } }) {
  const allContentFiles = getAllContentFilesByTag({
    sourceFolderPath: "data/blogPosts",
    slugPathPrefix: "/blog",
    tag: params.tag,
  });

  return (
    <>
      <h1 className="mb-14">{`#${params.tag}`}</h1>
      <BlogList contentFiles={allContentFiles} />
    </>
  );
}
