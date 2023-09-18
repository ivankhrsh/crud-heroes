# CRUD Heroes

* Description: App for CRUD actions with heroes.
* Framework: Next.js
* Css: Tailwind
* Database: Vercel Postgres as the database and Prisma as the ORM

## Demo

https://crud-heroes-rho.vercel.app/

## Getting Started

First, instiall the dependencies with [npm](https://www.npmjs.com/)


```bash
npm install
```

Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

To get full functionality add DB params to .env file accordind to env.example
```bash
POSTGRES_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
POSTGRES_PRISMA_URL=

```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

