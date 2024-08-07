import BlogList from "./BlogList";

interface PostItem {
  slug: string;
  frontmatter: { [key: string]: any };
}

interface LatestPostsProps {
  noOfPostsToDisplay: number;
  allContentFiles: Array<PostItem>;
  readMoreUrl: string;
}

export default function LatestPosts({
  noOfPostsToDisplay,
  allContentFiles,
  readMoreUrl,
}: LatestPostsProps) {
  const filteredContentFiles = allContentFiles.slice(0, noOfPostsToDisplay);
  let showReadMore = true;

  if (
    noOfPostsToDisplay === 0 ||
    allContentFiles.length === 0 ||
    filteredContentFiles.length >= allContentFiles.length
  )
    showReadMore = false;

  return (
    <>
      <BlogList contentFiles={filteredContentFiles} />
      {readMoreUrl && showReadMore && (
        <nav className="mt-16 flex">
          <a className="btn" href={readMoreUrl}>
            Read more ...
          </a>
        </nav>
      )}
    </>
  );
}
