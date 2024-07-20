import { genPageMetadata } from "../lib/seo";

export const metadata = genPageMetadata({
  title: "About",
});

export default function AboutPage() {
  return <p>This is the about page</p>;
}
