/* Kampanjatunnisteet (utm_*) kulkevat sivulta toiselle linkkien ja lomakkeen mukana.
   Mitään ei tallenneta selaimeen (ei sessionStoragea, localStoragea eikä evästeitä). */
(function(){
  var q=new URLSearchParams(location.search), utm=[];
  ['utm_source','utm_medium','utm_campaign'].forEach(function(k){ var v=q.get(k); if(v) utm.push([k,v]); });
  if(!utm.length) return;
  // linkit sivuston omille sivuille, esim. odotuslista.html
  document.querySelectorAll('a[href]').forEach(function(a){
    var h=a.getAttribute('href');
    if(!/^[a-z-]+\.html(?=$|[?#])/.test(h)) return;
    var u=new URL(h,location.href);
    utm.forEach(function(p){ u.searchParams.set(p[0],p[1]); });
    a.setAttribute('href',h.split(/[?#]/)[0]+u.search+u.hash);
  });
  // footerin sähköpostilomake (GET odotuslistasivulle)
  document.querySelectorAll('form[method="get"][action$=".html"]').forEach(function(f){
    utm.forEach(function(p){ var i=document.createElement('input'); i.type='hidden'; i.name=p[0]; i.value=p[1]; f.appendChild(i); });
  });
})();
