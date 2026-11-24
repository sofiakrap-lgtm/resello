# Luovutus: nettisivun logiikka (Leonille)

Päivitetty 16.11.2026. Laatija Sofia.

Tämä kuvaa, mitä sivulla pitää toimia ja mitä käyttäjä näkee. Toteutustapa (palvelin, työkalut, kirjastot) on sinun päätöksesi. Sivun ulkoasu ja tekstit pysyvät ennallaan. Jos jokin vaatii muutoksen ulkoasuun, kysy Sofialta ensin.

## 0. Tiedostot

| Tiedosto | Mitä se on |
|---|---|
| `resella.html` | Etusivu. Tietokone- ja mobiiliversio ovat samassa tiedostossa. Mobiiliosiot alkavat `m-` (esim. `#m-odotuslista`) ja näkyvät alle 900 px leveydellä |
| `odotuslista.html` | Odotuslistan lomakesivu |
| `varaa.html`, `book.html` | Demon varaussivu FI ja EN. Cal.comin upotettu kalenteri (cal.com/resella/demo) |
| `tietosuoja.html` | Tietosuojaseloste (16.11.2026) |
| `ehdot.html` | Nettisivun käyttöehdot |
| `en.html`, `book.html`, `waitlist.html`, `privacy.html`, `terms.html` | Englanninkieliset versiot (ks. kohta F) |
| `uutiskirje.html` | Vanha osoite, ohjaa odotuslistaan |
| `tekstit.js` + `tekstit-editori.html` | Sofian tekstieditori. Tallentaa tekstimuutokset GitHubiin |
| `jarjestys.js` + `editori.html` | Sofian osioiden järjestyseditori |

Sivu on nyt GitHub Pagesissa: https://sofiakrap-lgtm.github.io/resello/resella.html

Vanhat sivut (`resello.html`, `resello-v2.html`, `resello-v3.html`, `resella-kopio.html`) on poistettu 16.11.2026. Ne löytyvät tarvittaessa git-historiasta.

## 1. Mihin tarvitaan logiikkaa

| # | Toiminto | Tietokone: missä | Mobiili: missä | Nyt | Tarvitaan |
|---|---|---|---|---|---|
| A | **Odotuslista** | Osio "Odotuslista on auki" (`#odotuslista`), nappi "Liity odotuslistalle". Footerin linkki "Liity odotuslistalle" | Osio `#m-odotuslista`, nappi. Footerin sähköpostikenttä (`form.m-news`), joka vie osoitteen sivulle `odotuslista.html?email=` | Lomake avaa käyttäjän sähköpostiohjelman (mailto) | Tallennus, vahvistusviestit |
| B | **Varaa demo** | Herossa "Varaa demo", valikossa, hinnoittelukortissa ja loppuosiossa (`#varaa`). Kaikki vievät sivulle `varaa.html` | Hero, "Sopiiko kirppiksellesi?", käyttöönoton vaihe 1, loppuosio `#m-varaa` ja valikko | Valmis 21.11.: Cal.com (ilmainen, tili info@resella.fi, käyttäjä resella). Saatavuus ma–pe 10–16, Sofia hyväksyy pyynnöt, vahvistuksessa Google Meet. Sivu upottaa kalenterin, varalla sähköpostiohje | Ei toimenpiteitä. Tarkista vain, että upotus latautuu |
| C | **Hintalaskuri** | Hinnoittelu (`#hinnoittelu`), kenttä `#revInput`, tulos `#priceVal` ja `#priceSales` | Hinnoittelu (`#m-hinnoittelu`), kenttä `#mSales`, tulos `#mFee` ja `#mNote` | Toimii selaimessa. Sama kaava on koodissa kahdessa paikassa (funktiot `fee` ja `feeOf`) | Ei palvelinta. Kaava yhteen paikkaan |
| D | **Sähköpostilinkit** (info@resella.fi) | Tukikortti "Sähköposti" (`#tarinat`, "Lue lisää") | UKK "Ota yhteyttä", loppuosion yhteystiedot. Siirtymäosion nappi "Kysy siirtymästä demossa" on mobiilissa mailto, tietokoneella se vie osioon `#varaa` | mailto | Varmista, että osoite info@resella.fi ottaa postia vastaan. Ehdotus: mobiilin siirtymänappi myös sivulle `varaa.html` |
| E | **Evästeilmoitus** | Vasen alakulma | Alareuna | Tallentaa sulkemisen selaimeen (localStorage) | Ei mitään, ellei sivulle lisätä analytiikkaa (ks. osio 3) |
| F | **Kielivalinta FI / EN** | Footerin linkki | Valikon FI/EN-linkit ja footer | Englanninkieliset sivut ovat erillisiä tiedostoja. EN-lomakkeet lähettävät viestin englanniksi ja rivin `Language: EN`. EN-odotuslistan rooli- ja kategoria-arvot ovat englanniksi (Finder, Seller, Shop owner) | Tallennukseen kenttä kieli (FI/EN), jotta vahvistusviesti lähtee oikealla kielellä. Huom: `en.html` ei lue `tekstit.js`-tiedostoa, joten Sofian tekstieditori muuttaa vain suomenkielistä sivua |
| G | **Ehdot** | Footerin linkki `ehdot.html` | Sama | Valmis | Ei logiikkaa |
| H | **Puhelintuki** | Tukikortti "Puhelintuki" ja footer | Tukikortti ja footer | Numero 050 323 3075 (Sofia), `tel:`-linkki | Ei logiikkaa |
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
| Suosittele lähikirppistäsi | `lahikirppis` | Ei | Vapaa teksti, enintään 120 merkkiä (lisätty 24.11.2026). MailerLiteen kenttään `lahikirppis` |
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
| Ilmoitus uudesta omistajasta | info@resella.fi | Kun rooli on Kirppiksen omistaja | Sähköposti, postinumero, aika, lähde |
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

**Avoimet ajat:** hoidetaan Cal.comissa (Availability). Cal.com tarkistaa Sofian Google-kalenterin ja estää tuplavaraukset.

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
| Varaa demo | Nimi, sähköposti, kirppis, aika | Sopimusta edeltävät toimet ja oikeutettu etu | Ei tarvita. Linkki tietosuojaselosteeseen lomakkeen alla (on jo) | Enintään 2 vuotta |
| Evästeilmoitus | Tieto sulkemisesta selaimessa | Välttämätön | Ei | Selaimessa |

- **Tietosuojaseloste on olemassa** (`tietosuoja.html`). Tarkista, että käsittelijät vastaavat toteutusta: hosting, MailerLite, kalenteri- ja videopalvelu. Jos jokin muuttuu, kerro Sofialle, niin seloste päivitetään. Miro tarkistaa selosteen.
- **Analytiikka tai mainospikselit** (esim. Meta Pixel) vaativat suostumuksen ennen latausta. Silloin evästeilmoitukseen tarvitaan hyväksy- ja hylkää-valinnat, ja seloste päivitetään. Nyt sivulla ei ole seurantaa.
- **Google Fonts** ladataan Googlelta, jolloin kävijän IP-osoite siirtyy Googlelle. Fonttien hostaaminen itse poistaisi siirron.
- Älä kerää mitään muuta kuin yllä olevat kentät.

### Tarkista tietosuojaseloste ja vahvista (16.11.2026)

Tietosuojaselosteeseen on lisätty tekninen kuvaus tekoälystä ja muita lain vaatimia kohtia. Alla olevat kohdat kuvaavat järjestelmää. Vahvista, että ne pitävät paikkansa, tai kerro Sofialle oikea tieto. Seloste on jo sivulla, mutta sivua ei mainosteta ennen kuin kaikki on vahvistettu.

| # | Väite selosteessa | Laki | Vahvista |
|---|---|---|---|
| 1 | Hintaehdotus: kuva ja tuotteen tiedot (kategoria, kunto) lähetetään salatulla yhteydellä ulkopuolisen palveluntarjoajan kielimallille rajapinnan kautta | GDPR 13 art. | Mitkä tiedot lähtevät, mikä palveluntarjoaja ja malli, missä maassa käsitellään |
| 2 | Palveluntarjoaja ei käytä tietoja koulutukseen, säilyttää ne vain lyhyen ajan väärinkäytösten valvontaa varten | GDPR 5 ja 28 art. | Palveluntarjoajan API-ehdot ja säilytysaika. Tietojenkäsittelysopimus (DPA) hyväksytty |
| 3 | Tekoälylle ei lähetetä myyjien yhteystietoja, pankkitietoja tai myyntihistoriaa | GDPR 5 art. (minimointi) | Pitää paikkansa myös apurissa |
| 4 | Apuri kertoo aina olevansa tekoäly | **EU:n tekoälyasetus 50 art., voimassa 2.8.2026 alkaen** | Apurin käyttöliittymässä näkyvä maininta, esim. "Apuri on tekoäly ja voi olla väärässä" |
| 5 | Apurin keskustelut säilytetään enintään 90 päivää | GDPR 5 art. | Toteutettu tai muuta luku |
| 6 | Apuri ohjaa ihmiselle, jos ei osaa vastata | | Toteutus |
| 7 | Salatut yhteydet ja vahva tunnistautuminen | GDPR 32 art. | Ylläpidon kirjautumisessa kaksivaiheinen tunnistautuminen |
| 8 | EU/ETA:n ulkopuoliset siirrot vakiosopimuslausekkeilla | GDPR 44-46 art. | Lista palveluista, jotka käsittelevät tietoja EU:n ulkopuolella |
| 9 | Kirppis on rekisterinpitäjä myyjiensä ja ostajiensa tiedoille, Resella käsittelijä | GDPR 28 art. | Asiakassopimukseen tarvitaan tietojenkäsittelysopimus (Sofia ja Miro tekevät, sinä kerrot tekniset tiedot) |
| 10 | Tekoälyn käyttö ei ole tekoälyasetuksen suuririskistä käyttöä | Tekoälyasetus | Ei luottopäätöksiä, profilointia tai muuta liitteen III käyttöä |

**Korjattava ennen julkaisua**

- **Kampanjatunniste (`rs_utm_*` sessionStoragessa)** ei ole välttämätön tallennus. Traficomin linjan mukaan selaimen tallennustilaa käyttävät ei-välttämättömät tekniikat vaativat suostumuksen. Vaihtoehdot: välitä UTM suoraan linkin parametrina odotuslistasivulle ilman tallennusta, tai kysy suostumus.
- **Google Fonts** on kolmannen osapuolen verkkokutsu, joka välittää IP-osoitteen. Hostaa Inter Tight ja DM Sans itse, niin siirto poistuu. Sen jälkeen Sofia poistaa maininnan selosteesta.
- **Analytiikka:** jos lisäät mittauksen, evästeilmoitukseen tarvitaan "Hyväksy" ja "Hylkää" samanarvoisina ensimmäisellä tasolla, ja skriptit latautuvat vasta hyväksynnän jälkeen.
- **Odotuslistan viesteissä** pitää olla poistumislinkki (MailerLitessä oletuksena).


## 4. Hyväksymiskriteerit

**Odotuslista**
- [ ] Lomake tallentaa sähköpostin, postinumeron, roolin, kategorian, suositellun lähikirppiksen, utm-lähteen ja aikaleiman
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

**Englanninkieliset sivut**
- [ ] `waitlist.html` ja `book.html` tallentavat samaan paikkaan kuin suomenkieliset, kenttä kieli = EN
- [ ] Vahvistus- ja kiitosviestit lähtevät englanniksi, kun kieli on EN
- [ ] EN-odotuslistan arvot (Finder, Seller, Shop owner) yhdistyvät samoihin rooleihin kuin suomenkieliset

**Yleiset**
- [ ] Tietosuojaseloste vastaa toteutusta
- [ ] Mitään tietoa ei kerätä ilman, että se mainitaan selosteessa
- [ ] Sofian editorit (tekstit ja järjestys) toimivat edelleen
- [ ] Ulkoasu ja tekstit eivät muutu ilman Sofian hyväksyntää
- [ ] Kaikki toimii myös hitaalla mobiiliyhteydellä

## 5. Muut ennen julkaisua

| Asia | Mitä tehdään |
|---|---|
| **Oma osoite** | resella.fi osoittamaan sivulle (GitHub Pages: Custom domain + DNS). Nyt osoitteessa näkyy vanha nimi "resello" |
| **Jakokuvien osoitteet** | og:url ja og:image viittaavat nyt github.io-osoitteeseen. Vaihda resella.fi-osoitteeseen, kun domain on käytössä |
| **Mittaus** | Kävijämäärien lähtötaso ennen mainontaa. Evästeilmoitukseen silloin hyväksy/hylkää (ks. osio 3) |
| **Fontit omalta palvelimelta** | Inter Tight ja DM Sans, jotta Googlelle ei välity IP-osoitetta (ks. osio 3) |

## 6. Koodi ja pääsy

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

## 7. Siirto: tunnukset ja muut kuin koodi

Repo sisältää kaiken koodin, kuvat ja videot. Siirtoon tarvitaan lisäksi nämä. **Tunnuksia ja avaimia ei laiteta repoon eikä tähän dokumenttiin**, vaan ne annetaan salasanojen hallinnan tai kasvokkain kautta.

| Mitä | Kuka antaa | Huom. |
|---|---|---|
| GitHub: kirjoitusoikeus repoon | Sofia | Osio 6 |
| resella.fi: verkkotunnuksen hallinta ja DNS | Sofia | Missä verkkotunnus on rekisteröity, tunnukset |
| Sähköposti info@resella.fi | Sofia | Toimiiko postilaatikko jo, ja kuka lukee sitä. Lomakkeiden ilmoitukset tulevat tänne |
| MailerLite | Sofia | Tili Resella Oy:n nimiin. Leonille käyttäjä tai API-avain |
| Kalenteri demovarauksille | Sofia | Mikä kalenteri (Google?), Sofian ja Leonin kalenterit näkyviin |
| Figma (yaTmCavX9QjL7ePl0b2cot) | Sofia | Katseluoikeus. Design tehdään Figmassa ennen koodia |
| Analytiikka (myöhemmin) | Leon ehdottaa | Ei ennen evästeratkaisua (osio 3) |

**Koodissa olevat osoitteet, jotka muuttuvat siirrossa**
- `tekstit-editori.html` rivi 73: repo `sofiakrap-lgtm/resello` ja branch. Jos repo tai branch vaihtuu, päivitä tähän, muuten Sofian tekstieditori lakkaa tallentamasta.
- Kaikkien sivujen og:url ja og:image: `sofiakrap-lgtm.github.io/resello/...` → resella.fi.
- Sofian GitHub-avaimella pitää olla kirjoitusoikeus uuteen repoon.

**Suositukset siirtoon**
- Oletusbranchin nimi on `claude/frontend-stack-setup-anh5xj`. Vaihda se `main`-nimiseksi siirron yhteydessä (ja päivitä editori).
- Repon historia on noin 280 Mt vanhojen kuvien ja videoiden takia. Uuteen repoon voi siirtää pelkän nykytilan ilman historiaa, jos koolla on väliä.
- Suomenkielisen sivun pääsivu on `resella.html`, englanninkielinen `en.html`. `index.html` ohjaa suomenkieliseen.

**Avoimet asiat, jotka eivät ole Leonin**
- Miro tarkistaa tietosuojaselosteen ja ehdot.
- Tietojenkäsittelysopimus kirppiksille (Sofia ja Miro).
- Englanninkielisten videoiden korjaukset ("flea market", demon kesto 30 min).
