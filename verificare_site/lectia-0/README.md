# Verificarea editorului Lecția 0

[Deschide Laboratorul de cod](../../scratchjr/lectia-0/index.html) · [Ghidul profesorului](../../scratchjr/lectia-0/README.md)

Versiunea editabilă, 11 noiembrie 2026. Testarea privește editorul web educațional, nu aplicația oficială ScratchJr.

## Execuție și editare

În browser au fost rulate toate cele **12 activități de codare**: zece opriri și două rezerve. Toate exemplele editabile au atins țintele. Introducerea, pauza și încheierea completează cele 15 momente.

Au fost verificate prin interacțiuni reale:

- tragerea unui bloc din paletă în program și într-o zonă goală de după blocuri;
- tragerea unei acțiuni în interiorul unei repetiții;
- modificarea Dreapta 2 în Dreapta 4: rezultatul a trecut de la 5 la 7;
- reordonarea prin tragere: Ascunde → Arată lasă 7 mingi; Arată → Ascunde lasă 6;
- tragerea unui bloc la Șterge și recuperarea lui prin Înapoi;
- păstrarea valorii editate la plecarea dintr-o activitate și revenire;
- schimbarea mesajului portocaliu în albastru: s-a mărit iepurașul în locul cățelului;
- trei sunete și impulsurile vizuale, contactul care ascunde comori, schimbarea paginii;
- patru dansatori opriți și doi rămași activi; Stop a oprit și animațiile rămase;
- personajele ascunse indisponibile pentru apăsare, apoi lanțul complet fluture–cățel–minge–noapte;
- finala cu șapte animale intermediare, cinci la sfârșit și Pop după plecare;
- rezultatele 0 și 10 din rezerve;
- Stop în timpul unei repetiții și Reia scena, care păstrează codul și restaurează poziția inițială.

[Rezultatele din browser](coding-browser.json) includ verificările și inspecția celor 15 ecrane la **1024 × 768**. Nu au fost găsite controale tăiate sau selectoare de predicție ascunse. Au fost inspectate și ecranele la **1280 × 720**. [Captură 16:9](coding-16-9.png) · [Captură 4:3](coding-4-3.png).

## Verificări automate

**135 teste trecute**, dintre care 13 pentru editor: soluțiile tuturor activităților, schimbări reale de valori și ordine, corpul repetiției, rutarea mesajelor și editarea receptorilor, contact, pauze și ordinea finalei, oprire, blocarea personajelor ascunse, limite de execuție, undo, ștergere/reordonare, predicții invalidate la editare, anularea animațiilor, păstrarea codului și refuzul redării audio. Verificarea sintaxei JavaScript a trecut.

Testele rulează cu `npm test`; verificarea sintaxei cu `npm run check`. Motorul execută programele date de editor; activitățile nu pornesc animații fixe bazate pe răspuns.

## Limite ale verificării

Sunetul Pop a fost solicitat de browser, iar ritmul a fost verificat vizual. Volumul și audibilitatea se verifică pe laptopul de la clasă. Testele verifică și continuarea corectă când redarea audio este refuzată.

Testarea interactivă locală a folosit HTTP. Browserul integrat blochează `file://`; deschiderea directă a folderului se verifică în browserul laptopului înainte de utilizare offline. Nu există resurse externe necesare rulării.

Verificarea pe proiectorul fizic rămâne de făcut. Dacă ecranul complet nu este disponibil în browser, interfața indică F11.

Fișierele `browser.json`, `projector-*.png` și `live-projector.png` din acest folder sunt dovezi ale versiunii anterioare, cu demonstrații fixe. Dovezile versiunii editabile au prefixul `coding-`.
