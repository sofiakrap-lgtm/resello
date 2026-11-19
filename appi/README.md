# Resellan kuluttaja-appin demo

Linkki: https://sofiakrap-lgtm.github.io/resello/appi/

Klikattava demo ostajalle (haku, varaus, kotiinkuljetus) ja myyjälle (myyntipaikan varaus, myyntini, tilitykset). Ei taustajärjestelmää eikä analytiikkaa. Suosikit, ostoskori, varaukset ja tilaukset säilyvät vain katsojan omassa selaimessa. Nollaus: profiili (henkilökuvake), "Aloita demo alusta".

## Tiedostot

| Tiedosto | Sisältö |
|---|---|
| `tuotteet.js` | Kirppikset ja tuotteet. **Muokkaa tätä.** |
| `kuvat/` | Tuotekuvat (`RS-001.webp` jne.) ja inspiraatiokuvat |
| `index.html` | Ulkoasu |
| `app.js` | Toiminnot |
| `ikonit.js` | Ikonit |

## Tuotteen muokkaus

Avaa `tuotteet.js` GitHubissa (kynäkuvake) ja muuta rivin tietoja:

```js
{"id": "RS-080", "nimi": "Käsinneulottu raitaneule", "kategoria": "Yläosat", "tyyppi": "Neule",
 "koko": "M", "kokotyyppi": "Unisex", "vari": "Monivärinen", "kunto": "Hyvä",
 "kunnonKuvaus": "Kevyttä nyppyyntymistä, ei reikiä", "hinta": 45.0,
 "kirppis": "Kirppis Keskusta", "poyta": 22, "kuva": "kuvat/RS-080.webp",
 "ikoni": "tumma"}
```

- **hinta:** piste desimaalina (45.0). Demo näyttää "45,00 EUR".
- **kokotyyppi:** Naisten, Miesten, Unisex, Lasten tai Ei kokoa. Ohjaa välilehtiä Naiset ja Miehet.
- **kunto:** Erinomainen, Hyvä, Kohtalainen tai Kulunut.
- **kirppis:** täsmälleen sama nimi kuin `KIRPPIKSET`-listassa.
- **poyta:** näkyy vasta varauksen jälkeen.
- **ikoni:** ostoskori- ja sydänikonin väri kuvan päällä (molemmat samaa väriä). `tumma` vaalealle kuvalle, `vaalea` tummalle.

**Uusi tuote:** kopioi rivi, vaihda id ja tiedot, lisää kuva kansioon `kuvat/` (pystykuva 4:5, noin 720 x 900 px, webp tai jpg).
**Poista tuote:** poista koko rivi. Muista pilkut rivien välissä.

Muutos näkyy linkissä noin minuutin kuluttua tallennuksesta.

## Myyjän demo

- Demokäyttäjä Anna myy pöydällä 22 (Kirppis Keskusta). Hänen tuotteensa ovat kaikki tuotteet, joilla on `"kirppis": "Kirppis Keskusta"` ja `"poyta": 22`.
- Myyntipaikan hinta 25 EUR / vk on esimerkki (`MP_HINTA` tiedostossa app.js).

## Oletukset

- Varaus: tuote odottaa 48 h ja maksetaan noudettaessa. Varaus raukeaa automaattisesti 48 h jälkeen. Leon vahvistaa.
- Pöytäpaikka näkyy vasta, kun varaus on tehty.
- Kotiinkuljetus: jokainen kirppis lähettää oman pakettinsa, joten toimitusmaksu lasketaan kirppiskohtaisesti.
- Ostettu tuote poistuu valikoimasta. Varattua tuotetta ei voi lisätä koriin.
- Kirppisten nimet, osoitteet, toimitushinnat ja asiakas ovat keksittyjä esimerkkejä.
- Tuotenimet ovat yleisnimiä, ei merkkejä. Logo- ja monogrammituotteet on jätetty pois.

## Päivitys 19.11.2026: Koonti-ilme
Ulkoasu päivitetty Figman Koonti-sivun (18.11.2026) mukaan.
- Uudet ikonit (`ikonit.js`): ohut viiva, pyöreät päät.
- Alavalikko: Selaa, Ostoskori, Koti, Suosikit, Myy.
- Hampurilaisvalikko (`#/profiili`) korvaa kellon ja profiilin. Pallo näyttää varaukset ja uudet ilmoitukset.
- Haku: kamera ja "Kerro omin sanoin" (`#/ideat`), kuvahaku (`#/kuvahaku`).
- Uudet näkymät: `#/ilmoitukset`, `#/hakuvahdit`, `#/viestit`, `#/kirppikset`.
- Tuote: hinta ensin, tiedot taulukkona, Samalta kirppikseltä, hakuvahti. Pöytänumero näkyy vasta varauksen jälkeen.
- Kori ryhmitelty kirppiksittäin, "Vahvista varaus" varaa kaikki.
- Myy on nyt Oma pöytä. Tuotteeni-näkymässä tilasuodattimet.
- Kulmat 4 px, tuotekuvat neliöitä.
