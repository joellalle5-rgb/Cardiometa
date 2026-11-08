const M={hta:HTA,dm:DM};let cur='hta';
const common=grp('Patient',two(F('age','Âge','ans'),`<label class="f">Sexe<select id="sex"><option value="M">Homme</option><option value="F">Femme</option></select></label>`)+two(F('kg','Poids','kg'),F('cm','Taille','cm'))+two(F('cr','Créatininémie'),`<label class="f">Unité<select id="cru"><option value="u">µmol/L</option><option value="m">mg/L</option><option value="d">mg/dL</option></select></label>`)+F('k','Kaliémie','mmol/L')+K('preg','Enceinte ou post-partum'),1);
$('form').innerHTML=common+'<div id="m_hta">'+HTA.fields+'</div><div id="m_dm" hidden>'+DM.fields+'</div>';
function go(m){cur=m;['hta','dm'].forEach(x=>{$('m_'+x).hidden=x!==m;$('t_'+x).classList.toggle('on',x===m)});run()}
function run(){const r=M[cur].run(),D=dfg(),i=bmi(),s=[];
 if(!isNaN(n('age')))s.push(($('sex').value==='F'?'F ':'H ')+n('age')+' ans');if(!isNaN(i))s.push('IMC '+fx(i,1));if(!isNaN(D.v))s.push('DFG '+fx(D.v));if(!isNaN(n('pas')))s.push('PA '+n('pas')+'/'+fx(n('pad')));
 $('pb').textContent=s.join(' · ');$('res').innerHTML=r.html;$('bar').textContent=r.head+' · voir le détail'}
$('t_hta').onclick=()=>go('hta');$('t_dm').onclick=()=>go('dm');
$('bar').onclick=()=>$('sheet').classList.add('open');$('close').onclick=()=>$('sheet').classList.remove('open');
document.addEventListener('input',run);document.addEventListener('change',run);run();
// Installation (PWA)
let dp=null;
addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;$('inst').classList.add('on')});
$('inst').onclick=async()=>{if(!dp)return;dp.prompt();await dp.userChoice;dp=null;$('inst').classList.remove('on')};
addEventListener('appinstalled',()=>$('inst').classList.remove('on'));
if(/iphone|ipad/i.test(navigator.userAgent)&&!navigator.standalone)$('ios').style.display='block';
if('serviceWorker'in navigator&&location.protocol.startsWith('http'))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
