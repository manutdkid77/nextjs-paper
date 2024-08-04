import type { Metadata } from "next";
import { getAllContentFiles } from "../lib/markdownParser";
import BlogList from "../components/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  openGraph: {
    title: "Blog",
  },
};

export default function Blog() {
  let contentFiles = getAllContentFiles({
    sourceFolderPath: "data/blogPosts",
    slugPathPrefix: "/blog",
  });

  return <BlogList contentFiles={contentFiles} />;
}
