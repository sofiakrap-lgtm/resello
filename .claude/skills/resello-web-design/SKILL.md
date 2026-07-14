---
name: resello-web-design
description: ReSellon nettisivujen ja käyttöliittymän designjärjestelmä. Apple-tyylinen rakenne (massiivinen typografia, valtava tyhjä tila, hienovarainen liike) ReSellon brändiväreillä ja äänensävyllä. Käytä AINA kun rakennetaan tai muokataan ReSellon nettisivua, landing pagea, kassajärjestelmän UI:ta, myyjänäkymää, demoa tai mitä tahansa ReSellon visuaalista komponenttia. Aktivoituu myös kun mainitaan "resello", "kirpputorijärjestelmä", "kassanäkymä" tai "myyjäportaali".
---

# ReSello Web Design System

Applen rakenne, ReSellon sielu.

**Positio:** Vinted tuotuna fyysiseen maailmaan.
**Designin tehtävä:** todistaa erottautumistekijä numero 4 visuaalisesti: *rauhallinen näkymä, joka ei kuormita silmää.* Jos komponentti kuormittaa, se poistetaan.

## Ydinperiaatteet

1. **Sisältö on sankari.** Tuote ja ihminen edellä, ei käyttöliittymä.
2. **Tyhjä tila on aktiivinen elementti.** Kun epäröit, lisää tilaa.
3. **Yksi asia per näkymä.** Yksi viesti, yksi kuva, yksi CTA.
4. **Lämmin minimalismi.** Apple on kylmä ja valkoinen. ReSello on lämmin ja beige. Sama tyhjyys, eri lämpötila.
5. **Liike on hienovaraista.** Fade plus 20px nousu. Ei bouncea, ei karuselleja.
6. **Vanha ja uusi rinnakkain.** Filmikuvat modernissa gridissä.

---

## Design tokens

```css
:root {
  /* Brändivärit. Vain nämä. */
  --c-beige:       #FAF1E0;   /* pääpohja */
  --c-brown:       #3C2415;   /* teksti, CTA, tumma sektio */

  /* Johdetut sävyt (samasta ruskeasta, ei uusia värejä) */
  --c-brown-80:    rgba(60, 36, 21, 0.80);   /* sekundääriteksti */
  --c-brown-55:    rgba(60, 36, 21, 0.55);   /* muted, captionit */
  --c-brown-12:    rgba(60, 36, 21, 0.12);   /* borderit, viivat */
  --c-brown-06:    rgba(60, 36, 21, 0.06);   /* kortin tausta */
  --c-brown-hov:   #4E3220;                  /* CTA hover */

  --c-cream:       #FFFDF8;   /* vaalein taso, kortit beigen päällä */
  --c-white:       #FFFFFF;   /* vain kuvien ja kassanäkymän taustana */

  /* Typografia */
  --font: "Helvetica Now Display", "Helvetica Now Text", "Helvetica Neue",
          -apple-system, BlinkMacSystemFont, "Inter", Helvetica, Arial, sans-serif;

  /* Spacing, 8px grid */
  --s-1: 8px;   --s-2: 16px;  --s-3: 24px;  --s-4: 32px;
  --s-5: 48px;  --s-6: 64px;  --s-7: 96px;  --s-8: 128px;

  /* Radius */
  --r-sm: 8px;  --r-md: 12px;  --r-lg: 18px;  --r-pill: 980px;

  /* Easing */
  --ease: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Fontti:** Helvetica Now on lisenssifontti (Monotype). Jos lisenssi on, käytä sitä. Jos ei, fallback on **Helvetica Neue / system-stack** joka on visuaalisesti lähin. Älä koskaan korvaa Poppinsilla, Montserratilla tai Interillä ReSellon julkisissa materiaaleissa.

**Värisääntö:** ruskea ja beige riittävät. Statusvärit (myyty, aktiivinen, virhe) sallitaan **vain kassajärjestelmän sisällä**, ei markkinointisivuilla. Ks. "Kassanäkymä" alla.

---

## Typografinen skaala

| Rooli | Koko (desktop) | Weight | Letter-spacing | Line-height |
|---|---|---|---|---|
| Hero display | clamp 40 → 96px | 600 | -0.015em | 1.05 |
| H1 / sektio | 56px | 600 | -0.01em | 1.1 |
| H2 | 40px | 600 | -0.01em | 1.1 |
| H3 | 28px | 600 | -0.005em | 1.2 |
| Lead / intro | 21px | 400 | 0 | 1.4 |
| Body | 17px | 400 | 0 | 1.5 |
| Eyebrow | 12px | 500 | +0.08em, CAPS | 1.4 |
| Caption | 13px | 400 | 0 | 1.4 |

**Säännöt**
- Weight max 600. Ei koskaan 700 tai bold.
- Isot otsikot: negatiivinen letter-spacing. Pieni teksti: 0.
- Leipätekstin max leveys 680px.
- Otsikot ruskealla beigellä. Kontrasti on 11:1, riittää AAA.

---

## Layout

```css
body { background: var(--c-beige); color: var(--c-brown); }
.container { max-width: 1024px; margin: 0 auto; padding: 0 22px; }
.section  { padding: var(--s-8) 0; }
```

**Sektiorytmi:** beige → cream → beige → **ruskea** (max yksi tumma sivua kohti) → beige.
Tumma sektio on efekti, ei teema. Käytä sitä pilaripaikassa, esim. arvolupaus tai CTA.

---

## Komponentit

### CTA (pill, ruskea)
```css
.btn {
  background: var(--c-brown); color: var(--c-beige);
  padding: 12px 24px; border-radius: var(--r-pill);
  font-size: 17px; font-weight: 400; border: none; cursor: pointer;
  transition: background .25s var(--ease), transform .25s var(--ease);
}
.btn:hover  { background: var(--c-brown-hov); }
.btn:active { transform: scale(0.97); }

.btn--ghost { background: transparent; color: var(--c-brown);
              border: 1px solid var(--c-brown-12); }
```
Sekundääri-CTA on **tekstilinkki nuolella**, ei toinen nappi: `Katso miten toimii ›`
Hover: nuoli liukuu 3px oikealle.

Tummalla sektiolla napit kääntyvät: beige tausta, ruskea teksti.

### Navigaatio (frosted glass, beige)
```css
.nav {
  position: sticky; top: 0; z-index: 100; height: 48px;
  background: rgba(250, 241, 224, 0.80);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--c-brown-12);
}
.nav a { font-size: 12px; color: var(--c-brown-80); }
.nav a:hover { color: var(--c-brown); }
```
Matala navi, pieni teksti. Logo pienenä, ei banneria.

### Kortti
```css
.card {
  background: var(--c-cream); border-radius: var(--r-lg);
  padding: var(--s-4); border: none; box-shadow: none;
}
```
Erottelu tehdään taustavärillä ja radiuksella, ei varjoilla. Jos varjo on pakko:
`box-shadow: 0 4px 24px rgba(60, 36, 21, 0.06);` ja ei enempää.

### Connector-symboli
Pieni sanaton hahmo joka yhdistää ihmisen ja tavaran. Käyttö:
- **Hero:** yksi connector, iso, hiljainen. Ei toistoa.
- **Sektioiden välissä:** korkeintaan kerran sivulla erottimena.
- **Loading state:** connector-animaatio, hidas, ei spinneriä.
- Älä käytä sitä ikonina listoissa. Se on symboli, ei ikonisetti.

### Kuvat
- Isoja, keskitettyjä, ilman kehystä.
- Kuvatyyli: filmikuvat modernilla otteella, lähestyttävä värimaailma, vanhan tavaran maailma uudella tavalla.
- Ei stock-kuvia hymyilevistä ihmisistä läppärin ääressä.
- `border-radius: var(--r-lg)` vain kortin sisällä, muuten 0.

---

## Kassanäkymä ja myyjäportaali

Tuotteen UI, ei markkinointisivu. Säännöt löystyvät hallitusti:

- **Tausta:** `--c-cream` tai valkoinen. Beige on markkinoinnin pohja, tuotteessa se on liian lämmin pitkään käyttöön.
- **Statusvärit sallitaan**, hillittyinä ja vain toiminnallisina:
  - Onnistui: `#2E6B4F`
  - Huomio: `#B0791F`
  - Virhe: `#9A3B2D`
  Nämä eivät koskaan esiinny markkinointisivuilla.
- **Kosketuskohteet min 44x44px.** Kassa käytetään kiireessä, usein tabletilla.
- **Numerot:** tabulaariset (`font-variant-numeric: tabular-nums`) hinnoissa ja saldoissa.
- **Ei modaaleja** siellä missä inline-toiminto riittää.
- Rauhallinen näkymä on tuotelupaus. Jos näkymässä on yli 7 toimintoa kerralla, se on väärin.

---

## Animaatiot

Vain kaksi liikettä koko sivulla.

**1. Scroll reveal**
```css
.reveal { opacity: 0; transform: translateY(20px);
          transition: opacity .8s var(--ease-out), transform .8s var(--ease-out); }
.reveal.in { opacity: 1; transform: none; }
```
```js
const io = new IntersectionObserver(es =>
  es.forEach(e => e.isIntersecting && e.target.classList.add('in')),
  { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
```

**2. Hover-skaalaus** kuville ja korteille: `transform: scale(1.02)`, 400ms.

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

---

## Sisältö ja äänensävy sivulla

Isosiskomainen: viisas ja luotettava, tarvittaessa leikkisä. Auttaa arjen pulmiin ilman tyrkytystä.

**Yleisö ohjaa painotusta:**
| Sivu | Yleisö | Painotus |
|---|---|---|
| Etusivu / myyntisivu | Omistaja | Uusien asiakkaiden lähde, kaikki yhdessä, laajennettu näkyvyys |
| Myyjäsivu | Myyjä | Turva, vaivattomuus, nopeus, ansainta |
| Hakukäyttöliittymä | Kuluttaja | Yhteisöllisyys, saatavuus, aidot löydöt |

**Ydinviesti näkyy:** tavara ja ihminen yhdistyvät, kierto tehostuu.

**Hinnoittelun kehystys sivulla:** reilu ja läpinäkyvä, maksetaan myyntipisteiden verran, tilitykset sisältyvät, ei piilokuluja. Ei koskaan sanaa "halvin".

---

## Tarkistuslista ennen palautusta

- [ ] Vain beige #FAF1E0 ja ruskea #3C2415 plus näiden opasiteetit
- [ ] Statusvärit vain tuotteen UI:ssa, ei markkinointisivulla
- [ ] Fontti Helvetica Now tai Helvetica Neue -fallback, weight max 600
- [ ] Sektioiden padding vähintään 96px
- [ ] Napit pillejä, sekundääri on tekstilinkki nuolella
- [ ] Ei box-shadowia tai max `0 4px 24px rgba(60,36,21,.06)`
- [ ] Max yksi tumma sektio sivulla
- [ ] Connector esiintyy korkeintaan kahdesti
- [ ] Scroll reveal käytössä, ei muuta animaatiota
- [ ] prefers-reduced-motion huomioitu
- [ ] Teksteissä ei ajatusviivoja, ei kirosanoja, ei kilpailijan nimeä
- [ ] Äänensävy isosiskomainen, ei tyrkky eikä luennoiva
- [ ] Oikea yleisö tunnistettu (omistaja / myyjä / kuluttaja)

## Anti-patternit

Ei gradientteja · Ei neumorphismia · Ei värikkäitä varjoja · Ei Bootstrap-nappeja
Ei karuselleja · Ei paksuja bordereita · Ei Poppinsia, Montserratia tai Comic-tyyppisiä
Ei emojeita UI:ssa · Ei ikoniclutteria · Ei kilpailijavertailuja sivulla
