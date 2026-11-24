/* Lomakkeen lähetys Resellan API:in samalla palvelimella. API välittää tiedot MailerLiteen.
   Avaimia ei ole eikä saa olla tällä sivulla: ne ovat vain API:n palvelimella.

   rsLaheta(tiedot) palauttaa Promisen, joka ei koskaan hylkää:
     {tila:'ok', tuplavahvistus:true|false}   200 {ok:true}
     {tila:'virhe', kentat:{kenttä:viesti}}   400
     {tila:'liikaa'}                          429
     {tila:'ei-yhteytta'}                     503, 404, muu vastaus, verkkovirhe tai aikaraja: sivu käyttää sähköpostia */
(function(){
  var OSOITE='/api/v1/landing/tilaa', AIKARAJA=20000, EI={tila:'ei-yhteytta'};
  window.rsLaheta=function(tiedot){
    if(!window.fetch||!window.AbortController) return Promise.resolve(EI);
    var katko=new AbortController(), ajastin=setTimeout(function(){ katko.abort(); },AIKARAJA);
    return fetch(OSOITE,{method:'POST',credentials:'omit',redirect:'error',signal:katko.signal,
      headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(tiedot)})
    .then(function(r){
      if(r.status===200) return r.json().then(function(j){ return j&&j.ok===true?{tila:'ok',tuplavahvistus:j.tuplavahvistus===true}:EI; });
      if(r.status===400) return r.json().catch(function(){ return null; }).then(function(j){ return {tila:'virhe',kentat:(j&&j.kentat)||{}}; });
      if(r.status===429) return {tila:'liikaa'};
      return EI;
    }).catch(function(){ return EI; }).then(function(v){ clearTimeout(ajastin); return v; });
  };
})();
