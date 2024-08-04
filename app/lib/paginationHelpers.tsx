interface PaginationFieldsProps {
  postsPerPage: number;
  pageNumber: number;
  allContentFiles: Array<any>;
  urlPathPrefix: string;
}

export function generatePaginationFields({
  postsPerPage,
  pageNumber,
  allContentFiles,
  urlPathPrefix,
}: PaginationFieldsProps) {
  const contentFiles = allContentFiles.slice(
    postsPerPage * (pageNumber - 1),
    postsPerPage * pageNumber
  );
  const totalPages = Math.ceil(allContentFiles.length / postsPerPage);

  let nextPageUrl = "";
  let previousPageUrl = "";
  if (pageNumber < totalPages)
    nextPageUrl = `${urlPathPrefix}/${pageNumber + 1}`;
  if (pageNumber > 1) previousPageUrl = `${urlPathPrefix}/${pageNumber - 1}`;

  return { contentFiles, nextPageUrl, previousPageUrl };
}
