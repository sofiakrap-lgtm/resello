# Resello

Resellon markkinointisivu — jälleenmyynnin SaaS-työkalu, jonka etusivu
esittelee tuotteen ominaisuudet ja hyödyt.

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
├── data/
│   └── features.ts       # etusivun ominaisuudet / hyödyt -sisältö
├── components/
│   ├── Layout.tsx        # header (nav + CTA) + footer + Outlet
│   ├── Hero.tsx          # etusivun hero
│   ├── FeaturesSection.tsx  # ominaisuudet / hyödyt -osio
│   ├── FeatureCard.tsx   # yksittäinen ominaisuuskortti
│   └── BarcodeSvg.tsx    # jsbarcode-viivakoodi SVG:nä
└── pages/
    ├── HomePage.tsx      # hero + ominaisuudet
    ├── BarcodePage.tsx   # /demo — viivakoodin live-demo
    └── NotFoundPage.tsx
```
