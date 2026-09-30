(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const c of e)if(c.type==="childList")for(const s of c.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&d(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const c={};return e.integrity&&(c.integrity=e.integrity),e.referrerPolicy&&(c.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?c.credentials="include":e.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function d(e){if(e.ep)return;e.ep=!0;const c=n(e);fetch(e.href,c)}})();const B='<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 55C18 46 6 36 8 22 10 12 20 8 28 13c1.8 1.2 3.3 3 4 5 1-4 6-9 13-9 10 1 15 11 11 23-4 12-14 18-24 23z" fill="var(--leaf)"/><path d="M32 55c0-14 2-26 8-38M33 43c-6-3-12-7-17-13M34 35c6-3 12-6 18-10M34 27c-4-2-9-5-13-9" stroke="var(--paper)" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/><path d="M32 55c-1 3-3 5-6 6.5" stroke="var(--leaf)" stroke-width="3" fill="none" stroke-linecap="round"/></svg>';let _=0;const U=t=>`<defs><radialGradient id="${t}"><stop offset="0" style="stop-color:var(--lit);stop-opacity:.75"/><stop offset=".4" style="stop-color:var(--lit);stop-opacity:.28"/><stop offset="1" style="stop-color:var(--lit);stop-opacity:0"/></radialGradient></defs>`;function V(){return`<g><path class="cattail" d="M62 40c10-2 16-8 14-20" stroke="var(--cat)" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="42" cy="42" rx="23" ry="13" fill="var(--cat)"/>
  <path d="M34 31c2 5 2 17 0 22M44 30c2 5 2 18 0 24M54 32c2 5 2 14 0 20" stroke="var(--cat-dark)" stroke-width="2.4" fill="none" opacity=".7"/>
  <circle cx="20" cy="33" r="12" fill="var(--cat)"/><path d="M10 28 11 15l8 8zM21 22l9-8 1 13z" fill="var(--cat)"/>
  <path d="M13 33q2.5-2.5 5 0M22 33q2.5-2.5 5 0" stroke="var(--eye)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <circle cx="20" cy="37" r="1.3" fill="var(--eye)"/>
  <ellipse cx="30" cy="53" rx="6" ry="3" fill="var(--cat)"/><ellipse cx="52" cy="54" rx="6" ry="3" fill="var(--cat)"/></g>`}function H(t={},a={}){const n="lg"+ ++_,d=(r,i)=>i<(t[r]||0)?" on":"",e=(r,i,l,p,v,b)=>`<rect class="win${d(r,i)}" data-u="${r}" data-i="${i}" x="${l}" y="${p}" width="${v}" height="${b}" rx="3"/>`,c=(r,i,l,p,v,b)=>{let R="";const x=l/b;for(let m=0;m<b;m++){const T=m%2?v:p;R+=`<rect x="${(r+m*x).toFixed(1)}" y="${i}" width="${(x+.6).toFixed(1)}" height="16" fill="${T}"/><circle cx="${(r+m*x+x/2).toFixed(1)}" cy="${i+16}" r="${(x/2).toFixed(1)}" fill="${T}"/>`}return R},s=(r,i,l,p)=>`<g class="cloud ${p}"><g transform="translate(${r} ${i}) scale(${l})" fill="var(--cloud)"><ellipse cx="0" cy="10" rx="46" ry="14"/><circle cx="-16" cy="2" r="16"/><circle cx="10" cy="-4" r="20"/><circle cx="30" cy="6" r="12"/></g></g>`,u=r=>`<g><circle class="glow" cx="${r}" cy="250" r="52" fill="url(#${n})"/><rect x="${r-2}" y="246" width="4" height="84" fill="var(--b-navy)"/><path d="M${r-9} 248h18l-3-11h-12z" fill="var(--b-navy)"/><circle class="bulb" cx="${r}" cy="250" r="4" fill="var(--lit)"/></g>`,o=[[60,40],[150,96],[236,28],[330,70],[420,40],[512,20],[640,64],[700,26],[760,110],[990,36],[1060,18],[1128,74],[1236,30],[1310,58],[1398,96],[1420,24]];let h="",f=0;for(const r of[110,160,210])for(const i of[1190,1247,1304])h+=f<6?e("office",f,i,r,36,34):`<rect class="win" x="${i}" y="${r}" width="36" height="34" rx="3"/>`,f++;return`<svg viewBox="${a.vb||"0 0 1440 400"}" preserveAspectRatio="${a.par||"xMidYMax slice"}" aria-hidden="true">${U(n)}
  <g class="stars">${o.map(([r,i],l)=>`<circle cx="${r}" cy="${i}" r="${l%3?1.5:2.3}" fill="var(--sun)"/>`).join("")}</g>
  <circle cx="905" cy="96" r="30" fill="var(--sun)"/>
  <g class="clouds">${s(170,76,1,"c1")}${s(1090,54,.9,"c2")}${s(620,44,.7,"c3")}</g>
  <g fill="var(--tree-2)" opacity=".7"><circle cx="20" cy="296" r="46"/><circle cx="282" cy="300" r="34"/><circle cx="812" cy="292" r="44"/><circle cx="1162" cy="300" r="30"/><circle cx="1420" cy="296" r="44"/></g>
  <g class="bld" data-u="home">
    <rect x="226" y="80" width="18" height="44" fill="var(--roof)"/><path d="M58 136 170 66l112 70z" fill="var(--roof)"/>
    <rect x="70" y="130" width="200" height="200" fill="var(--b-blue)"/>
    <circle class="win${d("home",0)}" data-u="home" data-i="0" cx="170" cy="108" r="12"/>
    ${e("home",1,92,152,34,44)}${e("home",2,153,152,34,44)}${e("home",3,214,152,34,44)}${e("home",4,92,222,34,44)}${e("home",5,214,222,34,44)}
    <rect x="160" y="230" width="20" height="15" rx="2" fill="var(--card)"/><text x="170" y="241.5" text-anchor="middle" class="plate">1</text>
    <path d="M150 330v-58c0-11 9-20 20-20s20 9 20 20v58z" fill="var(--door)"/><circle cx="183" cy="292" r="2.2" fill="var(--sun)"/>
    <rect x="142" y="326" width="56" height="4" fill="var(--kerb)"/></g>
  <g class="bld" data-u="kettle">
    <rect x="290" y="170" width="230" height="160" fill="var(--b-ochre)"/><rect x="284" y="162" width="242" height="10" rx="2" fill="var(--roof)"/>
    ${[305,348,391,434,477].map((r,i)=>e("kettle",i,r,182,30,30)).join("")}
    <rect x="325" y="219" width="160" height="21" rx="3" fill="var(--sign)"/><text x="405" y="234" text-anchor="middle" class="sign-t">THE KETTLE</text>
    ${c(298,244,214,"var(--awning-a)","var(--awning-b)",8)}
    <rect x="306" y="272" width="140" height="58" fill="var(--window)" stroke="var(--win-frame)" stroke-width="3"/>
    <path d="M322 316h14l-2 12h-10zM344 314h12l-2 14h-8z" fill="var(--china)" opacity=".85"/>
    <rect x="462" y="268" width="42" height="62" fill="var(--door)"/><rect x="468" y="276" width="30" height="24" rx="2" fill="var(--window)"/></g>
  <g><rect x="540" y="236" width="12" height="94" fill="var(--trunk)"/>
    <circle cx="518" cy="238" r="30" fill="var(--tree)"/><circle cx="576" cy="236" r="32" fill="var(--tree)"/><circle cx="546" cy="212" r="42" fill="var(--tree)"/><circle cx="548" cy="176" r="28" fill="var(--tree)"/>
    ${[[530,196],[560,222],[536,236],[566,186],[512,222],[548,168]].map(([r,i])=>`<path d="M${r} ${i+5}c-3-3-7-1-7 2 0 3 7 7 7 7s7-4 7-7c0-3-4-5-7-2z" fill="var(--tree-2)"/>`).join("")}</g>
  <g class="bld" data-u="shop">
    <rect x="600" y="150" width="200" height="180" fill="var(--b-sage)"/><rect x="594" y="142" width="212" height="10" rx="2" fill="var(--roof)"/>
    ${[614,651,688,725,762].map((r,i)=>e("shop",i,r,164,28,36)).join("")}
    <rect x="620" y="211" width="160" height="21" rx="3" fill="var(--door-2)"/><text x="700" y="226" text-anchor="middle" class="sign-t">PRIYA'S</text>
    ${c(606,238,188,"var(--awning-c)","var(--awning-b)",7)}
    <rect x="612" y="266" width="118" height="64" fill="var(--window)" stroke="var(--win-frame)" stroke-width="3"/>
    <rect x="614" y="312" width="52" height="18" fill="var(--wood)"/>
    ${[622,633,644,655].map((r,i)=>`<circle cx="${r}" cy="${310-i%2}" r="5.5" fill="${i%2?"var(--sun)":"var(--postbox)"}"/>`).join("")}
    <rect x="744" y="262" width="40" height="68" fill="var(--door-2)"/><rect x="750" y="270" width="28" height="24" rx="2" fill="var(--window)"/></g>
  <g class="bld" data-u="bus">
    <rect x="842" y="200" width="5" height="130" fill="var(--b-navy)"/>
    <rect x="826" y="176" width="38" height="26" rx="4" fill="var(--postbox)"/><text x="845" y="193.5" text-anchor="middle" class="bus-t">BUS</text>
    <rect x="866" y="252" width="66" height="60" fill="var(--window)" opacity=".75"/>
    <rect x="862" y="246" width="74" height="6" rx="2" fill="var(--b-navy)"/><rect x="864" y="246" width="3" height="84" fill="var(--b-navy)"/><rect x="931" y="246" width="3" height="84" fill="var(--b-navy)"/>
    <rect x="872" y="304" width="46" height="6" rx="2" fill="var(--wood)"/>
    <rect x="902" y="258" width="24" height="44" rx="2" fill="var(--card)"/>
    ${[0,1,2,3,4].map(r=>`<circle class="win dot${d("bus",r)}" data-u="bus" data-i="${r}" cx="914" cy="${266+r*8}" r="2.8"/>`).join("")}</g>
  <g class="bld" data-u="no9">
    <path d="M940 118 1050 58l110 60z" fill="var(--roof)"/><rect x="950" y="112" width="200" height="218" fill="var(--b-rose)"/>
    ${e("no9",0,972,132,34,44)}${e("no9",1,1033,132,34,44)}${e("no9",2,1094,132,34,44)}
    ${[968,1029,1090].map(r=>`<rect x="${r}" y="176" width="42" height="7" rx="2" fill="var(--tree)"/>`+[8,17,26,35].map((i,l)=>`<circle cx="${r+i}" cy="174" r="2.8" fill="${l%2?"var(--sun)":"var(--postbox)"}"/>`).join("")).join("")}
    ${e("no9",3,972,196,34,40)}${e("no9",4,1094,196,34,40)}
    <circle cx="1050" cy="214" r="12" fill="var(--card)"/><text x="1050" y="218.5" text-anchor="middle" class="plate">9</text>
    <path d="M962 258l10-10h78l10 10z" fill="var(--roof)"/>
    <rect x="968" y="258" width="86" height="62" fill="var(--window)" stroke="var(--win-frame)" stroke-width="3"/><path d="M997 258v62M1025 258v62" stroke="var(--win-frame)" stroke-width="2"/>
    <path d="M1086 330v-60c0-11 9-19 21-19s21 8 21 19v60z" fill="var(--door-2)"/><circle cx="1119" cy="292" r="2.2" fill="var(--sun)"/></g>
  <g class="bld" data-u="office">
    <rect x="1170" y="90" width="190" height="240" fill="var(--b-cream)"/><rect x="1164" y="84" width="202" height="10" rx="2" fill="var(--roof)"/>
    ${h}
    <rect x="1230" y="254" width="70" height="8" fill="var(--b-navy)"/>
    <rect x="1238" y="262" width="54" height="68" fill="var(--window)" stroke="var(--win-frame)" stroke-width="3"/><path d="M1265 262v68" stroke="var(--win-frame)" stroke-width="2"/></g>
  ${[280,592,812,942,1160].map(u).join("")}
  <rect x="0" y="330" width="1440" height="22" fill="var(--pave)"/><rect x="0" y="350" width="1440" height="4" fill="var(--kerb)"/><rect x="0" y="354" width="1440" height="46" fill="var(--road)"/>
  <g fill="var(--dash)">${Array.from({length:18},(r,i)=>`<rect x="${20+i*80}" y="375" width="40" height="4" rx="2"/>`).join("")}</g>
  <g transform="translate(316 304) scale(.56)">${V()}</g>
  </svg>`}const M=typeof window<"u"&&"speechSynthesis"in window&&"SpeechSynthesisUtterance"in window,F=/natural|neural|premium|enhanced|serena|daniel|kate|sonia|libby|ryan|google uk/i,A=/bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|albert|fred|junior|ralph|kathy|grandma|grandpa|eddy|flo|reed|rocko|sandy|shelley/i,g={accent:"en-GB",voice:null,loaded:!1},z=new Set,k=t=>(t||"").replace("_","-").toLowerCase();function E(){let t=[];try{t=speechSynthesis.getVoices()}catch{return}if(!t.length)return;g.loaded=!0;const a=t.filter(e=>!A.test(e.name)),n=a.filter(e=>k(e.lang).startsWith(k(g.accent))),d=a.filter(e=>k(e.lang).startsWith("en"));g.voice=n.find(e=>F.test(e.name))||n.find(e=>e.localService)||n[0]||d[0]||null,z.forEach(e=>e(g.voice))}if(M){E();try{speechSynthesis.addEventListener("voiceschanged",E)}catch{speechSynthesis.onvoiceschanged=E}}function q(t){return z.add(t),g.loaded&&t(g.voice),()=>z.delete(t)}function D(t,{rate:a=.95}={}){return M?new Promise(n=>{let d=!1;const e=s=>{d||(d=!0,n(s))},c=(s,u)=>{const o=new SpeechSynthesisUtterance(t);s?(o.voice=s,o.lang=s.lang):o.lang=g.accent,o.rate=a,o.onend=()=>e(!0),o.onerror=()=>{const h=u&&speechSynthesis.getVoices().find(f=>f.localService&&k(f.lang).startsWith("en")&&!A.test(f.name));h?c(h,!1):e(!1)},speechSynthesis.speak(o)};try{speechSynthesis.cancel(),c(g.voice,g.voice&&!g.voice.localService)}catch{e(!1)}setTimeout(()=>e(!0),Math.max(1500,t.length*110/a))}):Promise.resolve(!1)}const G="modulepreload",Y=function(t){return"/linden/"+t},W={},K=function(a,n,d){let e=Promise.resolve();if(n&&n.length>0){let s=function(h){return Promise.all(h.map(f=>Promise.resolve(f).then(r=>({status:"fulfilled",value:r}),r=>({status:"rejected",reason:r}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),o=u?.nonce||u?.getAttribute("nonce");e=s(n.map(h=>{if(h=Y(h),h in W)return;W[h]=!0;const f=h.endsWith(".css"),r=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${r}`))return;const i=document.createElement("link");if(i.rel=f?"stylesheet":G,f||(i.as="script"),i.crossOrigin="",i.href=h,o&&i.setAttribute("nonce",o),document.head.appendChild(i),f)return new Promise((l,p)=>{i.addEventListener("load",l),i.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${h}`)))})}))}function c(s){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=s,window.dispatchEvent(u),!u.defaultPrevented)throw s}return e.then(s=>{for(const u of s||[])u.status==="rejected"&&c(u.reason);return a().catch(c)})};function J(t={}){const{immediate:a=!1,onNeedReload:n,onNeedRefresh:d,onOfflineReady:e,onRegistered:c,onRegisteredSW:s,onRegisterError:u}=t;let o,h,f;const r=async(l=!0)=>{await h,f?.()};async function i(){if("serviceWorker"in navigator){if(o=await K(async()=>{const{Workbox:l}=await import("./workbox-window.prod.es5-BBnX5xw4.js");return{Workbox:l}},[]).then(({Workbox:l})=>new l("/linden/sw.js",{scope:"/linden/",type:"classic"})).catch(l=>{u?.(l)}),!o)return;f=()=>{o?.messageSkipWaiting()};{let l=!1;const p=()=>{l=!0,o?.addEventListener("controlling",v=>{v.isUpdate&&(n?n():window.location.reload())}),d?.()};o.addEventListener("installed",v=>{typeof v.isUpdate>"u"?typeof v.isExternal<"u"&&v.isExternal?p():!l&&e?.():v.isUpdate||e?.()}),o.addEventListener("waiting",p)}o.register({immediate:a}).then(l=>{s?s("/linden/sw.js",l):c?.(l)}).catch(l=>{u?.(l)})}}return h=i(),r}let Q=!1,L=null,y=null;const S=new Set,X=()=>matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0;function Z(){if(!L||Q)return;const t=L;L=null;try{sessionStorage.setItem("linden.updated","1")}catch{}t(!0)}function ee(){try{const t=sessionStorage.getItem("linden.updated")==="1";return sessionStorage.removeItem("linden.updated"),t}catch{return!1}}function te({onOfflineReady:t}={}){if(addEventListener("beforeinstallprompt",n=>{n.preventDefault(),y=n,S.forEach(d=>d(!0))}),addEventListener("appinstalled",()=>{y=null,S.forEach(n=>n(!1))}),navigator.storage?.persist?.().catch(()=>{}),!("serviceWorker"in navigator))return;const a=J({immediate:!0,onNeedRefresh(){L=a,Z()},onOfflineReady(){t?.()},onRegisteredSW(n,d){if(!d)return;const e=()=>{navigator.onLine&&d.update().catch(()=>{})};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&e()}),setInterval(e,3600*1e3)}})}function re(t){S.add(t),t(!!y)}async function ie(){if(!y)return!1;const t=y;y=null,t.prompt();const{outcome:a}=await t.userChoice;return S.forEach(n=>n(!1)),a==="accepted"}const w=(t,a=document)=>a.querySelector(t),P={en:"Hello! Welcome to Linden Lane.",ro:"Bună! Bine ai venit pe Linden Lane."},N={play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.6v12.8a1 1 0 0 0 1.53.85l10.1-6.4a1 1 0 0 0 0-1.7L9.53 4.75A1 1 0 0 0 8 5.6z" fill="currentColor"/></svg>',share:'<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 14V3.5M8 7.5l4-4 4 4M8.5 10.5H6.5a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5V12a1.5 1.5 0 0 0-1.5-1.5h-2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'},ae={"en-gb":"engleză britanică","en-us":"engleză americană","en-au":"engleză australiană","en-ie":"engleză irlandeză"},ne=/iP(hone|ad|od)/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;w("#app").innerHTML=`
  <header class="cover">
    <div class="wrap cover-top">
      <h1 class="wordmark">${B}<span class="en">Linden</span></h1>
      <p class="tagline">Engleza de pe strada ta. Câte cinci minute pe zi.</p>
    </div>
    <div class="lane" id="lane" aria-label="Linden Lane: strada cu lecții">${H()}</div>
  </header>

  <main class="wrap">
    <div class="stack">
      <section class="card">
        <p class="eyebrow">În curând</p>
        <h2>Strada se construiește.</h2>
        <p class="body">Lecțiile se mută aici în curând. Până atunci, verifică dacă se aude vocea:</p>
        <button class="say" id="hello" type="button">
          <span class="play">${N.play}</span>
          <span class="en">${P.en}</span>
        </button>
        <p class="gloss">${P.ro}</p>
        <p class="voice" id="voice">Caut o voce în engleză…</p>
      </section>

      <section class="card" id="install" hidden></section>
    </div>
    <footer class="foot">Linden · <span id="ver">0.1.0 · 2026-09-30 · 93146a0</span></footer>
  </main>`;const C=w("#voice"),I=()=>{C.textContent="Nu am găsit o voce în engleză pe acest dispozitiv."};if(!M)C.textContent="Browserul acesta nu poate citi cu voce tare.";else{const t=setTimeout(I,2500);q(a=>{if(clearTimeout(t),!a)return I();const n=a.name.replace(/^Microsoft\s+/,"").replace(/\s+Online\b.*$/,"").split(/\s+[-–(]/)[0];C.textContent=`Vocea: ${n} · ${ae[a.lang.replace("_","-").toLowerCase()]||"engleză"}`})}w("#hello").addEventListener("click",t=>{const a=t.currentTarget;if(!M)return j("Browserul acesta nu poate citi cu voce tare.");a.classList.add("speaking"),D(P.en).then(()=>a.classList.remove("speaking"))});const $=w("#install");function le(t){if(X()){$.hidden=!0;return}$.hidden=!1;const a='<p class="eyebrow">Instalează</p><h2>Pune Linden pe ecranul principal.</h2>',n='<p class="body">Așa se deschide ca o aplicație, merge și fără internet și se actualizează singură.</p>';ne?$.innerHTML=`${a}
      <ol class="steps">
        <li><span>În Safari, apasă <b>Partajează</b> ${N.share}</span></li>
        <li><span>Alege <b>Adaugă pe ecranul principal</b>.</span></li>
        <li><span>Deschide Linden de pe ecran, de acum încolo.</span></li>
      </ol>${n}`:t?($.innerHTML=`${a}${n}<button class="btn" id="installBtn" type="button">Instalează Linden</button>`,w("#installBtn").addEventListener("click",ie)):$.innerHTML=`${a}${n}<p class="body">În Chrome sau Edge, apasă iconița de instalare din dreapta barei de adrese.</p>`}re(le);let O=0;function j(t){const a=w("#toast");a.textContent=t,a.classList.add("show"),clearTimeout(O),O=setTimeout(()=>a.classList.remove("show"),3400)}te({onOfflineReady:()=>j("Gata: Linden merge acum și fără internet.")});ee()&&j("Linden s-a actualizat.");
