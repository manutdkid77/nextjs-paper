import Avatar from "./components/Avatar";
import siteMetadata from "@/data/siteMetadata";
import { getAllContentFiles } from "./lib/markdownParser";
import BlogList from "./components/BlogList";

export default function Home() {
  let contentFiles = getAllContentFiles({
    sourceFolderPath: "data/blogPosts",
    slugPathPrefix: "/blog",
  });
  return (
    <>
      <Avatar
        title={siteMetadata.avatarTitle}
        description={siteMetadata.description}
        avatarUrl={siteMetadata.avatarUrl}
      ></Avatar>
      <BlogList contentFiles={contentFiles} />
    </>
  );
}
