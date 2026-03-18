# Kalyan Krapa — Portfolio

Personal portfolio built with **React 18 + Vite**, featuring a custom Dalmatian dog cursor, aurora background animations, liquid glass UI, and 11 easter egg gimmicks.

**Live:** [kalyan-krapa-portfolio.netlify.app](https://kalyan-krapa-portfolio.netlify.app)
**Repo:** `git@gitlab.com:Krapa007/kalyan-portfolio.git`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | CSS Variables + inline styles (no Tailwind) |
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
│   ├── ScrollProgress.jsx     # Thin accent bar at top showing scroll %
│   ├── Hero.jsx               # Landing — name, typewriter, profile.json panel, stats bar
│   ├── Projects.jsx           # Project rows — stacks vertically on mobile
│   ├── Skills.jsx             # Skills table with bg:accent color signaling
│   ├── Certifications.jsx     # Cert cards — clickable, link to Google Drive certificates
│   ├── About.jsx              # Bio + Best Paper Award + key-value details
│   ├── Contact.jsx            # Centered glass panel, copy-email on click
│   └── Footer.jsx             # GitHub, LinkedIn links + location
├── hooks/
│   ├── useTypewriter.js       # Typewriter animation with disabled prop
│   ├── useReveal.js           # IntersectionObserver scroll reveal (.rv → .rv.in)
│   ├── useActiveSection.js    # Tracks active nav section on scroll
│   └── useGimmicks.js         # All 11 easter eggs — see section below
├── data/
│   └── constants.js           # ALL portfolio content lives here — edit this file
├── App.jsx                    # Root — portals canvas layers to body, manages light/dark/reducedMotion
├── index.css                  # CSS variables (dark + light theme), global styles, mobile media queries
└── main.jsx                   # React entry point
```

---

## Projects

| # | Name | Stack | GitHub | Live |
|---|---|---|---|---|
| 01 | Vibezee | React, Node, MongoDB, Stream API | [Vibezee-Project](https://github.com/Krapa007/Vibezee-Project) | [vibezee-frontend.onrender.com](https://vibezee-frontend.onrender.com) |
| 02 | Recipe Hub | React, HTML5, CSS3, JavaScript | [RecipeBook-Project](https://github.com/Krapa007/RecipeBook-Project) | [tastifybuds.netlify.app](https://tastifybuds.netlify.app) |
| 03 | Portfolio | React 18, Vite, Canvas 2D, CSS Variables | [Portfolio](https://github.com/Krapa007/Portfolio) | [kalyan-krapa-portfolio.netlify.app](https://kalyan-krapa-portfolio.netlify.app) |

---

## Customisation

All content lives in `src/data/constants.js` — the only file you need to edit for content updates:

- **Add/edit a project** → `PROJECTS` array — `name`, `desc`, `tech`, `gh`, `live`
- **Update skill → project mapping** → `projs` array in each `SKILLS` entry (`"Project 1"`, `"Project 2"`, `"Project 3"`, `"Learning"`)
- **Add a cert** → `CERTS` array — `ico`, `name`, `org`, `url`
- **Change typewriter roles** → `ROLES` array
- **Change glass card style** → `GLASS_STYLE` object

---

## Features

### Background Canvas
Five aurora wave bands, cursor-chasing glow blob, 3 orbiting radial gradients, particles with repulsion physics, connection lines, meteor streaks, magnetic field lines (dark mode only), click ripples. Portaled directly to `document.body` — never inside a stacking context. Skipped entirely on touch/mobile devices.

### Dog Canvas
Custom-drawn Dalmatian (no sprites — pure Canvas 2D). Spring physics cursor chase. Paw print trail. Woof bubble on click. Also portaled to `document.body`. Hidden on touch devices.

**Dog behaviours:**
- Hover **Skills section** → runs to bottom-right, shows "studying 📚"
- Hover **Projects section** → runs to bottom-left, shows "inspecting 🔍"
- Scroll to **very bottom** → runs to footer corner, shows "that's all folks! 🐾"
- Visit **midnight–4am** → wears a blue sleep hat with Zzz, shows "still coding..."
- Type `dog` → does a fast double backflip

### Easter Eggs (11 total)

| Trigger | Effect |
|---|---|
| Type `hireme` | Confetti explosion + dog spins + toast |
| Type `dog` | Dog does a **backflip** + "✨ that's me!" |
| Type `kalyan` | Page text **glitches** for 1 second |
| Type `404` | Fake **404 overlay** — click to dismiss |
| Type `rave` | **Rainbow disco mode** — accent cycles 5 seconds |
| Konami `↑↑↓↓←→←→BA` | **Matrix rain** background for 5 seconds |
| **Triple-click** anywhere | Dog leaves **❤️ heart paw prints** for 3 seconds |
| Click **KC. logo × 2** | Secret glass modal — "You found the developer." |
| Scroll to **very bottom** | Dog sits at footer — "that's all folks! 🐾" |
| Visit **midnight–4am** | Dog wears a **sleep hat** 😴 |
| Visit on **July 12** | **Birthday confetti** fires on load 🎂 |

### Light / Dark Mode
Toggle via ☀️ / 🌙 in the nav. Dark: warm near-black `#080808`. Light: warm beige `#f5f0e8`.

### Mobile
- Canvas layers (dog, background, cursor ball) skipped entirely on touch devices via `matchMedia("(hover:none) and (pointer:coarse)")`
- `cursor:none` removed on touch devices
- Profile JSON panel hidden below 768px
- All sections use `clamp()` padding — scales from phone to desktop
- Project buttons stack below content on screens ≤600px
- About, Skills, Certs all collapse to single column on mobile

### SEO
- Full Open Graph tags with correct Netlify URL
- Twitter/X card tags
- `robots.txt` and `sitemap.xml` in `public/`
- JSON-LD structured data (Person schema) for Google search
- Canonical URL tag
- `robots: index, follow` meta tag

### Reduced Motion
`prefers-reduced-motion: reduce` — all canvas animations pause, cursor ball and dog hidden, scroll reveals are instant.

---

## Deployment

Deployed on Netlify. `netlify.toml` at root handles the SPA redirect.

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
| Branch | `main` |
| Base directory | *(empty)* |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Functions directory | *(empty)* |
| Environment variables | *(none)* |

---

## OG Image

Create `public/og-image.png` (1200×630px screenshot of the hero section). The OG tags in `index.html` reference the full absolute URL — this image appears when the portfolio URL is shared on LinkedIn, WhatsApp, or Twitter.

---

## agents.md

> Documents this project for AI coding agents following the [agents.md](https://agentsmd.com) convention.

### Project Summary
Single-page portfolio for **Kalyan Krapa**, Full Stack MERN Developer, Hyderabad, India.
React 18 + Vite. No component library. No CSS framework. Pure CSS variables + inline styles throughout.

### Architecture Decisions

**No external UI library** — all styling is CSS variables in `index.css` and inline style objects in components. Do not add Tailwind, MUI, shadcn, or any component library.

**No routing** — single page, scroll-based navigation. Do not add React Router.

**Canvas layers portaled to `document.body`** — `BackgroundCanvas` and `DogCanvas` use `createPortal(component, document.body)` in `App.jsx`. This is intentional and must not be changed. It ensures they sit outside any CSS stacking context so their z-index values are globally meaningful and they always render above modals and overlays.

**`#kk-ball` injected directly onto `document.body`** — created in `App.jsx` via `useEffect`. Same reason — escapes the React root stacking context. Only created on non-touch devices.

**Touch/mobile guard** — `isTouch = matchMedia("(hover:none) and (pointer:coarse)").matches` in `App.jsx`. Canvas portals and ball are skipped when `isTouch` is true.

**`zIndex:1` on root content div is required** — the canvas sits at `zIndex:0`. The content wrapper needs `zIndex:1` to layer above it. Do not remove this.

**Do NOT use `backdrop-filter` on full-screen overlay divs** — it creates a CSS stacking context that traps the canvas layers behind it, making the cursor ball and dog disappear. Only use `backdrop-filter` on small, bounded elements like cards.

**All data in `constants.js`** — single source of truth. Components import from here. Do not hardcode content inside components.

### Event Bus

| Event | Direction | Purpose |
|---|---|---|
| `bg:accent` | Skills → BackgroundCanvas | Tint aurora/particles `{ color: [r,g,b] }` |
| `bg:matrix` | useGimmicks → BackgroundCanvas | 5s matrix rain mode |
| `dog:tether:skills` | Skills → DogCanvas | Dog runs to bottom-right |
| `dog:tether:projects` | Projects → DogCanvas | Dog runs to bottom-left |
| `dog:untether` | Skills/Projects → DogCanvas | Release dog to cursor chase |
| `dog:spin` | useGimmicks → DogCanvas | 90-frame spin |
| `dog:backflip` | useGimmicks → DogCanvas | 120-frame fast double spin |
| `dog:hearts` | useGimmicks → DogCanvas | 3s heart paw trail |
| `dog:footer` | useGimmicks → DogCanvas | Dog sits at footer |
| `dog:footer:leave` | useGimmicks → DogCanvas | Release from footer |
| `dog:latenight` | useGimmicks → DogCanvas | Sleep hat mode |
| `logo:click` | Navbar → useGimmicks | Counts toward 2-click secret modal |

### Key Files for AI Agents

| Task | File(s) to edit |
|---|---|
| Change any portfolio content | `src/data/constants.js` |
| Update skill → project tags | `src/data/constants.js` — `projs` in each SKILLS entry |
| Add a new section | Create component, import in `App.jsx`, add ID to `useActiveSection.js` |
| Change dark mode colors | `src/index.css` — `:root` block |
| Change light mode colors | `src/index.css` — `body.light` block |
| Add/modify easter eggs | `src/hooks/useGimmicks.js` |
| Change background animation | `src/components/BackgroundCanvas.jsx` — `tick()` |
| Change dog behaviour | `src/components/DogCanvas.jsx` — `loop()` |
| Add a nav link | `Navbar.jsx` — `NAV_LINKS` array + `useActiveSection.js` |

### CSS Variable Reference

```css
/* Dark mode (default) */
--bg:      #080808      /* warm near-black page background */
--bg2:     #0f0f0f      /* slightly lighter surface */
--bg3:     #1a1a1a      /* card/panel background */
--text:    #f0ece4      /* primary text */
--muted:   #aaa         /* secondary text — body copy */
--muted2:  #c8c4bc      /* tertiary text */
--accent:  #ff4500      /* primary accent — vivid orange-red */
--accent2: #ff6b35      /* secondary accent */
--border:  #222         /* border color */
--white:   #f0ece4      /* warm off-white for headings */
--green:   #3fd68a      /* available/live status */
--code:    #8fffa0      /* code/monospace highlight */
--outline-stroke: rgba(255,255,255,0.38)  /* text-stroke for outline text */
```

### Do Not

- Do not add `node_modules` to the repo
- Do not add `.env` secrets to the repo
- Do not change `cursor:none` on `body` without also updating `DogCanvas` and `#kk-ball`
- Do not move `BackgroundCanvas` or `DogCanvas` outside of `createPortal` — they must stay portaled to `document.body`
- Do not move `#kk-ball` back into JSX — it must be created via `useEffect` on `document.body`
- Do not add `backdrop-filter` to full-screen overlay divs — breaks cursor ball visibility
- Do not remove `zIndex:1` from the root content wrapper in `App.jsx` — canvas needs to stay behind content
- Do not remove `netlify.toml` — required for SPA routing

### Contact
**Kalyan Krapa** — krapa.kalyan@gmail.com
GitHub: [github.com/Krapa007](https://github.com/Krapa007)
LinkedIn: [linkedin.com/in/kalyan-krapa-556282229](https://www.linkedin.com/in/kalyan-krapa-556282229/)
