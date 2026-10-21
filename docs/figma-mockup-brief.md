# ReSella × Figma — mockup-brief

Tämä on koottu paketti, jolla voit tuottaa Figmassa ReSellan **järjestelmän mockupit**
samaan tyyliin kuin v2-landing (ui-bahnexpress-fi + ReSellan värit). Aja tämä
ReSellan prompt-projektin läpi (se täydentää ominaisuuslistaa), liitä lopuksi
Figma-työkaluun, ja palauta minulle Figma-linkki + framejen koot, niin nappaan sieltä
tarvittavat näkymät sivulle.

---

## 1. Tyyli — jotta mockupit täsmäävät v2:een

**Värit (ReSella)**
- Pohja beige `#FAECDE`, kerma `#FFFBF4`
- Muste / otsikot ruskea `#3C2415` (hover `#4E3220`)
- Terrakotta (signaali / korostus) `#C0693A`
- Savusininen `#6C888D`, sage `#BAB58D`
- Teksti ruskealla pohjalla: beige `#FAECDE`

**Teema per osio / per näkymä:** jokainen alue on yksi täysleveä väriteema
(beige → kerma → ruskea → terrakotta → savusininen). Kaksi samaa ei peräkkäin.

**Typografia:** otsikot Archivo (wdth 125 %, paino 900, VERSAALIT, line-height =
fonttikoko), leipä Figtree 300. Ei eyebrow-pikkutekstiä otsikoiden yllä. Ei ajatusviivoja.

**Muodot & syvyys:** napit/tagit/sliderit = täysi pilleri (999 px). Kortit, kentät,
media, laitekehykset = 20–24 px pyöristys. **Ei varjoja** — syvyys tulee sävyaskelista,
2 px raoista ja renkaista. Muotokuvat pyöristettyjä neliöitä, ei ympyröitä.

**Laitekehys (device bezel):** 8 px paksu kehys vaimealla sävyllä, screenshot sisällä
radius 16 (landscape) / 24 (mobiili).

**Liike (jos prototypoit):** toiminnallista, 0,14–0,46 s. Liukuva valintapilleri,
rullaavat luvut, haitarin korkeus. Ei scroll-revealeja, ei koristeliikettä.

---

## 2. Rakenne jota toistetaan — "tältä se näyttää" -osio

Tämä on se feature-showcase-lohko, jolla ominaisuudet esitellään. Toista se jokaiselle
ominaisuusalueelle, teema vaihtuu joka kerta:

```
[ pilleritagi: ominaisuuden nimi ]
          VERSAALI OTSIKKO (2–4 sanaa)
   lyhyt alaotsikko (yksi rivi, Figtree 300)

┌───────────────────────────────┬──────────────────────────┐
│  LAITE-SCREENSHOT              │  3 feature-tiileä:        │
│  (tabletti tai puhelin,        │   • ikoni + 1 rivi        │
│   8 px bezel, radius 16/24)    │   • ikoni + 1 rivi        │
│                                │   • ikoni + 1 rivi        │
│                                │  proof-luku (stat, iso)   │
└───────────────────────────────┴──────────────────────────┘
```

Vaihtoehto täysleveälle riville: **use-case-rail** — kavennetut kortit vierekkäin,
klikkaus laajentaa kortin täysleveäksi (screenshot ylhäällä, teksti + feature-tiilet
vasemmalla, sitaatti oikealla).

---

## 3. Ominaisuudet jotka visualisoidaan

### 3a. Tuote / tekniset ominaisuudet
- **Kassa** — myynti, viivakoodin luku, kortti- / käteis- / mobiilimaksu, kuitti; tapahtuma kirjautuu oikealle myyjälle
- **Tuotteiden hallinta** — tuotekortit, hinnoittelu, alennukset yhdellä klikkauksella
- **Varaukset & paikat** — myymäläkartta, paikan varaus, saatavuus, kalenteri
- **Tilitykset** — myyjäkohtaiset tilitykset automaattisesti jakson päätteeksi, käteisvirta reaaliajassa, ei Exceliä
- **Myyjänäkymä (dashboard)** — "Hei Anna", myynti €, myydyt kpl, myynnissä kpl, jakson edistyminen, kampanjat (esim. "Aseta 50 % alennus")
- **Näkyvyys** — julkinen katalogi, suora linkki + QR-koodi ostajille, uudet asiakkaat paikalle
- **Asiakashallinta** — asiakasrekisteri, ostohistoria, vakioasiakkaiden tunnistus, viestintä
- **Raportointi** — käyttöaste, myynnin kehitys, kirjanpito ajan tasalla
- **Monilaitetuki** — sama näkymä tabletilla ja mobiilissa

### 3b. Liiketoiminta / arvo-ominaisuudet (tärkeitä visualisoida, eivät teknisiä)
- **Liikevaihtopohjainen hinnoittelu** — hintalaskuri, joka joustaa myynnin mukaan (1,25 % → 0,25 %)
- **Nopea käyttöönotto** — 1–3 päivää
- **Ei piilokuluja** — käyttöönotto ja tilitykset sisältyvät hintaan
- **Kasvaa mukana** — sama järjestelmä kyläkirppikselle ja suurelle hallille
- **Kestävä kierto & yhteisö** — jokainen tuote löytää omistajan; "vähän kuin Vinted, mutta oikeassa elämässä"
- **Uudet ostajat** — fyysinen kirppis saa digitaalisen näkyvyyden
- **Vakioasiakkaat** — tunnista ja pidä asiakkaat palaamassa

### 3c. "Kaikki samassa"
Yksi järjestelmä: kassa + varaukset + tilitykset + näkyvyys + asiakkaat samassa
näkymässä, ei erillisiä työkaluja tai Excel-taulukoita. Visualisoi tämä koontinäkymänä,
jossa osat näkyvät rinnakkain.

---

## 4. Näkymät / mockupit (framet + ehdotetut koot)

> Korvaa koot omillasi kun annat ne — nämä ovat oletukset.

| # | Näkymä | Frame (oletus) |
|---|--------|----------------|
| 1 | Myyjän dashboard (päänäkymä) | Desktop 1440×1024 + Tablet 834×1194 |
| 2 | Kassanäkymä (myynti + viivakoodi + maksu) | Tablet 834×1194 |
| 3 | Varaukset / myymäläkartta | Desktop 1440×1024 |
| 4 | Tilitykset / raportit | Desktop 1440×1024 |
| 5 | Ostajan julkinen katalogi (linkki + QR) | Mobiili 390×844 |
| 6 | Hinnoittelu / hintalaskuri | Desktop 1440×1024 |
| 7 | Asiakashallinta | Desktop 1440×1024 |

Jokaisesta: kehys (bezel) + sisältö ReSellan väreillä, komponentit pillereinä ja
24 px korteilla, ei varjoja.

---

## 5. Valmis Figma-generointiprompti (copy-paste)

```
Luo ReSella-järjestelmän UI-mockupit seuraavaan tyyliin. Älä käytä varjoja,
gradientteja napeissa, tai ympyräavatareja. Käytä täysleveitä väriteemoja, yksi
teema per näkymä, vuorotellen.

VÄRIT: pohja beige #FAECDE, kerma #FFFBF4, muste/otsikot ruskea #3C2415,
terrakotta-korostus #C0693A, savusininen #6C888D, sage #BAB58D.
FONTIT: otsikot Archivo 125 % leveys, paino 900, VERSAALIT; leipä Figtree 300.
MUODOT: napit/tagit/sliderit = pilleri 999 px; kortit/kentät/media = 20–24 px;
laitekehys 8 px bezel, screenshot radius 16/24. Syvyys = sävyaskel + 2 px raot.

Tee näkymät: (1) myyjän dashboard "Hei Anna" tilastotiilillä (€625 / 22 kpl / 48 kpl),
jakson edistymispalkki ja kampanjakortti; (2) kassanäkymä viivakoodilla ja maksulla;
(3) varaukset ja myymäläkartta; (4) tilitykset ja raportit; (5) ostajan julkinen
katalogi QR-koodilla (mobiili); (6) hinnoittelulaskuri, joka laskee kuukausihinnan
kassamyynnin mukaan; (7) asiakashallinta.

Esittele jokainen ominaisuus feature-showcase-lohkona: pilleritagi + versaali otsikko
(2–4 sanaa) + yhden rivin alaotsikko + laite-screenshot + 3 feature-tiiltä + yksi
iso proof-luku. Ei eyebrow-pikkutekstiä, ei ajatusviivoja.
```

---

## 6. Miten käytät

1. Aja tämä brief **ReSellan prompt-projektin** läpi — anna sen täydentää ominaisuus-
   ja arvolista (3a–3c) ja tarkentaa tekstit.
2. Liitä kohdan 5 prompti (projektin täydennyksillä) Figma-työkaluun.
3. Anna minulle **Figma-linkki + framejen koot**, niin haen sieltä näkymät ja
   sovitan ne sivulle (v2) oikeilla mitoilla.
