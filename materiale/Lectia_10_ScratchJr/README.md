# Lecția 10 - Marea finală: Jocul meu complet

**50 de minute, 6-7 ani. Lucru individual.** Continuăm propriul proiect din lecția 9 și construim o sărbătoare cu început, ordine și sfârșit. Trei misiuni, inclusiv un puzzle dificil pentru toți, plus două rezerve suplimentare.

## Exemplu, puzzle și creație proprie

Deschidem cu **Artiștii își dau rândul**, pornind de la [Conversation](https://www.scratchjr.org/teach/activities/conversation). Păstrăm misiunile, puzzle-ul dificil și rezervele existente.

**Minutele 37-45: Finalul pe care îl semnez eu** - 8 minute rezervate tuturor, cu alegeri de programare și o probă proprie. Copilul poate porni de la orice misiune care îi funcționează. Numai resurse incluse în aplicație, fără importuri pe tabletele copiilor.

[Ghidul profesorului pe site](ghid-profesor.html) · [Ghid PDF](Ghid_profesor_Lectia_10.pdf) · [Surse și adaptări](../Surse_oficiale_ScratchJr.md)

## Pregătire simplă

Numai **Rabbit, Dog, Ball, Butterfly, Beach Day și Beach Night**, deja incluse în ScratchJr. Copiii nu primesc fișiere, nu importă proiecte și nu descarcă resurse. Redeschid proiectul L9 pe aceeași tabletă. Lucrează pe pagina de final; traseul propriu al insulei poate rămâne.

Exemplele profesorului includ ambele pagini și lanțul de descoperiri L9. Demo-ul are o intrare scurtă prin fluture; starterul păstrează insula funcțională, dar iepurele de pe final nu are program. Acestea sunt referințe opționale pentru profesor, nu fișiere de distribuit copiilor.

**Dacă lipsește proiectul:** construim o intrare simplă, cu două pagini: fluture cu atingere → pagina 2; pe final, iepure și minge cu atingere → pagina 1. Nu este necesară refacerea întregii lecții 9.

| Activitate | Ținta |
| --- | --- |
| M1 Sărbătoarea mea | Două măriri egale, cu revenire la normal |
| M2 Butonul așteaptă | Mingea apare numai după terminarea iepurelui |
| M3 Marea finală - dificilă | Iepure, câine, apoi întoarcere; două jocuri complete |
| R1 Încă o dată! | Encore pe aceeași pagină, cu butoanele indisponibile în timpul show-ului |
| R2 Întoarcere automată | Trei secunde după artiști, apoi revenire automată pe insulă |

Rezervele de 8-10 și 6-8 minute sunt în plus. Nu înlocuiesc provocarea dificilă sau salvarea. Nu cerem lucru în perechi, schimb de tablete, prezentări obligatorii sau construirea unor programe greșite pentru reparare.

## Materiale

- [Ghidul profesorului](Ghid_profesor.md) și [PDF de cinci pagini](Ghid_profesor_Lectia_10.pdf).
- [Cinci cartonașe PDF](Cartonase_Lectia_10.pdf), cu ținte și scheme.
- [Soluții explicate și cinci SJR-uri](solutii/lectia_10/README.md).
- [Demo](proiecte/00_Demo_Marea_finala.sjr), [starter cu insula L9](proiecte/01_Start_Insula_L09.sjr), [pagina pentru proiector](index.html).
- [Raportul testelor](verificare/README.md), [observații după lecție](Observatii_dupa_lectie.md), [planul cursului](../Plan_10_lectii_ScratchJr.md).

## Pornire și test individual

Selectează pagina 1 și apasă steagul. În exemplele complete: fluture → câine → minge. În demo: fluture. Intrarea programată în pagina 2 pornește sărbătoarea. Alegerea miniaturii de editare nu înlocuiește această intrare.

La M1 mingea rămâne disponibilă, dar în probă așteptăm spectacolul complet. La M2/M3 ea se ascunde și apare după artiști. La R1 se adaugă fluturele Encore pe final; și el așteaptă terminarea. La R2 mingea rămâne ascunsă, iar întoarcerea se face singură.

Nu apăsa Reset sau steagul între două runde ale jocului. La revenirea prin Go to Page se execută pregătirea insulei. După salvare/redeschidere, alege prima pagină și apasă steagul pentru pregătire.

## Proba opțională în browser pe PC

Deschide [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), portul comunitar folosit pentru teste. În galerie: Open → alege SJR-ul → deschide proiectul. Parcurge două runde, salvează prin galerie și redeschide. Browserul nu sincronizează proiectele cu tabletele.

[Raportul](verificare/README.md) explică probele efectuate și limitele lor. Înainte de clasă reconstruiește M3 pe un Lenovo și verifică atingerea, ordinea, două runde și salvarea/redeschiderea offline. Verificarea în browser nu înlocuiește tableta fizică.

## Surse editabile

`lesson.json` definește programele și cartonașele. `Ghid_profesor.md` este sursa ghidului. `python build_pack.py` regenerează cele două PDF-uri și șapte SJR-uri; `--projects-only` generează numai proiectele. Necesită Python, reportlab, Pillow, pypdf și fonturile Arial din Windows. Schimbarea programelor cere repetarea testelor în editor.

Cursul se încheie cu un proiect funcțional pe tableta fiecărui copil. Explicația către profesor poate fi prin gesturi și arătarea blocurilor. Profesorul stabilește păstrarea/exportul proiectelor importante; nu ștergem datele aplicației după curs.
