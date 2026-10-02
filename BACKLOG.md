# Backlog · Robo Explorator

Obiectiv: o aventură offline, în limba română, pentru clasa pregătitoare, utilizabilă la tablă și în perechi.

Legendă: `[ ]` de făcut · `[x]` implementat și verificat. Prioritatea P0 reprezintă prima versiune.

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
- [ ] **P1-02 · Detectiv cu mai multe cazuri.** Comandă greșită, lipsă sau în plus; copilul poate înlocui o singură săgeată.
- [ ] **P1-03 · Un pas.** Execută câte o comandă, cu pauză pentru explicații și anticipare.
- [ ] **P1-04 · Indicii treptate.** Oferă mai întâi o întrebare, apoi următoarea direcție; soluția completă rămâne la dispoziția adultului.
- [ ] **P1-05 · Vocea lui Robo.** Înregistrări românești scurte, incluse în pachetul offline; volum controlabil și mesaje vizuale echivalente.

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
