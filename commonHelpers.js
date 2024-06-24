import{a as m,S as y,i as d}from"./assets/vendor-c493984e.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();m.defaults.baseURL="https://pixabay.com/api";const g={key:"44571009-8d5b9c16825d4f8c021db4d6b",image_type:"photo",orientation:"horizontal",safesearch:!0,q:"cat"},f=async s=>{try{return(await m.get("/",{params:{...g,...s}})).data}catch(e){console.log(e)}},c=document.querySelector("#gallery"),h=document.querySelector(".search-form"),n=document.querySelector(".load-more"),u=document.querySelector(".no-more"),a={q:"kiev",page:1,per_page:40},b=new y("#gallery a"),p=s=>{c.innerHTML+=s.hits.map(e=>`<div class="photo-card">
            <a href="${e.largeImageURL}" target="_blank">
                <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
            </a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>${e.likes}
              </p>
              <p class="info-item">
                <b>Views</b>${e.views}
              </p>
              <p class="info-item">
                <b>Comments</b>${e.comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>${e.downloads}
              </p>
            </div>
          </div>`).join(""),b.refresh(),L(s.totalHits)},L=async s=>{const{page:e,per_page:r}=a;e*r<s?(n.style.display="flex",u.style.display="none"):(n.style.display="none",u.style.display="flex")},v=async s=>{s.preventDefault();const e=s.target.elements.searchQuery.value;e&&(a.q=e),a.page=1;const r=await f(a);if(r.totalHits===0){d.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"});return}else d.success({message:`Hooray! We found ${r.totalHits} images.`,position:"topRight"});c.innerHTML="",p(r)},w=async()=>{a.page+=1;const s=await f(a);p(s);const{height:e}=c.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})};h.addEventListener("submit",v);n.addEventListener("click",w);
//# sourceMappingURL=commonHelpers.js.map
