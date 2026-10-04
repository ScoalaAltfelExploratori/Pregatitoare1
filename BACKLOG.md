# Backlog · Robo Explorator

Obiectiv: o aventură offline, în limba română, pentru clasa pregătitoare, utilizabilă la tablă și în perechi.

Legendă: `[ ]` de făcut · `[x]` implementat și verificat. Prioritatea P0 reprezintă prima versiune.

Elementele V1 și verificările de mai jos păstrează istoricul implementării. Parcursul actual este cel introdus prin P1-12 și descris în Readme.md.

## V1 · Primele aventuri (P0)

- [x] **V1-01 · Misiuni progresive.** Patru misiuni pe hărți 3×3, 4×4 și 5×5; prima are un traseu de două comenzi. Următoarea misiune se deblochează după reușită. Misiunile terminate pot fi rejucate.
- [x] **V1-02 · Progres local.** Reține misiunile terminate în browser; jocul rămâne utilizabil dacă stocarea nu este disponibilă. Adultul poate începe o aventură nouă.
- [x] **V1-03 · Robo animat.** Deplasare lină, reacție la obstacol și celebrare scurtă. Respectă preferința sistemului pentru mișcare redusă. Oprirea și schimbarea activității anulează corect rularea.
- [x] **V1-04 · Sunete offline.** Efecte scurte pentru pornire, pași, reușită și încercare nereușită. Pornire explicită, buton de dezactivare și funcționare normală fără suport audio. Replicile vocale nu intră în V1.
- [x] **V1-05 · Unde crezi că ajunge?** Runde cu trei săgeți pregătite; copilul selectează o căsuță înainte de verificare. Robo execută programul, apoi arată rezultatul și invită la altă rundă. Funcționează prin atingere, mouse și tastatură.
- [x] **V1-06 · Integrare.** Păstrează povestea, jocul liber, detectivul și fișele. Titlurile, legenda, descrierile accesibile și tipărirea se adaptează dimensiunii hărții.
- [x] **V1-07 · Verificare și instrucțiuni.** Teste pentru trasee, generare, predicții și progres; verificări în browser pentru misiuni, oprire, sunet și navigare. Actualizează ghidul de utilizare.

- [x] **V1-08 · Cheia și comoara.** Elimină misiunea cu felinarul și unește cheia cu comoara într-o finală 5×5, de minimum 12 pași. Cufărul refuză accesul fără cheie. Obiectivele, indiciile, fișa și salvarea progresului respectă noua ordine. Include migrarea progresului din cele șase misiuni inițiale.
- [x] **V1-09 · Continuăm de unde am ajuns.** „Pornește Robo” execută numai comenzile rămase, păstrând poziția și cheia. Pașii făcuți sunt bifați și protejați; editarea și ștergerea afectează doar comenzile noi. Oprirea, repararea unei greșeli, revenirea din anticipare și soluția adultului respectă starea curentă. „La start” resetează explicit încercarea și permite editarea întregului program.

## V1.1 · Mai multă participare (P1)

- [ ] **P1-01 · Robo spune.** Pauze de mișcare de 30–45 de secunde, inclusiv variante din bancă; declanșate de adult.
- [x] **P1-02 · Detectivul Robo.** Trei cazuri 3×3, cu 2, 3 și 4 săgeți. Copilul înlocuiește una singură, alegând dintre două variante mari. Primul caz marchează săgeata; celelalte au ajutor opțional. Include testare, încercări nelimitate, soluții alternative valide, oprire/reluare, fișă și revenire la aventura salvată. Fără cronometru sau punctaj. Cazurile cu săgeți lipsă ori în plus sunt amânate până după validarea în clasă.
- [ ] **P1-03 · Un pas.** Execută câte o comandă, cu pauză pentru explicații și anticipare.
- [ ] **P1-04 · Indicii treptate.** Oferă mai întâi o întrebare, apoi următoarea direcție; soluția completă rămâne la dispoziția adultului.
- [ ] **P1-05 · Vocea lui Robo.** Înregistrări românești scurte, incluse în pachetul offline; volum controlabil și mesaje vizuale echivalente.
- [x] **P1-06 · Podul și maneta.** Misiunea 5 introduce comanda „Activează”, executată pe manetă pentru a coborî podul în altă parte a hărții. Apa și podul ridicat blochează trecerea. Include feedback, soluție din starea curentă, fișă și progres migrat.
- [x] **P1-07 · Grădina și repetiția.** Misiunea 6 introduce „Udă” și poarta care se deschide după trei flori udate. Ultimele două comenzi neexecutate se pot grupa într-o repetiție de 2 sau 3 ori. Afișează fiecare iterare; permite oprire/reluare, desfacere, reparare și ștergere fără anularea acțiunilor făcute. Fiecare pas repetat intră în limita de 32.
- [x] **P1-08 · Rețeta robotului.** Misiunea 7 introduce rețeta pregătită „Udă un rând” (→ 💧 → 💧), folosită la A și la B. Definiția și pașii din fiecare folosire sunt vizibili. Permite oprire/reluare, desfacerea unei singure folosiri, reparare și fișă imprimată. Fiecare comandă din rețetă intră în limita de 32. Introducere opțională a unei proceduri cu nume, fără editor de definiții sau apeluri imbricate; de încercat după ce clasa urmărește ușor repetițiile.
- [ ] **P1-09 · Săritura și săpatul.** Misiuni separate cu „Sari →” peste apă și „Sapă” la locul marcat, cu o singură idee nouă per hartă.
- [x] **P1-10 · Prima decizie integrată.** Misiunea 6, „Grădina lui Robo”, are variantele „Flori la rând” și „Flori răsfirate”. În a doua, repetăm de trei ori → și „Dacă este o floare aici → Udă”: DA/NU/DA, apoi poarta și căsuța. Întrebarea și răspunsul sunt vizibile lângă hartă, cu rezultatele păstrate în repetiție. Include oprire/reluare fără efecte dublate, fișă și migrarea progresului din vechea variantă cu opt misiuni.
- [x] **P1-11 · Harta și programul alăturate.** Pe desktop, harta în stânga și programul în dreapta; paleta și Pornire/Oprire rămân vizibile, programul lung se derulează separat. Selector compact de misiuni, repetiție într-un panou pliabil, afișare adaptată pe telefon.
- [x] **P1-12 · Lecții graduale pentru clasa pregătitoare.** Parcurs de bază: o săgeată, două identice, schimbare de direcție, trei comenzi, primul Detectiv și un copac pe 3×3. Cheia și maneta au introduceri de patru pași cu pauză de observație. Grădina introduce separat udarea, recunoașterea modelului, repetiția, decizia și combinarea; rețeta începe cu o singură folosire. Hărțile lungi rămân provocări. Adultul alege etapa și vede un reper de observare. Întrebarea așteaptă implicit adultul; anticiparea începe cu două săgeți. Povestea și fișele urmează etapele scurte. Progresul vechi se păstrează, iar etapele intermediare se salvează separat.

## V2 · Creăm împreună (P2)

- [ ] **P2-01 · Constructor de hărți.** Unelte mari pentru Robo, obstacole și comoară; verifică existența unui drum înainte de joacă.
- [ ] **P2-02 · Racheta clasei.** Recompensă comună pentru misiuni, reparare și colaborare, fără clasament sau cronometru.
- [ ] **P2-03 · Mod de prezentare simplificat.** Adultul alege instrumentele vizibile și poate pregăti succesiunea activităților.
- [ ] **P2-04 · Fișe pe niveluri.** Pachet PDF actualizat pentru 3×3, 4×4 și 5×5, inclusiv cartonașe cu săgeți și roluri.

## Validare în clasă

- [ ] Încearcă V1 pe tabla reală: atingere, lizibilitate din ultima bancă, volum, ecran complet și tipărire A4.
- [ ] Observă câte comenzi pot anticipa copiii și ajustează primele misiuni după o sesiune.

## Decizii V1

- HTML, CSS și JavaScript local, fără instalare, conturi sau servicii externe.
- Activitatea începe cu prima misiune; harta originală rămâne accesibilă din instrumentele adultului.
- Progresul aparține browserului clasei, fără nume sau date despre copii.
- Sunetul este opțional; feedbackul esențial apare întotdeauna și vizual.

## Verificare V1 · 2 octombrie 2026

- `npm run check` și cele 13 teste din `npm test` au trecut.
- Verificate automat 3.000 de hărți și 1.500 de runde de anticipare.
- Verificate în browser: prima misiune, deblocarea următoarei, progres după reîncărcare, trecerea la 4×4, oprire/reluare, coliziune, anticipare prin tastatură și activarea sunetului.
- Inspectate afișările la 1366×900 și 390×844.
- Browserul de testare acceptă doar HTTP/HTTPS; deschiderea directă a `index.html` prin `file://` nu a putut fi verificată automat. Aplicația folosește numai resurse locale, fără dependențe la rulare.
- Rămân deschise probele de mai sus pe echipamentul real al clasei și pachetul PDF pe niveluri.

## Verificare · Cheia și comoara

- `npm run check` și cele 20 de teste din `npm test` au trecut.
- Trasee minime verificate: 2, 3, 4 și 12 pași. Copacul adăugat la rândul 2, coloana 1 în misiunea 3 este păstrat.
- Teste pentru accesul fără cheie, colectare fără finalizare, deschiderea cufărului, reluare, schimbarea activității, fișă, rezolvarea unui traseu care revizitează căsuțe și migrarea salvărilor vechi.
- Verificat și în browser: Robo este oprit la cufărul încuiat, apoi termină traseul cu cheia în 12 pași; ambele obiective sunt bifate și consola nu raportează erori.

## Verificare · Continuarea traseului

- `npm run check` și cele 29 de teste din `npm test` au trecut.
- Oprirea verificată la 15 momente înainte și după mutare, inclusiv colectarea cheii și ultimul pas: fără pași pierduți, repetați sau victorie acordată de două ori.
- Teste pentru porniri repetate, repararea comenzilor greșite, ștergerea doar a pașilor noi, resetare explicită, ascunderea paginii și păstrarea stării la revenirea din anticipare.
- Soluția adultului continuă din poziția curentă; WebMCP respinge rescrierea pașilor făcuți.
- Verificat în browser: prima pornire execută opt pași până la cheie; adăugarea a patru săgeți păstrează poziția și cheia; a doua pornire deschide cufărul după 12 pași în total. Istoricul bifat și săgețile noi se disting vizual. Consola nu raportează erori.

## Verificare · Acțiuni și repetiții

- 39 de teste trec, inclusiv toate cele șase misiuni, soluții valide, comenzi executate în locul greșit, activare și udare fără dublarea efectului.
- Testată oprirea în 24 de momente din grădină: înainte, exact la și după fiecare mutare sau acțiune. Reluarea ajunge la căsuță în exact 8 pași, cu o singură victorie.
- Verificate repararea unei repetiții greșite, ștergerea restului unei repetiții începute, limita de pași, starea păstrată după anticipare și validarea WebMCP.
- În browser: activare, continuare peste pod în 9 pași, deblocarea grădinii, construirea repetiției din butoane, oprire după prima udare, reluare și deschiderea porții, apoi victorie în 8 pași. Consola nu raportează erori.

## Verificare · Rețeta lui Robo

- `npm run check` și cele 46 de teste trec, inclusiv toate cele șapte misiuni. Progresul cu șase misiuni terminate deblochează rețeta fără resetare.
- Verificate 33 de momente de oprire/reluare, inclusiv înainte, exact la și după pașii din cele două folosiri ale rețetei: fără udări repetate, pași pierduți sau victorie dublată.
- Teste pentru folosirea aceleiași definiții în două locuri, desfacerea unei singure folosiri, ștergerea restului, reparare, revenire din anticipare, fișă și limite calculate după desfășurare. WebMCP protejează pașii făcuți și respinge rețete necunoscute sau apeluri imbricate.
- Verificat în browser: adăugarea rețetei din buton, oprire după prima udare și reluare de la pasul 3, continuare până la B, a doua folosire a rețetei și victorie în 15 pași. Cele patru flori deschid poarta, iar progresul ajunge la 7/7. Aspectul a fost inspectat; consola nu raportează erori sau avertismente.

## Verificare · Detectivul Robo

- `npm run check` și toate cele 52 de teste trec. Cele trei cazuri au programe inițiale greșite, reparabile printr-o singură înlocuire dintre două variante.
- Verificate repararea în alt loc fără acumularea schimbărilor, o soluție alternativă validă, nouă momente de oprire/reluare fără pași dublați și păstrarea aventurii cu cheia colectată la trecerea între detectiv, anticipare și programare.
- Povestea începe cu un caz 3×3 de două săgeți; fișa imprimată include programul inițial și variantele. Cazurile nu deblochează misiuni și nu scriu scoruri în stocare.
- În browser: încercarea greșită, repararea prin tastatură, ajutorul, trecerea prin toate cele trei cazuri și mesajul final de reușită. Consola nu raportează erori sau avertismente.

## Verificare · Prima decizie · 4 octombrie 2026

- `npm run check` și toate cele 60 de teste trec, inclusiv aventura cu opt misiuni. Salvările cu șapte misiuni terminate deblochează misiunea cu decizia.
- Verificate DA pe floare, NU pe căsuță goală și revenirea pe o floare deja udată. Fiecare bloc este un singur pas, iar rezultatul și efectul udării se păstrează împreună.
- Testată oprirea în 21 de momente, inclusiv în timpul întrebării și exact la răspuns: fără udări dublate, pași pierduți sau victorie repetată. Verificate schimbarea activității, istoricul protejat, soluția din poziția curentă, ștergerea, resetarea, limita de pași și fișa.
- În browser: întrebarea precedă efectul, primul bloc udă, al doilea nu udă și nu mută robotul, iar continuarea udă a doua floare și ajunge la căsuță în 7 pași. Rezultatele DA/NU/DA rămân în program. Afișarea lângă hartă a fost inspectată; consola nu raportează erori sau avertismente.

## Verificare · Grădina combinată și afișarea alăturată · 4 octombrie 2026

- `npm run check` și toate cele 63 de teste trec. Aventura are șapte misiuni; ambele variante ale grădinii au aceeași completare. Salvările anterioare cu opt misiuni terminate păstrează progresul.
- Repetiția cu decizie produce DA/NU/DA, deschide poarta și termină în 8 pași. Oprirea/reluarea este verificată în 24 de momente, inclusiv în timpul întrebării, la udare și la final. Verificate schimbarea variantei, revenirea din anticipare/detectiv, ștergerea restului buclei și continuarea din poziția curentă.
- În browser: construirea buclei din butoane, întrebarea înaintea udării și reușita în 8 pași. Programul lung din misiunea cu rețeta se derulează la comanda activă, cu Pornire/Oprire vizibile, și termină în 15 pași. Povestea păstrează derularea normală.
- Inspectate afișările la 1280×720, 1024×768, 1366×900 și 390×844; desktop fără derularea paginii, telefon cu panouri succesive. Consola nu raportează erori sau avertismente.

## Verificare · Lecții graduale · 4 octombrie 2026

- `npm run check` și toate cele 74 de teste trec. Cele 18 etape și provocări au soluții valide; primul parcurs cere 1, 2, 2, 3 și 3 comenzi.
- Verificate trecerile dintre etape, reluarea etapei salvate, deblocarea, disponibilitatea comenzilor, Detectivul intercalat și pauzele introductive după cheie/manetă. Progresul vechi se păstrează.
- Întrebarea manuală rămâne în așteptare și după un minut simulat; oprirea, schimbarea activității sau lecției anulează verificarea fără udare în fundal. Repetiția combinată așteaptă adultul separat la fiecare DA/NU.
- Povestea introduce o singură săgeată și se poate încheia după parcursul de bază. Fișele au spații adaptate programului scurt; rețeta introductivă nu cere încă două locuri sau poartă.
- În browser: primul pas și avansarea, finalul lecției cu trei săgeți și accesul la Detectiv, întrebarea manuală pe gol/floare, apoi DA/NU/DA în repetiție și reușita în 8 pași. Consola nu raportează erori sau avertismente.
- Inspectate afișările la 1280×720, 1024×768 și 390×844: harta și comenzile alăturate pe desktop, fără depășire orizontală pe telefon. Testarea ritmului cu elevii și PDF-urile noi rămân deschise.
