# Verificare - Robotul de inspecție, 60 de minute

> Arhivă: varianta cu bariere, cu [PDF-ul său de 12 pagini](../Ghid_profesor_Inspectie_v2.pdf). [Testele lecției actuale](Atelierul_60min.md).

27 noiembrie 2026 · **Atelier v2.1, cu obiecte mărite și distanțe recalibrate.** Teste efectuate în [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/app/home.html), aplicația din browser, la 1280 × 800. Nu este un simulator propriu și nu este un test pe un Lenovo fizic.

## Importul real

Cele șapte fișiere finale au fost importate prin **Open** și deschise din galerie. Robotul transparent, atelierul, barierele și stația s-au afișat. Proiectul complet a fost salvat în galerie, redeschis și reîncărcat; resursele au rămas vizibile și traseul a funcționat din nou. Starterul a fost verificat separat: patru personaje, fără programe și fără mișcare la steag.

**Limită observată:** portul web raportează `unknown items column on usershapes: *` și `unknown items column on userbkgs: *` când încearcă înregistrarea resurselor personalizate în biblioteca globală. [Mesajele originale](../capturi_inspectie/avertismente-import.json). Nu a împiedicat afișarea, salvarea sau rularea proiectelor testate; nu declarăm însă biblioteca globală de resurse verificată. Starterul include toate obiectele necesare, inclusiv a doua barieră; copiii nu trebuie să le caute în acea bibliotecă.

Barierele și stația redesenate folosesc contururi SVG compatibile cu motorul ScratchJr. O primă variantă cu arce/curbe a întrerupt încărcarea; contururile au fost corectate, apoi **toate cele șapte fișiere finale v2.1** au fost importate și testate din nou. Hashurile de mai jos identifică exact aceste fișiere.

## Rularea

Pornirea, resetarea, mutarea barierei și redeschiderea au fost făcute prin interfață. Pozițiile personajelor vizibile au fost citite din DOM aproximativ la 60 ms, în segmente consecutive. Nu au fost apelate direct funcții ale motorului și nu au fost injectate programe în pagină. Testele urmăresc traseele și oprirea stabilă; citirea DOM nu măsoară distanțe fizice sau un senzor real.

| Probă pe fișierele finale | Rezultat observat |
| --- | --- |
| Starter | Toate cele patru personaje rămân pe loc la steag; resurse păstrate după reîncărcare |
| M1 | Contactul întrerupe mersul; retragere de un pas, apoi oprire stabilă |
| M1, barieră mutată | Bariera mutată cu 48 px la stânga; punctul final al robotului se mută cu aceiași 48 px, fără schimbarea codului |
| M2 | Un ocol pe sus, revenire pe linia inițială, oprire după barieră |
| M3 | Un ocol, continuare la stație, retragere și oprire stabilă |
| M3, resetat și reluat | Aceeași succesiune și aceeași poziție finală |
| M3, salvat, redeschis și reîncărcat | Resurse prezente, aceeași succesiune și aceeași poziție finală |
| Creație | Barieră mutată cu un pas la stânga, traversare de 7 pași în loc de 6, oprire la aceeași stație |
| R1 | Viteză rapidă, un ocol, aceeași ordine a contactelor și oprire; timpul mișcării este mai scurt |
| R2 | Două ocoluri distincte, folosind același fir portocaliu, apoi oprire la stație |

Distanțele pentru obiectele mărite sunt **Sus 4 → Dreapta 6 → Jos 4**. Creația folosește Dreapta 7; R2 are barierele la 6 și 12 pătrățele de marginea stângă. Robotul pornește la coordonatele scenei (60, 300), cu scara 0,85.

La viteza rapidă punctul exact de contact diferă cu câțiva pixeli, deoarece motorul avansează în pași mai mari; robotul rămâne lângă stație. Exercițiul cere păstrarea reacțiilor și compararea duratei, nu identitate la nivel de pixel.

Pop este sunetul standard folosit în programe; nu au fost necesare înregistrări sau sunete externe. Audibilitatea și volumul nu au fost confirmate pe dispozitivul din clasă. Verifică volumul pe tabletă înainte de oră.

## Dovezi și integritatea pachetului

- [Observații brute pentru cele zece rulări](../capturi_inspectie/observatii-browser.json), împreună cu SHA-256 ale fișierelor finale.
- [Rezultate calculate](inspectie-rezultate.json) și [verificatorul observațiilor](check_inspectie.py).
- [Manifestul proiectelor](../inspectie.json): toate programele și resursele.
- Capturi reale din editor în `capturi_inspectie`; PDF-ul decupează scenele și firele relevante. Pictogramele plicurilor au fost capturate după reselectarea aceleiași culori în interfață, fără schimbarea programelor. Scena de prezentare este o captură reală în modul de ecran complet.

Verificatorul controlează observațiile înregistrate, nu pornește o nouă rulare a aplicației. El verifică hashurile celor șapte arhive, resursele încorporate, absența adreselor externe în imagini, blocurile standard, starterul fără cod, cele două poziții ale barierei, numărul de ocoluri, viteza și oprirea stabilă. Rulare: `python materiale/Lectia_06_ScratchJr/verificare/check_inspectie.py`.

PDF-ul lecției are 12 pagini, toate randate și inspectate. PDF-ul cursului are 73 de pagini; textul și fluxurile de desen ale primelor 61 sunt neschimbate. Varianta veche „Parcul cu surprize” rămâne etichetată ca arhivă.

**Înaintea clasei:** importă starterul pe un Lenovo, probează M3, salvează și redeschide. Verificarea din browser nu garantează ruta de import a fiecărui manager de fișiere Android.
