import Avatar from "./components/Avatar";
import siteMetadata from "@/data/siteMetadata";

export default function Home() {
  return (
    <Avatar
      title={siteMetadata.title}
      description={siteMetadata.description}
      avatarUrl={siteMetadata.avatarUrl}
    ></Avatar>
  );
}
