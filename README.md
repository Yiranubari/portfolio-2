# Portfolio

My developer portfolio, It is a single page that shows my backend work during my time at HNG, with a separate detail page for each project.

Live: https://yiranubari-hng.vercel.app

## What it is

A React site with a home page and one detail page per project. The home page covers the basics: who I am, the projects I built during HNG, the skills behind them, a featured deep dive, a short reflection, and how to reach me. Clicking a project opens its own page with the full write-up, what I built, the problem it solved, the request flow, the endpoints, and one challenge I worked through.

The look is plain on purpose: black on warm paper, thick borders, hard shadows, no extra color. The idea was for someone to open it, spend a few minutes, and walk away knowing what I can build.

## Stack

- React with Vite
- React Router for the pages
- Plain CSS, no framework
- Fonts: Bricolage Grotesque, Hanken Grotesk, Reddit Mono
- Deployed on Vercel

## Running it locally

You need Node.js 18 or newer.

```bash
git clone https://github.com/Yiranubari/portfolio-2.git
cd portfolio
npm install
npm run dev
```

The dev server starts at http://localhost:5173.

To build for production:

```bash
npm run build
npm run preview
```

## How it is put together

All the project content lives in one file, `src/data/projects.js`. The home page and the detail pages both read from it, so the cards and the detail pages never fall out of sync. Adding or editing a project means editing that one file, not the components.

```
src/
  main.jsx              entry, router, scroll restoration off
  App.jsx               routes and layout wrapper
  index.css             all the styles and theme tokens
  data/
    projects.js         every project, single source of truth
  components/
    Layout.jsx          masthead and footer
    ScrollToTop.jsx     scroll behavior on navigation
  pages/
    Home.jsx            profile, projects, skills, featured, reflection, contact
    ProjectDetail.jsx   one template that renders any project by its slug
```

Routing is simple: `/` is the home page, and `/projects/:slug` is a project. A `vercel.json` at the root rewrites every path to `index.html` so a refresh on a project page does not 404.

The scroll behavior took a little care. A fresh click into a project starts at the top. The back button, both the browser one and the in-app one, returns you to where you were. A page refresh goes back to the top.

## Projects shown

- Insighta Labs+ Backend: a PHP and Slim API serving both a CLI and a web portal, with OAuth, role based access, Redis caching, and streaming CSV uploads.
- Insighta CLI: a Node and TypeScript terminal client using OAuth PKCE.
- Insighta Web Portal: a React and Vite portal with cookie sessions and CSRF protection.
- Append-Only Event Store: a Node and TypeScript key value store that survives a crash by replaying its log.
- Gender Classify API: a PHP and Slim wrapper around Genderize.io with validation and a confidence rule.

## Contact

- Email: yiranubari4@gmail.com
- GitHub: https://github.com/Yiranubari
