import { Metadata } from "next";

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
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "./",
      siteName: title,
      images: image ? [image] : [],
      locale: "en_US",
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
