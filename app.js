const FL={hta:['pt','mes','aigu','cs','cv','rf','lab','syn_h','trt_h','dos','etu_h'],dm:['pt','gly','aig_d','cmp','cv','rf','ctx','lab','syn_d','trt_d','dos','etu_d']};let cur='hta',i=0;
$('st').innerHTML=Object.keys(REG).map(id=>`<section id="s_${id}" class="st" hidden><h2>${REG[id].t}</h2><div class="fl">${REG[id].h}</div><div id="o_${id}"></div><div class="nv"><button type="button" data-a="b">Retour</button><button type="button" data-a="n">Continuer</button></div></section>`).join('');
function show(){const f=FL[cur],id=f[i];document.querySelectorAll('.st').forEach(e=>e.hidden=e.id!=='s_'+id);$('pgb').style.width=(i+1)/f.length*100+'%';$('pgt').textContent='Étape '+(i+1)+'/'+f.length+' · '+REG[id].t;
 const s=$('s_'+id);s.querySelector('[data-a=b]').hidden=i==0;s.querySelector('[data-a=n]').hidden=i==f.length-1;$('gjw').hidden=cur==='dm';run();scrollTo(0,0)}
function run(){const x=X(),id=FL[cur][i],s=[];$('o_'+id).innerHTML=REG[id].o(x);
 if(!isNaN(x.a))s.push((x.F?'F ':'H ')+x.a+' ans');if(!isNaN(x.bmi))s.push('IMC '+fx(x.bmi,1));if(!isNaN(x.D))s.push('DFG '+fx(x.D));if(!isNaN(x.s))s.push('PA '+x.s+'/'+fx(x.d));$('pb').textContent=s.join(' · ')}
$('st').addEventListener('change',e=>{const k=e.target.dataset.opt;if(k)e.target.checked?RET.add(k):RET.delete(k)});
$('st').onclick=e=>{const a=e.target.dataset.a,p=e.target.dataset.pf;if(e.target.dataset.etu)ETUACT(e.target.dataset.etu);if(p){OFF.has(p)?OFF.delete(p):OFF.add(p);run()}if(a==='n'&&i<FL[cur].length-1){i++;show()}if(a==='b'&&i>0){i--;show()}if(e.target.id==='pdf')print()};
$('t_hta').onclick=()=>{cur='hta';RET.clear();OFF.clear();i=0;$('t_hta').classList.add('on');$('t_dm').classList.remove('on');show()};$('t_dm').onclick=()=>{cur='dm';RET.clear();OFF.clear();i=0;$('t_dm').classList.add('on');$('t_hta').classList.remove('on');show()};
document.addEventListener('input',run);document.addEventListener('change',run);show();
let dp=null;addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;$('inst').classList.add('on')});
$('inst').onclick=async()=>{if(!dp)return;dp.prompt();await dp.userChoice;dp=null;$('inst').classList.remove('on')};addEventListener('appinstalled',()=>$('inst').classList.remove('on'));
if(/iphone|ipad/i.test(navigator.userAgent)&&!navigator.standalone)$('ios').style.display='block';
if('serviceWorker'in navigator&&location.protocol.startsWith('http'))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').then(r=>r.update()).catch(()=>{}));
