## DOCUMENTACIÓN
## 📦 Comandos de Instalación
Creación del proyecto 
```bash
npx create-next-app@latest . --ts --app --eslint --tailwind --src-dir --import-alias "@/*"
```
## Instalar Shadcn UI
Esto convertirá los estilos en componentes profesionales

```bash
npx shadcn-ui@latest init
```

## Instalar un paquete base de componentes (botones, cards, inputs):

```bash
npx shadcn-ui@latest add button card input form
```

## 3. Instalar React Query (tanstack query)

```bash
npm install @tanstack/react-query
```

## 4. Instalar Zustand
```bash
npm install zustand
```

## 5. Instalar Recharts
```bash
npm install recharts
```

## 6. Instalar Mapbox GL y Deck.gl (visualización geoespacial)
Mapbox GL:
```bash
npm install mapbox-gl

Deck.gl:
npm install deck.gl
```

## Estructura
src/app/ — Rutas y layouts
src/components/ — Componentes UI reutilizables

 ├── public/
 │     ├── logo.png
 │     ├── banner.jpg
 │     ├── icons/
 │     │     ├── map.svg
 │     │     └── chat.svg
 │     └── images/
 │           ├── mapa_colombia.webp
 │           └── dashboard_bg.jpg

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
