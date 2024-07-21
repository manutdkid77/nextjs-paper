interface FooterValue {
  siteUrl: string;
  title: string;
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
      <a
        className="link mx-6"
        href="https://gohugo.io/"
        rel="noopener"
        target="_blank"
      >
        Powered by Next.js
      </a>
      ️
      <a
        className="link"
        href="https://github.com/nanxiaobei/hugo-paper"
        rel="noopener"
        target="_blank"
      >
        ✎ Paper
      </a>
    </footer>
  );
}
