/* Resellan kuluttaja-appin demo. Ei taustajärjestelmää, ei analytiikkaa.
   Tila (suosikit, ostoskori, varaukset, haut) säilyy vain tämän selaimen muistissa. */
(function () {
  'use strict';
  const T = window.TUOTTEET || [];
  const K = window.KIRPPIKSET || [];
  const I = window.IKONIT || {};
  const $ = (s) => document.querySelector(s);
  const sis = $('#sisalto'), ala = $('#alapalkki'), nav = $('#alavalikko');

  /* ---------- Tila ---------- */
  const AVAIN = 'resella-demo-v1';
  let tila = { suosikit: [], kori: [], varaukset: {}, tilaukset: [], ostetut: [], haut: ['Farkut', 'Neule', 'Kuoritakki'], vahdit: [{ q: 'Villakangastakki M', paalla: true }, { q: 'Marimekko', paalla: true }, { q: 'Lastenkengät 28', paalla: false }], tiedote: true, puhelin: '040 123 4567', osoite: { nimi: 'Anna Esimerkki', katu: 'Esimerkkikatu 10 A 2', posti: '00100 Helsinki' } };
  try { const t = JSON.parse(localStorage.getItem(AVAIN)); if (t) tila = Object.assign(tila, t); } catch (e) {}
  if (!tila.vahdit) tila.vahdit = [{ q: 'Villakangastakki M', paalla: true }];
  const tallenna = () => { try { localStorage.setItem(AVAIN, JSON.stringify(tila)); } catch (e) {} };
  function siivoa() { // varaus raukeaa 48 h jälkeen, myydyt pois korista
    let m = false;
    for (const id of Object.keys(tila.varaukset)) if (tila.varaukset[id].asti < Date.now()) { delete tila.varaukset[id]; m = true; }
    const k = tila.kori.filter((id) => !tila.ostetut.includes(id) && !tila.varaukset[id]); if (k.length !== tila.kori.length) { tila.kori = k; m = true; }
    if (m) tallenna();
  }
  const myynnissa = (t) => !tila.ostetut.includes(t.id) && !(window.MYYDYT_ENNEN || []).includes(t.id);

  /* ---------- Apurit ---------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const eur = (n) => n.toFixed(2).replace('.', ',') + ' EUR';
  const ik = (n, cls) => (I[n] || '').replace('<svg ', '<svg ' + (cls ? 'class="' + cls + '" ' : ''));
  const tuote = (id) => T.find((t) => t.id === id);
  const norm = (s) => String(s).toLowerCase();
  const PV = ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'];
  const pvm = (d) => PV[d.getDay()] + ' ' + d.getDate() + '.' + (d.getMonth() + 1) + '.';
  const klo = (d) => 'klo ' + d.getHours() + '.' + String(d.getMinutes()).padStart(2, '0');
  function arkipaivat(d, n) { d = new Date(d); while (n > 0) { d.setDate(d.getDate() + 1); if (d.getDay() % 6) n--; } return d; }
  const kirppis = (nimi) => K.find((k) => k.nimi === nimi) || { nimi, osoite: '', aukiolo: '' };
  const tykkaykset = (t) => (parseInt(t.id.slice(3), 10) * 7) % 23 + (tila.suosikit.includes(t.id) ? 1 : 0);
  const ryhma = (t) => t.kokotyyppi === 'Lasten' ? 'Lapset' : ['Astiat', 'Sisustus', 'Kodintekstiilit'].includes(t.kategoria) ? 'Koti' : t.kokotyyppi;
  const OSASTOT = [
    ['vaatteet', 'Vaatteet', 'hanger', (t) => !['Astiat', 'Sisustus', 'Kengät', 'Laukut', 'Asusteet', 'Lastenvaatteet'].includes(t.kategoria) && t.kokotyyppi !== 'Lasten'],
    ['kengat', 'Kengät', 'shoe', (t) => t.kategoria === 'Kengät'],
    ['laukut', 'Laukut ja asusteet', 'bag', (t) => ['Laukut', 'Asusteet'].includes(t.kategoria)],
    ['koti', 'Koti ja sisustus', 'lamp', (t) => ['Astiat', 'Sisustus'].includes(t.kategoria)],
    ['lapset', 'Lasten tavarat', 'ball', (t) => t.kokotyyppi === 'Lasten' || t.kategoria === 'Lastenvaatteet']];
  const osasto = (k) => OSASTOT.find((o) => o[0] === k);
  const varausMaara = () => Object.keys(tila.varaukset).length;
  const kuvausrivi = (t) => (t.koko && t.kokotyyppi !== 'Ei kokoa' ? 'koko ' + t.koko + ', ' : '') + t.kunto.toLowerCase();

  function ilmoita(teksti) {
    const el = $('#ilmoitus'); el.textContent = teksti; el.classList.add('nakyy');
    clearTimeout(ilmoita.t); ilmoita.t = setTimeout(() => el.classList.remove('nakyy'), 1800);
  }
  function lisaaKoriin(id) {
    if (tila.varaukset[id]) return ilmoita('Tuote on jo varattu sinulle');
    if (!tila.kori.includes(id)) { tila.kori.push(id); tallenna(); }
    ilmoita('Lisätty ostoskoriin'); piirraNav();
  }
  function vaihdaSuosikki(id) {
    const i = tila.suosikit.indexOf(id);
    if (i < 0) tila.suosikit.push(id); else tila.suosikit.splice(i, 1);
    tallenna();
  }

  /* ---------- Osat ---------- */
  function kortti(t) {
    const s = tila.suosikit.includes(t.id);
    return `<article class="kortti" data-tuote="${t.id}">
      <div class="kuva"><img src="${t.kuva}" alt="${esc(t.nimi)}" loading="lazy">
        ${tila.varaukset[t.id] ? '<span class="varattu-tagi">Varattu sinulle</span>' : ''}
        <div class="toiminnot">
          <button class="${t.ikoni}" data-sydan="${t.id}" aria-label="Suosikki">${ik('heart', 'sydan' + (s ? ' paalla' : ''))}<span>${tykkaykset(t)}</span></button>
          <button class="${t.ikoni}" data-kori="${t.id}" aria-label="Lisää ostoskoriin">${ik('plus')}</button>
        </div></div>
      <div class="tekstit"><div class="nimi">${esc(t.nimi)}</div><div class="kuvaus">${esc(kuvausrivi(t))}</div>
        <div class="sijainti">${ik('pin')}${esc(t.kirppis)}</div><div class="hinta">${eur(t.hinta)}</div></div>
    </article>`;
  }
  const ylapalkki = (otsikko, takaisin, oikea) => `<header class="ylapalkki">
      ${takaisin ? `<button class="ikoni-nappi" data-takaisin aria-label="Takaisin">${ik('back')}</button>` : ''}
      <h1>${otsikko}</h1>${oikea || ''}${valikkoNappi()}</header>`;
  function valikkoNappi() { const n = varausMaara() + ilmoitukset().filter((x) => x.uusi).length; return `<button class="ikoni-nappi merkki valikko" data-mene="#/profiili" aria-label="Valikko">${ik('menu')}${n ? `<i>${n}</i>` : ''}</button>`; }
  const hakupalkki = (paikka) => `<div class="kotipalkki"><button class="hakukentta" data-mene="#/haku">${ik('search')}<span>${paikka || 'Hae kirppisten hyllyistä'}</span></button><button class="ikoni-nappi" data-mene="#/ideat" aria-label="Kerro omin sanoin">${ik('sparks')}</button><button class="ikoni-nappi" data-mene="#/kuvahaku" aria-label="Etsi kuvalla">${ik('cam')}</button>${valikkoNappi()}</div>`;
  const tuoterivi = (t, lisa, poisto) => `<div class="tuoterivi" data-tuote="${t.id}"><img src="${t.kuva}" alt="">
      <div class="tiedot"><b style="font-size:16px;font-weight:600">${esc(t.nimi)}</b><span class="himmea">${esc(kuvausrivi(t))}</span>
      <span class="sijainti">${ik('pin')}${esc(t.kirppis)}${lisa || ''}</span><span class="hinta">${eur(t.hinta)}</span></div>
      ${poisto ? `<button class="poista" data-poista="${t.id}" aria-label="Poista">${ik('x')}</button>` : ''}</div>`;

  /* ---------- Suodatus ---------- */
  let haku = { q: '', ryhma: '', osasto: '', koot: [], kunnot: [], kirppikset: [], min: '', max: '', jarjestys: 'Uusimmat ensin' };
  const JARJ = ['Uusimmat ensin', 'Hinta: pienin ensin', 'Hinta: suurin ensin'];
  function osuu(t, q) {
    if (!q) return true;
    const h = norm([t.nimi, t.kategoria, t.tyyppi, t.vari, t.kirppis, t.kokotyyppi].join(' '));
    return norm(q).split(/\s+/).every((s) => h.includes(s.replace(/t$/, '')));
  }
  function tulokset(ohita) {
    let r = T.filter(myynnissa).filter((t) => osuu(t, haku.q)
      && (!haku.ryhma || ryhma(t) === haku.ryhma || (t.kokotyyppi === 'Unisex' && ['Naisten', 'Miesten'].includes(haku.ryhma)))
      && (!haku.osasto || osasto(haku.osasto)[3](t))
      && (ohita === 'koko' || !haku.koot.length || haku.koot.includes(t.koko))
      && (!haku.kunnot.length || haku.kunnot.includes(t.kunto))
      && (!haku.kirppikset.length || haku.kirppikset.includes(t.kirppis))
      && (haku.min === '' || t.hinta >= +haku.min) && (haku.max === '' || t.hinta <= +haku.max));
    if (haku.jarjestys === JARJ[1]) r = r.slice().sort((a, b) => a.hinta - b.hinta);
    if (haku.jarjestys === JARJ[2]) r = r.slice().sort((a, b) => b.hinta - a.hinta);
    return r;
  }
  const suodatinMaara = () => haku.koot.length + haku.kunnot.length + haku.kirppikset.length + (haku.min !== '' || haku.max !== '' ? 1 : 0);

  /* ---------- Näkymät ---------- */
  const N = {};
  const BAN = window.BANNERIT || {};
  const banneri = (v) => BAN[v] || BAN.Kaikki;
  N.asu = (v) => { const b = banneri(v || 'Kaikki'); return { html: ylapalkki('Asun löydöt', true) + `<div class="osio" style="gap:6px"><h2 class="otsikko-iso">${esc(b.otsikko)}</h2><p class="himmea" style="font-size:15px">${esc(b.teksti)}</p></div><div class="ruudukko">${b.tuotteet.map(tuote).filter(Boolean).filter(myynnissa).map(kortti).join('')}</div><div class="vali"></div>`, nav: 'koti' }; };
  let kotiValilehti = 'Kaikki';

  N.koti = () => {
    const lista = T.filter(myynnissa).filter((t) => kotiValilehti === 'Kaikki' || (kotiValilehti === 'Lapset' ? osasto('lapset')[3](t) : kotiValilehti === 'Koti' ? osasto('koti')[3](t) : t.kokotyyppi === (kotiValilehti === 'Naiset' ? 'Naisten' : 'Miesten') || t.kokotyyppi === 'Unisex'));
    const b = banneri(kotiValilehti); const asu = b.tuotteet.map(tuote).filter(Boolean).filter(myynnissa);
    return {
      html: hakupalkki() + `
      <div class="chiprivi">${['Kaikki', 'Naiset', 'Miehet', 'Lapset', 'Koti'].map((v) => `<button class="chip ${v === kotiValilehti ? 'tumma' : ''}" data-valilehti="${v}">${v}</button>`).join('')}</div>
      <section class="banneri"><img src="${b.kuva}" alt=""><div class="teksti">
        <h2>${esc(b.otsikko)}</h2><p>${esc(b.teksti)}</p>
        <button class="vaalea-nappi" data-mene="#/asu/${kotiValilehti}">Katso asu</button></div></section>
      <button class="osio-otsikko" data-mene="#/asu/${kotiValilehti}">Asun löydöt ${ik('chev')}</button>
      <div class="karuselli">${asu.map(kortti).join('')}</div>
      <h2 class="osio-otsikko">Uutta hyllyissä</h2>
      <div class="ruudukko">${lista.map(kortti).join('')}</div><div class="vali"></div>`,
      ala: tila.tiedote ? `<div class="tiedote"><span>Varaus on aina ilmainen kirppiksillä</span><button data-sulje-tiedote aria-label="Sulje">${ik('x')}</button></div>` : '',
      nav: 'koti'
    };
  };

  N.haku = () => {
    return {
      html: `<div class="kotipalkki"><button data-takaisin aria-label="Takaisin">${ik('back')}</button>
        <form class="hakukentta" id="hakulomake">${ik('search')}<input id="hakusyote" type="text" enterkeyhint="search" placeholder="Hae kirppisten hyllyistä" autocomplete="off"><button type="button" data-mene="#/ideat" aria-label="Kerro omin sanoin">${ik('sparks')}</button><button type="button" data-mene="#/kuvahaku" aria-label="Etsi kuvalla">${ik('cam')}</button></form></div>
        <div id="ehdotukset"></div>`,
      nav: null, jalkeen: () => { const s = $('#hakusyote'); s.focus(); s.addEventListener('input', ehdota); $('#hakulomake').addEventListener('submit', (e) => { e.preventDefault(); hae(s.value); }); ehdota(); }
    };
  };
  function ehdota() {
    const q = ($('#hakusyote') || {}).value || '';
    const el = $('#ehdotukset'); if (!el) return;
    if (!q.trim()) {
      el.innerHTML = `<div class="ryhmaotsikko">Viimeiset haut</div>` + tila.haut.map((h) => `<button class="hakurivi pelkka" data-hae="${esc(h)}">${esc(h)}</button>`).join('');
      return;
    }
    const nimet = [...new Set(T.filter(myynnissa).filter((t) => osuu(t, q)).map((t) => t.nimi))].slice(0, 5);
    const kat = [...new Set(T.map((t) => t.tyyppi))].filter((k) => norm(k).includes(norm(q))).slice(0, 4);
    const kir = K.filter((k) => norm(k.nimi).includes(norm(q)));
    el.innerHTML = `<div class="ehdotukset"><button class="chip" data-hae="${esc(q)}">Hae "${esc(q)}"</button></div>`
      + (kat.length ? `<div class="ryhmaotsikko">Kategoriat</div>` + kat.map((n) => `<button class="hakurivi" data-hae="${esc(n)}">${esc(n)}<small>Kategoria</small></button>`).join('') : '')
      + (nimet.length ? `<div class="ryhmaotsikko">Tuotteet</div>` + nimet.map((n) => `<button class="hakurivi" data-hae="${esc(n)}">${esc(n)}<small>Tuote</small></button>`).join('') : '')
      + (kir.length ? `<div class="ryhmaotsikko">Kirppikset</div>` + kir.map((k) => `<button class="hakurivi" data-kirppis="${esc(k.nimi)}">${esc(k.nimi)}<small>Kirppis</small></button>`).join('') : '');
  }
  function hae(q) {
    q = (q || '').trim();
    if (q) { tila.haut = [q, ...tila.haut.filter((h) => norm(h) !== norm(q))].slice(0, 6); tallenna(); }
    haku = Object.assign(haku, { q, osasto: '', koot: [], kunnot: [], kirppikset: [], min: '', max: '' });
    location.hash = '#/tulokset';
  }

  const RYHMAT = [['Naisten', 'Naiset', 'dress'], ['Miesten', 'Miehet', 'shirt'], ['Lapset', 'Lapset', 'kid'], ['Koti', 'Koti', 'cup']];
  N.tulokset = () => {
    const r = tulokset(); const m = suodatinMaara();
    const otsikko = haku.q || (haku.kirppikset.length === 1 && !haku.ryhma ? haku.kirppikset[0] : '') || (haku.osasto ? osasto(haku.osasto)[1] : '') || (RYHMAT.find((x) => x[0] === haku.ryhma) || [])[1] || 'Kaikki tuotteet';
    return {
      html: `<header class="ylapalkki"><button class="ikoni-nappi" data-takaisin aria-label="Takaisin">${ik('back')}</button>
        <h1 data-mene="#/haku" style="cursor:text">${esc(otsikko)}</h1>
        <button class="ikoni-nappi" data-mene="#/haku" aria-label="Hae">${ik('search')}</button>
        ${valikkoNappi()}</header>
      <div class="suodatinrivi"><button class="chip ${m ? 'tumma' : ''}" data-suodattimet>${ik('sliders')}Suodata${m ? ' (' + m + ')' : ''}</button>
        ${RYHMAT.map(([k, n]) => `<button class="chip ${haku.ryhma === k ? 'tumma' : ''}" data-ryhma="${k}">${n}</button>`).join('')}
        <button class="chip ${haku.koot.length ? 'tumma' : ''}" data-suodattimet="koko">Koko</button>
        <button class="chip ${haku.min !== '' || haku.max !== '' ? 'tumma' : ''}" data-suodattimet="hinta">Hinta</button>
        <button class="chip ${haku.kunnot.length ? 'tumma' : ''}" data-suodattimet="kunto">Kunto</button>
        <button class="chip ${haku.kirppikset.length ? 'tumma' : ''}" data-suodattimet="kirppis">Kirppis</button></div>
      ${haku.q || m ? `<div class="valitut">${haku.q ? `<span class="valittu-chip">'${esc(haku.q)}'<button data-poista-haku aria-label="Poista haku">${ik('x')}</button></span>` : ''}<button class="linkki" data-tyhjenna>Tyhjennä</button></div>` : ''}
      ${haku.kirppikset.length === 1 && !haku.q ? (() => { const k = kirppis(haku.kirppikset[0]); return `<div class="osio" style="padding:8px 16px 4px"><div class="laatikko">${ik('pin')}<div class="rivit"><span class="iso">${esc(k.nimi)}</span><span class="himmea">${esc(k.osoite)}</span><span class="himmea">Avoinna ${esc(k.aukiolo)}</span></div></div></div>`; })() : ''}
      <div class="lajittelu"><button data-jarjestys>${ik('sort')}${haku.jarjestys}</button><span>${r.length} tuotetta</span></div>
      ${r.length ? `<div class="ruudukko">${r.map(kortti).join('')}</div>` : `<div class="tyhja"><h2 class="otsikko-iso">Ei osumia</h2><p>Kokeile toista hakusanaa tai poista suodattimia.</p></div>`}<div class="vali"></div>`,
      nav: 'selaa'
    };
  };

  N.tuote = (id) => {
    const t = tuote(id); if (!t) return N.koti();
    const v = tila.varaukset[id]; const myyty = tila.ostetut.includes(id); const korissa = tila.kori.includes(id); const k = kirppis(t.kirppis);
    const samat = T.filter((x) => x.kirppis === t.kirppis && x.id !== id).filter(myynnissa).slice(0, 8);
    const tieto = (a, b) => `<div class="rivi"><span>${a}</span><span>${b}</span></div>`;
    return {
      html: `<div class="tuotekuva"><img src="${t.kuva}" alt="${esc(t.nimi)}">
        <button class="kuvanappi vasen" data-takaisin aria-label="Takaisin">${ik('back')}</button>
        <button class="kuvanappi" data-sydan="${t.id}" aria-label="Suosikki">${ik('heart', 'sydan' + (tila.suosikit.includes(t.id) ? ' paalla' : ''))}</button></div>
      <div class="osio" style="gap:4px;padding:18px 16px 8px"><span class="tuotehinta">${eur(t.hinta)}</span><h2 class="tuotenimi">${esc(t.nimi)}</h2>
        <span class="himmea">${esc(t.vari)}, ${esc(kuvausrivi(t))}</span></div>
      <div style="padding:8px 16px"><button class="kirppiskortti" data-kirppis="${esc(t.kirppis)}">${ik('pin')}<span class="lr-teksti">${esc(k.nimi)}${v ? ', pöytä ' + t.poyta : ''}<small>Avoinna ${esc(k.aukiolo)}</small></span>${ik('chev')}</button></div>
      <div style="padding:8px 16px"><div class="tietolaatikko">${ik('clock')}<span>${myyty ? 'Tämä löytö on jo myyty.' : v ? 'Varattu sinulle. Nouda ' + pvm(new Date(v.asti)) + ' ' + klo(new Date(v.asti)) + ' mennessä.' : 'Varaus on maksuton. Tuote odottaa sinua kirppiksellä 48 tuntia.'}</span></div></div>
      <div class="ryhmaotsikko" style="padding-top:20px">Tuotteen tiedot</div>
      <div class="taulu">${tieto('Kunto', esc(t.kunnonKuvaus))}${tieto('Kategoria', esc(t.kategoria))}${t.kokotyyppi !== 'Ei kokoa' ? tieto('Koko', esc(t.koko) + ', ' + esc(t.kokotyyppi.toLowerCase())) : ''}${tieto('Väri', esc(t.vari))}</div>
      ${samat.length ? `<button class="osio-otsikko" data-kirppis="${esc(t.kirppis)}">Samalta kirppikseltä ${ik('chev')}</button><div class="karuselli">${samat.map(kortti).join('')}</div>` : ''}
      <div style="padding:20px 16px"><div class="vahtikortti"><b>Etsitkö samanlaista?</b><span>Laita hakuvahti päälle, niin kerromme, kun lähikirppiksille tulee ${esc(t.tyyppi.toLowerCase())}${t.koko && t.kokotyyppi !== 'Ei kokoa' ? ' koossa ' + esc(t.koko) : ''}.</span>
        <button class="chip" data-vahti="${esc(t.tyyppi + (t.koko && t.kokotyyppi !== 'Ei kokoa' ? ' ' + t.koko : ''))}">${ik('bell')}Laita hakuvahti</button></div></div><div class="vali"></div>`,
      ala: myyty ? `<div class="toimintopalkki"><button class="nappi ulko" data-mene="#/selaa">Selaa muita löytöjä</button></div>` : `<div class="toimintopalkki">${v
        ? `<button class="nappi" data-mene="#/varaus/${id}">Näytä varaus</button>`
        : `${korissa ? `<button class="nappi ulko kapea" data-mene="#/kori">Korissa</button>` : `<button class="nappi ulko kapea" data-kori="${id}">Kotiin</button>`}<button class="nappi" data-mene="#/varaa/${id}">Varaa ja nouda</button>`}</div>`,
      nav: null
    };
  };

  N.varaa = (id) => {
    const t = tuote(id); if (!t) return N.koti(); const k = kirppis(t.kirppis);
    return {
      html: ylapalkki('Varaa', true) + tuoterivi(t) + `<div class="raita"></div>
      <div class="osio"><span class="osio-label">Nouto</span>
        <div class="laatikko">${ik('shop')}<div class="rivit"><span class="iso">${esc(k.nimi)}</span><span class="himmea">${esc(k.osoite)}</span><span class="himmea">Avoinna ${esc(k.aukiolo)}</span></div></div>
        <span style="font-size:14px">Tuote odottaa sinua <b style="font-weight:600">48 h</b>. Maksat noudettaessa. Pöytäpaikka näkyy, kun varaus on tehty.</span></div>
      <div class="raita"></div>
      <div class="osio"><label class="osio-label" for="puh">Puhelinnumero</label><input class="kentta" id="puh" type="tel" inputmode="tel" autocomplete="tel" value="${esc(tila.puhelin)}"><span class="himmea" style="font-size:13px">Saat tekstiviestin, kun varaus on valmis ja ennen kuin se raukeaa.</span></div>`,
      ala: `<div class="yhteenveto"><div class="summa vahva">Maksetaan noudettaessa<b>${eur(t.hinta)}</b></div><button class="nappi" data-vahvista="${id}">Vahvista varaus</button></div>`,
      nav: 'selaa'
    };
  };

  N.varaus = (id) => {
    const t = tuote(id); const v = tila.varaukset[id]; if (!t || !v) return N.koti();
    const asti = new Date(v.asti);
    return {
      html: ylapalkki('Varaus', true) + `<div class="osio" style="gap:6px"><h2 class="otsikko-iso">Varaus tehty</h2>
        <p class="himmea" style="font-size:15px">Tuote odottaa sinua kirppiksellä ${pvm(asti)} ${klo(asti)} asti. Näytä varausnumero kassalla.</p></div>
      <div class="raita"></div>
      <div class="rivi vahva"><span>Varausnumero</span><span>${v.numero}</span></div>
      <div class="rivi"><span>Kirppis</span><span>${esc(t.kirppis)}</span></div>
      <div class="rivi"><span>Pöytä</span><span>${t.poyta}</span></div>
      <div class="rivi"><span>Nouto viimeistään</span><span>${pvm(asti)} ${klo(asti)}</span></div>
      <div class="raita"></div>${tuoterivi(t, ', pöytä ' + t.poyta)}
      <div class="osio"><button class="linkki" data-peru="${id}" style="align-self:center">Peru varaus</button></div>`,
      ala: `<div class="yhteenveto"><div class="summa vahva">Maksetaan noudettaessa<b>${eur(t.hinta)}</b></div><button class="nappi" data-mene="#/">Jatka selaamista</button></div>`,
      nav: 'selaa'
    };
  };

  N.varaukset = () => {
    const ids = Object.keys(tila.varaukset);
    const tyhja = !ids.length && !tila.tilaukset.length;
    return {
      html: ylapalkki('Varaukset ja tilaukset', true) + (tyhja
        ? `<div class="tyhja"><h2 class="otsikko-iso">Ei vielä varauksia</h2><p>Varaa tuote, niin se odottaa sinua kirppiksellä 48 h.</p><button class="nappi" style="width:auto;padding:0 28px" data-mene="#/">Aloita selaus</button></div>`
        : (ids.length ? `<div class="ryhmaotsikko">Varaukset</div>` + ids.map((id) => { const v = tila.varaukset[id]; const a = new Date(v.asti); return `<button class="hakurivi" data-mene="#/varaus/${id}"><span>${esc(tuote(id).nimi)}<br><small>${esc(tuote(id).kirppis)}, pöytä ${tuote(id).poyta}. Nouda ${pvm(a)} ${klo(a)} mennessä</small></span>${ik('chev_r')}</button>`; }).join('') : '')
        + (tila.tilaukset.length ? `<div class="ryhmaotsikko" style="padding-top:28px">Tilaukset</div>` + tila.tilaukset.map((o) => `<button class="hakurivi" data-mene="#/tilaus/${o.numero}"><span>Tilaus ${o.numero}<br><small>${o.tuotteet.length} tuotetta, ${eur(o.summa)}. ${tilausVaihe(o)[1]}</small></span>${ik('chev_r')}</button>`).join('') : '')),
      nav: 'koti'
    };
  };

  const kirppisMaara = (tt) => new Set(tt.map((t) => t.kirppis)).size;
  function tilausVaihe(o) {
    if (Date.now() > o.arvio + 12 * 3600 * 1000) return [3, 'Toimitettu'];
    return [2, 'Matkalla'];
  }
  N.kori = () => {
    const tt = tila.kori.map(tuote).filter(Boolean);
    if (!tt.length) {
      const s = tila.suosikit.map(tuote).filter(Boolean).filter(myynnissa);
      return {
        html: ylapalkki('Ostoskori') + `<div class="tyhja"><h2 class="otsikko-iso">Ostoskorisi on tyhjä</h2><p>Löydöt odottavat kirppisten hyllyillä.</p>
          <button class="nappi" style="width:auto;padding:0 28px" data-mene="#/selaa">Aloita selaus</button></div>
          ${s.length ? `<h2 class="osio-otsikko">Suosikkisi</h2><div class="karuselli">${s.map(kortti).join('')}</div>` : ''}`,
        nav: 'kori'
      };
    }
    const summa = tt.reduce((a, t) => a + t.hinta, 0); const kk = [...new Set(tt.map((t) => t.kirppis))];
    const nouto = pvm(new Date(Date.now() + 48 * 3600 * 1000));
    return {
      html: ylapalkki('Ostoskori') + kk.map((kn) => `<div style="padding:12px 16px 0"><div class="korttiryhma"><div class="ryhmapaa">${ik('pin')}<span class="lr-teksti">${esc(kn)}<small>Nouda viimeistään ${nouto}</small></span></div>`
          + tt.filter((t) => t.kirppis === kn).map((t) => `<div class="koririvi" data-tuote="${t.id}"><img src="${t.kuva}" alt=""><span class="lr-teksti">${esc(t.nimi)}<small>${esc(kuvausrivi(t))}</small><b>${eur(t.hinta)}</b></span><button class="poista" data-poista="${t.id}" aria-label="Poista">${ik('x')}</button></div>`).join('') + `</div></div>`).join('')
        + `<div class="vali"></div>`,
      ala: `<div class="yhteenveto"><div class="summa">${tt.length} tuotetta<b>${eur(summa)}</b></div><div class="summa">Varaus<b>${eur(0)}</b></div><div class="summa vahva">Maksetaan noudettaessa<b>${eur(summa)}</b></div>
        <button class="nappi" data-varaa-kaikki>Vahvista varaus</button><button class="linkki" style="align-self:center;font-size:13px;color:var(--muted)" data-mene="#/toimitus">Haluatko tilata kotiin? Vaihda toimitustapa</button></div>`,
      nav: 'kori'
    };
  };

  let toimitustapa = 0, maksutapa = 0;
  const TAVAT = [['Pakettiautomaatti', 5.9, 3], ['Kotiovelle', 9.9, 2]];
  N.toimitus = () => {
    const tt = tila.kori.map(tuote).filter(Boolean); if (!tt.length) return N.kori();
    const summa = tt.reduce((a, t) => a + t.hinta, 0); const tapa = TAVAT[toimitustapa]; const n = kirppisMaara(tt); const o = tila.osoite;
    return {
      html: ylapalkki('Kotiinkuljetus', true) + `<div class="osio"><span class="osio-label">Toimitusosoite</span>
        <input class="kentta" id="o-nimi" autocomplete="name" placeholder="Nimi" value="${esc(o.nimi)}">
        <input class="kentta" id="o-katu" autocomplete="street-address" placeholder="Katuosoite" value="${esc(o.katu)}">
        <input class="kentta" id="o-posti" autocomplete="postal-code" placeholder="Postinumero ja toimipaikka" value="${esc(o.posti)}"></div>
      <div class="raita"></div>
      <div class="osio"><span class="osio-label">Toimitustapa</span><div class="valinnat">${TAVAT.map((x, i) => `<button class="valinta ${i === toimitustapa ? 'valittu' : ''}" data-tapa="${i}">${x[0]} ${eur(x[1])}</button>`).join('')}</div>
        <span style="font-size:14px">Toimitus arviolta <b style="font-weight:600">${pvm(arkipaivat(new Date(), tapa[2]))}</b></span>
        ${n > 1 ? `<span class="himmea" style="font-size:13px">Tuotteet tulevat ${n} kirppikseltä. Jokainen kirppis lähettää oman pakettinsa.</span>` : ''}</div>
      <div class="raita"></div>
      <div class="osio"><span class="osio-label">Maksutapa</span><div class="valinnat">${['Kortti', 'Mobiilimaksu', 'Verkkopankki'].map((x, i) => `<button class="valinta ${i === maksutapa ? 'valittu' : ''}" data-maksu="${i}">${x}</button>`).join('')}</div>
        <span class="himmea" style="font-size:13px">Demo: oikeaa maksua ei tehdä.</span></div>`,
      ala: `<div class="yhteenveto"><div class="summa">Tuotteet (${tt.length})<b>${eur(summa)}</b></div><div class="summa">Toimitus${n > 1 ? ' (' + n + ' pakettia)' : ''}<b>${eur(tapa[1] * n)}</b></div>
        <div class="summa vahva">Yhteensä (sis. ALV)<b>${eur(summa + tapa[1] * n)}</b></div><button class="nappi" data-maksa>Maksa ${eur(summa + tapa[1] * n)}</button></div>`,
      nav: 'kori', jalkeen: () => [['o-nimi', 'nimi'], ['o-katu', 'katu'], ['o-posti', 'posti']].forEach(([i, k]) => $('#' + i).addEventListener('input', (e) => { tila.osoite[k] = e.target.value; tallenna(); }))
    };
  };

  N.tilaus = (nro) => {
    const o = tila.tilaukset.find((x) => x.numero === nro) || tila.tilaukset[0]; if (!o) return N.koti();
    const tt = o.tuotteet.map(tuote).filter(Boolean); const [vaihe, teksti] = tilausVaihe(o);
    return {
      html: ylapalkki('Tilaus', true) + `<div class="osio"><span class="iso">${vaihe === 3 ? 'Paketti on perillä' : 'Paketti on matkalla'}</span>
        <div class="edistyminen"><div style="width:${vaihe === 3 ? 100 : 66}%"></div></div>
        <div class="vaiheet"><span>Pakattu</span>${vaihe === 3 ? '<span>Matkalla</span><b>Perillä</b>' : '<b>Matkalla</b><span>Perillä</span>'}</div>
        <span style="font-size:14px">${vaihe === 3 ? 'Toimitettu' : 'Toimitus arviolta'} <b style="font-weight:600">${pvm(new Date(o.arvio))}</b> ${o.tapa === 'Kotiovelle' ? 'kotiovelle' : 'pakettiautomaattiin'}</span>
        ${o.paketit > 1 ? `<span class="himmea" style="font-size:13px">${o.paketit} pakettia, jokainen kirppis lähettää omansa.</span>` : ''}</div>
      <div class="raita"></div>${tt.map((t) => tuoterivi(t)).join('')}<div class="raita"></div>
      <div class="rivi vahva"><span>Tilausnumero</span><span>${o.numero}</span></div>
      <div class="rivi"><span>Toimitustapa</span><span>${o.tapa}</span></div>
      <div class="rivi"><span>Toimitusosoite</span><span style="text-align:right">${esc(o.osoite || '')}</span></div>
      <div class="rivi"><span>Maksettu</span><span>${eur(o.summa)}</span></div><div class="vali"></div>`,
      ala: `<div class="toimintopalkki"><button class="nappi ulko" data-mene="#/">Takaisin etusivulle</button></div>`,
      nav: 'kori'
    };
  };

  N.suosikit = () => {
    const s = tila.suosikit.map(tuote).filter(Boolean).filter(myynnissa);
    return {
      html: ylapalkki('Suosikit') + (s.length ? `<div class="lajittelu" style="padding-top:14px"><span></span><span>${s.length} tuotetta</span></div><div class="ruudukko">${s.map(kortti).join('')}</div><div class="vali"></div>`
        : `<div class="tyhja"><h2 class="otsikko-iso">Ei vielä suosikkeja</h2><p>Paina sydäntä tuotekuvassa, niin löydät tuotteen täältä.</p><button class="nappi" style="width:auto;padding:0 28px" data-mene="#/selaa">Aloita selaus</button></div>`),
      nav: 'suosikit'
    };
  };

  N.selaa = () => ({
    html: hakupalkki('Mitä etsit kirppiksiltä?') + `
      ${OSASTOT.map(([k, n, i]) => `<button class="hakurivi" data-osasto="${k}"><span class="rivi-ikoni">${ik(i)}${n}</span>${ik('chev')}</button>`).join('')}
      <button class="hakurivi" data-osasto=""><span class="rivi-ikoni">${ik('grid')}Kaikki tuotteet</span>${ik('chev')}</button>
      <div class="ryhmaotsikko" style="padding-top:28px">Kirppikset</div>
      <button class="hakurivi" data-mene="#/kirppikset"><span class="rivi-ikoni">${ik('pin')}Lähimmät kirppikset</span>${ik('chev')}</button>
      <button class="hakurivi" data-mene="#/kirppikset/auki"><span class="rivi-ikoni">${ik('clock')}Auki nyt</span>${ik('chev')}</button><div class="vali"></div>`,
    nav: 'selaa'
  });

  N.kirppikset = (osa) => ({
    html: ylapalkki(osa === 'auki' ? 'Auki nyt' : 'Lähimmät kirppikset', true) + `<div style="padding:12px 16px;display:flex;flex-direction:column;gap:10px">${K.map((k, i) => `<button class="kirppiskortti" data-kirppis="${esc(k.nimi)}">${ik('pin')}<span class="lr-teksti">${esc(k.nimi)}<small>${(1.2 + i * 0.9).toFixed(1).replace('.', ',')} km, ${esc(k.osoite)}</small><small>Avoinna ${esc(k.aukiolo)}</small></span>${ik('chev')}</button>`).join('')}</div>`,
    nav: 'selaa'
  });

  const IDEAT = [['Rento syystyyli', 'kuvat/inspiraatio-asu.webp', 'Neule'], ['Juhlaan', 'kuvat/inspiraatio-naiset.webp', 'Mekko'], ['Ulkoiluun', 'kuvat/inspiraatio-miehet.webp', 'Kuoritakki'], ['Valkoiset tennarit', null, 'Tennarit'], ['Kodin löydöt', null, 'Astiat'], ['Lapsille', null, 'Lasten']];
  N.ideat = () => {
    const kuva = (q) => { const t = T.find((x) => osuu(x, q)); return t ? t.kuva : T[0].kuva; };
    return {
      html: `<div class="kotipalkki"><button data-takaisin aria-label="Takaisin">${ik('back')}</button>
        <form class="hakukentta" id="ideahaku">${ik('sparks')}<input id="ideasyote" type="text" enterkeyhint="search" placeholder="Kerro omin sanoin" autocomplete="off"></form></div>
      <div class="osio" style="gap:2px;padding-bottom:12px"><h2 class="otsikko-iso">Ideoita sinulle</h2><span class="himmea">Napauta ideaa tai kirjoita, mitä etsit. Esim. ruskea villatakki koossa M</span></div>
      <div class="ideat">${IDEAT.map(([n, k, q], i) => `<button class="idea ${i % 3 === 0 ? 'korkea' : ''}" data-hae="${q}"><img src="${k || kuva(q)}" alt=""><span>${n}</span></button>`).join('')}</div><div class="vali"></div>`,
      nav: null, jalkeen: () => $('#ideahaku').addEventListener('submit', (e) => { e.preventDefault(); hae($('#ideasyote').value); })
    };
  };

  N.kuvahaku = () => ({
    html: ylapalkki('Etsi kuvalla', true) + `<div style="padding:16px"><div class="vahtikortti" style="gap:12px"><span class="ikonipallo">${ik('cam')}</span><b>Löydä kuvan avulla</b>
        <span>Kuvaa tuote tai valitse kuva puhelimesta. Näytämme samankaltaiset tuotteet lähikirppisten hyllyistä.</span></div></div>
      <div style="padding:0 16px;display:flex;flex-direction:column;gap:10px"><button class="nappi" data-hae="Takki">Ota kuva</button><button class="nappi ulko" data-hae="Laukku">Valitse kuvista</button></div>
      <div class="ryhmaotsikko" style="padding-top:24px">Näin saat parhaat osumat</div>
      ${['Kuvaa tuote hyvässä valossa', 'Rajaa kuva yhteen tuotteeseen', 'Voit kuvata myös lehdestä tai näyteikkunasta'].map((x) => `<div class="listarivi" style="cursor:default;min-height:48px">${ik('check')}<span class="lr-teksti" style="font-weight:400;font-size:15px">${x}</span></div>`).join('')}
      <div class="osio"><span class="himmea" style="font-size:13px">Demo: kuvaa ei lähetetä mihinkään, näytämme esimerkkituloksia.</span></div>`,
    nav: 'selaa'
  });

  function ilmoitukset() {
    const L = [];
    Object.keys(tila.varaukset).forEach((id) => { const t = tuote(id); if (t) L.push({ ik: 'clock', o: 'Varaus valmiina noudettavaksi', a: t.nimi + ' odottaa ' + t.kirppis + 'llä ' + pvm(new Date(tila.varaukset[id].asti)) + ' asti', uusi: true }); });
    tila.vahdit.filter((v) => v.paalla).slice(0, 1).forEach((v) => L.push({ ik: 'bookmark', o: '2 uutta osumaa: ' + v.q, a: 'Kirppis Keskusta ja Kirppis Itä', uusi: true, hae: v.q.split(' ')[0] }));
    (window.MYYDYT_ENNEN || []).forEach((id) => { const t = tuote(id); if (t) L.push({ ik: 'tag', o: 'Tuotteesi myytiin', a: t.nimi + ', ' + eur(t.hinta) + '. Summa tulee seuraavaan tilitykseen' }); });
    L.push({ ik: 'wallet', o: 'Tilitys maksettu', a: eur(60.4) + ' pankkitilillesi' });
    return L;
  }
  N.ilmoitukset = () => {
    const L = ilmoitukset();
    return {
      html: ylapalkki('Ilmoitukset', true) + (L.length ? `<div style="padding:12px 16px"><div class="korttiryhma">${L.map((x) => `<button class="ilmorivi" ${x.hae ? `data-hae="${esc(x.hae)}"` : ''}><span class="ikonipallo ${x.uusi ? 'uusi' : ''}">${ik(x.ik)}</span><span class="lr-teksti" style="${x.uusi ? '' : 'font-weight:400'}">${esc(x.o)}<small>${esc(x.a)}</small></span></button>`).join('')}</div></div>`
        : `<div class="tyhja"><span class="ikonipallo iso">${ik('bell')}</span><h2 class="otsikko-iso">Ei uusia ilmoituksia</h2><p>Kerromme täällä, kun varauksesi on valmiina, hakuvahti löytää jotain tai tuotteesi myydään.</p></div>`),
      nav: null
    };
  };

  N.hakuvahdit = () => ({
    html: ylapalkki('Hakuvahdit', true) + `<div class="osio" style="gap:4px"><span class="himmea">Kerromme heti, kun lähikirppisten hyllyihin tulee jotain, mitä etsit.</span></div>
      <div style="padding:0 16px;display:flex;flex-direction:column;gap:10px">${tila.vahdit.map((v, i) => `<div class="korttiryhma"><button class="ryhmapaa" data-hae="${esc(v.q.split(' ')[0])}"><span class="lr-teksti">${esc(v.q)}</span>${ik('chev')}</button>
        <div class="vahtirivi">${ik('bell')}<span style="flex:1">Ilmoitus</span><button class="kytkin ${v.paalla ? 'paalla' : ''}" data-vahti-kytkin="${i}" aria-label="Ilmoitus"></button></div>
        <div style="padding:0 14px 14px"><button class="chip" data-vahti-poista="${i}">Muokkaa</button></div></div>`).join('')}</div>`,
    nav: null
  });

  N.viestit = () => ({
    html: ylapalkki('Viestit', true) + `<div style="padding:12px 16px"><div class="korttiryhma">${[['Kirppis Keskusta', 'Pöytäsi 22 viikko alkaa maanantaina.', 'Eilen'], ['Kirppis Itä', 'Kiitos! Varaus on peruttu.', '14.11.']].map(([k, m, d]) => `<div class="ilmorivi"><span class="ikonipallo">${ik('shop')}</span><span class="lr-teksti">${k}<small>${m}</small></span><small class="himmea">${d}</small></div>`).join('')}</div></div>
      <div class="osio"><span class="himmea" style="font-size:13px">Kirppis lähettää tänne tiedot varauksista ja pöydästäsi.</span></div>`,
    nav: null
  });

  /* ---------- Myyjän näkymät ---------- */
  const OMA_POYTA = { kirppis: 'Kirppis Keskusta', poyta: 22 };
  const OMAT = T.filter((t) => t.kirppis === OMA_POYTA.kirppis && t.poyta === OMA_POYTA.poyta).map((t) => t.id);
  const MYYDYT_ENNEN = OMAT.slice(-2); window.MYYDYT_ENNEN = MYYDYT_ENNEN; // demon alussa myydyt omat tuotteet
  const PAIVA = 24 * 3600 * 1000;
  const lyhytPvm = (d) => d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
  if (!tila.myyntipaikat) tila.myyntipaikat = [{ kirppis: OMA_POYTA.kirppis, poyta: OMA_POYTA.poyta, alku: Date.now() - 5 * PAIVA, viikot: 2, numero: 'MP-2041' }];
  const SIIRROT = [[-15, 60.4, 3], [-53, 101.4, 6], [-83, 30.2, 2]];
  const listarivi = (ikoni, otsikko, ala, kohde) => `<button class="listarivi" ${kohde ? (kohde[0] === '!' ? `data-ilmoita="${kohde.slice(1)}"` : `data-mene="${kohde}"`) : ''}>${ik(ikoni)}<span class="lr-teksti">${otsikko}${ala ? `<small>${ala}</small>` : ''}</span>${ik('chev_r')}</button>`;
  const myydytOmat = () => OMAT.filter((id) => MYYDYT_ENNEN.includes(id) || tila.ostetut.includes(id));
  let bannerisivu = 0;
  const MYY_BANNERIT = [['Koti täynnä tavaraa? Varaa paikka ja anna kirppiksen myydä', 'Varaa myyntipaikka', '#/myyntipaikka'],
    ['Tuotteesi näkyvät appissa heti, kun kirppis hinnoittelee ne', 'Näin se toimii', '#/nain-toimii'],
    ['Tilitys suoraan pankkitilillesi, ei erillistä nostoa', 'Katso tilitykset', '#/tilitykset']];

  N.myy = () => {
    const nyt = Date.now(); const akt = tila.myyntipaikat.filter((m) => m.alku + m.viikot * 7 * PAIVA > nyt);
    const m = akt[0]; const myydyt = myydytOmat(); const saldo = myydyt.map(tuote).reduce((x, t) => x + t.hinta, 0);
    let poyta = `<div class="tyhja" style="padding:24px 16px"><p>Sinulla ei ole voimassa olevaa pöytää.</p></div>`;
    if (m) { const alku = new Date(m.alku); const loppu = new Date(m.alku + (m.viikot * 7 - 1) * PAIVA); const jaljella = Math.max(0, Math.ceil((loppu - nyt) / PAIVA)); const osuus = Math.min(100, Math.round((nyt - m.alku) / (m.viikot * 7 * PAIVA) * 100));
      poyta = `<div style="padding:0 16px"><button class="korttiryhma poytakortti" data-mene="#/myyntipaikkavaraus/${m.numero}"><span class="sijainti">${ik('pin')}${esc(m.kirppis)}</span><b>Pöytä ${m.poyta}</b><span class="himmea">${lyhytPvm(alku)} - ${lyhytPvm(loppu)}</span>
        <div class="edistyminen"><div style="width:${osuus}%"></div></div><span style="font-size:13px;font-weight:500">${jaljella} päivää jäljellä</span></button></div>`; }
    return {
      html: `<div class="osio" style="padding-bottom:12px;flex-direction:row;align-items:center;justify-content:space-between"><h2 class="sivuotsikko">Oma pöytä</h2>${valikkoNappi()}</div>${poyta}
      <div class="luvut">${[[myydyt.length, 'Myyty'], [OMAT.length - myydyt.length, 'Hyllyssä'], [eur(saldo), 'Saldo']].map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('')}</div>
      <div style="padding:4px 16px 16px"><button class="nappi" data-mene="#/myyntipaikka">Varaa uusi pöytä</button></div>
      <div style="padding:0 16px"><div class="korttiryhma">
      ${listarivi('tag', 'Tuotteeni', (OMAT.length - myydyt.length) + ' hyllyssä, ' + myydyt.length + ' myyty', '#/myyntini')}${listarivi('stores', 'Pöytävaraukset', akt.length ? akt.length + ' voimassa' : '', '#/myyntipaikat')}${listarivi('wallet', 'Tilitykset', eur(saldo) + ' tilitettävää', '#/tilitykset')}${listarivi('info', 'Ohjeet myyjälle', '', '#/nain-toimii')}</div></div><div class="vali"></div>`,
      nav: 'myy'
    };
  };

  N.profiili = () => {
    const ryhma = (o, rivit) => `<div class="ryhmaotsikko">${o}</div><div style="padding:0 16px"><div class="korttiryhma">${rivit.join('')}</div></div>`;
    const n = varausMaara();
    return {
      html: ylapalkki('Valikko', true).replace(/<button class="ikoni-nappi merkki valikko"[^]*?<\/button>/, '') + `<div class="profiilipaa"><span class="ikonipallo iso">AE</span><span class="lr-teksti">Anna Esimerkki<small>Ostaja ja myyjä</small></span></div>
      <div style="padding:0 16px"><button class="korttiryhma lahikortti" data-mene="#/kirppikset"><b>Lähikirppikseni</b><span class="sijainti">${ik('pin')}Kirppis Keskusta ja ${K.length - 1} muuta</span></button></div>
      ${ryhma('Ostaminen', [listarivi('bell', 'Ilmoitukset', ilmoitukset().filter((x) => x.uusi).length + ' uutta', '#/ilmoitukset'), listarivi('clock', 'Varaukseni', n ? n + ' noudettavana' : '', '#/varaukset'), listarivi('box', 'Tilaukseni', '', '#/varaukset'), listarivi('heart', 'Suosikit', '', '#/suosikit'), listarivi('bookmark', 'Hakuvahdit', '', '#/hakuvahdit'), listarivi('chat', 'Viestit kirppiksiltä', '', '#/viestit')])}
      ${ryhma('Myyminen', [listarivi('stores', 'Oma pöytä', '', '#/myy'), listarivi('tag', 'Tuotteeni', '', '#/myyntini'), listarivi('wallet', 'Tilitykset', '', '#/tilitykset')])}
      ${ryhma('Apua', [listarivi('info', 'Ohjeet', '', '#/nain-toimii'), listarivi('chat', 'Ota yhteyttä', '', '!Demo: yhteydenotto ei ole käytössä')])}
      <div class="osio" style="padding-top:28px"><button class="linkki" data-nollaa style="align-self:center">Aloita demo alusta</button>
      <span class="himmea" style="font-size:13px;text-align:center">Tyhjentää suosikit, ostoskorin, varaukset ja tilaukset tästä selaimesta.</span></div>`,
      nav: null
    };
  };

  let mp = { kirppis: 0, alku: 1, viikot: 2 };
  const MP_HINTA = 25; // esimerkkihinta EUR / viikko
  N.myyntipaikka = () => {
    const paivat = Array.from({ length: 10 }, (_, i) => { const d = new Date(); d.setHours(10, 0, 0, 0); d.setDate(d.getDate() + i + 1); return d; }).filter((d) => d.getDay() !== 0);
    const k = K[mp.kirppis]; const alku = paivat[Math.min(mp.alku, paivat.length - 1)]; const loppu = new Date(+alku + (mp.viikot * 7 - 1) * PAIVA);
    return {
      html: ylapalkki('Varaa myyntipaikka', true) + `<div class="osio"><span class="osio-label">Kirppis</span><div class="valinnat">${K.map((x, i) => `<button class="valinta ${i === mp.kirppis ? 'valittu' : ''}" data-mp="kirppis" data-arvo="${i}">${esc(x.nimi)}</button>`).join('')}</div>
        <div class="laatikko">${ik('shop')}<div class="rivit"><span class="iso">${esc(k.nimi)}</span><span class="himmea">${esc(k.osoite)}</span><span class="himmea">Avoinna ${esc(k.aukiolo)}</span></div></div></div>
      <div class="raita"></div>
      <div class="osio"><span class="osio-label">Aloituspäivä</span><div class="valinnat">${paivat.map((d, i) => `<button class="valinta ${i === mp.alku ? 'valittu' : ''}" data-mp="alku" data-arvo="${i}">${pvm(d)}</button>`).join('')}</div></div>
      <div class="raita"></div>
      <div class="osio"><span class="osio-label">Kesto</span><div class="valinnat">${[1, 2, 3, 4].map((v) => `<button class="valinta ${v === mp.viikot ? 'valittu' : ''}" data-mp="viikot" data-arvo="${v}">${v} vk</button>`).join('')}</div>
        <span style="font-size:14px">Myyntiaika <b style="font-weight:600">${pvm(alku)} - ${pvm(loppu)}</b>. Pöytäpaikka näkyy varauksen jälkeen.</span></div>`,
      ala: `<div class="yhteenveto"><div class="summa">Myyntipaikka ${mp.viikot} vk<b>${eur(MP_HINTA * mp.viikot)}</b></div><span class="himmea" style="font-size:13px;margin-top:-6px">Esimerkkihinta. Jokainen kirppis päättää omat hintansa.</span><button class="nappi" data-mp-vahvista>Varaa ja maksa ${eur(MP_HINTA * mp.viikot)}</button></div>`,
      nav: 'myy', jalkeen: () => { N.myyntipaikka.alku = +alku; }
    };
  };

  N.myyntipaikkavaraus = (nro) => {
    const m = tila.myyntipaikat.find((x) => x.numero === nro); if (!m) return N.myy();
    const alku = new Date(m.alku); const loppu = new Date(m.alku + (m.viikot * 7 - 1) * PAIVA); const k = kirppis(m.kirppis);
    return {
      html: ylapalkki('Myyntipaikka', true) + `<div class="osio" style="gap:6px"><h2 class="otsikko-iso">${m.alku > Date.now() ? 'Myyntipaikka varattu' : 'Myyntipaikka'}</h2>
        <p class="himmea" style="font-size:15px">Tuo tuotteesi kirppikselle ensimmäisenä päivänä. Kirppis hinnoittelee ne, ja ne näkyvät appissa heti.</p></div>
      <div class="raita"></div>
      <div class="rivi vahva"><span>Varausnumero</span><span>${m.numero}</span></div>
      <div class="rivi"><span>Kirppis</span><span>${esc(m.kirppis)}</span></div>
      <div class="rivi"><span>Pöytä</span><span>${m.poyta}</span></div>
      <div class="rivi"><span>Myyntiaika</span><span>${pvm(alku)} - ${pvm(loppu)}</span></div>
      <div class="rivi"><span>Osoite</span><span>${esc(k.osoite)}</span></div><div class="vali"></div>`,
      ala: `<div class="toimintopalkki"><button class="nappi ulko" data-mene="#/myy">Takaisin myyntiin</button></div>`,
      nav: 'myy'
    };
  };

  N.myyntipaikat = (osa) => {
    const nyt = Date.now(); const aiemmat = osa === 'aiemmat';
    const omat = tila.myyntipaikat.filter((m) => (m.alku + m.viikot * 7 * PAIVA > nyt) !== aiemmat);
    const vanhat = aiemmat ? [[-70, 2, 'Kirppis Keskusta', 22, 'MP-1733'], [-130, 3, 'Kirppis Itä', 8, 'MP-1290']].map(([p, v, k, po, n]) => ({ kirppis: k, poyta: po, alku: nyt + p * PAIVA, viikot: v, numero: n })) : [];
    const kaikki = omat.concat(vanhat);
    return {
      html: ylapalkki(aiemmat ? 'Aiemmat varaukset' : 'Omat varaukset', true) + (kaikki.length ? kaikki.map((m) => { const a = new Date(m.alku); const l = new Date(m.alku + (m.viikot * 7 - 1) * PAIVA);
        return `<button class="hakurivi" ${tila.myyntipaikat.includes(m) ? `data-mene="#/myyntipaikkavaraus/${m.numero}"` : ''}><span>${esc(m.kirppis)}, pöytä ${m.poyta}<br><small>${aiemmat ? lyhytPvm(a) + ' - ' + lyhytPvm(l) : pvm(a) + ' - ' + pvm(l)}${!aiemmat && m.alku > nyt ? ', alkaa pian' : ''}</small></span>${ik('chev_r')}</button>`; }).join('')
        : `<div class="tyhja"><h2 class="otsikko-iso">Ei voimassa olevia varauksia</h2><p>Varaa myyntipaikka lähikirppikseltä.</p><button class="nappi" style="width:auto;padding:0 28px" data-mene="#/myyntipaikka">Varaa myyntipaikka</button></div>`),
      nav: 'myy'
    };
  };

  let myyntiSuodatin = 'Hyllyssä';
  N.myyntini = () => {
    const myydyt = myydytOmat(); const tilaOf = (id) => myydyt.includes(id) ? 'Myyty' : tila.varaukset[id] ? 'Varattu' : 'Hyllyssä';
    const lista = OMAT.filter((id) => tilaOf(id) === myyntiSuodatin).map(tuote);
    return {
      html: ylapalkki('Tuotteeni', true) + `<div class="chiprivi">${['Hyllyssä', 'Varattu', 'Myyty'].map((v) => `<button class="chip ${v === myyntiSuodatin ? 'tumma' : ''}" data-myyntisuodatin="${v}">${v} ${OMAT.filter((id) => tilaOf(id) === v).length}</button>`).join('')}</div>
      <div style="padding:4px 16px"><div class="korttiryhma">${lista.length ? lista.map((t) => `<div class="koririvi" data-tuote="${t.id}"><img src="${t.kuva}" alt=""><span class="lr-teksti">${esc(t.nimi)}<b>${eur(t.hinta)}</b><span class="tila-tagi ${tilaOf(t.id) === 'Myyty' ? 'myyty' : ''}">${tilaOf(t.id)}</span></span>${ik('chev')}</div>`).join('') : `<div class="tyhja" style="padding:24px"><p>Ei tuotteita tässä tilassa.</p></div>`}</div></div>
      <div style="padding:16px"><span class="himmea" style="font-size:13px">Tuo tuotteet kirppikselle. Kirppis hinnoittelee ne, ja ne näkyvät appissa heti.</span></div>`,
      nav: 'myy'
    };
  };

  let tilitysValilehti = 'Saldo'; let auki = -1; let yhteenveto = false;
  N.tilitykset = (osa) => {
    if (osa === 'siirrot' && piirra.uusi) tilitysValilehti = 'Siirrot';
    const myydyt = myydytOmat().map(tuote); const saldo = myydyt.reduce((a, t) => a + t.hinta, 0); const hyllyssa = OMAT.length - myydyt.length;
    const tabs = `<div class="valilehdet">${['Saldo', 'Siirrot'].map((v) => `<button class="${v === tilitysValilehti ? 'valittu' : ''}" data-tilitys="${v}">${v}</button>`).join('')}</div>`;
    const saldoHtml = `<div style="padding:16px;display:flex;flex-direction:column;gap:16px"><div class="kortti-surf"><div style="padding:20px 16px 8px"><div class="saldo">${eur(saldo)}</div><span class="himmea">Myynneistä</span></div>
        <div style="padding:8px 16px 4px"><button class="nappi ulko" style="height:40px;background:var(--sec);border-color:var(--line)" data-yhteenveto>${yhteenveto ? 'Piilota yhteenveto' : 'Katso yhteenveto'}</button></div>
        ${yhteenveto ? `<div style="padding:4px 16px 8px">${myydyt.map((t) => `<div class="summa" style="padding:6px 0">${esc(t.nimi)}<b>${eur(t.hinta)}</b></div>`).join('')}<span class="himmea" style="font-size:13px">Kirppis vähentää palkkionsa ennen tilitystä.</span></div>` : ''}
        ${listarivi('bank', 'Pankkitilille', 'Kirppis tilittää sovitusti', '!Tilitykset menevät tilille FI** **** **** 1234')}${listarivi('clock', 'Tilityshistoria', 'Kaikki aiemmat tilitykset', '#/tilitykset/siirrot')}${listarivi('sparkle', 'Automaattinen tilitys', 'Ei erillistä nostoa', '!Automaattinen tilitys on päällä')}</div>
      <div class="kortti-surf" style="padding:24px 16px"><div class="saldo">${hyllyssa}</div><span class="himmea">Tuotetta hyllyssä nyt</span></div></div>`;
    const siirrotHtml = `<div class="ryhmaotsikko">Valmiit tilitykset</div><div style="margin:0 16px" class="kortti-surf">${SIIRROT.map(([p, e, n], i) => { const d = new Date(Date.now() + p * PAIVA);
      return `<button class="siirto" data-siirto="${i}"><span><span class="iso" style="font-weight:400">Pankkitilille</span><br><small class="himmea">${lyhytPvm(d)}</small></span><span style="display:flex;gap:12px;align-items:center;font-size:14px">${eur(e)}${ik('chevd')}</span></button>
      ${auki === i ? `<div class="siirto-tiedot"><div class="summa">Myydyt tuotteet<b>${n} kpl</b></div><div class="summa">Tilitetty tilille<b>FI** **** **** 1234</b></div><div class="summa">Kirppis<b>${esc(OMA_POYTA.kirppis)}</b></div></div>` : ''}`; }).join('')}</div>
      <button class="linkki" style="display:block;margin:20px auto" data-ilmoita="Ei aiempia tilityksiä">Näytä lisää</button>`;
    return { html: ylapalkki('Tilitykset', true) + tabs + (tilitysValilehti === 'Saldo' ? saldoHtml : siirrotHtml), nav: 'myy' };
  };

  N['nain-toimii'] = () => ({
    html: ylapalkki('Näin se toimii', true) + `<div class="osio" style="gap:8px"><h2 class="sivuotsikko" style="font-size:28px">Myy kirppiksellä, ilman vaivaa</h2><p class="himmea" style="font-size:15px">Sinä tuot tavarat, kirppis hoitaa myynnin. Tuotteesi näkyvät appissa heti, kun ne on hinnoiteltu.</p></div>
      <div class="raita"></div>
      ${[['box', 'Varaa myyntipaikka', 'Valitse kirppis, aloituspäivä ja kesto.'], ['tag', 'Tuo tuotteet', 'Kirppis hinnoittelee ne, ja ne näkyvät ostajille appissa.'], ['wallet', 'Saat tilityksen', 'Myynnit tilitetään pankkitilillesi automaattisesti.']]
        .map(([i, o, t]) => `<div class="listarivi" style="cursor:default">${ik(i)}<span class="lr-teksti">${o}<small>${t}</small></span></div>`).join('')}
      <div class="raita"></div><div class="ryhmaotsikko">Usein kysyttyä</div>
      ${[['Mitä myyntipaikka maksaa?', 'Jokainen kirppis päättää omat hintansa. Näet hinnan ennen varausta.'], ['Kuka hinnoittelee tuotteet?', 'Kirppis hinnoittelee tuotteet, kun tuot ne. Voit sopia hinnoista kirppiksen kanssa.'], ['Milloin saan rahat?', 'Kirppis tilittää myynnit sovitusti suoraan pankkitilillesi.'], ['Mitä myymättömille tuotteille tapahtuu?', 'Haet ne myyntiajan päätyttyä tai sovit kirppiksen kanssa lahjoituksesta.']]
        .map(([k, v], i) => `<button class="siirto" data-ukk="${i}"><span class="iso" style="font-weight:500;text-align:left">${k}</span>${ik('chevd')}</button>${auki === 100 + i ? `<div class="siirto-tiedot"><span style="font-size:15px">${v}</span></div>` : ''}`).join('')}
      <div class="osio"><button class="nappi" data-mene="#/myyntipaikka">Varaa myyntipaikka</button></div>`,
    nav: 'myy'
  });

  /* ---------- Suodatinpaneeli ---------- */
  function avaaPaneeli(kohta) {
    const p = $('#paneeli');
    const koot = [...new Set(tulokset('koko').map((t) => t.koko).filter((k) => k && k !== 'Onesize'))];
    const ryh = (otsikko, avain, arvot) => `<div class="osio" id="p-${avain}"><span class="osio-label">${otsikko}</span><div class="valinnat">${arvot.map((a) => `<button class="valinta ${haku[avain].includes(a) ? 'valittu' : ''}" data-p="${avain}" data-arvo="${esc(a)}">${esc(a)}</button>`).join('') || '<span class="himmea">Ei valittavaa</span>'}</div></div>`;
    p.innerHTML = `<header><h3>Suodata</h3><button data-sulje-paneeli aria-label="Sulje">${ik('x')}</button></header><div class="runko">
      <div class="osio"><span class="osio-label">Järjestys</span><div class="valinnat">${JARJ.map((j) => `<button class="valinta ${haku.jarjestys === j ? 'valittu' : ''}" data-jarj="${j}">${j}</button>`).join('')}</div></div><div class="raita"></div>
      ${ryh('Koko', 'koot', koot)}<div class="raita"></div>
      <div class="osio" id="p-hinta"><span class="osio-label">Hinta</span><div class="hintarivi">
        <label class="arvokentta"><input id="pmin" inputmode="numeric" placeholder="0" value="${haku.min}"><small>EUR</small></label><span>-</span>
        <label class="arvokentta"><input id="pmax" inputmode="numeric" placeholder="1000" value="${haku.max}"><small>EUR</small></label></div>
        <div class="valinnat">${[['', 20, 'Alle 20 EUR'], [20, 50, '20-50 EUR'], [50, 100, '50-100 EUR'], [100, '', 'Yli 100 EUR']].map(([a, b, n]) => `<button class="valinta" data-hinta="${a}|${b}">${n}</button>`).join('')}</div></div><div class="raita"></div>
      ${ryh('Kunto', 'kunnot', ['Erinomainen', 'Hyvä', 'Kohtalainen', 'Kulunut'])}<div class="raita"></div>
      ${ryh('Kirppis', 'kirppikset', K.map((k) => k.nimi))}</div>
      <footer><button class="linkki" data-p-tyhjenna>Tyhjennä</button><button class="nappi" data-sulje-paneeli>Näytä tuotteet (${tulokset().length})</button></footer>`;
    p.classList.add('auki'); $('#peite').classList.add('auki');
    const hk = () => { haku.min = $('#pmin').value.replace(/\D/g, ''); haku.max = $('#pmax').value.replace(/\D/g, ''); paivitaNappi(); };
    $('#pmin').addEventListener('input', hk); $('#pmax').addEventListener('input', hk);
    if (kohta) { const el = $('#p-' + ({ koko: 'koot', kunto: 'kunnot', kirppis: 'kirppikset', hinta: 'hinta' }[kohta])); if (el) el.scrollIntoView(); }
  }
  function paivitaNappi() { const b = $('#paneeli footer .nappi'); if (b) b.textContent = 'Näytä tuotteet (' + tulokset().length + ')'; }
  function suljePaneeli() { $('#paneeli').classList.remove('auki'); $('#peite').classList.remove('auki'); if (reitti().nimi === 'tulokset') piirra(true); }

  /* ---------- Reititys ---------- */
  function reitti() {
    const h = location.hash.replace(/^#\/?/, ''); const [polku, kysely] = h.split('?'); const [nimi, arg] = polku.split('/');
    return { nimi: nimi || 'koti', arg, kysely: new URLSearchParams(kysely || '') };
  }
  function piirraNav(aktiivinen) {
    if (aktiivinen !== undefined) piirraNav.a = aktiivinen;
    const a = piirraNav.a; if (a === null) { nav.style.display = 'none'; return; } nav.style.display = '';
    const n = tila.kori.length;
    nav.innerHTML = [['selaa', 'search', 'Selaa'], ['kori', 'bag', 'Ostoskori'], ['koti', '', 'Koti'], ['suosikit', 'heart', 'Suosikit'], ['myy', 'coins', 'Myy']]
      .map(([k, i, l]) => `<button class="${k === a ? 'valittu' : ''} ${k === 'koti' ? 'pilvi' : ''}" data-mene="#/${k === 'koti' ? '' : k}" aria-label="${l}">${k === 'koti' ? `<img src="kuvat/pilvi${a === 'koti' ? '_aktiivinen' : ''}.png" alt="">` : k === 'kori' ? `<span class="merkki">${ik(i)}${n ? `<i>${n}</i>` : ''}</span>` : ik(i)}</button>`).join('');
  }
  function piirra(sailytaVieritys) {
    const r = reitti(); const y = sis.scrollTop; siivoa();
    piirra.uusi = !sailytaVieritys; const f = N[r.nimi] || N.koti; const v = f(r.arg);
    sis.innerHTML = v.html; ala.innerHTML = v.ala || ''; piirraNav(v.nav);
    sis.scrollTop = sailytaVieritys ? y : 0;
    if (v.jalkeen) v.jalkeen();
  }
  window.addEventListener('hashchange', () => { $('#ilmoitus').classList.remove('nakyy'); piirra(); });

  /* ---------- Tapahtumat ---------- */
  document.addEventListener('click', (e) => {
    const el = e.target.closest('button, [data-tuote], [data-mene], h1[data-mene]'); if (!el) return;
    const d = el.dataset;
    if (d.kori) { e.stopPropagation(); lisaaKoriin(d.kori); piirra(true); return; }
    if (d.sydan) { e.stopPropagation(); vaihdaSuosikki(d.sydan); piirra(true); return; }
    if ('takaisin' in d) { history.length > 1 ? history.back() : (location.hash = '#/'); return; }
    if (d.mene !== undefined) { location.hash = d.mene; return; }
    if (d.osasto !== undefined) { haku = Object.assign(haku, { q: '', ryhma: '', osasto: d.osasto, koot: [], kunnot: [], kirppikset: [], min: '', max: '' }); location.hash = '#/tulokset'; return; }
    if (d.myyntisuodatin) { myyntiSuodatin = d.myyntisuodatin; piirra(true); return; }
    if (d.vahti) { if (!tila.vahdit.some((v) => v.q === d.vahti)) tila.vahdit.unshift({ q: d.vahti, paalla: true }); tallenna(); ilmoita('Hakuvahti päällä'); return; }
    if (d.vahtiKytkin) { const v = tila.vahdit[+d.vahtiKytkin]; v.paalla = !v.paalla; tallenna(); piirra(true); return; }
    if (d.vahtiPoista) { ilmoita('Demo: muokkaus ei ole käytössä'); return; }
    if ('varaaKaikki' in d) { const loppu = Date.now() + 48 * 3600 * 1000; tila.kori.forEach((id) => { tila.varaukset[id] = { numero: 'RS-' + (4000 + Math.floor(Math.random() * 6000)), asti: loppu }; }); tila.kori = []; tallenna(); ilmoita('Varaus tehty'); location.hash = '#/varaukset'; return; }
    if (d.valilehti) { kotiValilehti = d.valilehti; piirra(true); return; }
    if ('suljeTiedote' in d) { tila.tiedote = false; tallenna(); ala.innerHTML = ''; return; }
    if (d.hae !== undefined) { hae(d.hae); return; }
    if (d.kirppis) { haku = Object.assign(haku, { q: '', ryhma: '', osasto: '', koot: [], kunnot: [], kirppikset: [d.kirppis], min: '', max: '' }); location.hash = '#/tulokset'; return; }
    if (d.selaaRyhma !== undefined) { haku = Object.assign(haku, { q: '', osasto: '', ryhma: d.selaaRyhma, koot: [], kunnot: [], kirppikset: [], min: '', max: '' }); location.hash = '#/tulokset'; return; }
    if (d.ryhma) { haku.ryhma = haku.ryhma === d.ryhma ? '' : d.ryhma; piirra(true); return; }
    if (d.suodattimet !== undefined) { avaaPaneeli(d.suodattimet); return; }
    if ('poistaHaku' in d) { haku.q = ''; piirra(true); return; }
    if ('tyhjenna' in d) { haku = Object.assign(haku, { q: '', osasto: '', koot: [], kunnot: [], kirppikset: [], min: '', max: '' }); piirra(true); return; }
    if ('jarjestys' in d) { haku.jarjestys = JARJ[(JARJ.indexOf(haku.jarjestys) + 1) % JARJ.length]; piirra(true); return; }
    if (d.p) { const a = haku[d.p]; const i = a.indexOf(d.arvo); i < 0 ? a.push(d.arvo) : a.splice(i, 1); el.classList.toggle('valittu'); paivitaNappi(); return; }
    if (d.jarj) { haku.jarjestys = d.jarj; el.parentNode.querySelectorAll('.valinta').forEach((b) => b.classList.toggle('valittu', b === el)); return; }
    if (d.hinta) { const [a, b] = d.hinta.split('|'); haku.min = a; haku.max = b; $('#pmin').value = a; $('#pmax').value = b; paivitaNappi(); return; }
    if ('pTyhjenna' in d) { haku = Object.assign(haku, { koot: [], kunnot: [], kirppikset: [], min: '', max: '', jarjestys: 'Uusimmat ensin' }); avaaPaneeli(); return; }
    if ('suljePaneeli' in d) { suljePaneeli(); return; }
    if (d.poista) { e.stopPropagation(); tila.kori = tila.kori.filter((x) => x !== d.poista); tallenna(); piirra(true); return; }
    if (d.vahvista) {
      const id = d.vahvista; const puh = ($('#puh') || {}).value || '';
      if (puh.replace(/\D/g, '').length < 7) { ilmoita('Lisää puhelinnumero'); $('#puh').focus(); return; }
      tila.puhelin = puh;
      tila.varaukset[id] = { numero: 'RS-' + (4000 + Math.floor(Math.random() * 6000)), asti: Date.now() + 48 * 3600 * 1000 };
      tila.kori = tila.kori.filter((x) => x !== id); tallenna(); location.replace('#/varaus/' + id); return;
    }
    if (d.peru) { delete tila.varaukset[d.peru]; tallenna(); ilmoita('Varaus peruttu'); location.hash = '#/tuote/' + d.peru; return; }
    if (d.tapa) { toimitustapa = +d.tapa; piirra(true); return; }
    if (d.maksu) { maksutapa = +d.maksu; piirra(true); return; }
    if ('maksa' in d) {
      const os = { nimi: $('#o-nimi').value.trim(), katu: $('#o-katu').value.trim(), posti: $('#o-posti').value.trim() };
      if (!os.nimi || !os.katu || !/\d{5}/.test(os.posti)) { ilmoita('Täydennä toimitusosoite'); return; }
      tila.osoite = os;
      const tt = tila.kori.map(tuote).filter(Boolean); const tapa = TAVAT[toimitustapa]; const n = kirppisMaara(tt);
      const o = { numero: 'RS-' + (10000 + Math.floor(Math.random() * 90000)), tuotteet: tila.kori.slice(), tapa: tapa[0], paketit: n, osoite: os.katu + ', ' + os.posti,
        summa: tt.reduce((a, t) => a + t.hinta, 0) + tapa[1] * n, arvio: +arkipaivat(new Date(), tapa[2]) };
      tila.tilaukset.unshift(o); tila.ostetut.push(...tila.kori); tila.kori = []; tallenna(); location.replace('#/tilaus/' + o.numero); return;
    }
    if (d.bannerisivu) { bannerisivu = +d.bannerisivu; piirra(true); return; }
    if (d.mp) { mp[d.mp] = +d.arvo; piirra(true); return; }
    if ('mpVahvista' in d) {
      const k = K[mp.kirppis]; const m = { kirppis: k.nimi, poyta: 10 + Math.floor(Math.random() * 40), alku: N.myyntipaikka.alku, viikot: mp.viikot, numero: 'MP-' + (2100 + Math.floor(Math.random() * 800)) };
      tila.myyntipaikat.push(m); tallenna(); location.replace('#/myyntipaikkavaraus/' + m.numero); return;
    }
    if (d.tilitys) { tilitysValilehti = d.tilitys; auki = -1; piirra(true); return; }
    if ('yhteenveto' in d) { yhteenveto = !yhteenveto; piirra(true); return; }
    if (d.siirto) { auki = auki === +d.siirto ? -1 : +d.siirto; piirra(true); return; }
    if (d.ukk) { auki = auki === 100 + +d.ukk ? -1 : 100 + +d.ukk; piirra(true); return; }
    if (d.ilmoita) { ilmoita(d.ilmoita); return; }
    if ('nollaa' in d) { try { localStorage.removeItem(AVAIN); } catch (x) {} location.hash = '#/'; location.reload(); return; }
    if (d.tuote && el.tagName !== 'BUTTON') { location.hash = '#/tuote/' + d.tuote; }
  });
  $('#peite').addEventListener('click', suljePaneeli);

  /* Puhelinkehys skaalautuu tietokoneen ikkunaan */
  function skaalaa() { document.documentElement.style.setProperty('--skaala', Math.min(1, (innerHeight - 32) / 868, (innerWidth - 32) / 414)); }
  addEventListener('resize', skaalaa); skaalaa();
  piirra();
})();
