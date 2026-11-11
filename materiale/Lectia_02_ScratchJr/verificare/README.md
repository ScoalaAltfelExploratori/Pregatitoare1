# Verificarea lecției 2 - 9 noiembrie 2026

## Teste în editorul pentru browser

Mediu: [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), port comunitar, folosit într-o sesiune separată în fundal. Acesta nu este aplicația oficială Android.

Cele cinci SJR-uri au fost importate prin selectorul de fișiere al interfeței, deschise din galerie și pornite cu steagul verde. Pozițiile au fost citite din transformările elementelor afișate pe scenă; nu am apelat motorul intern pentru a produce execuția. Pentru fiecare fișier am verificat resetarea, redeschiderea și o a doua rulare. Toate cinci au rămas în galerie după reîncărcarea browserului.

| Exemplu | Ce s-a observat | Rezultat |
| --- | --- | --- |
| Demonstrație | Două sărituri, fără deplasare orizontală | PASS |
| Starter | Programe goale, ambele personaje nemișcate | PASS |
| Misiunea 1 | Trei sărituri și trei reveniri la start; extrema x=144 | PASS |
| Misiunea 2 | Trei sărituri; ajunge din x=96 la x=240 | PASS |
| Misiunea dificilă | Patru sărituri la dus; atinge x=288, apoi revine la x=96 | PASS |

Mingea a rămas nemișcată în toate rulările. Poziția verticală de bază a iepurelui este y=192, iar mingea este la y=288. La destinație, personajele sunt aliniate pe aceeași coloană și separate vertical. Coordonatele CSS din jurnal includ decalajul centrului imaginii; nu sunt coordonatele interne ale centrului scenei.

## Construirea prin gesturi

Am construit în editor, prin tragere din paletă: steag → Repeat 2 [sari 2] → Repeat 4 [dreapta 1]. Am schimbat numărul cu tastatura numerică. Cele două bucle sunt în ordine, nu imbricate. Programul a executat două sărituri, apoi patru pași spre dreapta; comportamentul s-a păstrat după salvare și redeschidere.

La prima plasare, o mișcare s-a atașat între bucle. Undo și tragerea în centrul deschiderii au plasat-o corect în al doilea cadru. Acest lucru justifică indiciul din ghid: verificăm vizual ce blocuri sunt cuprinse în cadru. Programul de probă a fost eliminat și starterul redeschis cu zona de programare goală. Fișierul SJR de pe disc nu a fost modificat.

[Captura construirii](browser_repeat_construit.png) și [observațiile testului de editare](browser_editare.json) documentează această probă. Nu reprezintă o a patra misiune pentru copii.

## Grila și datele proiectelor

În interfață, Rabbit la x=96, y=192 este indicat prin coloana 5, rândul 7. Ball la x=240, y=288 apare în coloana 11, rândul 3; în misiunea dificilă se mută la x=288, coloana 13. Rândurile afișate cresc de jos în sus. Ghidul a fost corectat să folosească aceste numere vizibile, separat de coordonatele interne.

Arhivele au JSON valid, un singur steag la iepure și numai Repeat, deplasări și sărituri. Mingea are program gol. Structura buclei a fost verificată față de serializarea și exemplul Dance din sursa instalată ScratchJr Desktop 1.3.2, apoi confirmată prin execuția în browser. Cele trei resurse sunt aceleași resurse incluse în Android, confirmate la pregătirea lecției 1. Arhivele conțin doar datele proiectului și o miniatură generică, fără personaje sau fundaluri personalizate.

## Dovezi

- [Observațiile celor cinci proiecte](browser_observatii.json): poziții în timpul animațiilor și numărul de sărituri pentru fiecare rulare.
- [Amprentele SHA-256 și rezultatele](rezultate.json): identifică fișierele testate.
- Capturi: [demo](browser_00_demo.png), [starter](browser_01_start.png), [M1](browser_02_m1.png), [M2](browser_03_m2.png), [M3](browser_04_m3.png).
- [Poziția mingii în grila inițială](browser_grila_start.png) și [scena expediției cu grila](browser_expeditia_grila.png).

## Limite

Lecția 2 nu a fost testată în aplicația oficială Android, în aplicația Desktop nativă sau pe un Lenovo K10 fizic. Browserul nu certifică gesturile tactile, fluiditatea sau funcționarea offline pe tabletă. Înainte de clasă, profesorul face proba scurtă din [README](../README.md). Copiii nu trebuie să importe nimic.

Cele patru pagini ale ghidului și cele trei cartonașe au fost randate cu Poppler și inspectate vizual. Legăturile locale au fost verificate, iar pagina materialelor a fost deschisă în browser și previzualizarea soluției a funcționat. Rezultatele sunt consemnate în rezultate.json.
