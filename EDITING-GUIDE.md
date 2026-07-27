# How to edit this website

*Written for people who have never touched code. You only need a web browser.*

---

## The 60-second version

1. Open the `_bodies` folder on GitHub.
2. Click the page you want to change (e.g. `about.html`).
3. Click the **pencil ✏️ icon** (top right).
4. Change the words between the `>` and `<` symbols.
5. Scroll down, click **Commit changes**.
6. Wait about a minute. The live website updates itself. ✅

That's genuinely it. If you can edit a Google Doc, you can do this.

---

## Which file is which page?

| Edit this file | To change this page |
|---|---|
| `_bodies/index.html` | The home page |
| `_bodies/services.html` | Services |
| `_bodies/use-cases.html` | Use Cases (the filterable list) |
| `_bodies/process.html` | Process |
| `_bodies/about.html` | About |
| `_bodies/insights.html` | Insights list |
| `_bodies/insight-*.html` | The two articles |
| `_bodies/contact.html` | Contact page + form |
| `_bodies/privacy.html`, `_bodies/terms.html` | Legal pages |
| `_bodies/404.html` | The "page not found" page |
| `_template.html` | The menu at the top and the footer at the bottom (appears on **every** page) |

---

## Reading the code (the only 5 things you need)

Text lives **between** tags. Change the text, leave the tags alone.

```html
<h2>Six rules we run on.</h2>
     ↑ change this bit ↑
```

| What you'll see | What it means |
|---|---|
| `<h1>` `<h2>` `<h3>` | Headings — big, medium, small |
| `<p>` … `</p>` | A normal paragraph |
| `<b>` or `<strong>` | **Bold text** |
| `<a href="contact.html">Book a call</a>` | A link. `href` = where it goes, the rest = what people read |
| `<span class="grad">word.</span>` | Makes that word **orange and italic** — our accent style |

### Safe edits ✅
- Changing any words people can read
- Swapping which word is inside `<span class="grad">`
- Changing button text like `Book a free strategy call`

### Ask before doing ⚠️
- Deleting whole `<section>` blocks
- Changing anything inside `class="..."` — that's the styling
- Editing files in `css/` or `js/`

---

## Common jobs

### Change the headline on the home page
Open `_bodies/index.html`, find:
```html
<h1 data-split>AI agents that actually get work <span class="grad">done.</span></h1>
```
Type your new headline, keeping the `<span class="grad">…</span>` around the word you want highlighted.

### Change the email address
It appears in three places — use GitHub's search (press `/`) for `hello@aurenticai.com` and update each one:
- `_template.html` (footer)
- `_bodies/contact.html`
- `js/main.js` (the form)

### Add a new use case
Open `_bodies/use-cases.html`, copy one whole `<article class="uc" …> … </article>` block, paste it below, and change the words. Keep the `data-ind` and `data-fn` values — they control which filters it shows up under.

### Replace a photo
Go to the `assets` folder → **Add file → Upload files** → upload your image with **exactly the same filename** as the one you're replacing (e.g. `au-hero.jpg`).

---

## Did I break something?

**Nothing is ever lost.** GitHub keeps every version.

- To undo: go to the **Commits** tab, find your change, click **Revert**.
- To check if the site rebuilt: the **Actions** tab. Green tick ✅ = live. Red ✗ = something broke; revert your last change.

---

## Working as a team

- **Small text fix?** Edit directly, commit to `main`.
- **Bigger change?** When committing, choose *"Create a new branch and start a pull request"* — then someone can review it before it goes live.
- **Two people editing the same file** at once causes conflicts, so shout in the group chat first.

---

## Quick reference

| I want to… | Go to |
|---|---|
| Change words on a page | `_bodies/<page>.html` |
| Change the menu or footer | `_template.html` |
| Change the page title in Google | `_meta.json` |
| Change colours or fonts | `css/main.css` (top section, `:root`) |
| Change an image | `assets/` |
| See if my change is live | The **Actions** tab |
