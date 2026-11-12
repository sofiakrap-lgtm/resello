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
  let tila = { suosikit: [], kori: [], varaukset: {}, tilaukset: [], ostetut: [], haut: ['Farkut', 'Neule', 'Kuoritakki'], tiedote: true, puhelin: '040 123 4567', osoite: { nimi: 'Anna Esimerkki', katu: 'Esimerkkikatu 10 A 2', posti: '00100 Helsinki' } };
  try { const t = JSON.parse(localStorage.getItem(AVAIN)); if (t) tila = Object.assign(tila, t); } catch (e) {}
  const tallenna = () => { try { localStorage.setItem(AVAIN, JSON.stringify(tila)); } catch (e) {} };
  function siivoa() { // varaus raukeaa 48 h jälkeen, myydyt pois korista
    let m = false;
    for (const id of Object.keys(tila.varaukset)) if (tila.varaukset[id].asti < Date.now()) { delete tila.varaukset[id]; m = true; }
    const k = tila.kori.filter((id) => !tila.ostetut.includes(id) && !tila.varaukset[id]); if (k.length !== tila.kori.length) { tila.kori = k; m = true; }
    if (m) tallenna();
  }
  const myynnissa = (t) => !tila.ostetut.includes(t.id);

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
  const kuvausrivi = (t) => (t.koko && t.kokotyyppi !== 'Ei kokoa' ? 'Koko ' + t.koko + ', ' : '') + t.kunto.toLowerCase();

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
          <button class="${t.ikoni}" data-kori="${t.id}" aria-label="Lisää ostoskoriin">${ik('cart')}</button>
          <button class="${t.ikoni}" data-sydan="${t.id}" aria-label="Suosikki">${ik('heart', 'sydan' + (s ? ' paalla' : ''))}<span>${tykkaykset(t)}</span></button>
        </div></div>
      <div class="tekstit"><div class="nimi">${esc(t.nimi)}</div><div class="kuvaus">${esc(kuvausrivi(t))}</div>
        <div class="sijainti">${ik('pin')}${esc(t.kirppis)}</div><div class="hinta">${eur(t.hinta)}</div></div>
    </article>`;
  }
  const ylapalkki = (otsikko, takaisin, oikea) => `<header class="ylapalkki">
      ${takaisin ? `<button class="ikoni-nappi" data-takaisin aria-label="Takaisin">${ik('back')}</button>` : ''}
      <h1>${otsikko}</h1>${oikea || ''}<button class="ikoni-nappi" data-mene="#/profiili" aria-label="Profiili">${ik('user')}</button></header>`;
  const tuoterivi = (t, lisa, poisto) => `<div class="tuoterivi" data-tuote="${t.id}"><img src="${t.kuva}" alt="">
      <div class="tiedot"><b style="font-size:16px;font-weight:600">${esc(t.nimi)}</b><span class="himmea">${esc(kuvausrivi(t))}</span>
      <span class="sijainti">${ik('pin')}${esc(t.kirppis)}${lisa || ''}</span><span class="hinta">${eur(t.hinta)}</span></div>
      ${poisto ? `<button class="poista" data-poista="${t.id}" aria-label="Poista">${ik('x')}</button>` : ''}</div>`;

  /* ---------- Suodatus ---------- */
  let haku = { q: '', ryhma: '', koot: [], kunnot: [], kirppikset: [], min: '', max: '', jarjestys: 'Suositeltu' };
  const JARJ = ['Suositeltu', 'Hinta: pienin ensin', 'Hinta: suurin ensin'];
  function osuu(t, q) {
    if (!q) return true;
    const h = norm([t.nimi, t.kategoria, t.tyyppi, t.vari, t.kirppis, t.kokotyyppi].join(' '));
    return norm(q).split(/\s+/).every((s) => h.includes(s.replace(/t$/, '')));
  }
  function tulokset(ohita) {
    let r = T.filter(myynnissa).filter((t) => osuu(t, haku.q)
      && (!haku.ryhma || ryhma(t) === haku.ryhma || (t.kokotyyppi === 'Unisex' && ['Naisten', 'Miesten'].includes(haku.ryhma)))
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
    const lista = T.filter(myynnissa).filter((t) => kotiValilehti === 'Kaikki' || t.kokotyyppi === (kotiValilehti === 'Naiset' ? 'Naisten' : 'Miesten') || t.kokotyyppi === 'Unisex');
    const b = banneri(kotiValilehti); const asu = b.tuotteet.map(tuote).filter(Boolean).filter(myynnissa);
    return {
      html: `<div class="kotipalkki"><button class="hakukentta" data-mene="#/haku">${ik('search')}<span>Mitä haluaisit ostaa?</span>${ik('cam')}</button>
        <button class="merkki" data-mene="#/varaukset" aria-label="Varaukset">${ik('bell')}${Object.keys(tila.varaukset).length ? `<i>${Object.keys(tila.varaukset).length}</i>` : ''}</button>
        <button data-mene="#/profiili" aria-label="Profiili">${ik('user')}</button></div>
      <div class="valilehdet">${['Kaikki', 'Naiset', 'Miehet'].map((v) => `<button class="${v === kotiValilehti ? 'valittu' : ''}" data-valilehti="${v}">${v}</button>`).join('')}</div>
      <section class="banneri"><img src="${b.kuva}" alt=""><div class="teksti">
        <h2>${esc(b.otsikko)}</h2><p>${esc(b.teksti)}</p>
        <button class="vaalea-nappi" data-mene="#/asu/${kotiValilehti}">Katso asu</button></div></section>
      <button class="osio-otsikko" data-mene="#/asu/${kotiValilehti}">Asun löydöt ${ik('chev')}</button>
      <div class="karuselli">${asu.map(kortti).join('')}</div>
      <h2 class="osio-otsikko">Uusimmat löydöt</h2>
      <div class="ruudukko">${lista.map(kortti).join('')}</div><div class="vali"></div>`,
      ala: tila.tiedote ? `<div class="tiedote"><span>Varaus on aina ilmainen kirppiksillä</span><button data-sulje-tiedote aria-label="Sulje">${ik('x')}</button></div>` : '',
      nav: 'koti'
    };
  };

  N.haku = () => {
    return {
      html: `<div class="kotipalkki"><button data-takaisin aria-label="Takaisin">${ik('back')}</button>
        <form class="hakukentta" id="hakulomake">${ik('search')}<input id="hakusyote" type="text" enterkeyhint="search" placeholder="Mitä haluaisit ostaa?" autocomplete="off"></form></div>
        <div id="ehdotukset"></div>`,
      nav: null, jalkeen: () => { const s = $('#hakusyote'); s.focus(); s.addEventListener('input', ehdota); $('#hakulomake').addEventListener('submit', (e) => { e.preventDefault(); hae(s.value); }); ehdota(); }
    };
  };
  function ehdota() {
    const q = ($('#hakusyote') || {}).value || '';
    const el = $('#ehdotukset'); if (!el) return;
    if (!q.trim()) {
      el.innerHTML = `<div class="ryhmaotsikko">Viimeisimmät haut</div>` + tila.haut.map((h) => `<button class="hakurivi" data-hae="${esc(h)}">${esc(h)}<small>Haku</small></button>`).join('');
      return;
    }
    const nimet = [...new Set(T.filter(myynnissa).filter((t) => osuu(t, q)).map((t) => t.nimi))].slice(0, 5);
    const kat = [...new Set(T.map((t) => t.tyyppi))].filter((k) => norm(k).includes(norm(q))).slice(0, 4);
    const kir = K.filter((k) => norm(k.nimi).includes(norm(q)));
    el.innerHTML = `<div class="ehdotukset"><button class="chip" data-hae="${esc(q)}">Hae "${esc(q)}"</button></div>`
      + (nimet.length ? `<div class="ryhmaotsikko">Tuotteet</div>` + nimet.map((n) => `<button class="hakurivi" data-hae="${esc(n)}">${esc(n)}<small>Tuote</small></button>`).join('') : '')
      + (kat.length ? `<div class="ryhmaotsikko">Kategoriat</div>` + kat.map((n) => `<button class="hakurivi" data-hae="${esc(n)}">${esc(n)}<small>Kategoria</small></button>`).join('') : '')
      + (kir.length ? `<div class="ryhmaotsikko">Kirppikset</div>` + kir.map((k) => `<button class="hakurivi" data-kirppis="${esc(k.nimi)}">${esc(k.nimi)}<small>Kirppis</small></button>`).join('') : '');
  }
  function hae(q) {
    q = (q || '').trim();
    if (q) { tila.haut = [q, ...tila.haut.filter((h) => norm(h) !== norm(q))].slice(0, 6); tallenna(); }
    haku = Object.assign(haku, { q, koot: [], kunnot: [], kirppikset: [], min: '', max: '' });
    location.hash = '#/tulokset';
  }

  const RYHMAT = [['Naisten', 'Naiset', 'dress'], ['Miesten', 'Miehet', 'shirt'], ['Lapset', 'Lapset', 'kid'], ['Koti', 'Koti', 'cup']];
  N.tulokset = () => {
    const r = tulokset(); const m = suodatinMaara();
    const otsikko = haku.q || (haku.kirppikset.length === 1 && !haku.ryhma ? haku.kirppikset[0] : '') || (RYHMAT.find((x) => x[0] === haku.ryhma) || [])[1] || 'Kaikki löydöt';
    return {
      html: `<header class="ylapalkki"><button class="ikoni-nappi" data-takaisin aria-label="Takaisin">${ik('back')}</button>
        <h1 data-mene="#/haku" style="cursor:text">${esc(otsikko)}</h1>
        <button class="ikoni-nappi" data-mene="#/haku" aria-label="Hae">${ik('search')}</button>
        <button class="ikoni-nappi" data-mene="#/profiili" aria-label="Profiili">${ik('user')}</button></header>
      <div class="ryhmarivi">${RYHMAT.map(([k, n, i]) => `<button class="${!haku.ryhma || haku.ryhma === k ? 'valittu' : ''}" data-ryhma="${k}">${ik(i)}${n}</button>`).join('')}</div>
      <div class="suodatinrivi"><button class="chip" data-suodattimet>${ik('sliders')}Kaikki suodattimet${m ? ' (' + m + ')' : ''}</button>
        <button class="chip ${haku.koot.length ? 'tumma' : ''}" data-suodattimet="koko">Koko</button>
        <button class="chip ${haku.min !== '' || haku.max !== '' ? 'tumma' : ''}" data-suodattimet="hinta">Hinta</button>
        <button class="chip ${haku.kunnot.length ? 'tumma' : ''}" data-suodattimet="kunto">Kunto</button>
        <button class="chip ${haku.kirppikset.length ? 'tumma' : ''}" data-suodattimet="kirppis">Kirppis</button></div>
      ${haku.q || m ? `<div class="valitut">${haku.q ? `<span class="valittu-chip">'${esc(haku.q)}'<button data-poista-haku aria-label="Poista haku">${ik('x')}</button></span>` : ''}<button class="linkki" data-tyhjenna>Tyhjennä</button></div>` : ''}
      ${haku.kirppikset.length === 1 && !haku.q ? (() => { const k = kirppis(haku.kirppikset[0]); return `<div class="osio" style="padding:8px 16px 4px"><div class="laatikko">${ik('shop')}<div class="rivit"><span class="iso">${esc(k.nimi)}</span><span class="himmea">${esc(k.osoite)}</span><span class="himmea">Avoinna ${esc(k.aukiolo)}</span></div></div></div>`; })() : ''}
      <div class="lajittelu"><button data-jarjestys>${ik('sort')}${haku.jarjestys}</button><span>${r.length} tulosta</span></div>
      ${r.length ? `<div class="ruudukko">${r.map(kortti).join('')}</div>` : `<div class="tyhja"><h2 class="otsikko-iso">Ei osumia</h2><p>Kokeile toista hakusanaa tai poista suodattimia.</p></div>`}<div class="vali"></div>`,
      nav: 'selaa'
    };
  };

  N.tuote = (id) => {
    const t = tuote(id); if (!t) return N.koti();
    const v = tila.varaukset[id]; const myyty = tila.ostetut.includes(id); const korissa = tila.kori.includes(id);
    return {
      html: ylapalkki(esc(t.tyyppi), true) + `<div class="tuotekuva"><img src="${t.kuva}" alt="${esc(t.nimi)}">
        <button class="kuvasydan" data-sydan="${t.id}" aria-label="Suosikki">${ik('heart', 'sydan' + (tila.suosikit.includes(t.id) ? ' paalla' : ''))}</button></div>
      <div class="osio" style="gap:6px;padding:16px"><div class="tuoteotsikko"><h2>${esc(t.nimi)}</h2><b>${eur(t.hinta)}</b></div>
        <span class="himmea" style="font-size:15px">${esc(t.vari)}, ${esc(kuvausrivi(t))}</span><button class="sijainti" data-kirppis="${esc(t.kirppis)}">${ik('pin')}${esc(t.kirppis)}</button></div>
      <div class="raita"></div>
      <div class="osio"><div class="laatikko">${ik('shop')}<span class="iso" style="font-size:15px">${myyty ? 'Tämä löytö on jo myyty.' : v ? 'Varattu sinulle. Nouda ' + pvm(new Date(v.asti)) + ' ' + klo(new Date(v.asti)) + ' mennessä.' : 'Varaa nyt, nouda 48 h sisällä ja maksa kirppiksellä'}</span></div></div>
      <div class="osio" style="padding-top:0;gap:4px"><span class="osio-label">Kunto</span><span class="himmea" style="font-size:15px">${esc(t.kunnonKuvaus)}.</span></div>
      <div class="osio" style="padding-top:0;gap:4px"><span class="osio-label">Tiedot</span><span class="himmea" style="font-size:15px">${esc(t.kategoria)}, ${esc(t.tyyppi.toLowerCase())}${t.kokotyyppi !== 'Ei kokoa' ? ', ' + esc(t.kokotyyppi.toLowerCase()) : ''}</span></div>`,
      ala: myyty ? `<div class="toimintopalkki"><button class="nappi ulko" data-mene="#/selaa">Selaa muita löytöjä</button></div>` : `<div class="toimintopalkki">${v
        ? `<button class="nappi" data-mene="#/varaus/${id}">Näytä varaus</button>`
        : `${korissa ? `<button class="nappi ulko" data-mene="#/kori">Korissa</button>` : `<button class="nappi ulko" data-kori="${id}">Lisää koriin</button>`}<button class="nappi" data-mene="#/varaa/${id}">Varaa</button>`}</div>`,
      nav: 'selaa'
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
    const summa = tt.reduce((a, t) => a + t.hinta, 0); const n = kirppisMaara(tt);
    return {
      html: ylapalkki('Ostoskori') + `<div class="osio" style="gap:6px"><span style="font-size:14px">Toimitus arviolta <b style="font-weight:600">${pvm(arkipaivat(new Date(), 2))}</b></span>
        ${n > 1 ? `<span class="himmea" style="font-size:13px">Tuotteet tulevat ${n} kirppikseltä, ${n} erillistä pakettia.</span>` : ''}</div><div class="raita"></div>`
        + tt.map((t) => tuoterivi(t, '', true)).join('<div style="height:1px;background:var(--line)"></div>')
        + `<div class="raita"></div><div class="osio"><div class="laatikko">${ik('shop')}<span class="iso" style="font-size:15px">Haluatko noutaa itse? Varaa tuote sen omalta sivulta.</span></div></div>`,
      ala: `<div class="yhteenveto"><div class="summa vahva">Yhteensä (sis. ALV)<b>${eur(summa)} *</b></div><span class="himmea" style="font-size:13px;margin-top:-6px">*Toimitus lisätään seuraavassa vaiheessa</span><button class="nappi" data-mene="#/toimitus">Siirry maksamaan</button></div>`,
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
    html: `<div class="kotipalkki"><button class="hakukentta" data-mene="#/haku">${ik('search')}<span>Mitä haluaisit ostaa?</span>${ik('cam')}</button>
      <button data-mene="#/profiili" aria-label="Profiili">${ik('user')}</button></div>
      <div class="ryhmaotsikko">Kategoriat</div>
      ${[['', 'Kaikki löydöt', 'grid'], ['Naisten', 'Naiset', 'dress'], ['Miesten', 'Miehet', 'shirt'], ['Lapset', 'Lapset', 'kid'], ['Koti', 'Koti ja astiat', 'cup']]
        .map(([k, n, i]) => `<button class="hakurivi" data-selaa-ryhma="${k}"><span style="display:flex;gap:16px;align-items:center">${ik(i)}${n}</span>${ik('chev_r')}</button>`).join('')}
      <div class="ryhmaotsikko" style="padding-top:28px">Tutustu kirppiksiin</div>
      ${K.map((k) => `<button class="hakurivi" data-kirppis="${esc(k.nimi)}"><span style="display:flex;gap:16px;align-items:center">${ik('shop')}<span>${esc(k.nimi)}<br><small>${esc(k.osoite)}</small></span></span>${ik('chev_r')}</button>`).join('')}<div class="vali"></div>`,
    nav: 'selaa'
  });

  N.myy = () => ({
    html: ylapalkki('Myy') + `<div class="osio" style="gap:8px"><h2 style="font-size:28px;font-weight:600">Myy kirppiksellä</h2>
      <p class="himmea" style="font-size:15px">Myyjän näkymät tulevat appiin myöhemmin. Tässä demossa voit kokeilla ostamista: hakua, varausta ja kotiinkuljetusta.</p></div>
      <div class="raita"></div><div class="osio"><button class="nappi ulko" data-nollaa>Aloita demo alusta</button>
      <span class="himmea" style="font-size:13px">Tyhjentää suosikit, ostoskorin, varaukset ja tilaukset tästä selaimesta.</span></div>`,
    nav: 'myy'
  });
  N.profiili = N.myy;

  /* ---------- Suodatinpaneeli ---------- */
  function avaaPaneeli(kohta) {
    const p = $('#paneeli');
    const koot = [...new Set(tulokset('koko').map((t) => t.koko).filter((k) => k && k !== 'Onesize'))];
    const ryh = (otsikko, avain, arvot) => `<div class="osio" id="p-${avain}"><span class="osio-label">${otsikko}</span><div class="valinnat">${arvot.map((a) => `<button class="valinta ${haku[avain].includes(a) ? 'valittu' : ''}" data-p="${avain}" data-arvo="${esc(a)}">${esc(a)}</button>`).join('') || '<span class="himmea">Ei valittavaa</span>'}</div></div>`;
    p.innerHTML = `<header><h3>Suodattimet</h3><button data-sulje-paneeli aria-label="Sulje">${ik('x')}</button></header><div class="runko">
      <div class="osio"><span class="osio-label">Järjestys</span><div class="valinnat">${JARJ.map((j) => `<button class="valinta ${haku.jarjestys === j ? 'valittu' : ''}" data-jarj="${j}">${j}</button>`).join('')}</div></div><div class="raita"></div>
      ${ryh('Koko', 'koot', koot)}<div class="raita"></div>
      <div class="osio" id="p-hinta"><span class="osio-label">Hinta</span><div class="hintarivi">
        <label class="arvokentta"><input id="pmin" inputmode="numeric" placeholder="0" value="${haku.min}"><small>EUR</small></label><span>-</span>
        <label class="arvokentta"><input id="pmax" inputmode="numeric" placeholder="1000" value="${haku.max}"><small>EUR</small></label></div>
        <div class="valinnat">${[['', 20, 'Alle 20 EUR'], [20, 50, '20-50 EUR'], [50, 100, '50-100 EUR'], [100, '', 'Yli 100 EUR']].map(([a, b, n]) => `<button class="valinta" data-hinta="${a}|${b}">${n}</button>`).join('')}</div></div><div class="raita"></div>
      ${ryh('Kunto', 'kunnot', ['Erinomainen', 'Hyvä', 'Kohtalainen', 'Kulunut'])}<div class="raita"></div>
      ${ryh('Kirppis', 'kirppikset', K.map((k) => k.nimi))}</div>
      <footer><button class="linkki" data-p-tyhjenna>Tyhjennä kaikki</button><button class="nappi" data-sulje-paneeli>Näytä tulokset (${tulokset().length})</button></footer>`;
    p.classList.add('auki'); $('#peite').classList.add('auki');
    const hk = () => { haku.min = $('#pmin').value.replace(/\D/g, ''); haku.max = $('#pmax').value.replace(/\D/g, ''); paivitaNappi(); };
    $('#pmin').addEventListener('input', hk); $('#pmax').addEventListener('input', hk);
    if (kohta) { const el = $('#p-' + ({ koko: 'koot', kunto: 'kunnot', kirppis: 'kirppikset', hinta: 'hinta' }[kohta])); if (el) el.scrollIntoView(); }
  }
  function paivitaNappi() { const b = $('#paneeli footer .nappi'); if (b) b.textContent = 'Näytä tulokset (' + tulokset().length + ')'; }
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
    nav.innerHTML = [['selaa', 'nav_list', 'Selaa'], ['suosikit', 'nav_heart', 'Suosikit'], ['koti', '', 'Koti'], ['kori', 'nav_bag', 'Ostoskori'], ['myy', 'nav_sell', 'Myy']]
      .map(([k, i, l]) => `<button class="${k === a ? 'valittu' : ''} ${k === 'koti' ? 'pilvi' : ''}" data-mene="#/${k === 'koti' ? '' : k}" aria-label="${l}">${k === 'koti' ? `<img src="kuvat/pilvi${a === 'koti' ? '_aktiivinen' : ''}.png" alt="">` : k === 'kori' ? `<span class="merkki">${ik(i)}${n ? `<i>${n}</i>` : ''}</span>` : ik(i)}</button>`).join('');
  }
  function piirra(sailytaVieritys) {
    const r = reitti(); const y = sis.scrollTop; siivoa();
    const f = N[r.nimi] || N.koti; const v = f(r.arg);
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
    if (d.valilehti) { kotiValilehti = d.valilehti; piirra(true); return; }
    if ('suljeTiedote' in d) { tila.tiedote = false; tallenna(); ala.innerHTML = ''; return; }
    if (d.hae !== undefined) { hae(d.hae); return; }
    if (d.kirppis) { haku = Object.assign(haku, { q: '', ryhma: '', koot: [], kunnot: [], kirppikset: [d.kirppis], min: '', max: '' }); location.hash = '#/tulokset'; return; }
    if (d.selaaRyhma !== undefined) { haku = Object.assign(haku, { q: '', ryhma: d.selaaRyhma, koot: [], kunnot: [], kirppikset: [], min: '', max: '' }); location.hash = '#/tulokset'; return; }
    if (d.ryhma) { haku.ryhma = haku.ryhma === d.ryhma ? '' : d.ryhma; piirra(true); return; }
    if (d.suodattimet !== undefined) { avaaPaneeli(d.suodattimet); return; }
    if ('poistaHaku' in d) { haku.q = ''; piirra(true); return; }
    if ('tyhjenna' in d) { haku = Object.assign(haku, { q: '', koot: [], kunnot: [], kirppikset: [], min: '', max: '' }); piirra(true); return; }
    if ('jarjestys' in d) { haku.jarjestys = JARJ[(JARJ.indexOf(haku.jarjestys) + 1) % JARJ.length]; piirra(true); return; }
    if (d.p) { const a = haku[d.p]; const i = a.indexOf(d.arvo); i < 0 ? a.push(d.arvo) : a.splice(i, 1); el.classList.toggle('valittu'); paivitaNappi(); return; }
    if (d.jarj) { haku.jarjestys = d.jarj; el.parentNode.querySelectorAll('.valinta').forEach((b) => b.classList.toggle('valittu', b === el)); return; }
    if (d.hinta) { const [a, b] = d.hinta.split('|'); haku.min = a; haku.max = b; $('#pmin').value = a; $('#pmax').value = b; paivitaNappi(); return; }
    if ('pTyhjenna' in d) { haku = Object.assign(haku, { koot: [], kunnot: [], kirppikset: [], min: '', max: '', jarjestys: 'Suositeltu' }); avaaPaneeli(); return; }
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
    if ('nollaa' in d) { try { localStorage.removeItem(AVAIN); } catch (x) {} location.hash = '#/'; location.reload(); return; }
    if (d.tuote && el.tagName !== 'BUTTON') { location.hash = '#/tuote/' + d.tuote; }
  });
  $('#peite').addEventListener('click', suljePaneeli);

  /* Puhelinkehys skaalautuu tietokoneen ikkunaan */
  function skaalaa() { document.documentElement.style.setProperty('--skaala', Math.min(1, (innerHeight - 32) / 868, (innerWidth - 32) / 414)); }
  addEventListener('resize', skaalaa); skaalaa();
  piirra();
})();
