interface TagsListProps {
  tags: Array<string>;
}

export default function TagList({ tags }: TagsListProps) {
  return (
    <footer className="mt-12 flex flex-wrap">
      {tags.map((tag: any, index: number) => (
        <a
          className="mb-1.5 mr-1.5 rounded-lg bg-black/[3%] px-5 py-1.5 no-underline dark:bg-white/[8%]"
          href={`/tags/${tag}`}
          key={index}
        >
          {tag}
        </a>
      ))}
    </footer>
  );
}
