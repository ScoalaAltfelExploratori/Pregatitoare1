# Verificarea lecției 1 — 9 noiembrie 2026

Setul final folosește **Rabbit + Ball + Park**, numai resurse incluse în aplicație. Copiii construiesc proiectul în clasă; SJR-urile sunt exemple opționale pentru profesor.

## Rezultatele setului final în browser

Mediu: [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), port comunitar, în browserul separat al agentului. Acesta nu este aplicația oficială Android și are funcții suplimentare care nu sunt folosite în lecție.

Revizie: exercițiul de reparare a fost înlocuit cu mini-puzzle-ul „Două blocuri până acasă”. Cele trei fișiere schimbate (03, 04 și soluția M2) au fost reimportate și retestate. Celelalte patru fișiere sunt identice byte cu byte cu versiunile testate anterior; am verificat amprentele SHA-256 înainte de păstrarea rezultatelor lor.

Fiecare fișier din setul actual a fost importat prin interfață, deschis din galerie și pornit cu steagul verde. Pozițiile au fost citite din stilurile elementelor afișate pe scenă în timpul animației. Au fost verificate resetarea, revenirea la galerie, redeschiderea și o a doua rulare. Cele trei exemple noi și proba dificilă au rămas în galerie după reîncărcare; cele patru exemple neschimbate trecuseră aceeași probă anterior. Nu am apelat direct motorul intern pentru a produce mișcarea.

| Proiect | Comportament observat | Import / rulare / reset / redeschidere |
| --- | --- | --- |
| 01 Start | Ambele personaje rămân la start; programele sunt goale | PASS |
| 02 Întâlnirea | Se apropie, sar o dată și rămân separate | PASS |
| 03 Puzzle Revenirea | Întâlnirea funcțională, pregătită pentru completarea revenirii | PASS |
| 04 Soluția profesorului | Se apropie, sar o dată și revin amândoi la start | PASS |
| Misiunea 1 | Întâlnirea corectă | PASS |
| Misiunea 2 | Întâlnire, săritură, revenire cu o săgeată nouă per personaj | PASS |
| Provocarea dificilă (probă separată) | Revenire cu două săgeți: 1 + 2 pași pentru fiecare | PASS |
| Misiunea 3 | Se apropie, sar de două ori și revin la start | PASS |

Starturile centrelor sunt x=96 și x=360, y=240. După întâlnire: x=168 și x=288. Soluțiile 04, M2 și M3 revin la x=96 și x=360. Pentru noul puzzle am urmărit și atingerea întâlnirii înaintea revenirii, plus exact o săritură la fiecare personaj, în ambele rulări. Grila afișează starturile (5, 5) și (16, 5); acestea au fost confirmate în interfață. Coordonatele CSS din observații includ deplasarea datorată centrului imaginii, deci diferă de coordonatele centrelor scenei.

Pentru misiunea 3, o captură mai deasă a animației arată două urcări și coborâri distincte, urmate de deplasarea înapoi. Numărul 2 de pe hop indică înălțimea, nu două sărituri.

## Dovezi și verificări de fișiere

- [Observațiile exemplelor neschimbate](browser_observatii.json): patru teste anterioare și animația detaliată a misiunii 3.
- [Observațiile noului puzzle](browser_puzzle_observatii.json): cele trei fișiere schimbate și proba separată a variantei dificile, fiecare rulat de două ori. Varianta dificilă este descrisă în ghid și soluții; fișierul temporar de test nu trebuie distribuit copiilor.
- [Rezultatele și amprentele SHA-256](rezultate.json): identifică exact cele șapte fișiere finale.
- Capturi finale: [start](browser_01_start.png), [întâlnire](browser_02_intalnirea.png), [puzzle de completat](browser_03_puzzle_revenirea.png), [soluție de revenire](browser_04_solutia_profesorului.png), [M1](browser_05_solutie_m1.png), [M2](browser_06_solutie_m2.png), [M3](browser_07_solutie_m3.png), [provocarea dificilă](browser_puzzle_dificil.png).

Arhivele au fost deschise și verificate: JSON valid, două personaje, fundal Park, blocurile și valorile din lesson.json, programe goale în starter. Conțin numai datele proiectului și o miniatură generică; personajele și fundalul sunt referințe la biblioteca aplicației. Numele și dimensiunile Rabbit.svg, Ball.svg și Park.svg au fost confirmate și în media.json al aplicației oficiale Android 1.5.11 instalate din Google Play.

## Editarea prin gesturi în browser

Pe versiunea intermediară Star + Ball am construit un program prin tragere: steag, deplasare, modificarea numărului, rulare, salvare și redeschidere. Am eliminat blocurile după probă. Am reparat apoi direcția greșită a mingii prin desprinderea săriturii, înlocuirea deplasării și reconectare; reparația a rămas după salvare și redeschidere. Am verificat și crearea unui proiect nou și adăugarea unui personaj din bibliotecă.

Capturile [construire](browser_blocuri_construite.png) și [reparare](browser_reparatie_manuala.png) sunt **istorice, cu Star**, nu reprezintă aspectul final al lecției. Aceste probe istorice nu fac parte din activitățile cerute copiilor. Rularea fișierelor actuale cu Rabbit este documentată separat, conform tabelului de mai sus; noua secvență nu a fost reconstruită bloc cu bloc prin gesturi în această revizie. Gesturile automate din browser nu certifică gesturile cu degetul pe Lenovo.

## Ce a fost verificat în Android și Desktop

**Android oficial 1.5.11, API 30:** în emulatorul ScratchJr_Lesson1_Android11, 1280 × 800, 3072 MB, au fost importate două variante inițiale cu personaje desenate special. Starterul s-a afișat corect. Rularea întâlnirii a descoperit suprapunerea: un pas înseamnă 24 de unități, nu 20. Calculul a fost corectat, iar scena finală cu iepure folosește 3 pași în fiecare sens. Capturile [starter Android](01_start_android.png) și [întâlnire Android inițială](02_intalnirea_android.png) documentează numai acea etapă, inclusiv problema inițială.

**ScratchJr Desktop 1.3.2, comunitar:** restaurarea celor șapte proiecte intermediare Star + Ball a funcționat. Au fost probate starterul, întâlnirea și resetarea. Utilizatorul a confirmat că un bloc tras manual rămâne în zona de programare. [Captura Desktop](desktop_02_intalnirea.png) este tot intermediară. Pachetul final cu iepure nu a fost restaurat din nou în Desktop.

**Android 15 / API 35:** listarea Play nu permitea instalarea aplicației oficiale în emulatorul creat inițial. S-a folosit Android 11 pentru proba Android.

## Limite și următoarea probă

Setul final cu iepure **nu este verificat integral în aplicația oficială Android**, iar Lenovo K10 fizic nu a fost testat. Rămân de verificat acolo biblioteca, conectarea tactilă a blocurilor, salvarea, redeschiderea fără internet și fluiditatea. Importul pe tabletele copiilor nu este o condiție a lecției: ele încep proiecte noi. Urmează [proba simplă din README](../README.md).

Cele două PDF-uri au fost regenerate pentru noul mini-puzzle și verificate vizual pagină cu pagină: patru pagini de ghid și trei cartonașe. Cartonașele sunt scheme pentru demonstrație, nu capturi exacte ale blocurilor sau personajelor.
