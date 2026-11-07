const HTA={fields:
grp('Tension',two(F('pas','PAS cabinet','mmHg'),F('pad','PAD cabinet','mmHg'))+two(F('pas2','PAS 2ᵉ consult.','mmHg'),F('pad2','PAD 2ᵉ consult.','mmHg'))+two(F('ams','PAS automesure','mmHg'),F('amd','PAD automesure','mmHg'))+KS([['s_neuro','Céphalée sévère, confusion, convulsion ou déficit'],['s_cor','Douleur thoracique ou dorsale brutale'],['s_dys','Dyspnée ou OAP'],['s_vis','Trouble visuel brutal'],['s_ren','Oligo-anurie']]),1)+
grp('Terrain',KS([['h_ic','Insuffisance cardiaque (clinique)'],['h_cad','Coronaropathie'],['h_fa','Fibrillation atriale'],['h_avc','AVC ou AIT'],['h_dm','Diabète'],['h_mrc','Maladie rénale connue'],['t_noir','Origine africaine subsaharienne'],['t_fra','Âge ≥ 80 ans ou fragile'],['t_ortho','Hypotension orthostatique'],['t_asth','Asthme ou BPCO sévère'],['t_brad','Bradycardie < 50/min ou BAV'],['t_gout','Goutte'],['t_ang','Angiœdème sous IEC'],['t_toux','Toux sous IEC']])),
run(){const s=n('pas'),d=n('pad'),a=n('age'),pg=ck('preg'),D=dfg();let h=D.w?card('a','Créatinine',D.w):'';
 if(a<18)return{head:'Adulte uniquement',html:card('a','Adulte uniquement','Cette suite s’adresse aux patients de 18 ans et plus.')};
 if(isNaN(s)||isNaN(d))return{head:'Saisir la PA',html:h+card('i','Saisir la PA','Le verdict apparaît dès que PAS et PAD sont saisies.')};
 // Grossesse : alerte indépendante de la confirmation (case unique partagée)
 if(pg&&(s>=160||d>=110))return{head:'Prééclampsie sévère possible',html:card('u','Prééclampsie sévère possible','PA ≥ 160/110 en grossesse : urgence obstétricale. Nicardipine IV (Loxen), sulfate de magnésium, avis obstétrical immédiat.')};
 const L=s>=180||d>=110?4:s>=160||d>=100?3:s>=140||d>=90?2:s>=120||d>=70?1:0,
 sym=['s_neuro','s_cor','s_dys','s_vis','s_ren'].some(ck),off=s>=140||d>=90,
 org=ck('h_ic')||ck('h_cad')||ck('h_avc')||ck('h_mrc')||D.v<60,am=isNaN(n('ams'))?null:(n('ams')>=135||n('amd')>=85),
 conf=n('pas2')>=140||n('pad2')>=90||(off&&am===true)||(L==4&&(sym||org)),
 N=['PA normale','PA élevée, pas encore HTA','HTA grade 1','HTA grade 2','HTA grade 3'][L];
 let head=N;
 if(L==4&&sym){head='Urgence hypertensive probable';h+=card('u',head,'PA ≥ 180/110 avec atteinte d’organe aiguë : hospitaliser, nicardipine IV (Loxen), PAM −25 % en 1 h au maximum.')}
 else if(L==4)h+=card('a','Poussée hypertensive',`Pas d’atteinte aiguë déclarée : chercher une atteinte d’organe, reprendre le traitement oral, pas de baisse brutale, revoir sous 24–72 h.`);
 h+=card(L>=2?'a':L==1?'i':'o',N,s>=140&&d<90?'Systolique isolée.':'');
 if(!off)return{head,html:h+card(am===true?'a':'o',am===true?'HTA masquée possible':'Pas d’HTA à ce stade',am===true?'Automesure élevée : confirmer par MAPA.':'Hygiène de vie et contrôle annuel.')};
 if(am===false)return{head:'HTA de la blouse blanche probable',html:h+card('i','HTA de la blouse blanche probable','Automesure normale : surveillance annuelle ; traiter seulement si atteinte d’organe ou risque très élevé.')};
 if(!conf)return{head:head+' — à confirmer',html:h+card('a','À confirmer avant le diagnostic','Sans automesure ni MAPA : 2ᵉ consultation sous '+(L==4?'quelques jours':L==3?'1–2 semaines':'2–4 semaines')+'. Saisir la 2ᵉ consultation.')};
 h+=card('a','HTA confirmée');
 const ic=ck('h_ic'),cad=ck('h_cad'),fa=ck('h_fa'),fra=ck('t_fra')||a>=80,ara=ck('t_ang')||ck('t_toux'),bb=ck('t_asth')||ck('t_brad')?null:'Bisoprolol 2,5 mg, 1 cp/j',
 th=(ck('t_gout')||n('k')<3.5)?null:'Fludex LP 1,5 mg le matin (indapamide ; l’Esidrex/HCTZ n’est qu’un repli)',
 ras=ara?'Irbésartan Biogaran 150 mg, 1 cp/j':'Coversyl 5 mg, 1 cp/j',ccb='Amep 5 mg (ou Amlo-Denk, Lopine), 1 cp/j',
 low=!org&&!ck('h_dm')&&L==2,cond=low&&!pg;let reg,rx=[],av=[];
 if(pg){reg='Méthyldopa ou nifédipine retard';rx=['Methyldopa-GH 500 mg : 250–500 mg ×2–3/j','Nifedi-Denk retard 20 mg : 1 cp ×2/j (alternative)'];av.push('IEC, ARA2 et spironolactone contre-indiqués','Cible 110–135/85 ; aspirine 100–150 mg dès 12 SA si risque de prééclampsie')}
 else if(ic){reg='Bloqueur du SRA + bêtabloquant + spironolactone';rx=[ara?'Tareg 80 mg (valsartan), 1 cp/j':'Coversyl 5 mg, 1 cp/j (ou valsartan : Tareg 80 mg)',bb||'Bêtabloquant contre-indiqué : avis cardiologique','Spironolactone Biogaran 50 mg : 25–50 mg/j ; furosémide 40 mg si congestion'];av.push('Vérapamil, diltiazem et amlodipine seule : à éviter si FEVG réduite (typer la FE dès que possible)')}
 else if(cad||fa){reg='Bloqueur du SRA + '+(bb?'bêtabloquant':'inhibiteur calcique');rx=[ras,bb||ccb]}
 else if(s>=140&&d<90&&a>=65){reg='Inhibiteur calcique + '+(th?'thiazidique-like':'bloqueur du SRA');rx=[ccb,th||ras]}
 else if(ck('t_noir')){reg='Inhibiteur calcique + '+(th?'thiazidique-like':'bloqueur du SRA');rx=[ccb,th||ras];if(org||ck('h_dm'))rx.push('Ajouter un bloqueur du SRA (diabète ou atteinte rénale) : '+ras)}
 else{reg='Bloqueur du SRA + inhibiteur calcique';rx=[ras,ccb]}
 if(!pg&&!ic&&!cad&&!fa&&(fra||ck('t_ortho'))){reg='Monothérapie progressive, demi-dose';rx=[(a>=65||ck('t_noir'))?ccb:ras]}
 if(D.v<30)av.push('DFG < 30 : furosémide plutôt que thiazidique ; K⁺ et créatinine à 1 semaine sous SRA');
 if(n('k')>5)av.push('K⁺ > 5 : différer SRA et spironolactone, chercher la cause');
 if(ck('t_asth'))av.push('Bêtabloquant (asthme/BPCO sévère)');if(ck('t_brad'))av.push('Bêtabloquant, diltiazem, vérapamil (bradycardie/BAV)');
 if(ck('t_gout'))av.push('Thiazidiques (goutte)');if(ck('t_ang'))av.push('IEC (angiœdème)');av.push('IEC + ARA2 ensemble : jamais');
 h+=card('i',(cond?'Ordonnance conditionnelle : ':'')+reg,cond?'Grade 1 à faible risque : mesures d’hygiène de vie 3 mois, puis traitement seulement si PA ≥ 140/90 persistante.':'',ul(rx)+'<p>Si PA > cible à 3–4 semaines : ajouter la 3ᵉ classe ; résistance (3 classes dont diurétique) : spironolactone 25–50 mg, après vérification de l’observance, des AINS, du sel et du SAHS.</p>');
 h+=card('a','À éviter chez ce patient','',ul(av));
 h+=terato();
 h+=card('i','Cible et suivi',pg?'PA 110–135/85.':fra?'PAS 130–139, éviter l’hypotension orthostatique.':'PAS 120–129 si bien toléré (au minimum < 140), PAD 70–79.','Réévaluer à 2–4 semaines puis tous les 3 mois jusqu’à la cible. Créatinine et K⁺ 1–2 semaines après SRA, diurétique ou spironolactone ; arrêt si créatinine +30 % ou K⁺ > 5,5.');
 return{head:head+' confirmée',html:h}}};
