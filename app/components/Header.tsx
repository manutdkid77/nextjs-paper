"use client";

import { getNavLinks, getSocialMediaLinks } from "@/data/headerLinks";
import { useEffect } from "react";
import { useTheme } from "next-themes";

interface HeaderValue {
  siteUrl: string;
  title: string;
}

export default function Header(headerValue: HeaderValue) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const htmlClass = document.documentElement.classList;

      if (htmlClass) htmlClass.remove("not-ready");
    }, 10);

    return () => clearTimeout(timeoutId);
  }, []);

  const onBtnMenuClicked = () => {
    const htmlClass = document.documentElement.classList;
    if (htmlClass) htmlClass.toggle("open");
  };

  const onBtnDarkClicked = () => {
    theme == "dark" ? setTheme("light") : setTheme("dark");
  };

  const { theme, setTheme } = useTheme();

  return (
    <header className="mx-auto flex h-[4.5rem] max-w-3xl px-8 lg:justify-center">
      <div className="relative z-50 mr-auto flex items-center">
        <a
          className="-translate-x-[1px] -translate-y-[1px] text-2xl font-semibold"
          href={headerValue.siteUrl}
        >
          {headerValue.title}
        </a>
        <div
          className="btn-dark text-[0] ml-4 h-6 w-6 shrink-0 cursor-pointer [background:url(/theme.png)_left_center/_auto_theme('spacing.6')_no-repeat] [transition:_background-position_0.4s_steps(5)] dark:[background-position:right]"
          role="button"
          aria-label="Dark"
          onClick={onBtnDarkClicked}
        ></div>
      </div>

      <div
        className="btn-menu relative z-50 -mr-8 flex h-[4.5rem] w-[5rem] shrink-0 cursor-pointer flex-col items-center justify-center gap-2.5 lg:hidden"
        role="button"
        aria-label="Menu"
        onClick={onBtnMenuClicked}
      ></div>

      <div className="nav-wrapper fixed inset-x-0 top-full z-40 flex h-full select-none flex-col justify-center pb-16 duration-200 dark:bg-black lg:static lg:h-auto lg:flex-row lg:!bg-transparent lg:pb-0 lg:transition-none">
        <nav className="lg:ml-12 lg:flex lg:flex-row lg:items-center lg:space-x-6">
          {getNavLinks(true).map((link, key) => (
            <a
              className="block text-center text-2xl leading-[5rem] lg:text-base lg:font-normal"
              href={link.href}
              key={key}
              title={link.title}
            >
              {link.title}
            </a>
          ))}
        </nav>
        <nav className="mt-12 flex justify-center space-x-10 dark:invert lg:ml-12 lg:mt-0 lg:items-center lg:space-x-6">
          {getSocialMediaLinks(true).map((link, key) => {
            const style = {
              "--url": `url(${link.image})`,
            } as React.CSSProperties;

            return (
              <a
                className="h-8 w-8 text-[0] [background:var(--url)_center_center/cover_no-repeat] lg:h-6 lg:w-6"
                style={style}
                href={link.href}
                key={key}
                target="_blank"
                title={link.title}
              >
                {link.title}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
