# ReSella — sisältöprompti (informatiivinen paketti)

Tämä on ajettavaksi tarkoitettu prompti/runko. Aja se **ReSellan projektin** läpi, niin
se kerää jokaiseen osioon tekstit ja faktat. Sen pohjalta rakennan sivun osat (mieluummin
hieman liikaa kuin liian vähän — karsit parhaat). Kohderyhmä: **kirpputorien omistajat**.

## Fiilis & reunaehdot (pidä nämä joka osiossa)
- Informatiivinen, houkutteleva, laadukas, leikkisä. Leikkisyys tulee **väreistä**, ei tekstistä.
- **Ei ylimääräisiä pikkutekstejä** (ei eyebrow-captioneita otsikoiden yllä). Ei ajatusviivoja.
- **Älä käytä montaa väriä teksteissä** — teksti pääosin ruskea / beige, yksi väri per osio.
- Käytä **beigeä ja ruskeaa** tuomaan stabiiliutta värikkäiden osioiden väliin.
- Tyyli: Applen muotoilun selkeys, mutta **meidän UI:lla** (Archivo-versaalit, Figtree-leipä,
  pilleri + 24 px kortit, ei varjoja). Yksinkertaisia mutta laadukkaita infografiikoita.
- Liike scrollatessa hienovaraista ja "yhtenäistä pakettia", ei ylimääräistä pomppua.

## Osiot — informatiivinen paketti (ehdokaslista, karsitaan)

| # | Osio | Infografiikka-idea | Mitä ReSella-projektin tulee tuoda | Tila |
|---|------|--------------------|-------------------------------------|------|
| 1 | Hero | Video + iso otsikko joka avautuu scrollatessa | Slogan, 1 alalause | ✅ |
| 2 | Ongelma / nykytila | Lyhyt lista arjen kipupisteistä | 3–5 kipupistettä kirppisomistajan arjesta | ⬜ ehdotus |
| 3 | Vertaus nykyisiin järjestelmiin | 2 saraketta: ilman / kanssa, ✓/✕ | Mitä ennen tehtiin käsin vs. ReSella | ✅ |
| 4 | Kaikki samassa | Koontigrafiikka: osat yhdessä näkymässä | Mitkä osat (kassa, varaukset, tilitykset, näkyvyys, asiakkaat) | osin ✅ |
| 5 | Ominaisuudet | Kortti per ominaisuus (tagi + otsikko + 1 lause) | Kassa, näkyvyys, varaukset, tilitykset, asiakashallinta, raportointi | ✅ |
| 6 | Järjestelmän teaseri | Laitekehys + myyjänäkymä (dashboard), kassanäkymä | Dashboardin luvut ja osat, kassan vaiheet | osin ✅ |
| 7 | Kuluttaja-appin teaseri | Puhelinmockup: katalogi + QR | Appin ydinhyödyt ostajalle, mitä näkyy | ✅ |
| 8 | Miten se toimii / kierto | Numeroitu aikajana | Kierron 3 vaihetta ja hyöty kaikille | ✅ |
| 9 | Käyttöönotto | 4 steppiä, "1–3 päivässä" | Käyttöönoton vaiheet ja kesto | ✅ |
| 10 | Hyödyt / arvolupaukset | 3–4 isoa lukua (stat) | Mitattavat hyödyt: aikasäästö, lisämyynti, uudet asiakkaat | ⬜ ehdotus |
| 11 | Hinnoittelu | Liikevaihtopohjainen laskuri + "mihin perustuu" | Hintalaskurin logiikka (valmis), lisätiedot | ✅ |
| 12 | Luotettavuus & tuki | Ikonirivi: käyttöönotto, tuki, tietoturva | Tuen lupaus, tietoturva, sopimusehdot | ⬜ ehdotus |
| 13 | Tarina / tiimi / arvot | Leipäteksti + kuvat | Tiimin tausta, arvot (kierto, yhteisö) | ✅ |
| 14 | FAQ | Haitari (details) | 5–6 yleisintä kysymystä + vastaus | ⬜ ehdotus |
| 15 | Asiakastarinat | Sitaatti + muotokuva (tulevaisuus) | 2–3 pilottitarinaa kun saatavilla | ⬜ myöhemmin |
| 16 | CTA / yhteys | Lomake + CTA-bändi | Yhteydenoton teksti | ✅ |

> ✅ = rakennettu v2:een · ⬜ ehdotus = voin rakentaa seuraavaksi · ⬜ myöhemmin = odottaa sisältöä.

## Ajettava prompti (liitä ReSellan projektiin)

```
Olet ReSellan sisällöntuottaja. Tuota kirpputorien omistajille suunnatun landing-sivun
informatiivinen sisältöpaketti. Sävy: selkeä, laadukas, houkutteleva, hieman leikkisä.
Ei markkinointikliseitä, ei ylimääräisiä pikkutekstejä, ei ajatusviivoja.

Tuota jokaiseen osioon: (a) lyhyt versaaliotsikko 2–4 sanaa, (b) yksi alalause,
(c) osion ydinsisältö luetteloina/lukuina. Osiot:

1. Ongelma / nykytila: 3–5 konkreettista kipupistettä kirppisomistajan arjesta.
2. Vertaus: mitä ennen tehtiin käsin (Excel, vihko, erilliset työkalut) vs. ReSella.
3. Ominaisuudet: kassa, näkyvyys, varaukset, tilitykset, asiakashallinta, raportointi
   — kustakin yksi hyötylause.
4. Järjestelmän teaseri: myyjänäkymän (dashboard) luvut ja osat; kassanäkymän vaiheet.
5. Kuluttaja-appi: 3 ydinhyötyä ostajalle (selaa, QR, varaa ennen käyntiä).
6. Käyttöönotto: 4 vaihetta ja kokonaiskesto (1–3 päivää).
7. Hyödyt lukuina: 3–4 mitattavaa arvolupausta (aikasäästö, lisämyynti, uudet ostajat).
8. Luotettavuus & tuki: tuen lupaus, tietoturva, ei piilokuluja.
9. FAQ: 5–6 yleisintä kysymystä vastauksineen.

Anna teksti suomeksi, tiiviisti. Vältä montaa väriä kuvaavaa kieltä; sisältö on neutraalia,
väri tulee designista.
```

## Jatko: ReSellan UI-skillin runko (tehdään kun sivu on valmis)

Tavoite: sama UI käytettävissä pitch deckeissä, apissa ja somessa. Rakennan sivun
valmistuttua skillin tähän muotoon (sama rakenne kuin ui-bahnexpress-fi):

- `tokens.css` — ReSellan värit, Archivo/Figtree, pilleri + 24 px muodot, ei varjoja, grain kevyt
- `references/` — design-dna, väri, typografia, layout, komponentit, motion, osiot
- `components/` — napit, kortit, pillerit, laskuri, laitekehys (tabletti/puhelin), aikajana, vertailu
- `references/build-prompt.md` — valmis englanninkielinen rakennusprompti (deck / app / landing)

Näin saadaan runko, jolla jatkossa tehdään nopeasti brändinmukaista materiaalia.
