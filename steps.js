const REG={},def=(id,t,h,o)=>REG[id]={t,h,o};
const g=a=>a.filter(ck).length,SEL=(id,l,o)=>`<label class="f">${l}<select id="${id}">${o.map(x=>`<option value="${x[0]}">${x[1]}</option>`).join('')}</select></label>`;
function X(){const x={a:n('age'),F:$('sex').value==='F',pg:ck('preg'),kg:n('kg'),bmi:bmi(),tt:n('tt'),s:n('pas'),d:n('pad')},D=dfg();
 x.D=D.v;x.dw=D.w;x.obAb=x.tt>=(x.F?80:94);
 x.icG=g(['k_dpn','k_cre','k_b3','k_dysp','k_toux','k_oap']);x.icD=g(['k_tj','k_hep','k_oed','k_epl']);x.fev=n('fevg');
 x.ic=ck('h_ic')||x.icG>=2||x.icD>=2||x.fev<40;x.hvg=ck('k_cm')||ck('k_b4')||ck('e_hvg')||n('sok')>35;x.fa=ck('k_irr')||ck('e_fa');
 x.cad=ck('h_cad')||ck('k_ang')||ck('e_isc');x.avc=ck('h_avc')||ck('x_avc');x.aomi=ck('h_aomi')||ck('x_ccl');
 x.rac=n('rac');x.alb=x.rac>=30;x.ren=ck('h_mrc')||ck('x_nyc')||x.D<60||x.alb;
 x.gj=isNaN(n('gj'))?n('gjh'):n('gj');x.dm=ck('h_dm')||x.gj>=1.26;
 x.tg=n('tg');x.hd=n('hdl');x.ldl=x.tg<=3.5?n('ct')-x.hd-x.tg/5:NaN;x.tab=ck('f_tab');
 x.org=[x.hvg&&'HVG / cardiomégalie',x.ic&&'insuffisance cardiaque',x.ren&&'atteinte rénale',ck('x_vis')&&'atteinte visuelle'].filter(Boolean);
 x.cvd=[x.ic&&'insuffisance cardiaque',x.cad&&'coronaropathie',x.avc&&'AVC/AIT',x.aomi&&'AOMI'].filter(Boolean);
 x.rf=[(x.F?x.a>=65:x.a>=55)&&'âge',ck('f_sed')&&'sédentarité',x.tab&&'tabagisme',ck('f_alc')&&'alcool excessif',ck('f_sel')&&'excès de sel',ck('f_fam')&&'antécédent familial précoce',(ck('h_dys')||x.ldl>=1.16)&&'dyslipidémie',x.bmi>=30&&'obésité',x.obAb&&'obésité abdominale',x.dm&&'diabète'].filter(Boolean);
 x.rk=x.cvd.length||x.D<30||(x.dm&&x.org.length)?3:x.org.length||x.dm||x.D<60||x.rf.length>=3?2:x.rf.length?1:0;
 x.rl=['faible','modéré','élevé','très élevé'][x.rk];x.tc=[1.16,1,.7,.55][x.rk];return x}
const smet=x=>{const K=[x.obAb,x.s>=130||x.d>=85,x.tg>=1.5,x.hd<(x.F?.5:.4),x.gj>=1||x.dm],U=[x.tt,x.s,x.tg,x.hd,x.dm?1:x.gj].filter(isNaN).length;return{n:K.filter(Boolean).length,u:U}};
def('pt','Patient',two(F('age','Âge','ans'),SEL('sex','Sexe',[['M','Homme'],['F','Femme']]))+two(F('kg','Poids','kg'),F('cm','Taille','cm'))+F('tt','Tour de taille','cm')+K('preg','Enceinte ou post-partum'),
x=>x.a<18?card('a','Adulte uniquement','Cette suite concerne les patients de 18 ans et plus.'):card('i','IMC '+fx(x.bmi,1)+' kg/m²'+(x.bmi>=30?' : obésité':x.bmi>=25?' : surpoids':''),x.obAb?'Obésité abdominale (tour de taille ≥ '+(x.F?80:94)+' cm).':'')||'');
def('cv','Examen cardiovasculaire',
 '<p class="nt">Cocher ce qui est retrouvé. Aucune case cochée = signe absent : l’examen doit avoir été fait.</p><h3>Insuffisance cardiaque gauche</h3>'+KS([['k_dpn','Orthopnée ou dyspnée paroxystique nocturne'],['k_dysp','Dyspnée d’effort'],['k_toux','Toux nocturne'],['k_cre','Crépitants pulmonaires'],['k_b3','Galop B3'],['k_oap','Antécédent d’OAP']])+
 '<h3>Insuffisance cardiaque droite</h3>'+KS([['k_tj','Turgescence jugulaire / reflux hépato-jugulaire'],['k_hep','Hépatomégalie'],['k_oed','Œdèmes des membres inférieurs'],['k_epl','Épanchement pleural']])+
 '<h3>Autres atteintes</h3>'+KS([['k_cm','Choc de pointe étalé ou dévié'],['k_b4','Galop B4 / pointe hyperdynamique'],['k_irr','Pouls irrégulier'],['k_ang','Angor d’effort typique'],['x_avc','Déficit neurologique focal'],['x_ccl','Claudication ou pouls pédieux abolis'],['x_nyc','Nycturie, urines mousseuses, œdèmes péri-orbitaires'],['x_vis','Baisse chronique de l’acuité visuelle']]),
 x=>{let h='';h+=x.icG>=2&&x.icD>=2?card('u','Insuffisance cardiaque globale probable','Signes gauches et droits : traiter comme IC ; ECG, radio, écho dès que possible.','Critères simplifiés d’après Framingham : au moins 2 signes par versant.'):x.icG>=2?card('a','Insuffisance cardiaque gauche probable','Signes gauches ('+x.icG+') : la congestion oriente vers diurétique, bloqueur du SRA et bêtabloquant.'):x.icD>=2?card('a','Insuffisance cardiaque droite probable','Signes droits ('+x.icD+') : chercher une cause (cardiopathie gauche, pulmonaire, péricardique).'):x.icG+x.icD?card('i','Insuffisance cardiaque possible','Signes isolés : compléter l’examen et le bilan.'):card('o','Pas de signe d’insuffisance cardiaque','Sous réserve d’un examen complet.');
  if(ck('k_cm')||ck('k_b4'))h+=card('a','HVG / cardiomégalie probable','Atteinte d’organe retenue sans attendre l’ECG ou l’écho.');
  if(x.fa)h+=card('a','Arythmie / FA probable','ECG pour confirmer ; évaluer le risque embolique (CHA₂DS₂-VASc, HTA = 1 point).');
  if(ck('k_ang'))h+=card('a','Coronaropathie probable','Bêtabloquant et prévention secondaire à discuter.');
  if(ck('x_ccl'))h+=card('a','AOMI probable','Pouls, IPS ; prévention secondaire.');
  if(ck('x_nyc'))h+=card('a','Atteinte rénale probable','Créatinine, bandelette, albuminurie.');return h});
def('rf','Facteurs de risque et terrain',
 KS([['f_sed','Sédentarité'],['f_tab','Tabagisme'],['f_alc','Alcool excessif'],['f_sel','Alimentation salée (cubes, poissons fumés, aliments transformés)'],['f_fam','Antécédent familial cardiovasculaire précoce']])+'<h3>Antécédents connus</h3>'+KS([['h_ic','Insuffisance cardiaque'],['h_cad','Coronaropathie / infarctus'],['h_avc','AVC ou AIT'],['h_aomi','AOMI'],['h_dm','Diabète'],['h_mrc','Maladie rénale chronique'],['h_dys','Dyslipidémie']]),
 x=>{const m=smet(x);return card(x.rf.length>=3?'a':'i','Facteurs de risque : '+(x.rf.length?x.rf.join(', '):'aucun retrouvé'),'')+card(m.n>=3?'a':'i','Syndrome métabolique clinique : '+m.n+'/5'+(m.u?' (TG, HDL, glycémie à compléter au bilan)':''),'Critères : tour de taille, PA ≥ 130/85, TG ≥ 1,50, HDL bas, glycémie ≥ 1,00 ou diabète.')});
def('lab','Bilan biologique et examens',
 '<p class="nt">Renseigner ce qui est disponible.</p>'+two(F('hb','Hémoglobine (NFS)','g/dL'),F('na','Natrémie','mmol/L'))+two(F('ur','Urée'),SEL('uru','Unité',[['g','g/L'],['m','mmol/L']]))+two(F('cr','Créatininémie'),SEL('cru','Unité',[['u','µmol/L'],['m','mg/L'],['d','mg/dL']]))+F('k','Kaliémie','mmol/L')+'<div id="gjw">'+F('gjh','Glycémie à jeun','g/L')+'</div>'+two(F('ct','Cholestérol total','g/L'),F('hdl','HDL-c','g/L'))+two(F('tg','Triglycérides','g/L'),F('rac','RAC urinaire','mg/g'))+
 '<h3>ECG (si disponible)</h3>'+KS([['e_hvg','HVG'],['e_fa','Fibrillation atriale'],['e_isc','Onde Q / ischémie']])+F('sok','Sokolow SV1+RV5','mm')+'<h3>Échocardiographie (si possible)</h3>'+F('fevg','FEVG','%'),
 x=>{let h=x.dw?card('a','Créatinine',x.dw):'';const st=isNaN(x.D)?'':x.D>=90?'G1':x.D>=60?'G2':x.D>=45?'G3a':x.D>=30?'G3b':x.D>=15?'G4':'G5',u=n('ur')/(($('uru').value==='m')?16.67:1);
  if(!isNaN(x.D))h+=card(x.D<60?'a':'o','DFGe (CKD-EPI 2021) : '+fx(x.D)+' mL/min/1,73 m² '+st,x.D<60?'À confirmer à 3 mois.':'');
  if(x.alb)h+=card('a','Albuminurie '+fx(x.rac)+' mg/g','Atteinte rénale ; bloqueur du SRA.');
  if(u>0.5)h+=card('a','Urée élevée','Insuffisance rénale, déshydratation ou diurétique ?');
  if(!isNaN(x.ldl))h+=card('i','LDL-c (Friedewald) : '+fx(x.ldl,2)+' g/L','Cible selon le risque (voir le traitement).');
  const k=n('k');if(k<3.5)h+=card('a','Hypokaliémie','Diurétique ? Chercher un hyperaldostéronisme (HTA + K⁺ bas).');if(k>5)h+=card('a','Hyperkaliémie','Différer SRA et spironolactone.');
  if(n('na')<135)h+=card('a','Hyponatrémie','Diurétique thiazidique ? Prudence.');if(n('hb')<(x.F?12:13))h+=card('a','Anémie','Chercher la cause (rénale, drépanocytose, carence).');
  if(x.gj>=1.26)h+=card('a','Glycémie ≥ 1,26 g/L','Diabète probable : confirmer.');
  if(x.fev<50)h+=card('a','FEVG '+fx(x.fev)+' % : dysfonction systolique','Orientation IC à fraction d’éjection réduite.');
  if(ck('e_hvg')||n('sok')>35)h+=card('a','HVG électrique','Atteinte d’organe cible.');
  const m=smet(x);return h+card(m.n>=3?'a':'i','Syndrome métabolique : '+m.n+'/5',m.u?'Critères encore manquants : '+m.u:'')});
const adj=x=>{const r=[],c=x.cad||x.avc||x.aomi;
 r.push(['Statine'+(x.rk>=2||x.dm&&x.a>=40?' recommandée':' à discuter'),'atorvastatine 20–40 mg le soir (non listée : vérifier la disponibilité) ; cible LDL-c < '+fx(x.tc,2)+' g/L'+(isNaN(x.ldl)?'':' (actuel '+fx(x.ldl,2)+')'),'Risque cardiovasculaire '+x.rl+' : la baisse du LDL réduit les événements.']);
 r.push([c?'Aspirine 75–100 mg/j':'Pas d’aspirine',c?'prévention secondaire':'en prévention primaire le saignement compense le bénéfice',c?'Maladie athéromateuse avérée.':'Pas de maladie athéromateuse documentée.']);
 if(x.fa)r.push(['Anticoagulation à évaluer','CHA₂DS₂-VASc (HTA 1 point, âge, IC, diabète, AVC)','La FA expose au risque embolique.']);
 if(x.dm&&(x.ic||x.ren)&&!(x.D<20))r.push(['iSGLT2','dapagliflozine ou empagliflozine 10 mg (non listé : vérifier)','Bénéfice cardiaque et rénal démontré.']);
 return r.map(a=>card('i',a[0],a[1],a[2])).join('')};
const hyg=x=>{const p=x.kg,r=[];r.push('Sel < 5 g/j'+(ck('f_sel')?' : supprimer les cubes, poissons fumés ou salés, aliments transformés':'')+'.');
 if(x.bmi>=25)r.push('Perte de poids de 5 à 10 %'+(p?' ('+fx(p*.05)+' à '+fx(p*.1)+' kg)':'')+', objectif IMC < 25.');
 r.push((ck('f_sed')?'Sédentarité : reprise progressive ':'Activité physique ')+'30 min de marche rapide, 5 jours/semaine'+(x.ic||x.cad?' ; après avis cardiologique si IC ou coronaropathie':'')+'.');
 if(ck('f_alc'))r.push('Alcool : ≤ 1 verre/j (femme), ≤ 2 (homme), idéalement aucun.');if(x.tab)r.push('Arrêt complet du tabac, prioritaire.');
 if(!(x.D<30||n('k')>5))r.push('Légumes, fruits, légumineuses (potassium alimentaire).');if(x.dm||smet(x).n>=3)r.push('Limiter boissons sucrées et sucres rapides ; fibres ≥ 30 g/j.');
 return card('o','Mesures hygiéno-diététiques adaptées',ul(r))};
