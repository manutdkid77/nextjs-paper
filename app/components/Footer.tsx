interface FooterValue {
  siteUrl: string;
  title: string;
  siteRepo?: string;
  poweredByText?: string;
}

export default function Footer(footerValue: FooterValue) {
  return (
    <footer className="opaco mx-auto flex h-[4.5rem] max-w-3xl items-center px-8 text-[0.9em] opacity-60">
      <div className="mr-auto">
        &copy; {new Date().getFullYear()}{" "}
        <a className="link" href={footerValue.siteUrl}>
          {footerValue.title}
        </a>
      </div>
      {footerValue.poweredByText && (
        <a
          className="link mx-6"
          href="https://gohugo.io/"
          rel="noopener"
          target="_blank"
        >
          {footerValue.poweredByText}
        </a>
      )}
      ️
      {footerValue.siteRepo && (
        <a
          className="link"
          href={footerValue.siteRepo}
          rel="noopener"
          target="_blank"
        >
          ✎ Paper
        </a>
      )}
    </footer>
  );
}
