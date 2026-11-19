// Resellan oma ikonisarja: ohut viiva, pyöreät päät, 24 x 24 ruudukko.
// Kaikki ikonit käyttävät tekstin väriä (currentColor).
(function () {
  const s = (d, w) => '<svg viewBox="0 0 24 24" width="' + (w || 22) + '" height="' + (w || 22) + '" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">' + d + '</svg>';
  const P = {
    back: '<path d="M19 12H5M10 7l-5 5 5 5"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',
    user: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 19.5c1-3.5 3.5-5 7-5s6 1.5 7 5"/>',
    menu: '<path d="M5 9h14M5 15h14"/>',
    heart: '<path d="M12 19c-7-4.5-8.5-8-8.5-10.5S5.5 4.5 7.5 4.5 11 5.8 12 7.3c1-1.5 2.5-2.8 4.5-2.8s4 1.5 4 4S19 14.5 12 19z"/>',
    plus: '<path d="M12 6v12M6 12h12"/>',
    x: '<path d="M7 7l10 10M17 7L7 17"/>',
    bag: '<path d="M6 9h12l-1 11H7L6 9z"/><path d="M9.5 9c0-3.5 5-3.5 5 0"/>',
    coins: '<circle cx="9.5" cy="9.5" r="5"/><path d="M18.6 11.9a5 5 0 1 1-6.7 6.7"/>',
    pin: '<path d="M12 20.5c-3-3-6-6.5-6-10.5a6 6 0 0 1 12 0c0 4-3 7.5-6 10.5z"/><circle cx="12" cy="10" r="2"/>',
    sort: '<path d="M8 5v14M5 16l3 3 3-3M16 19V5M13 8l3-3 3 3"/>',
    sliders: '<path d="M5 8h8M17 8h2M5 16h2M11 16h8"/><circle cx="15" cy="8" r="2"/><circle cx="9" cy="16" r="2"/>',
    cam: '<path d="M4 9a2 2 0 0 1 2-2h2.5L10 5h4l1.5 2H18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9z"/><circle cx="12" cy="13" r="3.5"/>',
    sparks: '<path d="M12 4l1.6 6.4L20 12l-6.4 1.6L12 20l-1.6-6.4L4 12l6.4-1.6L12 4z"/>',
    bell: '<path d="M7 16v-5a5 5 0 0 1 10 0v5M5.5 16h13M10.5 19h3"/>',
    shop: '<path d="M4.5 10h15M5.5 10v9h13v-9M4.5 10l2-5h11l2 5"/>',
    chev: '<path d="M10 7l5 5-5 5"/>',
    chevd: '<path d="M7 10l5 5 5-5"/>',
    grid: '<path d="M5 8h14M5 12h14M5 16h8"/>',
    hanger: '<path d="M10 7.5c0-2.2 4-2.2 4 0 0 1.5-2 2-2 3.5l-8.5 6.5h17L12 11"/>',
    shoe: '<path d="M4 16V9.5l4 .5c1 2 3 3 5 3.2l5 .8c1.5.3 2 1.2 2 2v.5H4zM4 18.5h16"/>',
    lamp: '<path d="M8 4h8l2.5 7h-13L8 4zM12 11v8M8 19.5h8"/>',
    ball: '<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c-3 3-3 13 0 16"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.5 1.5"/>',
    check: '<path d="M6 12.5l4 4 8-8.5"/>',
    bank: '<path d="M4.5 9L12 4.5 19.5 9h-15zM7 11v6M12 11v6M17 11v6M4.5 19.5h15"/>',
    box: '<path d="M4.5 7.5L12 4l7.5 3.5v9L12 20l-7.5-3.5v-9zM4.5 7.5L12 11l7.5-3.5M12 11v9"/>',
    stores: '<path d="M4.5 10h15M5.5 10v9h13v-9M4.5 10l2-5h11l2 5"/>',
    tag: '<path d="M4.5 12.5V5H12l7.5 7.5L12 20l-7.5-7.5z"/><circle cx="8.5" cy="8.5" r="1"/>',
    wallet: '<rect x="4" y="7" width="16" height="11" rx="2"/><path d="M15.5 12.5H17"/>',
    info: '<circle cx="12" cy="12" r="8"/><path d="M12 11v5M12 8h.01"/>',
    gear: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7.5"/>',
    bookmark: '<path d="M7.5 4.5h9v15L12 16l-4.5 3.5v-15z"/>',
    chat: '<path d="M5 6h14v10H10l-4 3v-3H5V6z"/>'
  };
  // vanhat nimet uusiin
  const A = { cart: 'plus', bmk: 'bookmark', nav_list: 'search', nav_heart: 'heart', nav_bag: 'bag', nav_sell: 'coins', dress: 'hanger', shirt: 'hanger', kid: 'ball', cup: 'lamp', hourglass: 'clock', sparkle: 'sparks', chev_r: 'chev', list: 'grid' };
  const I = {};
  Object.keys(P).forEach((k) => { I[k] = s(P[k]); });
  Object.keys(A).forEach((k) => { I[k] = I[A[k]]; });
  window.IKONIT = I;
})();
