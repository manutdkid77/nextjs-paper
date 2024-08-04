interface PostNavigationProps {
  previousPage: { [key: string]: any } | undefined;
  nextPage: { [key: string]: any } | undefined;
}

export default function PostNavigation({
  previousPage,
  nextPage,
}: PostNavigationProps) {
  return (
    <nav className="mt-24 flex overflow-hidden rounded-xl bg-black/[3%] text-lg !leading-[1.2] *:flex *:w-1/2 *:items-center *:p-5 *:font-medium *:no-underline dark:bg-white/[8%] [&>*:hover]:bg-black/[2%] dark:[&>*:hover]:bg-white/[3%]">
      {previousPage && (
        <a className="pr-3" href={previousPage.slug}>
          <span className="mr-1.5">←</span>
          <span>{previousPage.title}</span>
        </a>
      )}
      {nextPage && (
        <a className="ml-auto justify-end pl-3" href={nextPage.slug}>
          <span>{nextPage.title}</span>
          <span className="ml-1.5">→</span>
        </a>
      )}
    </nav>
  );
}
