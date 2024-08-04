interface PaginationProps {
  previousPageUrl?: string;
  nextPageUrl?: string;
}

export default function Pagination({
  previousPageUrl,
  nextPageUrl,
}: PaginationProps) {
  return (
    (previousPageUrl || nextPageUrl) && (
      <nav className="mt-16 flex">
        {previousPageUrl && (
          <a className="btn" href={previousPageUrl}>
            ← Prev Page
          </a>
        )}
        {nextPageUrl && (
          <a className="btn ml-auto" href={nextPageUrl}>
            Next Page →
          </a>
        )}
      </nav>
    )
  );
}
