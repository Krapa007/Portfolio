# Kalyan Krapa — Portfolio

Personal portfolio built with **React 18 + Vite**, featuring a custom Dalmatian dog cursor, aurora background animations, liquid glass UI, and a set of easter egg gimmicks.

**Live:** [kalyan-krapa-portfolio.netlify.app](https://kalyan-krapa-portfolio.netlify.app)
**Repo:** `git@gitlab.com:Krapa007/kalyan-portfolio.git`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | CSS Variables + inline styles (no Tailwind needed) |
| Animations | Canvas 2D API (custom, no libraries) |
| Deployment | Netlify |

---

## Getting Started

```bash
# Clone
git clone git@gitlab.com:Krapa007/kalyan-portfolio.git
cd kalyan-portfolio

# Install
npm install

# Dev server — http://localhost:5173
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── BackgroundCanvas.jsx   # Aurora waves, meteors, particles, magnetic field lines
│   ├── DogCanvas.jsx          # Dalmatian dog — chases cursor, tethers, backflips, hearts, sleep hat
│   ├── Navbar.jsx             # Fixed sticky nav, active section tracking, mobile menu
│   ├── ScrollProgress.jsx     # Thin accent bar at top showing scroll percentage
│   ├── Hero.jsx               # Landing — name, typewriter, profile.json panel, stats bar
│   ├── Projects.jsx           # Project rows with GitHub + Live Demo links
│   ├── Skills.jsx             # Skills table with bg:accent color signaling
│   ├── Certifications.jsx     # Cert cards — clickable, link to certificates on Google Drive
│   ├── About.jsx              # Bio + key-value details table
│   ├── Contact.jsx            # Centered glass panel, copy-email on click
│   └── Footer.jsx             # Links + location
├── hooks/
│   ├── useTypewriter.js       # Typewriter animation with disabled prop
│   ├── useReveal.js           # IntersectionObserver scroll reveal (.rv → .rv.in)
│   ├── useActiveSection.js    # Tracks active nav section on scroll
│   └── useGimmicks.js         # All easter eggs — see section below
├── data/
│   └── constants.js           # ALL portfolio content — edit this file for updates
├── App.jsx                    # Root — portals canvas layers, manages light/dark/reducedMotion
├── index.css                  # CSS variables (dark + light theme), global styles
└── main.jsx                   # React entry point
```

---

## Projects

| # | Name | Stack | GitHub | Live |
|---|---|---|---|---|
| 01 | Vibezee | React, Node, MongoDB, Stream API | [github.com/Krapa007/Vibezee-Project](https://github.com/Krapa007/Vibezee-Project) | [vibezee-frontend.onrender.com](https://vibezee-frontend.onrender.com) |
| 02 | Recipe Hub | React, HTML5, CSS3, JavaScript | [github.com/Krapa007/RecipeBook-Project](https://github.com/Krapa007/RecipeBook-Project) | [tastifybuds.netlify.app](https://tastifybuds.netlify.app) |
| 03 | Portfolio | React 18, Vite, Canvas 2D, CSS Variables | [github.com/Krapa007/Portfolio](https://github.com/Krapa007/Portfolio) | [kalyan-krapa-portfolio.netlify.app](https://kalyan-krapa-portfolio.netlify.app) |

---

## Customisation

All portfolio content lives in one file — `src/data/constants.js`:

- **Add a project** → add an entry to `PROJECTS` array with `name`, `desc`, `tech`, `gh`, `live`
- **Update skill project tags** → edit `projs` array in `SKILLS` — values like `"Project 1"`, `"Project 2"`, `"Project 3"`, `"Learning"`
- **Add a cert** → add to `CERTS` array with `ico`, `name`, `org`, `url`
- **Change typewriter roles** → edit the `ROLES` array
- **Change contact links** → update `href` values in `Contact.jsx` and `Footer.jsx`

---

## Features

### Background Canvas
Five aurora wave bands, cursor-chasing glow blob, 3 orbiting radial gradients, particles with repulsion physics, connection lines, meteor streaks, magnetic field lines (dark mode only), click ripples. Portaled directly to `document.body` — never inside a stacking context.

### Dog Canvas
Custom-drawn Dalmatian (no sprites, pure Canvas 2D API). Spring physics cursor chase. Paw prints trail. Woof bubble on click. Also portaled to `document.body`.

**Dog behaviours:**
- Hovers **Skills section** → runs to bottom-right, shows "studying 📚"
- Hovers **Projects section** → runs to bottom-left, shows "inspecting 🔍"
- Scroll to **very bottom** → runs to bottom-right, shows "that's all folks! 🐾"
- Visit **midnight–4am** → wears a blue sleep hat with Zzz
- Type `dog` → does a fast double backflip

### Easter Eggs

| Trigger | Effect |
|---|---|
| Type `hireme` | Confetti explosion + dog spins + toast |
| Type `dog` | Dog does a **backflip** + "✨ that's me!" |
| Type `kalyan` | Page text **glitches** for 1 second then snaps back |
| Type `404` | Fake **404 overlay** — click to dismiss |
| Type `rave` | **Rainbow disco mode** — accent cycles through colors for 5 seconds |
| Konami code `↑↑↓↓←→←→BA` | **Matrix rain** on background for 5 seconds |
| **Triple-click** anywhere | Dog leaves **❤️ heart paw prints** for 3 seconds |
| Click **KC. logo × 2** | Secret glass modal — "You found the developer." |
| Scroll to **very bottom** | Dog sits at footer, "that's all folks! 🐾" |
| Visit **midnight–4am** | Dog wears a **sleep hat** 😴 |
| Visit on **July 12** | **Birthday confetti** fires on load 🎂 |

### Light / Dark Mode
Toggle via ☀️ / 🌙 in the nav. Dark mode: warm deep navy `#0d0e14`. Light mode: warm beige `#f5f0e8`.

### Reduced Motion
If the OS has `prefers-reduced-motion: reduce` set, all canvas animations pause, cursor ball and dog are hidden, scroll reveals are instant.

---

## Deployment

Deployed on Netlify. The `netlify.toml` at root handles the SPA redirect rule.

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Netlify build settings:**

| Field | Value |
|---|---|
| Branch to deploy | `main` |
| Base directory | *(empty)* |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Functions directory | *(empty)* |
| Environment variables | *(none)* |

---

## OG Image

Place a `1200×630px` screenshot of the hero section at `public/og-image.png`. The OG tags in `index.html` already reference `/og-image.png` — this image appears when the URL is shared on LinkedIn, WhatsApp, or Twitter.

---

## agents.md

> This file documents the project for AI coding agents and assistants.
> Following the [agents.md](https://agentsmd.com) convention.

### Project Summary
Single-page portfolio for **Kalyan Krapa**, Full Stack MERN Developer, Hyderabad, India.
React 18 + Vite. No component library. No CSS framework. Pure CSS variables and inline styles throughout.

### Architecture Decisions

**No external UI library** — all styling is CSS variables in `index.css` and inline style objects in components. Do not introduce Tailwind, MUI, shadcn, or any component library.

**No routing** — single page, scroll-based navigation only. Do not add React Router.

**Canvas layers are portaled to `document.body`** — `BackgroundCanvas` and `DogCanvas` are rendered via `createPortal(component, document.body)` in `App.jsx`. This is intentional and must not be changed. It ensures they are never inside a CSS stacking context, so their z-index values are globally meaningful and they always render above modals, overlays, and any injected DOM elements.

**`#kk-ball` cursor is also injected directly onto `document.body`** — created in `App.jsx` via `useEffect` with `document.body.appendChild`. Same reason — escapes the React root stacking context.

**All data in one place** — `src/data/constants.js` is the single source of truth for all portfolio content. Components import from here. Do not hardcode content inside components.

**Event bus conventions**

| Event name | Direction | Purpose |
|---|---|---|
| `bg:accent` | Skills → BackgroundCanvas | Tint aurora/particles to skill color `{ color: [r, g, b] }` |
| `bg:matrix` | useGimmicks → BackgroundCanvas | 5s matrix rain mode |
| `dog:tether:skills` | Skills → DogCanvas | Dog runs to bottom-right corner |
| `dog:tether:projects` | Projects → DogCanvas | Dog runs to bottom-left corner |
| `dog:untether` | Skills/Projects → DogCanvas | Release dog back to cursor chase |
| `dog:spin` | useGimmicks → DogCanvas | 90-frame spin |
| `dog:backflip` | useGimmicks → DogCanvas | 120-frame fast double spin |
| `dog:hearts` | useGimmicks → DogCanvas | 3s heart paw trail |
| `dog:footer` | useGimmicks → DogCanvas | Dog sits at bottom-right, footer bubble |
| `dog:footer:leave` | useGimmicks → DogCanvas | Release from footer |
| `dog:latenight` | useGimmicks → DogCanvas | Sleep hat mode |
| `logo:click` | Navbar → useGimmicks | Counts toward 2-click secret modal |

### Key Files for AI Agents

| Task | File(s) to edit |
|---|---|
| Change any portfolio content | `src/data/constants.js` |
| Update skill → project mapping | `src/data/constants.js` — `projs` array in each SKILLS entry |
| Add a new section | Create `src/components/NewSection.jsx`, import in `src/App.jsx`, add ID to `src/hooks/useActiveSection.js` |
| Change dark mode colors | `src/index.css` — `:root` block |
| Change light mode colors | `src/index.css` — `body.light` block |
| Add/modify easter eggs | `src/hooks/useGimmicks.js` |
| Change background animation | `src/components/BackgroundCanvas.jsx` — `tick()` function |
| Change dog behaviour | `src/components/DogCanvas.jsx` — `loop()` function |
| Add a nav link | `src/components/Navbar.jsx` — `NAV_LINKS` array + add section ID to `useActiveSection.js` |

### CSS Variable Reference

```css
/* Dark mode (default) */
--bg:      #0d0e14      /* page background */
--bg2:     #13141c      /* slightly lighter surface */
--bg3:     #1c1e28      /* card/panel background */
--text:    #f0ece4      /* primary text */
--muted:   #a0a0b0      /* secondary text — body copy */
--muted2:  #c0bcc8      /* tertiary text */
--accent:  #f05a28      /* primary accent — orange */
--accent2: #ff7a45      /* secondary accent — lighter orange */
--border:  #252630      /* border color */
--white:   #f0ece4      /* warm off-white for headings */
--green:   #3fd68a      /* available/live status */
--code:    #8fffa0      /* code/monospace highlight */
--outline-stroke: rgba(240,236,228,0.28)  /* text-stroke for outline text */
```

### Do Not

- Do not add `node_modules` to the repo
- Do not add any `.env` secrets to the repo
- Do not change `cursor: none` on `body` without also updating `DogCanvas` and `#kk-ball`
- Do not move `BackgroundCanvas` or `DogCanvas` back inside the React root div — they must stay portaled to `document.body`
- Do not move `#kk-ball` creation back into JSX — it must be created via `useEffect` on `document.body`
- Do not add `backdrop-filter` to full-screen overlay divs — it creates a stacking context that traps canvas layers behind it
- Do not remove `netlify.toml` — required for SPA routing on Netlify

### Contact
**Kalyan Krapa** — krapa.kalyan@gmail.com
GitHub: [github.com/Krapa007](https://github.com/Krapa007)
LinkedIn: [linkedin.com/in/kalyan-krapa-556282229](https://www.linkedin.com/in/kalyan-krapa-556282229/)
