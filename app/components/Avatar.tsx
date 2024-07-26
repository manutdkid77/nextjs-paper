interface AvatarProps {
  title: string;
  avatarUrl?: string;
  description: string;
}

export default function Avatar({ title, avatarUrl, description }: AvatarProps) {
  return (
    <div className="-mt-2 mb-16 flex items-center">
      {avatarUrl && (
        <div className="mr-5 shrink-0 rounded-full border-[0.5px] border-black/10 bg-white/50 p-3 shadow dark:bg-white/[15%]">
          <img
            className="my-0 aspect-square w-32 rounded-full !bg-black/5 hover:animate-spin dark:!bg-black/80"
            src={avatarUrl}
            alt={title}
          />
        </div>
      )}
      <div>
        <h1 className="mb-2 mt-3 text-[1.6rem] font-bold">{title}</h1>
        <div className="break-words">{description}</div>
      </div>
    </div>
  );
}
