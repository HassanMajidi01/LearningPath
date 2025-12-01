# Simple blog for LearningPath

This folder provides a simple blog system built with static HTML + CSS + JS. Posts are defined in `data.js` and rendered at runtime.

Files
- `index.html` — blog listing page (shows posts with title, featured image, excerpt)
- `post.html` — single post page (reads `?slug=...` and renders the post)
- `data.js` — array of posts (author should edit this to add new posts)
- `blog.js` — logic to render list and single post, plus a simple sanitizer
- `blog.css` — blog styles

Post data structure (example)
```
window.blogPosts.push({
  id: 'p1',
  slug: 'sample-intro-to-math',
  title: 'آشنایی با مفاهیم پایهٔ ریاضی',
  date: '2025-11-01',
  excerpt: 'خلاصهٔ مطلب ...',
  featuredImage: '../Persian/assets/images/featured.png',
  categories: ['ریاضی','آموزش'],
  tags: ['شمارش','عدد'],
  content: `
     <h1>عنوان بزرگ</h1>
     <p>متن مقاله ...</p>
     <figure><img src="Persian/assets/images/example.png"/><figcaption>...توضیح</figcaption></figure>
     <p>یک ویدئو:</p>
     <iframe src="https://www.youtube.com/embed/..." width="560" height="315"></iframe>
  `
});
```

Guidelines to import Word content
- Microsoft Word HTML is often verbose. Two recommended ways:
  1) In Word: File -> Save As -> Web Page -> open the generated HTML and copy the article content (inside `<body>`); paste the cleaned HTML into your `content` string.
  2) Copy the text from Word, paste into an online HTML cleaner (search "clean Word HTML"), copy the cleaned HTML and paste into `content`.
  3) Alternatively write the content in a markdown editor and export to HTML.
- Make sure `content` contains only the markup you want (headings, p, figure, img, iframe, ul/ol). Avoid inline styles unless necessary.
  - Any images used inside `content` should be copied to `Persian/assets/images/` and referenced with a path like `../Persian/assets/images/...` (or use an absolute path starting with `/Persian/...`) so the path resolves from the `blog/` pages.
- For videos embed YouTube iframes or provide `video` tags with `src` pointing to `Persian/assets/audio` as needed.

Security note
- The blog uses the `content` HTML for display. The core removes `<script>` tags and attributes starting with `on*` to avoid accidental script injection, but you should avoid pasting untrusted content.

How to add posts (categories & tags, search and pagination)
1. Edit `blog/data.js`: add another `window.blogPosts.push({ ... })` or modify the sample object.
2. Optionally set `slug` to a friendly url (e.g. `my-first-lesson`).
4. To categorize posts use the `categories` array. For tags use the `tags` array.
  Example: `categories: ['ریاضی', 'تمرین']`, `tags: ['شمارش','درک']`.
5. The listing page supports client-side search (title, excerpt and content), category and tag filtering, and pagination. You can change `perPage` in `blog/blog.js` (default 6).

### Linking to filtered lists
From any page (for example a post page), you can directly link to a filtered list by using query parameters in the index URL. Examples:
- `index.html?tag=شمارش` to show posts filtered by the `شمارش` tag.
- `index.html?category=ریاضی` to show posts with category `ریاضی`.
- `index.html?search=تجربی` to search the text across titles/excerpts/content.
You can combine these: `index.html?category=ریاضی&tag=شمارش&search=تمرین&page=2`.
3. Save and open `blog/index.html` in browser to see the new post.

### Importing from Word
You can still use the recommended manual approach (save as HTML and clean). If you want, I can add a small importer page later to automate this but for now it's manual.

How linking works
- The listing page links to `post.html?slug=...`. If you prefer using `post.html#p1` or `?id=p1` we support matching by `id` too.

Integration with site
- If you want to integrate the blog index into the site sidebar or top nav, update the sidebar in `main.js` to add a link to `/blog/index.html`.

Future additions
- Add category / tag filter UI
- Add pagination
- Convert content input to markdown and render with a safe markdown parser
- Add post preview in admin UI (client-side page that edits `data.js` or local JSON)

If you want, I can:
- Add an import tool to convert Word HTML automatically into a sanitized `content` block
- Add an editor UI (client-side) to create posts directly in the browser and save to localStorage or download a file
- Styling: make the detail page look closer to the rest of your site theme

Happy to continue — which feature do you want first? (e.g., more types, importer, or integrate to sidebar)