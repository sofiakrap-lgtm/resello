# ReSello

Kirpputorin käyttöjärjestelmä itsepalvelukirpputoreille. Tämä repositorio
sisältää ReSellon markkinointisivun (landing page), joka on suunnattu
kirpputorien omistajille.

## Teknologiapino

**Frontend-framework**
- React 19.1 (`react` + `react-dom`)
- React Router DOM 7.6 — reititys

**Kieli**
- TypeScript 5.8 — koko koodikanta on `.ts`/`.tsx`

**Tyylit**
- Tailwind CSS v4 (`tailwindcss` + `@tailwindcss/vite`) — konfiguraatio hoituu
  Vite-pluginilla, ei `tailwind.config.js`-tiedostoa. Brändin värit ja fontti
  määritellään `src/index.css`:n `@theme`-lohkossa.

**Build & tooling**
- Vite 7 — dev-serveri ja build (`@vitejs/plugin-react`)
- `tsc -b` — tyyppitarkistus

**UI-kirjastot**
- `lucide-react` — ikonit
- `jsbarcode` — viivakoodien generointi (käytössä myöhemmissä ominaisuuksissa)

## Brändi

- **Fontti:** Hanken Grotesk (Google Fonts) — otsikot 700, leipäteksti 400,
  korostukset 500.
- **Värit:** beige `#FAF1E0` (tausta), tummanruskea `#3C2415` (teksti, napit),
  aksentit peach `#E2B48C`, sage `#BAB58D`, taupe `#9B8A76`, blue-grey `#9FB0AC`.

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
├── main.tsx              # entry, BrowserRouter
├── App.tsx               # reitit
├── index.css             # @import "tailwindcss" + @theme (värit, fontti)
├── components/
│   ├── Navbar.tsx        # sticky-navigaatio + CTA
│   ├── Button.tsx        # pyöristetty CTA-nappi (fill / outline)
│   └── Eyebrow.tsx       # osioiden ylätunniste
├── sections/            # landing pagen osiot järjestyksessä
│   ├── Hero.tsx
│   ├── Problem.tsx
│   ├── Solution.tsx      # #ominaisuudet — 2×2 korttiruudukko
│   ├── Visibility.tsx    # #nakyvyys — sage-aksenttitausta
│   ├── Pricing.tsx       # #hinnoittelu — porrastettu taulukko
│   ├── Migration.tsx
│   ├── Team.tsx
│   ├── FinalCta.tsx
│   └── Footer.tsx
└── pages/
    ├── HomePage.tsx      # kokoaa osiot
    └── NotFoundPage.tsx
```
