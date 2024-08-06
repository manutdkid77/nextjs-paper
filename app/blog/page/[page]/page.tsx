import BlogList from "@/app/components/BlogList";
import Pagination from "@/app/components/Pagination";
import { getAllContentFiles } from "@/app/lib/markdownParser";
import { generatePaginationFields } from "@/app/lib/paginationHelpers";
import { notFound } from "next/navigation";

const POSTS_PER_PAGE = 5;

const allContentFiles = getAllContentFiles({
  sourceFolderPath: "data/blogPosts",
  slugPathPrefix: "/blog",
});
const totalPages = Math.ceil(allContentFiles.length / POSTS_PER_PAGE);

export const generateStaticParams = async () => {
  //generate paginated pages at build time
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
  return paths;
};

export async function generateMetadata({
  params,
}: {
  params: { page: string };
}) {
  const pageNumber = params.page;
  const title = `Blog Page ${pageNumber}`;
  return {
    title: title,
    openGraph: {
      title: title,
      url: `/blog/page/${pageNumber}`,
    },
  };
}

export default function Page({ params }: { params: { page: string } }) {
  const pageNumber = parseInt(params.page);

  const { contentFiles, previousPageUrl, nextPageUrl } =
    generatePaginationFields({
      postsPerPage: POSTS_PER_PAGE,
      pageNumber,
      allContentFiles,
      urlPathPrefix: "/blog/page",
    });

  if (contentFiles.length === 0) return notFound();

  return (
    <>
      <BlogList contentFiles={contentFiles} />
      <Pagination nextPageUrl={nextPageUrl} previousPageUrl={previousPageUrl} />
    </>
  );
}
