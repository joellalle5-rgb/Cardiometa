const DM={fields:
grp('Glycémies',F('gj','Glycémie veineuse à jeun','g/L')+F('ga','Glycémie aléatoire','g/L')+F('hgpo','HGPO 2 h','g/L')+F('hba1c','HbA1c (facultative)','%')+KS([['jeune','Jeûne ≥ 8 h confirmé',1],['sym','Symptômes cardinaux (polyurie, polydipsie, amaigrissement)'],['conf','Même test déjà répété et anormal'],['interf','Interférence HbA1c : drépanocytose, anémie, carence martiale, transfusion, IRC terminale']]),1)+
grp('Typage',KS([['brutal','Début brutal (quelques semaines)'],['amai','Amaigrissement marqué'],['autoimm','Maladie auto-immune associée']])+`<label class="f">Cétonurie<select id="cet"><option value="nr">Non recherchée</option><option value="a">Absente</option><option value="p">Présente</option></select></label><label class="f">Auto-anticorps<select id="ab"><option value="nf">Non dosés</option><option value="n">Négatifs</option><option value="p">Au moins un positif</option></select></label>`)+
grp('Contexte',KS([['fra','Fragile ou dépendant'],['comorb','Comorbidité sévère ou espérance de vie < 5 ans'],['hypo','Hypoglycémie sévère passée']])),
run(){const a=n('age'),gj=n('gj'),ga=n('ga'),hg=n('hgpo'),jo=ck('jeune'),D=dfg(),pg=ck('preg');let hb=n('hba1c'),h=D.w?card('a','Créatinine',D.w):'';
 if(a<18)return{head:'Adulte uniquement',html:card('a','Adulte uniquement','Cette suite s’adresse aux patients de 18 ans et plus.')};
 if(ck('interf')&&!isNaN(hb)){h+=card('a','HbA1c écartée','Interférence déclarée : seules les glycémies sont retenues.');hb=NaN}
 const pos=[];if(jo&&gj>=1.26)pos.push('glycémie à jeun '+fx(gj,2));if(hg>=2)pos.push('HGPO '+fx(hg,2));if(hb>=6.5)pos.push('HbA1c '+fx(hb,1)+' %');
 const gal=Math.max(isNaN(ga)?0:ga,jo||isNaN(gj)?0:gj);
 if(isNaN(gj)&&isNaN(ga)&&isNaN(hg)&&isNaN(hb))return{head:'Saisir une glycémie',html:h+card('i','Saisir une glycémie','Glycémie à jeun, aléatoire ou HGPO ; l’HbA1c est facultative.')};
 let dm=false,head;
 if(gal>=2&&ck('sym')||pos.length>=2||(pos.length===1&&ck('conf'))){dm=true;head='Diabète confirmé';h+=card('u'.replace('u','a'),head,pos.join(' + ')||'Glycémie aléatoire ≥ 2,00 g/L avec symptômes.')}
 else if(pos.length===1){head='Diabète probable, à confirmer';h+=card('a',head,pos[0]+' : confirmer par un second dosage veineux.')}
 else if((jo&&gj>=1)||(hg>=1.4)||(hb>=5.7)){head='Prédiabète';h+=card('i',head,'Mode de vie, perte de poids de 5–7 % si surpoids, contrôle annuel.')}
 else{head='Pas de critère de diabète';h+=card('o',head,'Valeurs sous les seuils.')}
 const mx=Math.max(isNaN(gj)?0:gj,isNaN(ga)?0:ga,isNaN(hg)?0:hg);
 if(mx>=2.5)h+=card(mx>=3&&ck('sym')?'u':'a','Hyperglycémie marquée','Faire la cétonurie. Cétonurie ≥ 2+ avec dyspnée, vomissements ou obnubilation : acidocétose présumée, urgence (module Urgences à venir).');
 if(!dm)return{head,html:h};
 // Typage : un score DT1 élevé n'est pas écrasé par des anticorps négatifs
 const i=bmi(),sc=(a<35?1:0)+(i<25?1:0)+(ck('brutal')?1:0)+(ck('amai')?1:0)+($('cet').value==='p'?2:0)+(ck('autoimm')?1:0),ab=$('ab').value;let T;
 if(ab==='p')T=a>30&&!ck('brutal')&&!ck('amai')?'LADA':'DT1';else if(sc>=4)T='DT1';else T='DT2';
 h+=card(T==='DT2'?'i':'a','Typage : '+(T==='DT1'&&ab!=='p'?'DT1 ou diabète cétosique à explorer':T),'Score d’évocation DT1 '+sc+'/7.'+(T==='DT1'&&ab!=='p'?' Ne pas étiqueter DT2 : anticorps et peptide C (mesuré à distance de la glucotoxicité, sinon sous-estimé).':''),'Un peptide C bas en pleine hyperglycémie peut être transitoire ; l’insuline est vitale en cas de cétose.');
 const lax=ck('fra')||ck('comorb')||ck('hypo')||a>=75,cib=pg?6.5:T!=='DT2'?(lax?8:7):lax?8:7;
 h+=card('i','Cible d’HbA1c ≤ '+fx(cib,1)+' %',pg?'Grossesse : contrôle strict.':lax?'Fragilité, comorbidité, âge ≥ 75 ans ou hypoglycémie sévère : éviter les hypoglycémies.':'Norme ; 6,5 % envisageable si diabète récent et sans hypoglycémie.','Équivalent sans HbA1c : glycémie moyenne ≈ '+fx((28.7*cib-46.7)/100,2)+' g/L, à jeun 0,80–'+(lax?'1,50':'1,30')+', postprandiale < 1,80.');
 const P=n('kg'),ins=T==='DT1'||T==='LADA';let rx;
 if(pg){rx=['Insuline d’emblée (NPH au coucher + rapide aux repas), avis spécialisé','Arrêter iSGLT2, aGLP-1, statine, IEC/ARA2 ; metformine selon avis','Fond d’œil au 1ᵉʳ trimestre']}
 else if(ins){rx=['Basal-bolus : '+(P?fx(P*.4)+'–'+fx(P*.6)+' U/j':'0,4–0,6 U/kg/j')+', basale 40–50 %','Glucagon à domicile, règles des jours de maladie','LADA : éviter les sulfamides']}
 else{const cat=mx>=3||hb>=10||$('cet').value==='p'||ck('amai'),mm=D.v>=60?3000:D.v>=45?2000:1000;
  rx=[];if(cat)rx.push('Insuline basale d’emblée : 0,1–0,2 U/kg/j'+(P?' (≈ '+fx(P*.1)+'–'+fx(P*.2)+' U)':'')+', titration sur glycémie à jeun');
  rx.push(D.v<30?'Metformine contre-indiquée (DFG < 30)':'Metformine 500 mg/j au repas, +500 mg par semaine'+(isNaN(D.v)?' (renseigner le DFG pour le plafond)':', maximum '+mm+' mg/j'));
  if(D.v<60||ck('comorb'))rx.push('Si DFG < 60 : iSGLT2 + IEC/ARA2 (non listés localement : à vérifier)')}
 h+=card('a','Plan thérapeutique',pg?'Grossesse : branche dédiée.':'Mesures de mode de vie et éducation en parallèle (règle des 15 g, inspection des pieds).',ul(rx));
 return{head,html:h+terato()}}};
