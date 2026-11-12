# Lecția 9 - Insula misterioasă

**50 de minute, 6-7 ani. Lucru individual:** fiecare copil construiește și testează pe propria tabletă. Trei misiuni, un puzzle dificil pentru toți și două rezerve suplimentare. Nu sunt necesare schimbul de tablete sau interacțiunea între copii.

## Exemplu, puzzle și creație proprie

Deschidem cu **Jocul are o regulă pe care o pot explica**, pornind de la [Animated Genres - proiectul Game](https://www.scratchjr.org/curricula/animatedgenres/full.pdf). Păstrăm misiunile, puzzle-ul dificil și rezervele existente.

**Minutele 37-45: Secretul insulei mele** - 8 minute rezervate tuturor, cu alegeri de programare și o probă proprie. Copilul poate porni de la orice misiune care îi funcționează. Numai resurse incluse în aplicație, fără importuri pe tabletele copiilor.

[Ghidul profesorului pe site](ghid-profesor.html) · [Ghid PDF](Ghid_profesor_Lectia_09.pdf) · [Surse și adaptări](../Surse_oficiale_ScratchJr.md)

## Pregătire simplă

Numai **Butterfly, Dog, Ball, Rabbit, Beach Day și Beach Night**, din biblioteca ScratchJr. Fără descărcări, conturi ale copiilor, imagini externe, înregistrări sau fișiere de copiat pe tablete. Nu sunt blocuri noi: combinăm mesaje, vizibilitate, atingere și pagini.

Copiii încep cu Beach Day, Butterfly și Dog; la M2 adaugă Ball și pagina de final. Construim împreună scena, apoi fiecare programează. Exemplele SJR sunt opționale, pentru profesor. Mingea de pe pagina 2 este alt personaj decât mingea de pe pagina 1 și are propriul program de întoarcere.

| Activitate | Ținta |
| --- | --- |
| M1 Insula reacționează | Două surprize independente, fiecare repetabilă |
| M2 Ieșirea ascunsă | Descoperă mingea, ajunge la final, revine cu ieșirea ascunsă |
| M3 Lanțul descoperirilor - dificilă | Fluture → câine → minge → final → întoarcere; două runde |
| R1 Surpriza opțională | Un truc suplimentar care nu deschide descoperirile |
| R2 Două drumuri | Oricare dintre două personaje poate dezvălui aceeași ieșire |

Rezervele de 6-8 și 8-10 minute sunt peste conținutul de bază. Nu înlocuiesc provocarea dificilă sau timpul de salvare. Nu cerem copierea unor programe greșite pentru a le repara.

## Materiale

- [Ghidul profesorului](Ghid_profesor.md) și [PDF de cinci pagini](Ghid_profesor_Lectia_09.pdf).
- [Cinci cartonașe PDF](Cartonase_Lectia_09.pdf), cu ținte, fără soluții complete.
- [Soluțiile explicate și cele cinci SJR-uri](solutii/lectia_09/README.md).
- [Demo](proiecte/00_Demo_Descoperire.sjr), [scenă fără programe](proiecte/01_Start_Insula.sjr), [pagina pentru proiector](index.html).
- [Raportul testelor](verificare/README.md), [fișa de observații](Observatii_dupa_lectie.md), [planul cursului](../Plan_10_lectii_ScratchJr.md).

## Cum începi și reiei jocul

La prima deschidere, selectează prima pagină și apasă steagul: acesta ascunde descoperirile. La M3 atingi numai fluturele, apoi câinele dezvăluit, apoi mingea dezvăluită. Pe final atingi mingea pentru întoarcere. Programele cu steag ale paginii 1 se execută la revenirea prin Go to Page și pregătesc o rundă nouă.

Nu folosi Reset sau miniaturile paginilor în mijlocul probei. După întoarcere nu este nevoie de încă un steag. La redeschiderea unui proiect, steagul inițial face parte din pregătire; galeria poate păstra starea în care ai salvat.

La M1 cele două reacții se pornesc prin atingere. Starterul nu conține programe. Demo-ul este pe o singură pagină și folosește un nou steag pentru a ascunde din nou câinele.

## Proba opțională pe PC

Deschide [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), portul comunitar folosit la teste. În galerie: Open → alege SJR-ul → deschide proiectul. Urmează proba din ghid, apoi revino în galerie, redeschide și testează din nou. Browserul nu sincronizează proiectele cu tabletele.

[Raportul](verificare/README.md) descrie testele efective și limitele lor. Înainte de clasă reconstruiește M3 pe un Lenovo: ascundere la steag, descoperiri, întoarcere, două runde și salvare/redeschidere offline. Copiii nu au nevoie de importuri.

## Surse editabile

`lesson.json` definește proiectele și cartonașele. `Ghid_profesor.md` este sursa ghidului. `python build_pack.py` regenerează cele două PDF-uri și cele șapte SJR-uri; `--projects-only` generează numai proiectele. Necesită Python, reportlab, Pillow, pypdf și fonturile Arial din Windows. Schimbarea programelor cere repetarea testelor în editor.

Lecția 10 poate continua propriul proiect: o îmbunătățire aleasă de copil și verificată individual. Feedbackul unui coleg și prezentarea sunt opționale.
