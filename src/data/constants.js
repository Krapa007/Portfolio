export const ROLES = [
  "Full Stack Intern @ Stackular",
  "MERN Stack Developer",
  "React Specialist",
  "Node.js Engineer",
  ".NET Explorer",
];

export const PROJECTS = [
  {
    num: "01",
    tags: ["Full Stack", "Real-time", "Auth"],
    name: "Vibezee",
    desc: "Full-stack social platform for language learners with real-time chat via Stream API, JWT + Google OAuth authentication, language-based friend suggestions, and protected routes — frontend and backend deployed separately.",
    tech: ["React", "TailwindCSS", "Node.js", "Express", "MongoDB", "Stream API", "JWT", "Google OAuth"],
    gh: "https://github.com/Krapa007/Vibezee-Project",
    live: "https://vibezee-frontend.onrender.com/",
  },
  {
    num: "02",
    tags: ["Frontend", "React", "Responsive"],
    name: "Recipe Hub",
    desc: "Interactive recipe management platform with dynamic recipe cards, smooth navigation flows, real-time UI updates, and accessibility-focused design built with a clean component-based React architecture.",
    tech: ["React", "HTML5", "CSS3", "JavaScript"],
    gh: "https://github.com/Krapa007/RecipeBook-Project",
    live: "https://tastifybuds.netlify.app/",
  },
  {
    num: "03",
    tags: ["React", "Animation", "UI/UX"],
    name: "Portfolio",
    desc: "Personal developer portfolio built with React 18 and Vite — featuring a custom Dalmatian dog cursor, aurora wave background animations, liquid glass UI, scroll-reveal effects, light/dark mode, and hidden easter eggs including a Konami code matrix rain mode.",
    tech: ["React 18", "Vite", "Canvas 2D", "CSS Variables"],
    gh: "https://github.com/Krapa007/Portfolio",
    live: "https://kalyan-krapa-portfolio.netlify.app/",
  },
];

export const SKILLS = [
  {
    name: "React.js",
    cat: "Frontend • UI",
    desc: "Built 3 production apps — Vibezee, Recipe Hub, and this Portfolio — using hooks, context, TanStack Query, Vite, and component-based architecture. Strong in routing and state management.",
    chips: ["React 18", "Hooks", "Context", "TanStack Query", "React Router", "Vite"],
    projs: ["Project 1", "Project 2", "Project 3"],
    signal: { r: 88, g: 166, b: 255 },
  },
  {
    name: "Node.js & Express",
    cat: "Backend • API",
    desc: "Built RESTful APIs with Express — JWT authentication, Google OAuth, protected routes, middleware chains, and MongoDB integration with Mongoose.",
    chips: ["Express.js", "JWT", "Google OAuth", "Middleware", "REST APIs"],
    projs: ["Project 1"],
    signal: { r: 74, g: 222, b: 128 },
  },
  {
    name: "MongoDB",
    cat: "Database • NoSQL",
    desc: "Designed schemas with Mongoose ODM for Vibezee — users, languages, friendships. Aggregation pipelines and indexing for efficient queries.",
    chips: ["Mongoose", "Aggregation", "Indexing", "Atlas"],
    projs: ["Project 1"],
    signal: { r: 34, g: 197, b: 94 },
  },
  {
    name: "HTML5 & CSS3",
    cat: "Frontend • Styling",
    desc: "Production-grade semantic HTML and responsive CSS across all projects. CSS Variables system, Tailwind utility-first workflow, animations, Canvas 2D, and cross-browser compatibility.",
    chips: ["TailwindCSS", "Bootstrap", "CSS Variables", "CSS Grid", "Flexbox", "Animations"],
    projs: ["Project 1", "Project 2", "Project 3"],
    signal: { r: 20, g: 184, b: 166 },
  },
  {
    name: "JavaScript",
    cat: "Programming",
    desc: "ES6+ across the full stack — async/await, promises, closures, destructuring, Canvas 2D API. Udemy certified. All business logic, animation loops and API integration written in vanilla JS / Node.",
    chips: ["ES6+", "Async/Await", "Promises", "DOM APIs", "Canvas 2D"],
    projs: ["Project 1", "Project 2", "Project 3"],
    signal: { r: 250, g: 204, b: 21 },
  },
  {
    name: "Real-time & Stream",
    cat: "Streaming • Chat",
    desc: "Integrated Stream Chat API into Vibezee for real-time messaging between language-learning partners — channels, presence, and message history.",
    chips: ["Stream API", "WebSockets", "Real-time UI"],
    projs: ["Project 1"],
    signal: { r: 168, g: 85, b: 247 },
  },
  {
    name: "MySQL & .NET",
    cat: "Database • Learning",
    desc: "Relational database experience with MySQL. Currently exploring .NET for backend development — expanding full-stack capabilities beyond Node.",
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
