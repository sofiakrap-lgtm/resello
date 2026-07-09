# Resello

Reselling-sovelluksen frontend-runko.

## Teknologiapino

**Frontend-framework**
- React 19.1 (`react` + `react-dom`)
- React Router DOM 7.6 — reititys

**Kieli**
- TypeScript 5.8 — koko koodikanta on `.ts`/`.tsx`

**Tyylit**
- Tailwind CSS v4 (`tailwindcss` + `@tailwindcss/vite`) — konfiguraatio hoituu
  Vite-pluginilla, ei perinteistä `tailwind.config.js`-tiedostoa. Tyylit
  tuodaan `src/index.css`:ssä rivillä `@import "tailwindcss";`.

**Build & tooling**
- Vite 7 — dev-serveri ja build (`@vitejs/plugin-react`)
- `tsc -b` — tyyppitarkistus

**UI-kirjastot**
- `lucide-react` — ikonit
- `jsbarcode` — viivakoodien generointi

## Komennot

```bash
npm install       # asenna riippuvuudet
npm run dev       # käynnistä dev-serveri
npm run build     # tyyppitarkistus + tuotantobuild
npm run preview   # esikatsele tuotantobuild
npm run typecheck # pelkkä tyyppitarkistus (tsc -b)
```

## Rakenne

```
src/
├── main.tsx              # sovelluksen entry, BrowserRouter
├── App.tsx               # reitit
├── index.css             # @import "tailwindcss"
├── components/
│   ├── Layout.tsx        # navigaatio + Outlet
│   └── BarcodeSvg.tsx    # jsbarcode-viivakoodi SVG:nä
└── pages/
    ├── HomePage.tsx
    ├── BarcodePage.tsx
    └── NotFoundPage.tsx
```
