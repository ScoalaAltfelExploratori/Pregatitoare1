# Verificare - Lecția 8

**PASS, 10 noiembrie 2026. Șapte proiecte, 50 de verificări finale în browser.** 28 de probe principale, 14 după salvare și redeschidere, patru pentru blocurile adăugate manual și patru probe suplimentare de control. Numărul reprezintă verificări de comportament, nu misiuni distincte.

## Ce am verificat

- Fiecare exemplu: două rulări, apoi încă una după salvare și redeschidere. Cele șapte nume au rămas unice după reîncărcarea galeriei.
- Demo și M1: rutina continuă mai multe runde fără acumularea mărimii; oprire și repornire fără Reset. Starterul rămâne inert la steag și atingere.
- M2: iepurele îngheață, câinele continuă încă o rundă, apoi poate fi oprit separat. Un nou steag îi pornește pe amândoi.
- M3: fluture → minge → fluture → minge. Steagul și atingerea directă a artistului nu pornesc scena. O comandă de înghețare înainte de pornire este inofensivă. O probă separată confirmă că mingea păstrează iepurele în starea mare.
- R1: normal, mare, mic; iepurele rămâne mare când îl atingem în pauza corespunzătoare. Această țintă precisă a trecut de trei ori, inclusiv după redeschidere.
- R2: un tap pornește ambii artiști și cronometrul; oprire automată după aproximativ cinci secunde, urmată de peste două secunde fără transformări. Trei probe, fără Reset între primele două.
- Forever și Stop au fost adăugate prin tragere din paletă într-o rutină parțial pregătită. Restul blocurilor erau deja construite. După conectare: două porniri și două opriri reușite.

## Corecții rezultate din teste

Prima rutină folosea Mărime inițială imediat după pauza în starea mare. La Stop, motorul putea executa încheierea acelui bloc și readucea iepurele la normal. Am confirmat problema și cu o atingere directă, nu doar prin automatizare. Mărirea pauzei singură nu a rezolvat-o.

Soluția finală păstrează Mărime inițială numai la începutul rutinei, apoi inversează transformarea: mărește 4 / micșorează 4. Câinele face invers. R1 folosește mărește 4 / micșorează 8, cu pauze de 20. Toate exemplele care aveau rutina afectată au fost regenerate și retestate. Sursa motorului explică observația: Wait avansează la blocul următor, iar oprirea poate încheia acel bloc.

Cronometrul R2 rulează separat pe minge, pornit de același mesaj portocaliu ca artiștii. Expeditorul unui mesaj așteaptă programele destinatarilor; o așteptare după trimiterea mesajului care pornește Forever nu ar ajunge la comanda de oprire. Modelul final folosește trei destinatari în paralel.

La construcția manuală, prima poziționare a blocului Stop îl suprapunea peste pornire, fără conectare. După aliniere și conectare vizibilă, toate cele patru probe au trecut. Ghidul include această verificare.

Prototipurile nereușite sunt păstrate separat, în directoarele `prototip_reset_marime`, `prototip_pauze_scurte` și `prototip_constructie`. Nu sunt soluții pentru clasă și nu intră în cele 50 de verificări finale.

## Mediul și metoda

Am folosit [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), un port comunitar, în browserul din fundal. O copie locală servită la 127.0.0.1 a folosit fișierele publicate, fără schimbarea motorului. Un observator separat a înregistrat transformările vizibile, pagina, starea butonului de rulare și evenimentele audio. Rezultatele provin din rularea în editor, nu doar din citirea blocurilor.

Proiectele au fost importate prin Open, pornite prin comenzile scenei și salvate prin galerie. Nu am injectat programe în starea aplicației. În probele manuale am lucrat într-o copie de test; SJR-urile livrate nu au fost modificate prin acele intervenții.

Resursele declarate există în catalogul aplicației oficiale Android 1.5.11. Fiecare SJR conține numai datele proiectului și miniatura, fără personaje, fundaluri sau sunete personalizate. Programele native corespund exact sursei `lesson.json`. Nu există sunete în programele lecției; observatorul nu a înregistrat surse audio.

## Dovezi și reproducere

- [Rezultate, temporizări și amprentele SJR-urilor](rezultate.json).
- [Matricea principală](browser_results.json), fișierele `p*_reopen_results.json`, [blocurile adăugate manual](manual_results.json) și [comenzile suplimentare](additional_results.json).
- [Persistența galeriei](gallery_persistence.json), [puzzle dificil](03_Puzzle_dificil.png), [construcție manuală](constructie_manuala.png).
- `p*_main*.json` și `p*_reopen*.json`: observațiile scenei din rulări.
- [Observator](instrumente/qa-monitor.js), [server local](instrumente/browser_server.py), [amprentele aplicației publicate](instrumente/upstream_manifest.json).
- [Verificarea paginii lecției](browser_index.json) și [captura paginii](pagina_lectiei.png).

Pentru proba obișnuită urmează [README-ul lecției](../README.md), fără instrumentele de audit. Serverul de audit pornește pe 127.0.0.1:8771 și descarcă fișierele publice într-un cache la prima folosire. Panoul Start capture / Stop capture expune observațiile. Nu solicită microfonul. Versiunea publicată se poate schimba; manifestul păstrează amprentele fișierelor efectiv testate.

## Limite

Nu am testat această lecție în aplicația Android oficială sau pe Lenovo K10 fizic. Verificarea catalogului confirmă existența resurselor, nu înlocuiește rularea pe tabletă. Înainte de clasă reconstruiește M2 și M3 pe un Lenovo, repetă pornirea/înghețarea și salvează/redeschide fără internet. Copiii nu au nevoie de importuri.

Ghidul are patru pagini, cartonașele au cinci. Toate cele nouă pagini au fost randate și inspectate vizual. Pagina HTML afișează cele cinci misiuni și captura editorului fără depășire orizontală în fereastra testată.
