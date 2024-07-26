import type { Metadata } from "next";
import "./globals.css";
import siteMetadata from "@/data/siteMetadata";
import Head from "@/app/components/Head";
import Header from "@/app/components/Header";
import Footer from "./components/Footer";
import "@/css/main.css";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: "./",
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: siteMetadata.locale,
    type: "website",
  },
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: "summary_large_image",
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="not-ready lg:text-base">
      <Head />
      <body className="text-black duration-200 ease-out dark:text-white">
        <Providers>
          <Header siteUrl={siteMetadata.siteUrl} title={siteMetadata.title} />
          <main className="prose prose-neutral relative mx-auto min-h-[calc(100%-9rem)] max-w-3xl px-8 pb-16 pt-12 dark:prose-invert">
            {children}
          </main>
          <Footer
            siteUrl={siteMetadata.siteUrl}
            title={siteMetadata.title}
            poweredByText={siteMetadata.poweredByText}
            siteRepo={siteMetadata.siteRepo}
          />
        </Providers>
      </body>
    </html>
  );
}
