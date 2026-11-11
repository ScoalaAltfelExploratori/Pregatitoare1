# Lecția 7 - Povestea cu două finaluri

**50 de minute, 6-7 ani. Trei misiuni, inclusiv una dificilă pentru toți, plus două rezerve în afara celor 50 de minute.** Copiii construiesc propriile programe pentru ținte concrete.

## Pregătire simplă

ScratchJr instalat este suficient pentru resurse: folosim numai **Rabbit, Dog, Ball, Park, Beach Day și Beach Night**, din biblioteca aplicației. Fără importuri, conturi ale copiilor, fișiere de copiat, microfon sau descărcări. Scenele se construiesc împreună în timpul lecției. SJR-urile sunt doar exemple opționale pentru profesor.

Începem pe pagina 1 și atingem personajele pe scenă. Miniaturile din dreapta servesc editării. M2, M3 și rezervele permit revenirea prin minge și repetarea fără Reset.

## Materiale

- [Ghidul profesorului](Ghid_profesor.md) și [PDF de patru pagini](Ghid_profesor_Lectia_07.pdf).
- [Cinci cartonașe PDF](Cartonase_Lectia_07.pdf), cu ținte vizuale și fără soluțiile complete.
- [Soluțiile și cinci proiecte SJR](solutii/lectia_07/README.md).
- [Demo](proiecte/00_Demo_Pagina.sjr) și [scenă fără programe](proiecte/01_Start_Poveste.sjr).
- [Index pentru proiector](index.html), [raportul testelor](verificare/README.md), [fișa de observații](Observatii_dupa_lectie.md).

| Activitate | Puzzle |
| --- | --- |
| Misiunea 1 | Portalul |
| Misiunea 2 | Dus-întors |
| Misiunea 3 - dificilă | Două finaluri |
| Rezervă 1 - 6-8 minute | Finalul pornește singur |
| Rezervă 2 - 8-10 minute | Trei opriri |

Rezervele sunt pentru cei care termină devreme. Păstrăm puzzle-ul dificil, pauza și salvarea pentru toată clasa. Nu cerem construirea unor programe greșite pentru reparare.

## Testare pe PC, în browser

Deschide [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), portul comunitar folosit pentru verificări. Din galerie apasă Open și selectează un SJR de mai sus. Urmează proba din ghid, revino în galerie pentru salvare și redeschide. Browserul nu se sincronizează cu tabletele.

Începem pe pagina 1 și atingem personajele pe scenă. Miniaturile din dreapta servesc editării. M2, M3 și rezervele permit revenirea prin minge și repetarea fără Reset.

Raportul documentează testele efective, corecțiile și limitele. Testarea în browser nu este o testare a aplicației Android sau a tabletei fizice. Înainte de clasă reconstruiește M1 și M3 pe un Lenovo, verifică două rulări, salvarea și redeschiderea fără internet. Pe tabletele copiilor nu trebuie instalat nimic în afara ScratchJr.

## Surse editabile

`lesson.json` conține programele, cartonașele și țintele verificărilor. `Ghid_profesor.md` este sursa ghidului. `python build_pack.py` regenerează cele două PDF-uri și șapte SJR-uri; `--projects-only` generează numai proiectele. Necesită Python, reportlab, Pillow, pypdf și Arial din Windows. După modificarea programelor repetă probele în editor.

[Planul celor zece lecții](../Plan_10_lectii_ScratchJr.md).
