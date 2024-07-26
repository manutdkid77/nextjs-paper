import Avatar from "./components/Avatar";
import siteMetadata from "@/data/siteMetadata";

export default function Home() {
  return (
    <Avatar
      title={siteMetadata.avatarTitle}
      description={siteMetadata.description}
      avatarUrl={siteMetadata.avatarUrl}
    ></Avatar>
  );
}
