# Aurentic AI — website

The official website for **Aurentic AI** — AI agents, intelligent automation, and AI-powered software for startups and growing businesses.

**Live site:** https://aurenticai.surge.sh (and on GitHub Pages once you enable it — see below)

---

## 👋 New here? Read this first

**You do not need to install anything to edit this website.** You can change the text right inside GitHub in your browser. When you save, the website updates itself in about a minute.

👉 **[Open the editing guide → EDITING-GUIDE.md](EDITING-GUIDE.md)**

---

## What's in this repo

| Folder / file | What it is |
|---|---|
| `_bodies/` | **The content of each page.** This is where you edit text. One file per page. |
| `_template.html` | The shared header, navigation, and footer used by every page. |
| `_meta.json` | Page titles and Google descriptions (SEO). |
| `build.py` | Small script that joins `_bodies/` + `_template.html` into the final pages. |
| `css/main.css` | All the styling — colours, fonts, spacing, layout. |
| `js/main.js` | All the interactive bits (agent demo, use-case filter, ROI calculator). |
| `assets/` | Images and the favicon. |
| `*.html` (root) | The **generated** pages. Don't edit these by hand — they get overwritten. |
| `.github/workflows/deploy.yml` | Auto-deploys the site whenever anyone pushes a change. |

**Golden rule:** edit files in `_bodies/`, never the `.html` files in the main folder.

---

## First-time setup (owner only, ~3 minutes)

1. Push this folder to a new GitHub repository (see below).
2. In the repo go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Done. Every push now rebuilds and republishes the site automatically. Your URL will be `https://<your-username>.github.io/aurentic-ai/`.

### Pushing this folder to GitHub (terminal)

```bash
cd aurentic-ai
git init
git add .
git commit -m "Aurentic AI website"
git branch -M main
git remote add origin https://github.com/<your-username>/aurentic-ai.git
git push -u origin main
```

### Inviting your friends to edit

Repo → **Settings → Collaborators → Add people** → enter their GitHub username → give them **Write** access. They can then edit files directly in the browser.

---

## Running it on your own computer (optional)

```bash
python build.py          # rebuild the pages after editing _bodies/
python -m http.server    # then open http://localhost:8000
```

## Tech

Plain HTML, CSS and JavaScript. No frameworks, no npm, no build tools beyond one small Python script. It will still work in ten years.
