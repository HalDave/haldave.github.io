# HalDave's GitHub Page

Personal portfolio site hosted at [haldave.github.io](https://haldave.github.io).

This project serves as a hands-on playground for exploring how to develop safely and quickly with AI assistance, experimenting with React and its ecosystem, and practicing full-stack development with Node.js. It also extends into DevOps territory — the backend is continuously deployed to Azure App Service through GitHub Actions, making it a practical sandbox for exploring CI/CD pipelines, automated workflows, and cloud deployment strategies.

## Tech Stack

- **React 18** + **TypeScript**
- **MUI v5** (Material UI) for components and theming
- **React Query** for server state / data fetching
- **React Router v6** (HashRouter) for client-side routing
- Deployed via **gh-pages** to GitHub Pages

## Pages

| Route | Description |
|---|---|
| `/` | About — intro and bio |
| `#/work` | Work — professional experience |
| `#/hobbies` | Hobbies — books, games, and more |
| `#/dashboard` | Dashboard — protected book tracking (requires password) |

## Dashboard

The Dashboard is protected by a password-based JWT auth flow backed by an Express API ([haldave-github-pages-webapp](https://haldave-github-pages-webapp.azurewebsites.net)).

Features:
- Search for books via Open Library / Google Books
- Set current read, mark as Completed (with rating + opinion) or On Hold
- View all tracked books with status chips and completion dates

## Getting Started

```bash
npm install
npm start        # runs on http://localhost:3000
```

The app proxies API requests to `https://haldave-github-pages-webapp.azurewebsites.net` in development (configured via `proxy` in `package.json`). To point at a different backend, set `REACT_APP_API_BASE_URL` in a `.env.local` file:

```
REACT_APP_API_BASE_URL=http://localhost:4000
```

## Build & Deploy

The frontend is built and deployed to GitHub Pages via the `gh-pages` package:

```bash
npm run deploy   # builds and pushes to the gh-pages branch
```

The backend is deployed to Azure App Service automatically on every push to `main` via a GitHub Actions workflow, providing a real-world CI/CD pipeline to iterate on.

