# Verificare - Lecția 7

**PASS, 10 noiembrie 2026. Șapte proiecte, 64 verificări finale în browser.** 42 probe principale, 21 după redeschidere, 0 atingeri inactive și o construcție manuală. Aceste numere reprezintă verificări de comportament, nu numărul misiunilor.

## Ce am verificat

- Toate cele șapte exemple: două parcurgeri ale fiecărui traseu, plus una după salvare și redeschidere. Sunt 21 de pași diferiți, verificați de trei ori.
- Portalul, starterul inert, întoarcerea prin minge și ambele ramuri ale puzzle-ului dificil.
- Săritura înaintea schimbării paginii, câinele care așteaptă atingerea în misiunile principale, mărirea până la 0,7 și revenirea la 0,5.
- Rezervele pornesc acțiunile la intrarea programată în pagină. Secvența cu trei scene are o săritură, două sărituri și transformare, apoi rămâne pe pagina 3.
- Circuitele închise au fost repetate fără Reset. Demo-ul, starterul și M1 au fost readuse la pagina 1 prin editor între probe.
- Am adăugat manual pagina 3 din plus și am construit atingere → Go to Page 3 prin tragerea blocurilor. Prima tragere lăsase blocul neconectat; după conectarea vizibilă, tranziția a funcționat.

## Detalii confirmate în aplicație

Go to Page oprește scena veche și pornește programele cu steag de pe pagina destinație. Miniatura pentru editare nu este echivalentul acestei intrări. Personajele de pe pagini diferite sunt instanțe separate.

Pagina creată manual a primit intern id-ul `page 1`, deși miniatura selectată arată pagina 3. Verificarea manuală folosește miniatura vizibilă, nu presupune că numărul paginii este numele său intern. Caracterul implicit adăugat de portul comunitar în această probă nu este folosit în materialele lecției.

Nu există sunete în programele lecției 7. Nu folosim mesaje între pagini, importuri pentru copii sau reluări automate fără oprire.

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
