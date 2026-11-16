# Luovutus: nettisivun logiikka (Leonille)

Päivitetty 16.11.2026. Laatija Sofia.

Tämä kuvaa, mitä sivulla pitää toimia ja mitä käyttäjä näkee. Toteutustapa (palvelin, työkalut, kirjastot) on sinun päätöksesi. Sivun ulkoasu ja tekstit pysyvät ennallaan. Jos jokin vaatii muutoksen ulkoasuun, kysy Sofialta ensin.

## 0. Tiedostot

| Tiedosto | Mitä se on |
|---|---|
| `resella.html` | Etusivu. Tietokone- ja mobiiliversio ovat samassa tiedostossa. Mobiiliosiot alkavat `m-` (esim. `#m-odotuslista`) ja näkyvät alle 900 px leveydellä |
| `odotuslista.html` | Odotuslistan lomakesivu |
| `varaa.html` | Demon varaussivu (kalenteri ja lomake) |
| `avoimet-ajat.js` | Demon avoimet ajat, joita Sofia muokkaa käsin |
| `tietosuoja.html` | Tietosuojaseloste (15.11.2026) |
| `uutiskirje.html` | Vanha osoite, ohjaa odotuslistaan |
| `tekstit.js` + `tekstit-editori.html` | Sofian tekstieditori. Tallentaa tekstimuutokset GitHubiin |
| `jarjestys.js` + `editori.html` | Sofian osioiden järjestyseditori |

Sivu on nyt GitHub Pagesissa: https://sofiakrap-lgtm.github.io/resello/resella.html

Vanhat sivut (`resello.html`, `resello-v2.html`, `resello-v3.html`, `resella-kopio.html`) ovat yhä julkisia, mutta niihin ei linkitetä. Niissä on vanha nimi ja vanhaa sisältöä. Ne voi poistaa.

## 1. Mihin tarvitaan logiikkaa

| # | Toiminto | Tietokone: missä | Mobiili: missä | Nyt | Tarvitaan |
|---|---|---|---|---|---|
| A | **Odotuslista** | Osio "Odotuslista on auki" (`#odotuslista`), nappi "Liity odotuslistalle". Footerin linkki "Liity odotuslistalle" | Osio `#m-odotuslista`, nappi. Footerin sähköpostikenttä (`form.m-news`), joka vie osoitteen sivulle `odotuslista.html?email=` | Lomake avaa käyttäjän sähköpostiohjelman (mailto) | Tallennus, vahvistusviestit |
| B | **Varaa demo** | Herossa "Varaa demo", valikossa, hinnoittelukortissa ja loppuosiossa (`#varaa`). Kaikki vievät sivulle `varaa.html` | Hero, "Sopiiko kirppiksellesi?", käyttöönoton vaihe 1, loppuosio `#m-varaa` ja valikko | Kalenteri näyttää ajat tiedostosta `avoimet-ajat.js`. Lähetys avaa sähköpostiohjelman (mailto). Varatut ajat eivät poistu kalenterista | Tallennus, ajan lukitus, kalenteri, vahvistusviestit, videopuhelulinkki |
| C | **Hintalaskuri** | Hinnoittelu (`#hinnoittelu`), kenttä `#revInput`, tulos `#priceVal` ja `#priceSales` | Hinnoittelu (`#m-hinnoittelu`), kenttä `#mSales`, tulos `#mFee` ja `#mNote` | Toimii selaimessa. Sama kaava on koodissa kahdessa paikassa (funktiot `fee` ja `feeOf`) | Ei palvelinta. Kaava yhteen paikkaan |
| D | **Sähköpostilinkit** (hei@resella.fi) | Tukikortti "Sähköposti" (`#tarinat`, "Lue lisää") | UKK "Ota yhteyttä", loppuosion yhteystiedot. Siirtymäosion nappi "Kysy siirtymästä demossa" on mobiilissa mailto, tietokoneella se vie osioon `#varaa` | mailto | Varmista, että osoite hei@resella.fi ottaa postia vastaan. Ehdotus: mobiilin siirtymänappi myös sivulle `varaa.html` |
| E | **Evästeilmoitus** | Vasen alakulma | Alareuna | Tallentaa sulkemisen selaimeen (localStorage) | Ei mitään, ellei sivulle lisätä analytiikkaa (ks. osio 3) |
| F | **Kielivalinta FI / EN** | Footerissa pelkkä teksti, ei toimi | Valikossa FI/EN-napit | Kesken | Päätös: tehdäänkö englanninkielinen versio vai poistetaanko valinta |
| G | **Ehdot** | Footerissa pelkkä teksti, ei linkkiä | Sama | Sivua ei ole | Sofia ja Miro kirjoittavat ehdot, sen jälkeen linkki |
| H | **Puhelintuki** | Tukikortti "Puhelintuki" kehottaa soittamaan | Tukikortit | Sivulla ei ole puhelinnumeroa | Päätös numerosta |
| I | **Editorit** | `editori.html`, `tekstit-editori.html` | | Tallentavat GitHubiin Sofian omalla avaimella (selaimen localStorage). Sivu lukee tiedostot `tekstit.js` ja `jarjestys.js` | Jos hosting tai rakenne muuttuu, editorien pitää toimia edelleen tai tilalle tarvitaan vastaava |

## 2. Lomakkeet tarkemmin

### A. Odotuslista (`odotuslista.html`)

**Linjaus (GTM-kartta ja päätös 15.11.2026):** lista avataan nyt, ei keväällä. Sen tehtävä on valita ensimmäinen launch-alue postinumeroiden perusteella. Tavoite on noin 1 000 nimeä launch-alueelta. Omistajat ohjataan demoon, myyjät myöhemmin lähettiläiksi. Avautumispäivää tai etuja ei luvata.

**Kentät**

| Kenttä | name | Pakollinen | Tarkistus |
|---|---|---|---|
| Sähköposti | `email` | Kyllä | Kelvollinen sähköposti. Esitäyttö URL:n `?email=` arvosta |
| Postinumero | `postinumero` | Kyllä | Tasan 5 numeroa |
| Olen | `rooli` (piilokenttä, avattava lista) | Kyllä | Löytäjä / Myyjä / Kirppiksen omistaja |
| Mitä etsit useimmiten? | `kategoria` | Ei | Vaatteet / Lastentavarat / Sisustus / Keräilyesineet / Muu |
| Suostumus | `lupa` | Kyllä | Ruksi, ei valmiiksi valittuna. Teksti: "Saan sähköpostia, kun Resella avautuu alueellani." |
| Lähde | `utm_source`, `utm_medium`, `utm_campaign` | Piilossa | URL:sta tai sessionStoragesta (`rs_utm_*`). Etusivu tallentaa ne, kun kävijä tulee esim. Instagram-linkistä |

Tallenna myös aikaleima.

**Mitä käyttäjä näkee lähetyksen jälkeen**
- Kaikki: "Kiitos, olet listalla." ja "Kerro kirppisystävällesi, sillä alue aukeaa sitä nopeammin, mitä useampi naapurisi on mukana."
- Kirppiksen omistaja lisäksi: "Haluatko Resellan kassan kirppiksellesi jo nyt?" ja nappi "Varaa 1 h demo" (`varaa.html`).
- Jos tuplavahvistus on käytössä, kiitosteksti kertoo myös: "Vahvista vielä osoitteesi sähköpostiin tulleesta linkistä."
- Virheet näkyvät kentän kohdalla suomeksi. Lomake ei tyhjene virheen takia.

**Mihin tieto menee:** MailerLiteen (Sofia avaa tilin). Kentät postinumero, rooli, kategoria ja utm-lähde omiksi kentikseen. Ryhmät roolin mukaan. Postinumerosta pitää saada raportti tai vienti alueittain.

**Viestit**

| Viesti | Kenelle | Milloin | Teksti |
|---|---|---|---|
| Vahvistus (double opt-in) | Liittyjä | Heti | Sofia kirjoittaa |
| Tervetuloa | Liittyjä | Vahvistuksen jälkeen | Sofia kirjoittaa. Omistajille demolinkki |
| Ilmoitus uudesta omistajasta | hei@resella.fi | Kun rooli on Kirppiksen omistaja | Sähköposti, postinumero, aika, lähde |
| Alue aukeaa | Alueen liittyjät | Launchissa | Myöhemmin |

### B. Varaa demo (`varaa.html`)

**Linjaus:** demo kestää 1 h ja pidetään vain etänä videopuhelussa (päätös 11.11.2026). Asennus tehdään paikan päällä vasta, kun kirppis ottaa Resellan käyttöön.

**Kentät**

| Kenttä | name | Pakollinen |
|---|---|---|
| Päivä ja aika | kalenteri | Kyllä. Vain vapaat ajat |
| Nimi | `nimi` | Kyllä |
| Sähköposti | `email` | Kyllä |
| Kirppis ja paikkakunta | `kirppis` | Kyllä |

**Avoimet ajat:** viikkopohja, aikaisin ja myöhäisin varattava päivä sekä poikkeuspäivät ovat tiedostossa `avoimet-ajat.js`. Lisäksi pitää poistaa jo varatut ajat ja Sofian ja Leonin kalentereiden varatut hetket. Samaa aikaa ei saa voida varata kahdesti.

**Mitä käyttäjä näkee lähetyksen jälkeen:** "Varaus vahvistettu: {viikonpäivä} {pv.kk.} klo {aika}. Lähetimme vahvistuksen ja videopuhelun linkin sähköpostiisi." Jos aika ehdittiin varata välissä: "Tämä aika ehdittiin juuri varata. Valitse toinen aika." ja kalenteri päivittyy.

**Mihin tieto menee:** Resellan kalenteriin tapahtumaksi (osallistujina Sofia ja Leon). Lisäksi liidilistaan (CRM tai taulukko): nimi, sähköposti, kirppis, aika ja lähde.

**Viestit**

| Viesti | Kenelle | Milloin |
|---|---|---|
| Vahvistus: aika, kesto 1 h, videopuhelulinkki, kalenterikutsu, peruutus tai ajan vaihto | Varaaja | Heti |
| Ilmoitus uudesta varauksesta | Sofia ja Leon | Heti |
| Muistutus | Varaaja | Edellisenä päivänä (toivottava, ei pakollinen) |

### C. Hintalaskuri

Laskuri ei lähetä tietoja mihinkään. Kaava on päätetty 12.11.2026:

| Kuukausimyynti | Prosentti tältä osalta |
|---|---|
| 0-2 500 € | 1,75 % |
| 2 500-5 000 € | 1,5 % |
| 5 000-25 000 € | 1,0 % |
| yli 25 000 € | 0,75 % |

Porrastus on marginaalinen eli toimii kuin verotus. Maksu on vähintään 49 € ja enintään 299 € kuukaudessa. Euromäärä näkyy isona ja prosentti pienenä sen alla. Kun raja tulee vastaan, laskuri näyttää tekstin "Vähimmäismaksu" tai "Enimmäismaksu".

**Tarkistusluvut (vuosimyynti, maksu kuukaudessa):** 30 000 € = 49 €, 60 000 € = 81 €, 100 000 € = 115 €, 200 000 € = 198 €, 300 000 € = 281 €, 328 000 € tai enemmän = 299 €.

## 3. Yksityisyys

| Mistä | Tiedot | Peruste | Ruksi? | Säilytys |
|---|---|---|---|---|
| Odotuslista | Sähköposti, postinumero, rooli, kategoria, lähde | Suostumus | Kyllä, pakollinen ja tyhjä oletuksena (on jo lomakkeessa) | Kunnes käyttäjä peruu, tai alue on avattu ja siitä on kerrottu |
| Varaa demo | Nimi, sähköposti, kirppis, aika | Oikeutettu etu | Ei tarvita. Linkki tietosuojaselosteeseen lomakkeen alla (on jo) | Enintään 2 vuotta |
| Evästeilmoitus | Tieto sulkemisesta selaimessa | Välttämätön | Ei | Selaimessa |

- **Tietosuojaseloste on olemassa** (`tietosuoja.html`). Tarkista, että käsittelijät vastaavat toteutusta: hosting, MailerLite, kalenteri- ja videopalvelu. Jos jokin muuttuu, kerro Sofialle, niin seloste päivitetään. Miro tarkistaa selosteen.
- **Analytiikka tai mainospikselit** (esim. Meta Pixel) vaativat suostumuksen ennen latausta. Silloin evästeilmoitukseen tarvitaan hyväksy- ja hylkää-valinnat, ja seloste päivitetään. Nyt sivulla ei ole seurantaa.
- **Google Fonts** ladataan Googlelta, jolloin kävijän IP-osoite siirtyy Googlelle. Fonttien hostaaminen itse poistaisi siirron.
- Älä kerää mitään muuta kuin yllä olevat kentät.

## 4. Hyväksymiskriteerit

**Odotuslista**
- [ ] Lomake tallentaa sähköpostin, postinumeron, roolin, kategorian, utm-lähteen ja aikaleiman
- [ ] Postinumero hyväksytään vain viisinumeroisena
- [ ] Lähetys ei onnistu ilman sähköpostia, postinumeroa, roolia ja ruksia
- [ ] Käyttäjä näkee kiitostekstin, ja kirppiksen omistaja lisäksi demonapin
- [ ] Vahvistusviesti lähtee, ja vasta vahvistettu osoite on listalla
- [ ] Sama osoite ei synny listalle kahdesti
- [ ] Sofia saa ilmoituksen uudesta kirppiksen omistajasta
- [ ] Postinumeroista saa alueittaisen yhteenvedon
- [ ] Footerin sähköpostikenttä (mobiili) esitäyttää osoitteen lomakkeelle
- [ ] Toimii tietokoneella ja puhelimessa, ei avaa sähköpostiohjelmaa

**Varaa demo**
- [ ] Kalenteri näyttää vain vapaat ajat (avoimet ajat miinus varatut)
- [ ] Samaa aikaa ei voi varata kahdesti
- [ ] Varaus näkyy Resellan kalenterissa Sofialla ja Leonilla
- [ ] Varaaja saa vahvistuksen, jossa on aika, videopuhelulinkki ja kalenterikutsu
- [ ] Varaaja voi perua tai vaihtaa ajan
- [ ] Sofia ja Leon saavat ilmoituksen
- [ ] Kaikki sivun "Varaa demo" -napit vievät samaan varaukseen (tietokone ja mobiili)
- [ ] Toimii tietokoneella ja puhelimessa, ei avaa sähköpostiohjelmaa

**Hintalaskuri**
- [ ] Molemmat laskurit käyttävät samaa kaavaa yhdestä paikasta
- [ ] Tarkistusluvut täsmäävät
- [ ] Vähimmäis- ja enimmäismaksu näkyvät oikein

**Yleiset**
- [ ] Tietosuojaseloste vastaa toteutusta
- [ ] Mitään tietoa ei kerätä ilman, että se mainitaan selosteessa
- [ ] Sofian editorit (tekstit ja järjestys) toimivat edelleen
- [ ] Ulkoasu ja tekstit eivät muutu ilman Sofian hyväksyntää
- [ ] Kaikki toimii myös hitaalla mobiiliyhteydellä

## 5. Koodi ja pääsy

- **Repo:** https://github.com/sofiakrap-lgtm/resello
- **Branch:** `claude/frontend-stack-setup-anh5xj` (repon oletusbranch)
- Repo on julkinen, joten koodin voi ladata heti:
  - `git clone https://github.com/sofiakrap-lgtm/resello.git`
  - tai ZIP: https://github.com/sofiakrap-lgtm/resello/archive/refs/heads/claude/frontend-stack-setup-anh5xj.zip
- **Kirjoitusoikeus:** Sofia lisää Leonin GitHub-tunnuksen kohtaan Settings → Collaborators → Add people. Leon hyväksyy kutsun sähköpostista.
- **Työtapa:**
  - Tee oma branch (esim. `leon/logiikka`) ja pull request, jonka Sofia hyväksyy.
  - Julkinen sivu päivittyy suoraan oletusbranchista, ja Sofian editorit sekä Claude tallentavat sinne. Jos teet töitä suoraan siinä, muutokset näkyvät heti ja menevät ristiin.
- **Salaisuudet:** älä laita avaimia tai salasanoja repoon, koska repo on julkinen.
