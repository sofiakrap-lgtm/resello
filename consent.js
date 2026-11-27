/* Evästeiden suostumus ja Google Analytics.
   Google Analytics ladataan VAIN, jos kävijä painaa "Hyväksy tilastointi".
   Ennen valintaa sivu ei ota yhteyttä Googleen eikä tallenna mitään.
   Valinta tallennetaan selaimeen (välttämätön tieto), ja sen voi muuttaa
   mistä tahansa linkistä, jolla on data-evasteet-attribuutti. */
(function(){
  var GA_ID='G-3PW5X5T251'; // Google Analytics 4, tili Resella Oy, ominaisuus resella.fi. Tyhjä = ei käytössä
  var AVAIN='rs-suostumus'; // 'kylla' tai 'ei'
  var en=(document.documentElement.lang||'').slice(0,2)==='en';
  var T=en?{
    h:'Cookies and AI',
    p:'With your consent we use Google Analytics to see how many people visit the site and which pages they read. It sets cookies. If you choose only necessary, we store just your choice. Some images and videos on this site are fully or partly made with AI.',
    l:'Privacy policy', lh:'privacy.html', yes:'Accept statistics', no:'Only necessary'
  }:{
    h:'Evästeet ja tekoäly',
    p:'Suostumuksellasi käytämme Google Analyticsia, jotta näemme, kuinka moni käy sivulla ja mitä sivuja luetaan. Se asettaa evästeitä. Jos valitset vain välttämättömät, tallennamme vain valintasi. Osa sivun kuvista ja videoista on tehty kokonaan tai osittain tekoälyllä.',
    l:'Tietosuojaseloste', lh:'tietosuoja.html', yes:'Hyväksy tilastointi', no:'Vain välttämättömät'
  };

  function lue(){ try{ return localStorage.getItem(AVAIN); }catch(e){ return null; } }
  function tallenna(v){ try{ localStorage.setItem(AVAIN,v); localStorage.removeItem('rs-cookie'); }catch(e){} }

  function lataaGA(){
    if(!GA_ID || window.__rsGA) return; window.__rsGA=1;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){ dataLayer.push(arguments); };
    gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    gtag('js',new Date());
    gtag('config',GA_ID,{allow_google_signals:false,allow_ad_personalization_signals:false});
    var s=document.createElement('script'); s.async=true; s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(GA_ID);
    document.head.appendChild(s);
  }
  function poistaGA(){
    // poistaa Google Analyticsin evästeet, kun suostumus perutaan
    document.cookie.split(';').forEach(function(c){
      var n=c.split('=')[0].trim();
      if(/^_ga(_|$)|^_gid$|^_gat/.test(n)){
        var h=location.hostname.split('.'), d;
        for(var i=0;i<h.length;i++){ d=h.slice(i).join('.'); document.cookie=n+'=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain='+d; }
        document.cookie=n+'=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      }
    });
  }

  var css='.rs-ck{position:fixed;left:24px;bottom:24px;z-index:200;width:400px;max-width:calc(100% - 32px);box-sizing:border-box;background:#3E2520;color:#ECECDC;border-radius:20px;padding:20px 22px;display:flex;flex-direction:column;gap:14px;font-family:"Inter Tight",Arial,sans-serif}'
   +'.rs-ck[hidden]{display:none}'
   +'.rs-ck strong{font:600 18px/1.2 "Inter Tight",Arial,sans-serif;letter-spacing:-.01em}'
   +'.rs-ck p{margin:0;font-size:15px;line-height:1.45;color:#CDBFB2}'
   +'.rs-ck p a{color:#ECECDC;text-underline-offset:3px}'
   +'.rs-ck-b{display:flex;gap:8px;flex-wrap:wrap}'
   +'.rs-ck button{flex:1 1 0;min-width:140px;height:40px;padding:0 16px;border-radius:999px;font:600 15px/1 "Inter Tight",Arial,sans-serif;letter-spacing:-.2px;cursor:pointer;border:1px solid #ECECDC;transition:background-color .2s cubic-bezier(.45,0,.55,1),color .2s cubic-bezier(.45,0,.55,1)}'
   +'.rs-ck .y{background:#ECECDC;color:#3E2520}.rs-ck .n{background:transparent;color:#ECECDC}'
   +'.rs-ck button:hover{background:#C5D0D3;color:#3E2520;border-color:#C5D0D3}'
   +'.rs-ck button:focus-visible{outline:2px solid #C5D0D3;outline-offset:2px}'
   +'@media(max-width:767px){.rs-ck{left:16px;right:16px;width:auto;max-width:none;bottom:calc(96px + env(safe-area-inset-bottom))}.rs-ck-b{flex-direction:column}.rs-ck button{flex:none;width:100%}}';

  var el;
  function rakenna(){
    if(el) return el;
    var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
    el=document.createElement('div'); el.className='rs-ck'; el.setAttribute('role','region'); el.setAttribute('aria-label',T.h); el.hidden=true;
    el.innerHTML='<strong>'+T.h+'</strong><p>'+T.p+' <a href="'+T.lh+'">'+T.l+'</a></p>'
      +'<div class="rs-ck-b"><button type="button" class="y">'+T.yes+'</button><button type="button" class="n">'+T.no+'</button></div>';
    document.body.appendChild(el);
    el.querySelector('.y').addEventListener('click',function(){ tallenna('kylla'); el.hidden=true; lataaGA(); });
    el.querySelector('.n').addEventListener('click',function(){
      var oli=lue()==='kylla'; tallenna('ei'); el.hidden=true; poistaGA();
      if(oli && window.__rsGA) location.reload(); // pysäyttää jo ladatun tilastoinnin
    });
    return el;
  }
  function avaa(){ rakenna().hidden=false; }
  window.rsEvasteet=avaa;

  function alusta(){
    // vanha ilmoitus pois, jos se on vielä sivulla
    var vanha=document.getElementById('cookie'); if(vanha) vanha.remove();
    document.querySelectorAll('[data-evasteet]').forEach(function(a){ a.addEventListener('click',function(e){ e.preventDefault(); avaa(); }); });
    var v=lue();
    if(v==='kylla') lataaGA();
    else if(v!=='ei') setTimeout(avaa,1200);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',alusta); else alusta();
})();
