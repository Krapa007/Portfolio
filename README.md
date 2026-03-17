# Kalyan Krapa — Portfolio

Personal portfolio built with **React 18 + Vite**, featuring a custom Dalmatian dog cursor, aurora background animations, liquid glass UI, and a set of easter egg gimmicks.

**Live:** [kalyan-krapa-portfolio.netlify.app](https://kalyan-krapa-portfolio.netlify.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | CSS Variables + inline styles (no Tailwind needed) |
| Animations | Canvas 2D API (custom, no libraries) |
| Deployment | Netlify |
| Repo | GitLab — `git@gitlab.com:Krapa007/Portfolio.git` |

---

## Getting Started

```bash
# Clone
git clone git@gitlab.com:Krapa007/Portfolio.git
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
│   ├── DogCanvas.jsx          # Dalmatian dog — chases cursor, tethers on section hover
│   ├── Navbar.jsx             # Fixed sticky nav, active section tracking, mobile menu
│   ├── ScrollProgress.jsx     # Thin accent bar at top showing scroll percentage
│   ├── Hero.jsx               # Landing — name, typewriter, profile.json panel
│   ├── Projects.jsx           # Project rows with GitHub + Live Demo links
│   ├── Skills.jsx             # Skills table with bg:accent color signaling
│   ├── Certifications.jsx     # Cert cards — clickable, link to certificates
│   ├── About.jsx              # Bio + key-value details table
│   ├── Contact.jsx            # Centered glass panel, copy-email on click
│   └── Footer.jsx             # Links + location
├── hooks/
│   ├── useTypewriter.js       # Typewriter animation with disabled prop
│   ├── useReveal.js           # IntersectionObserver scroll reveal (.rv → .rv.in)
│   ├── useActiveSection.js    # Tracks active nav section on scroll
│   └── useGimmicks.js         # Easter eggs: "hire me" type, Konami code, confetti
├── data/
│   └── constants.js           # ALL portfolio data lives here — edit this file
├── App.jsx                    # Root — wires all sections, manages light/dark/reducedMotion
├── index.css                  # CSS variables (dark + light theme), global styles
└── main.jsx                   # React entry point
```

---

## Customisation

All portfolio content lives in one file — `src/data/constants.js`:

- **Add a project** → add an entry to `PROJECTS` array with `name`, `desc`, `tech`, `gh`, `live`
- **Add a skill** → add to `SKILLS` array, optionally include a `signal` color for the background canvas
- **Add a cert** → add to `CERTS` array with `ico`, `name`, `org`, `url`
- **Change typewriter roles** → edit the `ROLES` array
- **Change contact email** → search `krapa.kalyan@gmail.com` across `Hero.jsx` and `Contact.jsx`

---

## Features

### Background Canvas
Five aurora wave bands, cursor-chasing glow blob, 3 orbiting radial gradients, 130 particles with repulsion physics, connection lines, meteor streaks, magnetic field lines (dark mode only), click ripples. Pauses automatically when `prefers-reduced-motion` is set.

### Dog Canvas
Custom-drawn Dalmatian (no sprites, pure Canvas 2D). Spring physics chase. Paw prints. Woof bubble on click.
- Hovers over **Skills section** → runs to bottom-right corner, shows "studying 📚"
- Hovers over **Projects section** → runs to bottom-left corner, shows "inspecting 🔍"
- Leaves section → untethers, resumes chasing cursor

### Easter Eggs
| Trigger | Effect |
|---|---|
| Type `hireme` anywhere on the page | Confetti explosion + dog spins + toast |
| Konami code `↑↑↓↓←→←→BA` | Background switches to matrix rain for 5 seconds |
| Click email in Contact section | Copies to clipboard, shows "📋 Copied!" toast |

### Light / Dark Mode
Toggle in the nav bar (☀️ / 🌙). Also accessible in the mobile menu. Dark mode uses a warm deep navy (`#0d0e14`) — not pure black. Light mode uses a warm beige (`#f5f0e8`).

### Reduced Motion
If the user's OS has `prefers-reduced-motion: reduce` set, all canvas animations pause, the dog and cursor ball are hidden, and scroll reveal transitions are disabled instantly.

---

## Deployment

Deployed on Netlify. The `netlify.toml` at the root handles the SPA redirect rule (all routes → `index.html`).

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

To deploy manually:
```bash
npm run build
# drag and drop the dist/ folder at app.netlify.com
```

---

## OG Image

Place a `1200×630px` screenshot of the hero section at `public/og-image.png`. This is the image shown when the portfolio URL is shared on LinkedIn, WhatsApp, or Twitter. The OG tags in `index.html` already reference `/og-image.png`.

---

## agents.md

> This file documents the project for AI coding agents and assistants.
> Following the [agents.md](https://agentsmd.com) convention.

### Project Summary
Single-page portfolio for **Kalyan Krapa**, Full Stack MERN Developer, Hyderabad India.
Built with React 18 + Vite. No component library. No CSS framework. Pure CSS variables and inline styles throughout.

### Architecture Decisions

**No external UI library** — all styling is done with CSS variables defined in `index.css` and inline style objects in components. Do not introduce Tailwind, MUI, shadcn, or any component library.

**No routing** — single page, scroll-based navigation only. Do not add React Router.

**Canvas animations are self-contained** — `BackgroundCanvas.jsx` and `DogCanvas.jsx` manage their own `useEffect` loops with full cleanup. Do not lift canvas state into React. Communication between canvas and UI components happens via `window.dispatchEvent(new CustomEvent(...))` — not React props or context.

**All data in one place** — `src/data/constants.js` is the single source of truth for all portfolio content. Components import from here. Do not hardcode content inside components.

**Event bus conventions**
| Event name | Direction | Purpose |
|---|---|---|
| `bg:accent` | UI → BackgroundCanvas | Signal a color `{ color: [r, g, b] }` to tint the aurora/particles |
| `bg:matrix` | useGimmicks → BackgroundCanvas | Trigger 5s matrix rain mode |
| `dog:tether:skills` | Skills → DogCanvas | Send dog to bottom-right corner |
| `dog:tether:projects` | Projects → DogCanvas | Send dog to bottom-left corner |
| `dog:untether` | Skills/Projects → DogCanvas | Release dog back to cursor chase |
| `dog:spin` | useGimmicks → DogCanvas | Trigger 90-frame spin animation |

### Key Files for AI Agents

| Task | File(s) to edit |
|---|---|
| Change any portfolio content | `src/data/constants.js` |
| Add a new section | Create `src/components/NewSection.jsx`, import in `src/App.jsx`, add ID to `src/hooks/useActiveSection.js` |
| Change dark mode colors | `src/index.css` — `:root` block |
| Change light mode colors | `src/index.css` — `body.light` block |
| Add a new easter egg | `src/hooks/useGimmicks.js` |
| Change background animation | `src/components/BackgroundCanvas.jsx` — `tick()` function |
| Change dog behaviour | `src/components/DogCanvas.jsx` — `loop()` function |
| Add a nav link | `src/components/Navbar.jsx` — `NAV_LINKS` array + add section ID to `useActiveSection.js` |

### CSS Variable Reference

```css
/* Dark mode (default) */
--bg: #0d0e14          /* page background */
--bg2: #13141c         /* slightly lighter surface */
--bg3: #1c1e28         /* card/panel background */
--text: #e8e2d9        /* primary text */
--muted: #7a7a8a       /* secondary text */
--muted2: #a8a4b0      /* tertiary text */
--accent: #f05a28      /* primary accent — orange */
--accent2: #ff7a45     /* secondary accent — lighter orange */
--border: #252630      /* border color */
--white: #f0ece4       /* "white" — warm off-white */
--green: #3fd68a       /* available/live status */
--code: #8fffa0        /* code/monospace highlight */
--outline-stroke: rgba(240,236,228,0.28)  /* text-stroke for outline text */
```

### Do Not

- Do not add `node_modules` to the repo
- Do not add any `.env` secrets to the repo
- Do not change `cursor: none` on `body` without also updating the `DogCanvas` and `#kk-ball` — they are the replacement cursor system
- Do not remove the `netlify.toml` — it is required for SPA routing on Netlify
- Do not add `type="module"` to plain `<script>` tags inside `useEffect` — they execute after streaming

### Contact
**Kalyan Krapa** — krapa.kalyan@gmail.com
GitHub: [github.com/Krapa007](https://github.com/Krapa007)
LinkedIn: [linkedin.com/in/kalyan-krapa-556282229](https://www.linkedin.com/in/kalyan-krapa-556282229/)
