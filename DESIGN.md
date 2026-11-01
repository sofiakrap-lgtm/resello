# DESIGN.md: ReSella + Giveasy

Tämä on sivun ainoa tyylilähde. Jos tämä ja resella-ui tai ui-giveasy-ru ovat ristiriidassa, tämä voittaa.

## Säännöt Claude Codelle
- Käytä vain tämän tiedoston arvoja. Älä käytä muita design-skillejä.
- Kun tarvitset jotain, mitä tässä ei ole, kysy Sofialta äläkä keksi.
- Giveasyn tokens.css: korvaa lohko `@module 02-color` alla olevalla. Giveasyn komponentit käyttävät myös suoraan `--palette-*`-tokeneita (lime, lila, oliivi, harmaat): korvaa nekin ReSellan väreillä. Valmiiseen koodiin ei saa jäädä yhtään Giveasyn hex-arvoa.
- Case-korttien sävyt: oliivi → --olive, lila → --blue, ruskea → --ink, grafiitti → --blue-deep.
- Kopioi Giveasyn osiot ja komponentit identtisesti niiltä osin kuin tässä on valittu Giveasy. Älä paranna.

## Värit (kaikki ReSellasta)

| Rooli | Token | Hex | Giveasyssä |
|---|---|---|---|
| Sivun tausta | --bg | #ECECDC | valkoinen #ffffff |
| Tumma osio | --ink | #3E2520 | musta #000000 |
| Kortti vaalealla | --surface | #F6F6EE | harmaa #f2f2f2 |
| Kortti tummalla | tumma surface | #4B302A | #1d1d1d |
| Teksti ja otsikot | --ink | #3E2520 | musta #000000 |
| Viivat ja kenttien reunat | --line | #DCDBC6 | #e3e3e3 |
| Pääpainike vaalealla | --ink | #3E2520 | musta, hover lime |
| Pääpainike tummalla | --bg | #ECECDC | lime #e1ef4d |
| Badget ja tagit | --blue | #C5D0D3 | lime |
| Korostusmarkkeri otsikon sanan alla | --blue | #C5D0D3 | lime |
| Korostettu kortti (esim. hinta) | --blue | #C5D0D3 | kirkas lime #f4ff7b |
| Focus-rengas | --blue-deep | #3A4961 | lime 3 px |

```css
:root{
  --color-bg:#ECECDC; --color-bg-alt:#F6F6EE; --color-bg-inverse:#3E2520;
  --color-surface:#F6F6EE; --color-surface-raised:#F6F6EE; --color-surface-inverse:#4B302A;
  --color-text:#3E2520; --color-heading:#3E2520; --color-link:#3E2520;
  --color-text-muted:#6E5E56; --color-text-subtle:#6E5E56; --color-text-inverse:#ECECDC; --color-link-hover:#2A1814;
  --color-accent:#ECECDC; --color-accent-hover:#ECECDC; --color-accent-contrast:#3E2520;
  --color-btn:#3E2520; --color-btn-hover:#2A1814;
  --color-badge:#C5D0D3; --color-highlight:#C5D0D3;
  --color-border:#DCDBC6; --color-border-strong:#3E2520; --color-focus:#3A4961;
  --color-selection-bg:#C5D0D3; --color-selection-text:#3E2520;
  --color-danger:#C24029; --color-success:#3E2520; --color-overlay:rgba(62,37,32,.55);
  --gradient-1:linear-gradient(transparent 58%, #C5D0D3 58% 92%, transparent 92%);
}
/* Tumman osion sisällä */
.dark,[data-theme="dark"]{--color-bg:#3E2520; --color-surface:#4B302A; --color-border:#5E433B; --color-text:#ECECDC; --color-heading:#ECECDC; --color-text-muted:#CDBFB2;}
```
- Punainen #C24029 vain rahaan liittyvään päätoimintoon, virheeseen ja valittuun tilaan. Ei puhdasta mustaa eikä valkoista.

## Typografia
- **Fontit** (Giveasy): Inter Tight kaikkeen
- **Iso otsikko** (Giveasy): 100 px, paino 400, tiukka -2 px, normaali kirjainkoko, keskitetty
- **Otsikkoasteikko** (Giveasy): h1 50/600, h2 50/500, h3 30/500, kortin otsikko 20/600
- **Leipäteksti** (Giveasy): 16 px paino 500, rivinväli 1.3, mobiili 14 px
- **Toissijainen teksti** (Giveasy): sama väri opacityllä 0.5
- **Luvut** (Giveasy): stat 80/500, hinta 45/600
- **Pieni yläotsikko (eyebrow)** (Giveasy): 14 px uppercase otsikon yläpuolella
- Fontit: `https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700&display=swap`

## Layout ja pinnat
- **Sisällön leveys** (Giveasy): max 1200 px, kapea 960 px, reunat 50 px / mobiili 20 px
- **Välistykset** (Giveasy): 5 px perusyksikkö, osiot 100 ja 200 px, korttien väli 20 px
- **Osioiden rytmi** (Giveasy): vaalea ja tumma vuorottelevat, siirtymä isolla ympyräkaarella
- **Kulmat** (Giveasy): kortit 10, mediat 15 ja 20, napit pillereitä
- **Kortin rakenne** (Giveasy): padding 40, ikoni tai luku ylhäällä, teksti alalaidassa

## Komponentit
- **Napit** (Giveasy): pillerit 55 px, 18/600, leveys min 200 px
- **Header ja valikko** (Giveasy): kelluva tumma pilleri, kutistuu ympyräksi vieritettäessä, kääntää värin tummalla osiolla, valikko kasvaa pilleristä
- **Hero** (Yhdistelmä): Giveasyn asettelu, wordmarkin tilalla ReSellan sanamerkki logotiedostona, hahmojen tilalla maskotit
- **Lomakekentät** (Giveasy): nimiö kentän yllä, 1 px reuna, radius 10
- **FAQ / accordion** (ReSella): otsikko 20 px, plus kääntyy rastiksi
- **Karuselli** (Giveasy): kaarelle viuhkana asettuvat kortit, aktiivinen pystyssä, naapurit ±30°. Lisäys: mutta myös suorana
- **Footer** (Yhdistelmä): Giveasyn sarakkeet + ReSellan iso maskottilogo koko leveydeltä
- **Ikonit** (ReSella): ohuet viivaikonit, stroke 1.2 ja 1.4, kulmikkaat päät

## Maskotit ja liike
- **Maskottien käyttö** (Giveasy): rivi hahmoja kurkistaa kaaren reunalta, idle-loopit (keinuu, räpyttelee). Lisäys: resellan omat, mutta ne pitää käydä vielä 
- **Easing ja kestot** (Giveasy): hover 200 ms ease-in-out, header 450 ms
- **Elementtien ilmestyminen** (Giveasy): nousee 100 px alhaalta, 1 s, easeOutExpo, vain desktop

## Lukittu
- Logo aina ReSellan logotiedostona, ReSella-nimeä ei kirjoiteta tekstinä.
- Giveasyn logoja, hahmoja, tekstejä ja kuvia ei käytetä. Hahmojen tilalla ReSellan maskotit ja muodot.
- Ei varjoja, ei gradientteja (paitsi markkeri), ei lasiefektejä.
- Kuvat: lämmin filmisävy, luonnonvalo. Teksti: suomi, sinä-muoto, ei ajatusviivoja, ei emojeita.
- prefers-reduced-motion: animaatiot pois, maskotit pysäytettynä kuvana.