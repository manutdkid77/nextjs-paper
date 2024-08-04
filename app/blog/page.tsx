import type { Metadata } from "next";
import { getAllContentFiles } from "../lib/markdownParser";
import BlogList from "../components/BlogList";
import Pagination from "../components/Pagination";
import { generatePaginationFields } from "../lib/paginationHelpers";

const POSTS_PER_PAGE = 5;

export const metadata: Metadata = {
  title: "Blog",
  openGraph: {
    title: "Blog",
  },
};

export default function Blog() {
  const allContentFiles = getAllContentFiles({
    sourceFolderPath: "data/blogPosts",
    slugPathPrefix: "/blog",
  });

  const { contentFiles, nextPageUrl } = generatePaginationFields({
    postsPerPage: POSTS_PER_PAGE,
    pageNumber: 1,
    allContentFiles,
    urlPathPrefix: "/blog/page",
  });

  return (
    <>
      <BlogList contentFiles={contentFiles} />
      <Pagination nextPageUrl={nextPageUrl} />
    </>
  );
}
