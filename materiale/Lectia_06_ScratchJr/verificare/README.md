# Verificare - Lecția 6

**PASS, 10 noiembrie 2026. Șapte proiecte, 29 verificări finale în browser.** 14 probe principale, 7 după redeschidere, 7 atingeri inactive și o construcție manuală. Aceste numere reprezintă verificări de comportament, nu numărul misiunilor.

## Ce am verificat

- Toate cele șapte exemple: două rulări cu Reset și steag; o a treia după salvare și redeschidere.
- Șapte atingeri pe personajul care așteaptă contactul: nu pornesc reacția.
- Pozițiile finale, ordinea câine/fluture, mingea ascunsă, fluturele care crește de la distanță și revine la mărimea inițială.
- 12 înregistrări audio reale din rulările cu sunet: exact un Pop și peste două secunde de liniște finală în fiecare.
- Demo-ul construit manual în editor, prin tragerea blocurilor: steag → dreapta 5 și ciocnire → sus 5.
- Numerele grilei verificate vizual: pozițiile inițiale afișează 4/5, 11/5, 18/5; fluturele de la rezervă afișează 18/11.

## Corecții rezultate din teste

Prima variantă a lanțului lăsa câinele în contact cu fluturele; câinele repornea și ajungea să traverseze marginea scenei. Soluția finală folosește dreapta 5 → jos 2: câinele se separă, iar fluturele are un singur Pop. Toate rulările finale folosesc această corecție.

Ghidul a fost corectat să folosească numerele vizibile ale grilei. Coordonatele interne și numerele coloanelor afișate nu au aceeași origine. Copiii folosesc grila, fără pixeli. Pozițiile interne au fost aliniate la pași de 24 pixeli înaintea matricei finale.

`prototype_chain.json` documentează încercarea inițială nereușită; nu este inclusă în numărul verificărilor finale. Prototipurile și înregistrările lor sunt dovezi de lucru, nu soluții alternative pentru clasă.

[Analiza celor 12 înregistrări audio reale](analiza_audio.json).

## Mediul și metoda

Am folosit [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), un port comunitar, în browserul din fundal. O copie locală servită la 127.0.0.1 a folosit fișierele publicate ale aplicației, fără schimbarea motorului. Un observator separat a înregistrat transformările vizibile ale scenei, pagina vizibilă, starea butonului de rulare și evenimentele audio. Nu am dedus rezultatele doar din listele de blocuri.

Toate proiectele au fost deschise prin Open, acționate prin comenzile editorului și salvate prin galerie. Cele 14 nume ale celor două lecții au rămas unice după reîncărcarea galeriei, înaintea probelor manuale. Probele manuale au folosit copii de lucru redenumite, nu au modificat SJR-urile livrate.

Resursele declarate au fost verificate în catalogul aplicației oficiale Android 1.5.11. Fiecare SJR conține datele proiectului și miniatura, fără imagini, personaje, fundaluri sau sunete personalizate. Programele native corespund sursei `lesson.json`.

## Dovezi și reproducere

- [Rezultate și amprentele fișierelor](rezultate.json).
- [Matricea principală](browser_results.json), fișierele `p*_reopen_results.json` și [construcția manuală](manual_results.json).
- [Persistența galeriei](gallery_persistence.json) și [captura puzzle-ului dificil](03_Puzzle_dificil.png).
- `p*_run*.json` și `p*_reopen*.json`: observații ale scenei în timpul rulării.
- [Observatorul](instrumente/qa-monitor.js), [serverul de probă](instrumente/browser_server.py), [versiunile fișierelor publicate](instrumente/upstream_manifest.json).

Pentru proba obișnuită urmează [README-ul lecției](../README.md), fără aceste instrumente. Pentru audit, serverul pornește local pe portul 8770; la prima rulare descarcă fișierele publice într-un cache. Panoul Start capture / Stop capture expune datele observate și poate salva WAV-ul. Nu solicită microfonul. În probele fără sunet, lipsa surselor audio este un control logic; nu pretindem o înregistrare acustică a difuzorului fizic.

## Limite și verificarea finală pe tabletă

Nu am testat aceste două pachete în aplicația Android oficială sau pe Lenovo K10 fizic. Browserul confirmă comportamentul în mediul descris, nu performanța tactilă, difuzorul sau salvarea offline a tabletei. Înainte de clasă reconstruiește M1 și M3 pe un Lenovo, repetă și salvează/redeschide fără internet. Copiii nu importă fișiere.

Ghidul de patru pagini și cele cinci cartonașe au fost randate și toate paginile au fost inspectate vizual. Pagina HTML are aceleași cinci cerințe; verificarea ei este în `browser_index.json`.
