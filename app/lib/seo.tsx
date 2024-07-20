import { Metadata } from "next";
import siteMetadata from "@/data/siteMetadata";

interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
  [key: string]: any;
}

export function genPageMetadata({
  title,
  description,
  image,
  ...rest
}: PageSEOProps): Metadata {
  const pageTitle = title || siteMetadata.title;

  return {
    title: pageTitle,
    description: description || siteMetadata.description,
    openGraph: {
      title: pageTitle,
      description,
      url: "./",
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: siteMetadata.locale,
      type: "website",
    },
    twitter: {
      title,
      card: "summary_large_image",
      images: image ? [image] : [],
    },
    ...rest,
  };
}
