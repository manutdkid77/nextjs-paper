function getNavLinks(debugMode = false) {
  if (debugMode)
    return [
      { href: "/blog", title: "Blog" },
      { href: "/about", title: "About" },
    ];
  else {
    return [];
  }
}

function getSocialMediaLinks(debugMode = false) {
  if (debugMode)
    return [
      {
        href: "https://github.com/manutdkid77",
        title: "Github",
        image: "/github.svg",
      },
      {
        href: "https://www.linkedin.com/in/nathanielnunes",
        title: "LinkedIn",
        image: "/linkedin.svg",
      },
      {
        href: "https://twitter.com/minimal_goan",
        title: "Twitter/X",
        image: "/twitter.svg",
      },
    ];
  else {
    return [];
  }
}

export { getNavLinks, getSocialMediaLinks };
