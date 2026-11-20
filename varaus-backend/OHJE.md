# Varauskalenteri käyttöön (noin 15 min)

Varaukset tulevat Google-kalenteriisi Meet-linkin kanssa, ja asiakas saa kutsun sähköpostiinsa. Tähän tarvitaan vain Google-tilisi.

## 1. Luo skripti
1. Avaa **script.google.com** sillä Google-tilillä, jonka kalenteriin varaukset tulevat.
2. Valitse **Uusi projekti** ja nimeksi **Resella varaus**.
3. Poista editorin valmis teksti ja liitä tilalle tiedoston `Code.gs` koko sisältö.
4. Valitse vasemmalta **Palvelut (+)** → **Google Calendar API** → **Lisää**. Tunnukseksi tulee "Calendar", älä muuta sitä.
5. Tallenna (Cmd + S).

## 2. Tarkista asetukset
Muokkaa tarvittaessa tiedoston yläosaa (ASETUKSET):
- **viikko:** demojen aloitusajat viikonpäivittäin
- **eiAikoja:** lomat ja muut päivät, joina demoja ei ole
- **kalenterit:** lisää Leonin kalenteri (hänen sähköpostiosoitteensa), jos hän on jakanut sen sinulle. Silloin myös hänen menonsa estävät ajan.
- **ilmoitus:** osoite, johon tulee viesti jokaisesta varauksesta

## 3. Testaa
1. Valitse ylhäältä funktio **testaaAjat** ja paina **Suorita**.
2. Hyväksy käyttöoikeudet. Google voi varoittaa, että sovellus ei ole varmennettu. Valitse silloin **Lisäasetukset** → **Siirry: Resella varaus**. Sovellus on oma, joten tämä on turvallista.
3. Lokissa näkyvät vapaat ajat. Jos jokin aika puuttuu, tarkista, onko sinulla kalenterissa menoa sillä hetkellä.

## 4. Julkaise
1. **Ota käyttöön** → **Uusi käyttöönotto** → tyyppi **Verkkosovellus**.
2. Suorita käyttäjänä: **Minä**. Käyttöoikeus: **Kuka tahansa**.
3. Paina **Ota käyttöön** ja kopioi **Verkkosovelluksen URL**. Se päättyy `/exec`.
4. Lähetä osoite Claudelle tai liitä se tiedostoon `avoimet-ajat.js` kohtaan `varausUrl: ''`.

## Kun muutat skriptiä myöhemmin
Valitse **Ota käyttöön** → **Hallinnoi käyttöönottoja** → kynä → Versio: **Uusi versio** → **Ota käyttöön**. Osoite pysyy samana.

## Mitä tapahtuu varauksessa
- Sivu näyttää vain ajat, jotka ovat viikkopohjassa ja joissa kalenterisi on vapaa.
- Varaus tarkistetaan uudelleen juuri ennen tallennusta. Jos joku ehti ensin, asiakas saa pyynnön valita toisen ajan.
- Kalenteriin tulee tapahtuma "Resella-demo: kirppiksen nimi" ja Meet-linkki. Asiakas saa kutsun ja muistutuksen vuorokautta ennen.
- Sama sähköposti voi tehdä enintään 3 varausta vuorokaudessa (suoja roskapostia vastaan).
- Jos palvelu ei vastaa, sivu toimii kuten ennen: varaus lähtee sähköpostina.

## Peruutus tai siirto
Muokkaa tai poista tapahtuma kalenteristasi tavalliseen tapaan. Google lähettää asiakkaalle tiedon muutoksesta. Aika vapautuu sivulle heti.
