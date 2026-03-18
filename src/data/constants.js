export const ROLES = [
  "Junior Software Developer @ Stackular",
  "MERN Stack Developer",
  "React Specialist",
  "Node.js Engineer",
  ".NET Explorer",
  "Vibe Coder",
];

export const PROJECTS = [
  {
    num: "01",
    tags: ["Full Stack", "Real-time", "Auth"],
    name: "Vibezee",
    desc: "Language learners needed a way to find native speakers and practice in real-time — so I built one. The trickiest part was wiring Google OAuth and JWT together so users could sign in either way without session conflicts, then deploying the frontend on Netlify and the backend on Render as separate services and getting them to talk to each other correctly. Once that clicked, everything else fell into place.",
    tech: ["React", "TailwindCSS", "Node.js", "Express", "MongoDB", "Stream API", "JWT", "Google OAuth"],
    gh: "https://github.com/Krapa007/Vibezee-Project",
    live: "https://vibezee-frontend.onrender.com/",
  },
  {
    num: "02",
    tags: ["Frontend", "React", "Responsive"],
    name: "Recipe Hub",
    desc: "My first ever React project — and the one that taught me the most. Everything was hard: components, state, props, why things re-render. I built Recipe Hub to figure it all out by doing, not just reading. By the end I had a fully responsive recipe platform and a real understanding of how React actually works under the hood.",
    tech: ["React", "HTML5", "CSS3", "JavaScript"],
    gh: "https://github.com/Krapa007/RecipeBook-Project",
    live: "https://tastifybuds.netlify.app/",
  },
  {
    num: "03",
    tags: ["React", "Animation", "UI/UX"],
    name: "Portfolio",
    desc: "I wanted to build a portfolio that felt like a product, not a template. Two custom Canvas 2D animation systems running in parallel, a Dalmatian dog that chases your cursor with spring physics, liquid glass UI, and 11 easter eggs hidden across the site. The hardest part was getting the cursor ball to stay above injected modal overlays — the fix was React portals and understanding browser stacking contexts.",
    tech: ["React 18", "Vite", "Canvas 2D", "CSS Variables"],
    gh: "https://github.com/Krapa007/Portfolio",
    live: "https://kalyan-krapa-portfolio.netlify.app/",
  },
];

export const SKILLS = [
  {
    name: "React.js",
    cat: "Frontend • UI",
    desc: "My primary framework across all 3 projects. Started with Recipe Hub to learn the fundamentals, scaled up to Vibezee with TanStack Query and protected routes, and pushed it further in the Portfolio with Vite, portals, and custom animation hooks.",
    chips: ["React 18", "Hooks", "Context", "TanStack Query", "React Router", "Vite"],
    projs: ["Project 1", "Project 2", "Project 3"],
    signal: { r: 88, g: 166, b: 255 },
  },
  {
    name: "Node.js & Express",
    cat: "Backend • API",
    desc: "Built the entire Vibezee backend — RESTful API, JWT auth, Google OAuth integration, protected middleware, and MongoDB via Mongoose. Deployed separately from the frontend and connected via environment-scoped API URLs.",
    chips: ["Express.js", "JWT", "Google OAuth", "Middleware", "REST APIs"],
    projs: ["Project 1"],
    signal: { r: 74, g: 222, b: 128 },
  },
  {
    name: "MongoDB",
    cat: "Database • NoSQL",
    desc: "Designed the Vibezee data model from scratch — user profiles, language preferences, and friendship connections. Used Mongoose for schema validation and Atlas for cloud hosting.",
    chips: ["Mongoose", "Schema Design", "Atlas", "Aggregation"],
    projs: ["Project 1"],
    signal: { r: 34, g: 197, b: 94 },
  },
  {
    name: "HTML5 & CSS3",
    cat: "Frontend • Styling",
    desc: "Comfortable with the full spectrum — from semantic HTML and responsive layouts to CSS Variables design systems and Canvas 2D animation. Every pixel in this portfolio is hand-coded CSS with no framework.",
    chips: ["TailwindCSS", "CSS Variables", "CSS Grid", "Flexbox", "Canvas 2D", "Animations"],
    projs: ["Project 1", "Project 2", "Project 3"],
    signal: { r: 20, g: 184, b: 166 },
  },
  {
    name: "JavaScript",
    cat: "Programming",
    desc: "My strongest language — used across the full stack in every project. From async API calls in Vibezee to 60fps Canvas animation loops and spring physics in the Portfolio. Udemy certified in advanced JS.",
    chips: ["ES6+", "Async/Await", "Closures", "DOM APIs", "Canvas 2D", "Spring Physics"],
    projs: ["Project 1", "Project 2", "Project 3"],
    signal: { r: 250, g: 204, b: 21 },
  },
  {
    name: "Real-time & Stream",
    cat: "Streaming • Chat",
    desc: "Integrated Stream Chat API into Vibezee for live messaging between language partners — handling channels, online presence, and message history in a production deployment.",
    chips: ["Stream API", "WebSockets", "Real-time UI", "Channels"],
    projs: ["Project 1"],
    signal: { r: 168, g: 85, b: 247 },
  },
  {
    name: "MySQL & .NET",
    cat: "Database • Learning",
    desc: "Relational database fundamentals from coursework and the CISCO Networks certification. Currently exploring .NET to broaden backend experience beyond the Node ecosystem.",
    chips: ["MySQL", "SQL", ".NET (Learning)", "GitLab"],
    projs: ["Learning"],
    signal: { r: 59, g: 130, b: 246 },
  },
];

export const CERTS = [
  { ico: "🐍", name: "Programming Essentials in Python", org: "OPEN EDG", url: "https://drive.google.com/file/d/1wIxrDdare2oCFnQKIk1cJ3vfKtYNv3mz/view" },
  { ico: "🌐", name: "Introduction to Networks", org: "CISCO Networking Academy", url: "https://drive.google.com/file/d/1e7LrigONlBXWZPSz-j8AOHLiIvfBgbbz/view" },
  { ico: "⚡", name: "The Complete JavaScript Course", org: "Udemy", url: "https://drive.google.com/file/d/19FeplLBZ_laiLOiWMblTLzwhTzXw3BEw/view" },
];

export const GLASS_STYLE = {
  background: "rgba(255,255,255,.06)",
  border: "1px solid rgba(255,255,255,.14)",
  backdropFilter: "blur(32px) saturate(160%)",
  WebkitBackdropFilter: "blur(32px) saturate(160%)",
  boxShadow: "0 0 0 1px rgba(255,255,255,.07) inset, 0 8px 40px rgba(0,0,0,.35)",
};
