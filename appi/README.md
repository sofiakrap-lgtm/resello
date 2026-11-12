# Resellan kuluttaja-appin demo

Linkki: https://sofiakrap-lgtm.github.io/resello/appi/

Klikattava demo. Ei taustajärjestelmää eikä analytiikkaa. Suosikit, ostoskori, varaukset ja tilaukset säilyvät vain katsojan omassa selaimessa. Nollaus: alavalikko Myy, "Aloita demo alusta".

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

## Oletukset

- Varaus: tuote odottaa 48 h ja maksetaan noudettaessa. Varaus raukeaa automaattisesti 48 h jälkeen. Leon vahvistaa.
- Pöytäpaikka näkyy vasta, kun varaus on tehty.
- Kotiinkuljetus: jokainen kirppis lähettää oman pakettinsa, joten toimitusmaksu lasketaan kirppiskohtaisesti.
- Ostettu tuote poistuu valikoimasta. Varattua tuotetta ei voi lisätä koriin.
- Kirppisten nimet, osoitteet, toimitushinnat ja asiakas ovat keksittyjä esimerkkejä.
- Tuotenimet ovat yleisnimiä, ei merkkejä. Logo- ja monogrammituotteet on jätetty pois.
