/**
 * Resella: demon varauskalenteri (Google Apps Script)
 *
 * Kulku
 *  1. Saatavuus: lisäätte kalenteriin "Resella demoajat" tapahtumia niille ajoille, jolloin
 *     pääsette pitämään demon. Jokainen tapahtuma jaetaan 60 min aikoihin.
 *  2. Asiakas lähettää pyynnön sivulta. Aika varataan heti alustavasti ("ODOTTAA"),
 *     joten kukaan muu ei voi pyytää samaa aikaa.
 *  3. Teille tulee sähköposti, jossa on napit Hyväksy ja Hylkää.
 *  4. Hyväksy: tapahtumaan tulee Meet-linkki ja asiakas saa vahvistusviestin linkin kanssa
 *     sekä kalenterikutsun. Hylkää: aika vapautuu ja asiakas saa viestin.
 *  Kaikki pyynnöt näkyvät taulukossa "Resella demovaraukset".
 *
 * Vaatii: Palvelut > Google Calendar API (tunnus "Calendar").
 * Ensimmäinen kerta: aja funktio asenna().
 */

// ===== ASETUKSET =====
var ASETUKSET = {
  kesto: 60,                 // demon kesto minuutteina
  aikaisintaan: 1,           // päivää etukäteen vähintään (0 = samana päivänä)
  enintaan: 42,              // päivää eteenpäin enintään

  // Kalenterit, joiden menot estävät ajan. 'primary' = oma kalenterisi.
  // Lisää Leonin osoite, jos hän on jakanut kalenterinsa sinulle.
  kalenterit: ['primary'],

  // Kenelle tulee pyyntö hyväksyttäväksi (useampi pilkulla erotettuna)
  tiimi: 'info@resella.fi',
  vastausosoite: 'info@resella.fi',   // asiakkaan vastaukset menevät tänne
  lahettajanNimi: 'Resella',

  aikavyohyke: 'Europe/Helsinki',
  sivu: 'https://sofiakrap-lgtm.github.io/resello/'   // varaussivujen osoite (uusi aika -linkki)
};
// ===== ASETUKSET LOPPUU =====

var P = PropertiesService.getScriptProperties();
var SARAKKEET = ['id', 'luotu', 'tila', 'paiva', 'aika', 'nimi', 'email', 'kirppis', 'kieli', 'tapahtuma', 'avain', 'meet', 'kasitelty'];

// ---------- Asennus ----------
function asenna() {
  var calId = P.getProperty('SAATAVUUS');
  if (!calId) {
    var cal = CalendarApp.createCalendar('Resella demoajat', { color: CalendarApp.Color.TEAL,
      summary: 'Lisää tähän ajat, jolloin pääsette pitämään demon. Varaussivu näyttää vain nämä ajat.' });
    calId = cal.getId(); P.setProperty('SAATAVUUS', calId);
  }
  var ssId = P.getProperty('TAULUKKO');
  if (!ssId) {
    var ss = SpreadsheetApp.create('Resella demovaraukset');
    var sh = ss.getSheets()[0]; sh.setName('Varaukset');
    sh.getRange(1, 1, 1, SARAKKEET.length).setValues([SARAKKEET]).setFontWeight('bold');
    sh.setFrozenRows(1);
    ssId = ss.getId(); P.setProperty('TAULUKKO', ssId);
  }
  console.log('Saatavuuskalenteri: ' + calId);
  console.log('Taulukko: https://docs.google.com/spreadsheets/d/' + ssId);
}

// ---------- Verkkosovellus ----------
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action === 'ajat') return json_({ ok: true, kesto: ASETUKSET.kesto, ajat: vapaatAjat_() });
  if (p.action === 'paatos') return paatos_(p.id, p.t, p.v);
  return json_({ ok: true, palvelu: 'Resella varaus' });
}

function doPost(e) {
  var d;
  try { d = JSON.parse((e && e.postData && e.postData.contents) || '{}'); }
  catch (err) { return json_({ ok: false, virhe: 'muoto' }); }
  if (d.hp) return json_({ ok: true });   // roskapostisuoja

  var nimi = siisti_(d.nimi, 80), email = siisti_(d.email, 120), kirppis = siisti_(d.kirppis, 120);
  var paiva = String(d.paiva || ''), aika = String(d.aika || ''), kieli = d.kieli === 'en' ? 'en' : 'fi';
  if (!nimi || !kirppis || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json_({ ok: false, virhe: 'tiedot' });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(paiva) || !/^\d{1,2}\.\d{2}$/.test(aika)) return json_({ ok: false, virhe: 'aika' });

  var cache = CacheService.getScriptCache(), ck = 'v_' + email.toLowerCase(), n = Number(cache.get(ck) || 0);
  if (n >= 3) return json_({ ok: false, virhe: 'raja' });

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) return json_({ ok: false, virhe: 'kiire' });
  try {
    if ((vapaatAjat_()[paiva] || []).indexOf(aika) < 0) return json_({ ok: false, virhe: 'varattu' });

    var id = Utilities.getUuid().slice(0, 8), avain = Utilities.getUuid().replace(/-/g, '');
    var alku = aikaleima_(paiva, aika), loppu = new Date(alku.getTime() + ASETUKSET.kesto * 60000);
    var ev = Calendar.Events.insert({
      summary: 'ODOTTAA: Resella-demo, ' + kirppis,
      description: 'Pyyntö odottaa hyväksyntää.\n\nNimi: ' + nimi + '\nSähköposti: ' + email + '\nKirppis: ' + kirppis + '\nKieli: ' + kieli.toUpperCase(),
      start: { dateTime: alku.toISOString(), timeZone: ASETUKSET.aikavyohyke },
      end: { dateTime: loppu.toISOString(), timeZone: ASETUKSET.aikavyohyke },
      transparency: 'opaque', colorId: '5'
    }, 'primary');

    taulukko_().appendRow([id, new Date(), 'odottaa', paiva, aika, nimi, email, kirppis, kieli, ev.id, avain, '', '']);
    cache.put(ck, String(n + 1), 86400);

    lahetaTiimille_(id, avain, { nimi: nimi, email: email, kirppis: kirppis, paiva: paiva, aika: aika, kieli: kieli });
    lahetaAsiakkaalle_(email, kieli, 'saatu', { nimi: nimi, paiva: paiva, aika: aika });
    return json_({ ok: true, tila: 'odottaa', paiva: paiva, aika: aika });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, virhe: 'palvelu' });
  } finally {
    lock.releaseLock();
  }
}

// ---------- Hyväksy / hylkää ----------
function paatos_(id, avain, valinta) {
  var lock = LockService.getScriptLock(); lock.waitLock(15000);
  try {
    var sh = taulukko_(), rivit = sh.getDataRange().getValues(), r = -1;
    for (var i = 1; i < rivit.length; i++) if (String(rivit[i][0]) === String(id)) { r = i; break; }
    if (r < 0 || String(rivit[r][10]) !== String(avain)) return sivu_('Linkki ei kelpaa', 'Pyyntöä ei löytynyt.');
    var v = rivi_(rivit[r]);
    if (v.tila !== 'odottaa') return sivu_('Jo käsitelty', 'Tämä pyyntö on jo ' + (v.tila === 'hyvaksytty' ? 'hyväksytty' : 'hylätty') + '.');

    if (valinta === 'hyvaksy') {
      var otsikko = v.kieli === 'en' ? 'Resella demo: ' + v.kirppis : 'Resella-demo: ' + v.kirppis;
      var ev = Calendar.Events.patch({
        summary: otsikko,
        description: (v.kieli === 'en' ? 'One-hour Resella demo on video call.' : 'Tunnin Resella-demo videopuhelulla.') +
          '\n\nNimi: ' + v.nimi + '\nKirppis: ' + v.kirppis + '\nSähköposti: ' + v.email,
        colorId: '10',
        attendees: [{ email: v.email, displayName: v.nimi }],
        conferenceData: { createRequest: { requestId: Utilities.getUuid(), conferenceSolutionKey: { type: 'hangoutsMeet' } } },
        reminders: { useDefault: false, overrides: [{ method: 'email', minutes: 1440 }, { method: 'popup', minutes: 15 }] }
      }, 'primary', v.tapahtuma, { conferenceDataVersion: 1, sendUpdates: 'all' });
      var meet = ev.hangoutLink;
      for (var k = 0; !meet && k < 5; k++) { Utilities.sleep(1500); meet = Calendar.Events.get('primary', v.tapahtuma).hangoutLink; }
      lahetaAsiakkaalle_(v.email, v.kieli, 'vahvistus', { nimi: v.nimi, paiva: v.paiva, aika: v.aika, meet: meet || '' });
      sh.getRange(r + 1, 3).setValue('hyvaksytty'); sh.getRange(r + 1, 12, 1, 2).setValues([[meet || '', new Date()]]);
      return sivu_('Hyväksytty', esc_(v.kirppis) + ', ' + v.paiva + ' klo ' + v.aika + '. Vahvistus ja Meet-linkki lähetettiin osoitteeseen ' + esc_(v.email) + '.' +
        (meet ? '<br><br><a href="' + meet + '">' + meet + '</a>' : ''));
    }
    if (valinta === 'hylkaa') {
      try { Calendar.Events.remove('primary', v.tapahtuma); } catch (err) {}
      lahetaAsiakkaalle_(v.email, v.kieli, 'hylatty', { nimi: v.nimi, paiva: v.paiva, aika: v.aika });
      sh.getRange(r + 1, 3).setValue('hylatty'); sh.getRange(r + 1, 13).setValue(new Date());
      return sivu_('Hylätty', 'Aika vapautui, ja asiakkaalle lähti viesti, jossa pyydetään valitsemaan uusi aika.');
    }
    return sivu_('Valitse', '<a href="' + linkki_(id, avain, 'hyvaksy') + '">Hyväksy</a> &nbsp; <a href="' + linkki_(id, avain, 'hylkaa') + '">Hylkää</a>');
  } finally { lock.releaseLock(); }
}

// ---------- Vapaat ajat ----------
// { 'VVVV-KK-PP': ['9.00', ...] }: demoajat-kalenterin tapahtumat, joissa omat kalenterit ovat vapaana
function vapaatAjat_() {
  var A = ASETUKSET, tz = A.aikavyohyke, calId = P.getProperty('SAATAVUUS');
  if (!calId) return {};
  var tanaan = aikaleima_(Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd'), '0.00');
  var eka = lisaaPaivia_(tanaan, A.aikaisintaan), vika = lisaaPaivia_(tanaan, A.enintaan + 1);
  var aikaraja = Math.max(eka.getTime(), Date.now() + 3600000);   // ei aikoja alle tunnin päähän

  var ikkunat = (Calendar.Events.list(calId, { timeMin: eka.toISOString(), timeMax: vika.toISOString(),
    singleEvents: true, orderBy: 'startTime', maxResults: 500 }).items || [])
    .filter(function (x) { return x.start && x.start.dateTime; })
    .map(function (x) { return [new Date(x.start.dateTime).getTime(), new Date(x.end.dateTime).getTime()]; });

  var fb = Calendar.Freebusy.query({ timeMin: eka.toISOString(), timeMax: vika.toISOString(), timeZone: tz,
    items: A.kalenterit.map(function (id) { return { id: id }; }) });
  var varattu = [];
  Object.keys(fb.calendars || {}).forEach(function (k) {
    (fb.calendars[k].busy || []).forEach(function (b) { varattu.push([new Date(b.start).getTime(), new Date(b.end).getTime()]); });
  });

  var kesto = A.kesto * 60000, tulos = {};
  ikkunat.forEach(function (w) {
    for (var a = w[0]; a + kesto <= w[1]; a += kesto) {
      var l = a + kesto;
      if (a < aikaraja) continue;
      if (varattu.some(function (b) { return b[0] < l && b[1] > a; })) continue;
      var dd = new Date(a), iso = Utilities.formatDate(dd, tz, 'yyyy-MM-dd'), t = Utilities.formatDate(dd, tz, 'H.mm');
      tulos[iso] = tulos[iso] || [];
      if (tulos[iso].indexOf(t) < 0) tulos[iso].push(t);
    }
  });
  Object.keys(tulos).forEach(function (k) { tulos[k].sort(function (x, y) { return parseFloat(x) - parseFloat(y); }); });
  return tulos;
}

// ---------- Sähköpostit ----------
function lahetaTiimille_(id, avain, v) {
  var aika = pvm_(v.paiva, 'fi') + ' klo ' + v.aika;
  var html = '<div style="font:16px/1.5 Arial,sans-serif;color:#3E2520">' +
    '<p><b>Uusi demopyyntö</b></p>' +
    '<p>' + esc_(v.kirppis) + '<br>' + esc_(aika) + '<br>' + esc_(v.nimi) + ', ' + esc_(v.email) + '<br>Kieli: ' + v.kieli.toUpperCase() + '</p>' +
    '<p><a href="' + linkki_(id, avain, 'hyvaksy') + '" style="display:inline-block;background:#3E2520;color:#ECECDC;padding:12px 22px;border-radius:999px;text-decoration:none">Hyväksy</a>' +
    ' &nbsp; <a href="' + linkki_(id, avain, 'hylkaa') + '" style="display:inline-block;color:#3E2520;padding:12px 22px;border-radius:999px;border:1px solid #3E2520;text-decoration:none">Hylkää</a></p>' +
    '<p style="color:#6E5E56;font-size:14px">Aika on varattu kalenteriin alustavasti (ODOTTAA). Hyväksyntä lähettää asiakkaalle vahvistuksen ja Meet-linkin.</p></div>';
  MailApp.sendEmail({ to: ASETUKSET.tiimi, subject: 'Demopyyntö: ' + v.kirppis + ', ' + aika, htmlBody: html, name: ASETUKSET.lahettajanNimi });
}

function lahetaAsiakkaalle_(email, kieli, tyyppi, v) {
  var en = kieli === 'en', aika = pvm_(v.paiva, kieli) + (en ? ' at ' + v.aika.replace('.', ':') : ' klo ' + v.aika);
  var uusi = ASETUKSET.sivu + (en ? 'book.html' : 'varaa.html');
  var T = {
    saatu: en ? ['We received your demo request', 'Hi ' + v.nimi + ',',
        'Thanks for your request for a Resella demo on ' + aika + '. We will confirm the time by email shortly. The confirmation includes the video call link.']
      : ['Saimme demopyyntösi', 'Hei ' + v.nimi + ',',
        'Kiitos pyynnöstä Resellan demoon ' + aika + '. Vahvistamme ajan pian sähköpostilla, ja vahvistuksessa on videopuhelun linkki.'],
    vahvistus: en ? ['Your Resella demo is confirmed: ' + aika, 'Hi ' + v.nimi + ',',
        'Your demo is confirmed for ' + aika + '. It lasts about an hour and takes place on Google Meet. A calendar invite is also on its way.']
      : ['Resella-demo vahvistettu: ' + aika, 'Hei ' + v.nimi + ',',
        'Demosi on vahvistettu ' + aika + '. Se kestää noin tunnin ja pidetään Google Meetissä. Saat myös kalenterikutsun.'],
    hylatty: en ? ['About your demo request', 'Hi ' + v.nimi + ',',
        'Unfortunately ' + aika + ' does not work for us after all. Please choose a new time, we would love to show you Resella.']
      : ['Demopyyntösi', 'Hei ' + v.nimi + ',',
        'Valitettavasti ' + aika + ' ei meille sittenkään sovi. Valitse uusi aika, niin näytämme Resellan mielellämme.']
  }[tyyppi];
  var nappi = '';
  if (tyyppi === 'vahvistus' && v.meet) nappi = '<p><a href="' + v.meet + '" style="display:inline-block;background:#3E2520;color:#ECECDC;padding:12px 22px;border-radius:999px;text-decoration:none">' +
    (en ? 'Join Google Meet' : 'Avaa Google Meet') + '</a></p><p style="font-size:14px">' + v.meet + '</p>';
  if (tyyppi === 'hylatty') nappi = '<p><a href="' + uusi + '" style="display:inline-block;background:#3E2520;color:#ECECDC;padding:12px 22px;border-radius:999px;text-decoration:none">' +
    (en ? 'Choose a new time' : 'Valitse uusi aika') + '</a></p>';
  var lopetus = en ? 'Best regards,<br>Sofia and Leon<br>Resella' : 'Ystävällisin terveisin,<br>Sofia ja Leon<br>Resella';
  var html = '<div style="font:16px/1.5 Arial,sans-serif;color:#3E2520;max-width:560px">' +
    '<p>' + esc_(T[1]) + '</p><p>' + esc_(T[2]) + '</p>' + nappi +
    '<p>' + (en ? 'Need a different time? Just reply to this email.' : 'Tarvitsetko toisen ajan? Vastaa tähän viestiin.') + '</p>' +
    '<p>' + lopetus + '</p>' +
    '<p style="color:#6E5E56;font-size:12px">Resella Oy, Y-tunnus 3641828-1, ' + ASETUKSET.vastausosoite + '</p></div>';
  MailApp.sendEmail({ to: email, subject: T[0], htmlBody: html, name: ASETUKSET.lahettajanNimi, replyTo: ASETUKSET.vastausosoite });
}

// ---------- Apufunktiot ----------
function taulukko_() { return SpreadsheetApp.openById(P.getProperty('TAULUKKO')).getSheetByName('Varaukset'); }
function rivi_(r) { var o = {}; SARAKKEET.forEach(function (k, i) { o[k] = r[i] instanceof Date ? r[i] : String(r[i]); }); return o; }
function linkki_(id, avain, v) { return ScriptApp.getService().getUrl() + '?action=paatos&id=' + id + '&t=' + avain + '&v=' + v; }
function sivu_(h, t) {
  return HtmlService.createHtmlOutput('<div style="font:18px/1.5 Arial,sans-serif;color:#3E2520;padding:40px;max-width:560px"><h2>' + h + '</h2><p>' + t + '</p></div>')
    .setTitle('Resella varaus');
}
function pvm_(iso, kieli) {
  var d = aikaleima_(iso, '12.00'), tz = ASETUKSET.aikavyohyke;
  var u = Number(Utilities.formatDate(d, tz, 'u')) % 7, pv = Number(Utilities.formatDate(d, tz, 'd')), kk = Number(Utilities.formatDate(d, tz, 'M'));
  if (kieli === 'en') return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][u] + ' ' + pv + ' ' +
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][kk - 1];
  return ['sunnuntaina', 'maanantaina', 'tiistaina', 'keskiviikkona', 'torstaina', 'perjantaina', 'lauantaina'][u] + ' ' + pv + '.' + kk + '.';
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
function esc_(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

// Testaa editorissa: Suorita > testaaAjat ja katso tulos lokista
function testaaAjat() { console.log(JSON.stringify(vapaatAjat_(), null, 1)); }
