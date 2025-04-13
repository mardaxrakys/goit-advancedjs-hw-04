var E=Object.defineProperty;var S=(t,e,r)=>e in t?E(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var y=(t,e,r)=>S(t,typeof e!="symbol"?e+"":e,r);import{a as p,S as w,i as h}from"./assets/vendor-tK733MBj.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();const a={formEl:document.querySelector(".form"),galleryEl:document.querySelector(".gallery"),loaderEl:document.querySelector(".loader"),btnLoadMore:document.querySelector(".js-load-more")},C="?key=49168840-e3c83c6477977e837e7a2b39b";p.defaults.baseURL="https://pixabay.com/api/";async function m(t,e=1){const r={q:t.trim(),image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e},{data:i}=await p.get(`/${C}`,{params:r});return i}function b(t){return t.map(({webformatURL:e,largeImageURL:r,tags:i,likes:s,views:o,comments:n,downloads:v})=>`
    <li class="gallery-card">
        <a class="gallery-link" href="${r}">
            <img class="gallery-img" src="${e}" alt="${i}" loading="lazy" />
            <ul class="gallery-list">
                <li class="gallery-list-info">
                    <p class="gallery-info-name">Likes</p>
                    <p class="gallery-info-value">${s}</p>
                </li>
                <li class="gallery-list-info">
                    <p class="gallery-info-name">Views</p>
                    <p class="gallery-info-value">${o}</p>
                </li>
                <li class="gallery-list-info">
                    <p class="gallery-info-name">Comments</p>
                    <p class="gallery-info-value">${n}</p>
                </li>
                <li class="gallery-list-info">
                    <p class="gallery-info-name">Downloads</p>
                    <p class="gallery-info-value">${v}</p>
                </li>
            </ul>
        </a>
    </li>
        `).join("")}const u=class u{constructor(e){this.button=e,this.prevText=""}disable(){this.button.disable=!0,this.prevText=this.button.textContent,this.button.textContent="Loading..."}enable(){this.button.disable=!1,this.button.textContent=this.prevText}hide(){this.button.classList.add(u.HIDDEN_CLASS)}show(){this.button.classList.remove(u.HIDDEN_CLASS)}};y(u,"HIDDEN_CLASS","is-hidden");let f=u,c=1,d="";const L=new w(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}),l=new f(a.btnLoadMore);async function q(t){t.preventDefault();const e=t.currentTarget;if(d=e.elements.user_query.value.trim(),d===""){h.warning({title:"Caution",message:"Please enter a query!",position:"topRight"});return}a.loaderEl.classList.add("active"),c=1;try{const r=await m(d,c);if(a.loaderEl.classList.remove("active"),!r.hits.length){a.galleryEl.innerHTML="",h.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),l.hide();return}a.galleryEl.innerHTML=b(r.hits),L.refresh(),r.hits.length<r.totalHits?(l.show(),l.button.addEventListener("click",g)):l.hide()}catch(r){console.log(r)}finally{e.reset()}}async function g(){c+=1,l.disable();try{const t=await m(d,c);if(!t.hits.length){h.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),l.hide(),l.button.removeEventListener("click",g);return}a.galleryEl.insertAdjacentHTML("beforeend",b(t.hits)),L.refresh(),x(),c*15>=t.totalHits?(h.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),l.hide()):l.enable()}catch(t){console.log(t),l.hide()}}l.button.addEventListener("click",g);function x(){const e=document.querySelector(".gallery-card").getBoundingClientRect().height+24;window.scrollBy({top:e*2,left:0,behavior:"smooth"})}a.formEl.addEventListener("submit",q);
//# sourceMappingURL=index.js.map
