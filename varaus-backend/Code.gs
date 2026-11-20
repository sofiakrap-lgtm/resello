/**
 * Resella: demon varauskalenteri (Google Apps Script)
 *
 * Mitä tämä tekee
 *  - GET  ?action=ajat        -> vapaat ajat seuraaville viikoille
 *  - POST {nimi,email,kirppis,paiva,aika,kieli,hp}
 *                            -> tarkistaa ajan, tekee kalenteritapahtuman Meet-linkillä
 *                               ja lähettää asiakkaalle kutsun
 *
 * Vapaa aika = viikkopohjassa ja kaikissa KALENTERIT-listan kalentereissa vapaata.
 * Lukitus estää kaksi varausta samalle ajalle.
 *
 * Vaatii: Palvelut (Services) > Google Calendar API (Advanced Service, tunnus "Calendar").
 */

// ===== ASETUKSET: muokkaa näitä =====
var ASETUKSET = {
  // Kalenteri, johon varaukset tehdään ('primary' = oma pääkalenteri)
  varauskalenteri: 'primary',

  // Kalenterit, joiden menot estävät ajan (omasi + Leonin, jos hän on jakanut kalenterinsa sinulle)
  kalenterit: ['primary'],

  kesto: 60,          // demon kesto minuutteina
  tauko: 0,           // tyhjää aikaa omien menojesi ja demon väliin (min). Huom: 15 estää peräkkäiset demot

  // Viikkopohja: aloitusajat (HH.MM). Tyhjä = ei demoja
  viikko: {
    ma: ['9.00', '10.00', '13.00', '14.00'],
    ti: ['9.00', '10.00', '13.00', '14.00'],
    ke: ['9.00', '10.00', '13.00', '14.00'],
    to: ['9.00', '10.00', '13.00', '14.00'],
    pe: [], la: [], su: []
  },

  aikaisintaan: 2,    // päivää etukäteen vähintään
  enintaan: 42,       // päivää eteenpäin enintään

  // Päivät ilman demoja: 'VVVV-KK-PP' tai ['alku', 'loppu']
  eiAikoja: [
    ['2026-12-21', '2027-01-06']
  ],

  // Tähän osoitteeseen tulee ilmoitus jokaisesta varauksesta (tyhjä = ei ilmoitusta)
  ilmoitus: 'info@resella.fi',

  aikavyohyke: 'Europe/Helsinki'
};
// ===== ASETUKSET LOPPUU =====

var PV = ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'];

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action === 'ajat') return json_({ ok: true, kesto: ASETUKSET.kesto, ajat: vapaatAjat_() });
  return json_({ ok: true, palvelu: 'Resella varaus' });
}

function doPost(e) {
  var d;
  try { d = JSON.parse((e && e.postData && e.postData.contents) || '{}'); }
  catch (err) { return json_({ ok: false, virhe: 'muoto' }); }

  // Roskapostisuoja: piilokenttä täytetty = botti
  if (d.hp) return json_({ ok: true });

  var nimi = siisti_(d.nimi, 80), email = siisti_(d.email, 120), kirppis = siisti_(d.kirppis, 120);
  var paiva = String(d.paiva || ''), aika = String(d.aika || ''), kieli = d.kieli === 'en' ? 'en' : 'fi';
  if (!nimi || !kirppis || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json_({ ok: false, virhe: 'tiedot' });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(paiva) || !/^\d{1,2}\.\d{2}$/.test(aika)) return json_({ ok: false, virhe: 'aika' });

  // Sama sähköposti enintään 3 varausta vuorokaudessa
  var cache = CacheService.getScriptCache(), ck = 'v_' + email.toLowerCase();
  var n = Number(cache.get(ck) || 0);
  if (n >= 3) return json_({ ok: false, virhe: 'raja' });

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) return json_({ ok: false, virhe: 'kiire' });
  try {
    var ajat = vapaatAjat_();
    if ((ajat[paiva] || []).indexOf(aika) < 0) return json_({ ok: false, virhe: 'varattu' });

    var alku = aikaleima_(paiva, aika), loppu = new Date(alku.getTime() + ASETUKSET.kesto * 60000);
    var otsikko = kieli === 'en' ? 'Resella demo: ' + kirppis : 'Resella-demo: ' + kirppis;
    var kuvaus = (kieli === 'en'
      ? 'One-hour Resella demo on video call.\n\nName: ' + nimi + '\nShop: ' + kirppis + '\nEmail: ' + email +
        '\n\nNeed to change the time? Reply to this email or write to ' + ASETUKSET.ilmoitus + '.'
      : 'Tunnin Resella-demo videopuhelulla.\n\nNimi: ' + nimi + '\nKirppis: ' + kirppis + '\nSähköposti: ' + email +
        '\n\nTarvitsetko uuden ajan? Vastaa tähän viestiin tai kirjoita osoitteeseen ' + ASETUKSET.ilmoitus + '.');

    var tapahtuma = Calendar.Events.insert({
      summary: otsikko,
      description: kuvaus,
      start: { dateTime: alku.toISOString(), timeZone: ASETUKSET.aikavyohyke },
      end: { dateTime: loppu.toISOString(), timeZone: ASETUKSET.aikavyohyke },
      attendees: [{ email: email, displayName: nimi }],
      conferenceData: { createRequest: { requestId: Utilities.getUuid(), conferenceSolutionKey: { type: 'hangoutsMeet' } } },
      reminders: { useDefault: false, overrides: [{ method: 'email', minutes: 1440 }, { method: 'popup', minutes: 15 }] }
    }, ASETUKSET.varauskalenteri, { conferenceDataVersion: 1, sendUpdates: 'all' });

    cache.put(ck, String(n + 1), 86400);

    if (ASETUKSET.ilmoitus) {
      try {
        MailApp.sendEmail(ASETUKSET.ilmoitus, 'Uusi demovaraus: ' + paiva + ' klo ' + aika + ', ' + kirppis,
          'Nimi: ' + nimi + '\nSähköposti: ' + email + '\nKirppis: ' + kirppis + '\nKieli: ' + kieli.toUpperCase() +
          '\nAika: ' + paiva + ' klo ' + aika + '\n\nKalenterissa: ' + (tapahtuma.htmlLink || ''));
      } catch (err) { /* ilmoitus ei saa kaataa varausta */ }
    }
    return json_({ ok: true, paiva: paiva, aika: aika, meet: tapahtuma.hangoutLink || '' });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, virhe: 'palvelu' });
  } finally {
    lock.releaseLock();
  }
}

// Vapaat ajat: { 'VVVV-KK-PP': ['9.00', ...] }
function vapaatAjat_() {
  var A = ASETUKSET, tz = A.aikavyohyke;
  var nyt = new Date();
  var tanaan = aikaleima_(Utilities.formatDate(nyt, tz, 'yyyy-MM-dd'), '0.00');
  var eka = lisaaPaivia_(tanaan, A.aikaisintaan), vika = lisaaPaivia_(tanaan, A.enintaan + 1);

  // Kaikkien kalenterien varatut ajat yhdellä haulla
  var fb = Calendar.Freebusy.query({
    timeMin: eka.toISOString(), timeMax: vika.toISOString(), timeZone: tz,
    items: A.kalenterit.map(function (id) { return { id: id }; })
  });
  var varattu = [];
  Object.keys(fb.calendars || {}).forEach(function (k) {
    (fb.calendars[k].busy || []).forEach(function (b) { varattu.push([new Date(b.start).getTime(), new Date(b.end).getTime()]); });
  });

  var tauko = A.tauko * 60000, kesto = A.kesto * 60000, tulos = {};
  for (var d = new Date(eka); d < vika; d = lisaaPaivia_(d, 1)) {
    var iso = Utilities.formatDate(d, tz, 'yyyy-MM-dd');
    if (suljettu_(iso)) continue;
    var pv = PV[Number(Utilities.formatDate(d, tz, 'u')) % 7];
    var vapaat = (A.viikko[pv] || []).filter(function (t) {
      var a = aikaleima_(iso, t).getTime() - tauko, l = aikaleima_(iso, t).getTime() + kesto + tauko;
      return !varattu.some(function (b) { return b[0] < l && b[1] > a; });
    });
    if (vapaat.length) tulos[iso] = vapaat;
  }
  return tulos;
}

function suljettu_(iso) {
  return ASETUKSET.eiAikoja.some(function (e) { return Array.isArray(e) ? (iso >= e[0] && iso <= e[1]) : iso === e; });
}
function aikaleima_(iso, hhmm) {
  var h = hhmm.split('.');
  return Utilities.parseDate(iso + ' ' + ('0' + h[0]).slice(-2) + ':' + h[1], ASETUKSET.aikavyohyke, 'yyyy-MM-dd HH:mm');
}
function lisaaPaivia_(d, n) {
  var iso = Utilities.formatDate(new Date(d.getTime() + n * 86400000 + 12 * 3600000), ASETUKSET.aikavyohyke, 'yyyy-MM-dd');
  return aikaleima_(iso, '0.00');
}
function siisti_(s, max) { return String(s || '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

// Testaa editorissa: Suorita > testaaAjat, katso tulos lokista
function testaaAjat() { console.log(JSON.stringify(vapaatAjat_(), null, 1)); }
