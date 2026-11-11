// Resella: avoimet esittelyajat
// Muokkaa tätä tiedostoa, niin varauslomake (varaa.html) näyttää vain nämä ajat.

window.RESELLA_AJAT = {
  // Esittelyn kesto minuutteina (näytetään sivulla)
  kesto: 60,

  // Viikkopohja: mitkä kellonajat ovat vapaina minäkin viikonpäivänä.
  // Tyhjä lista = ei esittelyjä sinä päivänä.
  viikko: {
    ma: ['9.00', '10.00', '13.00', '14.00'],
    ti: ['9.00', '10.00', '13.00', '14.00'],
    ke: ['9.00', '10.00', '13.00', '14.00'],
    to: ['9.00', '10.00', '13.00', '14.00'],
    pe: [],
    la: [],
    su: []
  },

  // Varattavissa aikaisintaan näin monta päivää etukäteen
  aikaisintaan: 2,
  // Varattavissa enintään näin monta päivää eteenpäin
  enintaan: 42,

  // Poikkeukset: päivät, jolloin ei esittelyjä (muoto VVVV-KK-PP).
  // Välin voi antaa muodossa ['2026-12-21', '2027-01-06'].
  eiAikoja: [
    ['2026-12-21', '2027-01-06']
  ],

  // Jo varatut ajat: lisää tähän, kun aika on sovittu (muoto 'VVVV-KK-PP HH.MM').
  varatut: [
    // '2026-12-09 13.00'
  ],

  // Mihin varaukset lähetetään
  sahkoposti: 'hei@resella.fi'
};
