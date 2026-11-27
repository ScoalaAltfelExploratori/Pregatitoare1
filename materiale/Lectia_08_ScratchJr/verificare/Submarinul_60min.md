# Verificare - Robotul submarin, 60 de minute

27 noiembrie 2026. Pachetele v1.3, importate prin Open în ScratchJr Desktop Reborn și operate prin interfața browserului. Comenzile au fost clickuri reale; pozițiile și opacitățile provin din DOM-ul randat, citit fără modificarea stării aplicației. Verificatorul de fișiere nu simulează motorul.

**Rezultat:** șapte proiecte importate; 171 observații cu 2.898 de cadre. Distanța dintre robot și copia transportată a rămas exact constantă în toate cadrele înregistrate. Hashurile SJR testate sunt în tested-projects.json și sunt comparate cu fișierele livrate.

| Proiect | Comportament verificat |
| --- | --- |
| start | 12 personaje fără cod; steagul și săgeata nu mișcă robotul; redeschidere |
| m1 | Patru comenzi, deplasări 2/1, revenire în poziția inițială |
| m2 | Capsula rămâne pe fund până la contact; copia transportată apare sub clește și urcă împreună cu robotul; resetare |
| m3 | Recuperare, întoarcere, depunere, plecare fără încărcătură; transport în toate cele patru direcții; resetare și a doua misiune |
| creație | 11 comenzi orizontale de câte 1 pas, țintă nouă, depunere și plecare fără capsulă |
| r1 | Gol normal, încărcat lent, după depunere normal; aceeași distanță între robot și capsulă; resetare |
| r2 | Săgeți ascunse după prindere, apăsări ignorate pe locurile lor, retur automat, depunere, reactivarea comenzilor; resetare |

Viteza orizontală observată în R1: aproximativ 0,123 px/ms gol, 0,066 încărcat și 0,131 după depunere. Diferențele mici provin din eșantionare; traseele finale sunt exacte.

## Probleme găsite și rezolvate

La prima versiune, prinderea nu se declanșa după comenzile telecomenzii. Portul web condiționează contactul de starea de rulare; fără un program continuu, stația devenea inactivă. Platforma are acum Steag → Așteaptă 10 → Repetă mereu. Toate variantele au fost reimportate și retestate după corecție. Așteaptă 5 la contact permite terminarea coborârii înaintea schimbării capsulei și a vitezei din R1.

Unele pictograme de mesaje/viteză erau goale la import, deși valorile și rularea erau corecte. Pentru capturi am reselectat aceleași culori/viteze în interfața aplicației. Nu am desenat pictograme peste capturi. Portul raportează în continuare erori la biblioteca globală usershapes/userbkgs; imaginile incluse în SJR-uri funcționează și la redeschidere.

## Limite și reguli verificate

Stânca este un reper vizual, fără oprire automată. Depune schimbă imaginile fără să verifice poziția; alinierea deasupra platformei este o condiție a puzzle-ului. Întoarcerea automată folosește traseul fix din exemplu. Pilotajul se face cu o apăsare urmată de terminarea mișcării și a prinderii; nu s-au validat apăsări rapide concurente ca mod de lucru.

Nu a fost folosit un Lenovo fizic. Este necesară o probă a importului, afișării, atingerii și salvării pe o tabletă a școlii. Testul în browser nu este prezentat drept test Android.

## Dovezi

[Observații DOM](browser-observations.jsonl) · [Pachete și hashuri](tested-projects.json) · [Rezultate](submarin-rezultate.json) · [Verificator](check_submarin.py) · [Jurnal consolă](browser-console.json).

Capturile brute din capturi_submarin sunt folosite în PDF: fiecare personaj cu cod, pentru M1, M2, M3, creație, R1 și R2, plus scenele de recuperare, transport și depunere. Recadrarea în PDF nu schimbă blocurile. Pagini: plan concis, pregătire și programe complete.

## PDF și site

Ghidul are 19 pagini, toate randate și inspectate vizual: fără pictograme lipsă, blocuri tăiate sau text suprapus. PDF-ul cursului are 123 de pagini; primele 104 păstrează textul și comenzile de desen identice cu versiunea anterioară.

Pagina și ghidul au fost verificate în browser la 1280 și 390 px, inclusiv imaginile din secțiunile extensibile. Fără depășire orizontală la 390 px. Cele cinci teste de navigare au trecut; verificarea HTTP locală a urmărit 552 de URL-uri din 134 de pagini/documente, fără legături lipsă.
