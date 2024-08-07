import Avatar from "./components/Avatar";
import siteMetadata from "@/data/siteMetadata";
import { getAllContentFiles } from "./lib/markdownParser";
import LatestPosts from "./components/LatestPosts";

export default function Home() {
  const allContentFiles = getAllContentFiles({
    sourceFolderPath: "data/blogPosts",
    slugPathPrefix: "/blog",
  });

  const NO_OF_POSTS = 3;

  return (
    <>
      <Avatar
        title={siteMetadata.avatarTitle}
        description={siteMetadata.description}
        avatarUrl={siteMetadata.avatarUrl}
      ></Avatar>
      <LatestPosts
        noOfPostsToDisplay={NO_OF_POSTS}
        allContentFiles={allContentFiles}
        readMoreUrl="/blog/page/1"
      />
    </>
  );
}
