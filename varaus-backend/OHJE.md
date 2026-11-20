# Varauskalenteri käyttöön (noin 20 min)

## Näin se toimii
1. **Te päätätte ajat:** lisäätte kalenteriin **Resella demoajat** tapahtuman niille ajoille, jolloin pääsette pitämään demon. Esimerkiksi tapahtuma ti klo 9–12 tuo sivulle ajat 9.00, 10.00 ja 11.00. Toistuva tapahtuma toimii myös.
2. **Asiakas lähettää pyynnön:** aika varataan heti alustavasti kalenteriisi (keltainen, "ODOTTAA"). Kukaan muu ei voi pyytää samaa aikaa. Asiakas saa viestin, että pyyntö on vastaanotettu.
3. **Te hyväksytte:** saatte sähköpostin, jossa on napit **Hyväksy** ja **Hylkää**.
4. **Hyväksy:** tapahtuma muuttuu vihreäksi, siihen tulee Meet-linkki ja asiakas saa vahvistusviestin, jossa on **Avaa Google Meet** -nappi ja linkki. Lisäksi asiakas saa kalenterikutsun.
5. **Hylkää:** aika vapautuu, ja asiakas saa viestin, jossa on nappi uuden ajan valintaan.

Jos sinulla on omassa kalenterissa menoa demoajan päällä, sitä aikaa ei näytetä. Kaikki pyynnöt näkyvät taulukossa **Resella demovaraukset**.

## 1. Luo skripti
1. Avaa **script.google.com** sillä Google-tilillä, jonka kalenteriin demot tulevat.
2. Valitse **Uusi projekti** ja anna nimeksi **Resella varaus**.
3. Poista editorin valmis teksti ja liitä tilalle tiedoston `Code.gs` koko sisältö.
4. Valitse vasemmalta **Palvelut (+)** → **Google Calendar API** → **Lisää**. Älä muuta tunnusta "Calendar".
5. Tallenna (Cmd + S).

## 2. Asenna
1. Valitse ylhäältä funktio **asenna** ja paina **Suorita**.
2. Hyväksy käyttöoikeudet. Jos Google varoittaa, että sovellus ei ole varmennettu, valitse **Lisäasetukset** → **Siirry: Resella varaus**. Sovellus on oma, joten tämä on turvallista.
3. Google-kalenteriisi tulee uusi kalenteri **Resella demoajat** ja Driveen taulukko **Resella demovaraukset**.

## 3. Lisää demoajat
Valitse Google-kalenterissa kalenteriksi **Resella demoajat** ja lisää tapahtumia niille ajoille, jolloin pääsette pitämään demon.

**Leonille muokkausoikeus:** kalenterin asetukset → **Jaa tiettyjen henkilöiden kanssa** → lisää Leonin sähköpostiosoite, oikeudeksi **Tee muutoksia tapahtumiin**. Tämän jälkeen Leon voi lisätä ja poistaa aikoja.

## 4. Tarkista asetukset
Tiedoston yläosassa (ASETUKSET):
- **tiimi:** kenelle hyväksyttävät pyynnöt tulevat. Voit lisätä Leonin pilkulla erotettuna, esim. `'info@resella.fi, leon@...'`
- **kalenterit:** lisää Leonin kalenteri, jos haluat, että myös hänen menonsa estävät ajan
- **aikaisintaan:** kuinka monta päivää etukäteen aika pitää varata vähintään

Testaa: valitse funktio **testaaAjat** → **Suorita**. Lokissa näkyvät sivulle tulevat ajat.

## 5. Julkaise
1. **Ota käyttöön** → **Uusi käyttöönotto** → tyyppi **Verkkosovellus**.
2. Suorita käyttäjänä: **Minä**. Käyttöoikeus: **Kuka tahansa**.
3. Paina **Ota käyttöön** ja kopioi **Verkkosovelluksen URL**, joka päättyy `/exec`.
4. Lähetä osoite Claudelle. Hän kytkee sen varaussivuille.

## Kun muutat skriptiä myöhemmin
Valitse **Ota käyttöön** → **Hallinnoi käyttöönottoja** → kynä → Versio: **Uusi versio** → **Ota käyttöön**. Osoite pysyy samana.

## Hyvä tietää
- **Lähettäjä:** viestit lähtevät sen Google-tilin osoitteesta, jolla skripti on tehty. Vastaukset ohjautuvat osoitteeseen info@resella.fi. Jos haluat lähettäjäksi @resella.fi-osoitteen, tee skripti Resellan Google-tilillä.
- **Siirto tai peruutus hyväksymisen jälkeen:** muokkaa tai poista tapahtuma kalenterissa. Google lähettää asiakkaalle tiedon muutoksesta.
- **Unohtunut pyyntö:** jos pyyntöä ei käsitellä, aika pysyy varattuna. Tarkista taulukosta rivit, joiden tila on "odottaa".
- **Roskapostisuoja:** samasta sähköpostiosoitteesta voi lähettää enintään 3 pyyntöä vuorokaudessa.
- **Jos palvelu ei vastaa**, sivu toimii kuten ennen ja pyyntö lähtee sähköpostina.
