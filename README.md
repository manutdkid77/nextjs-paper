
---

<div align="center">
<h1>Next.js Paper</h1>

Demo → [To do](https://example.com)

This is a nextjs port of the popular [Hugo Paper](https://github.com/nanxiaobei/hugo-paper) theme by [nanxiaobei](https://github.com/nanxiaobei)

</div>

## Motivation

While learning nextjs, I wanted to build a small website from scratch using the concepts I had learnt.

I had seen the hugo-paper theme before and really liked the minimal design of it.

So I decided to port this beautiful theme as a means of getting familiar with nextjs.

I am really thankful to [nanxiaobei](https://github.com/nanxiaobei) for encouraging me to port this theme.

It is pretty basic at the moment and may not have all the features of Hugo Paper as yet, but we will get there gradually.

Feel free to fork it, add in your suggestions and raise issues.

## Getting started

1. Clone the repo
2. Personalize `siteMetadata.js` (site related information)
  * Set `siteUrl` to `http://localhost:3000` when developing locally or to your environment's url.
3. Run the development server (I prefer pnpm):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
5. Feel free to add some blogposts in `data/blogPosts` directory.

## Features

- Next.js with Typescript
- [Contentlayer](https://www.contentlayer.dev/) to manage content logic
- [Tailwind CSS](https://tailwindcss.com/blog/tailwindcss-v3)
- Frontmatter parsing using [gray-matter](https://github.com/jonschlinkert/gray-matter)
- Markdown to html using [micromark](https://github.com/micromark/micromark) and GitHub flavoured markdown using [micromark-extension-gfm](https://github.com/micromark/micromark-extension-gfm)
- Light and dark theme
- Pagination for Blogs
- Support for tags - each unique tag will be its own page

## Extend / Customize

`data/siteMetadata.js` - contains most of the site related information which should be modified for a user's need.

`app` - pages to route to. Read the [Next.js documentation](https://nextjs.org/docs/app) for more information.

`app/components` - contains all the components used in the site.

`data/headerNavLinks.js` - navigation links.

`data/logo.svg` - replace with your own logo.

`data/blogPosts` - replace with your own blog posts.

`public` - store assets such as images and favicons.

`tailwind.config.ts`- tailwind configuration.

`css/main.css` - tylesheet which can be modified to change the overall look and feel of the site.

`next.config.mjs` - configuration related to Next.js.

## Todo
* Cache fetching of all blog posts.
* Author page which lists all articles by an author.
* Site wide search.
* Many more..