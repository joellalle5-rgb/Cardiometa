const $=i=>document.getElementById(i),n=i=>{const e=$(i);if(!e||e.value==='')return NaN;return parseFloat(e.value.replace(',','.'))},ck=i=>!!($(i)&&$(i).checked),fx=(x,d=0)=>isNaN(x)?'—':x.toFixed(d).replace('.',',');
// u=urgence, a=à agir, i=info, o=ok ; why = justification repliable
const card=(k,t,b='',why='')=>`<div class="c ${k}"><b>${t}</b>${b?`<p>${b}</p>`:''}${why?`<details><summary>Pourquoi</summary><p>${why}</p></details>`:''}</div>`;
const ul=a=>'<ul>'+a.map(x=>`<li>${x}</li>`).join('')+'</ul>';
const F=(id,l,u='')=>`<label class="f">${l}<span><input id="${id}" inputmode="decimal" autocomplete="off">${u?`<i>${u}</i>`:''}</span></label>`;
const K=(id,l,on)=>`<label class="k"><input type="checkbox" id="${id}"${on?' checked':''}><span>${l}</span></label>`;
const KS=a=>a.map(x=>K(x[0],x[1],x[2])).join('');
const two=(a,b)=>`<div class="two">${a}${b}</div>`;
const grp=(t,b,o)=>`<details${o?' open':''}><summary>${t}</summary><div class="in">${b}</div></details>`;
// DFGe CKD-EPI 2021, avec garde d'âge et de plausibilité de l'unité
function dfg(){const a=n('age'),c=n('cr'),u=$('cru').value;if(isNaN(c)||isNaN(a))return{v:NaN};
 const m=u==='u'?c/88.4:u==='m'?c/10:c,Fm=$('sex').value==='F';
 if(m<.2||m>15)return{v:NaN,w:'Créatinine invraisemblable pour l’unité choisie : vérifier µmol/L, mg/L ou mg/dL. DFG non calculé.'};
 const k=Fm?.7:.9,al=Fm?-.241:-.302,v=142*Math.pow(Math.min(m/k,1),al)*Math.pow(Math.max(m/k,1),-1.2)*Math.pow(.9938,a)*(Fm?1.012:1);
 return{v,w:v<15?'DFG < 15 : confirmer l’unité saisie avant de conclure.':''}}
const bmi=()=>n('kg')/Math.pow(n('cm')/100,2);
// Alerte commune : IEC/ARA2/statine/iSGLT2/aGLP-1 chez la femme en âge de procréer
const terato=()=>($('sex').value==='F'&&n('age')<50&&!ck('preg'))?card('a','Femme < 50 ans','IEC, ARA2, spironolactone, statine, iSGLT2 et aGLP-1 sont à éviter en cas de grossesse : contraception efficace à confirmer avant de les prescrire.'):'';
