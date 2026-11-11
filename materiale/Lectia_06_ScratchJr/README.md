# Lecția 6 - Parcul cu surprize

**50 de minute, 6-7 ani. Trei misiuni, inclusiv una dificilă pentru toți, plus două rezerve în afara celor 50 de minute.** Copiii construiesc propriile programe pentru ținte concrete.

## Pregătire simplă

ScratchJr instalat este suficient pentru resurse: folosim numai **Rabbit, Dog, Butterfly, Ball, Park și Pop**, din biblioteca aplicației. Fără importuri, conturi ale copiilor, fișiere de copiat, microfon sau descărcări. Scenele se construiesc împreună în timpul lecției. SJR-urile sunt doar exemple opționale pentru profesor.

Reset înaintea fiecărei probe, apoi un singur steag. Păstrăm mărimile inițiale și pozițiile din ghid; contactul trebuie urmat de separare.

## Materiale

- [Ghidul profesorului](Ghid_profesor.md) și [PDF de patru pagini](Ghid_profesor_Lectia_06.pdf).
- [Cinci cartonașe PDF](Cartonase_Lectia_06.pdf), cu ținte vizuale și fără soluțiile complete.
- [Soluțiile și cinci proiecte SJR](solutii/lectia_06/README.md).
- [Demo](proiecte/00_Demo_Contact.sjr) și [scenă fără programe](proiecte/01_Start_Parc.sjr).
- [Index pentru proiector](index.html), [raportul testelor](verificare/README.md), [fișa de observații](Observatii_dupa_lectie.md).

| Activitate | Puzzle |
| --- | --- |
| Misiunea 1 | Trezește paznicul |
| Misiunea 2 | Două vizite |
| Misiunea 3 - dificilă | Reacția în lanț |
| Rezervă 1 - 6-8 minute | Comoara |
| Rezervă 2 - 8-10 minute | Alarma la distanță |

Rezervele sunt pentru cei care termină devreme. Păstrăm puzzle-ul dificil, pauza și salvarea pentru toată clasa. Nu cerem construirea unor programe greșite pentru reparare.

## Testare pe PC, în browser

Deschide [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), portul comunitar folosit pentru verificări. Din galerie apasă Open și selectează un SJR de mai sus. Urmează proba din ghid, revino în galerie pentru salvare și redeschide. Browserul nu se sincronizează cu tabletele.

Reset înaintea fiecărei probe, apoi un singur steag. Păstrăm mărimile inițiale și pozițiile din ghid; contactul trebuie urmat de separare.

Raportul documentează testele efective, corecțiile și limitele. Testarea în browser nu este o testare a aplicației Android sau a tabletei fizice. Înainte de clasă reconstruiește M1 și M3 pe un Lenovo, verifică două rulări, salvarea și redeschiderea fără internet. Pe tabletele copiilor nu trebuie instalat nimic în afara ScratchJr.

## Surse editabile

`lesson.json` conține programele, cartonașele și țintele verificărilor. `Ghid_profesor.md` este sursa ghidului. `python build_pack.py` regenerează cele două PDF-uri și șapte SJR-uri; `--projects-only` generează numai proiectele. Necesită Python, reportlab, Pillow, pypdf și Arial din Windows. După modificarea programelor repetă probele în editor.

[Planul celor zece lecții](../Plan_10_lectii_ScratchJr.md).
