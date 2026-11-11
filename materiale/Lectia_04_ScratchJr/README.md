# Lecția 4 - Telecomanda fermecată

**50 de minute, 6-7 ani. Trei misiuni principale, inclusiv una dificilă, plus două rezerve.** Copiii folosesc mesaje colorate pentru a comanda alte personaje și pentru a lega trucuri într-un spectacol.

## Pregătirea simplă a clasei

ScratchJr este deja instalat. Creăm un proiect nou cu **Rabbit, Dog și Park** din biblioteca aplicației; la misiunea 2 adăugăm **Butterfly**. Eliminăm pisica inițială dacă folosim exact modelul. Lăsăm loc între personaje, la dimensiunile inițiale; nu cerem grilă sau poziții exacte.

Nu copiem fișiere pe tablete, nu importăm proiecte și nu descărcăm resurse. Mesajele sunt semnale în interiorul proiectului; nu folosesc internetul, conturi sau text de scris. Personajele rămân pe loc.

## Materialele profesorului

- [Ghidul pas cu pas](Ghid_profesor.md) și [PDF-ul](Ghid_profesor_Lectia_04.pdf): ritm, demonstrație, indicii și soluții.
- [Cinci cartonașe PDF](Cartonase_Lectia_04.pdf): cerințe vizuale, fără programele complete.
- [Soluțiile explicate și cele cinci proiecte SJR](solutii/lectia_04/README.md).
- [Demo](proiecte/00_Demo_Mesaj.sjr), [scenă fără programe](proiecte/01_Start_Telecomanda.sjr), [index pentru browser](index.html).
- [Raportul verificării](verificare/README.md) și [fișa de observații](Observatii_dupa_lectie.md).

| Activitate | Ținta |
| --- | --- |
| M1 Magia la distanță | Atingerea iepurelui comandă câinelui creșterea și revenirea la normal |
| M2 Două butoane | Iepurele comandă creșterea câinelui; fluturele comandă dispariția și revenirea lui |
| M3 Spectacolul în lanț - dificilă | Un singur tap: iepure, apoi câine, apoi fluture; două rulări fără resetare |
| R1 Un semnal, două surprize | O singură culoare și un singur mesaj pornesc două trucuri |
| R2 De-a v-ați ascunselea | Iepurele ascunde câinele; fluturele îl arată, chiar dacă este ascuns |

Rezervele de 6-8 și 8-10 minute sunt **în plus față de cele 50 de minute**. Păstrăm provocarea dificilă pentru toți, pauza și ultimele cinci minute de salvare. Copiii construiesc; nu copiază programe greșite pentru a le repara.

## Detalii importante

Trimite mesaj și Pornire la mesaj sunt două blocuri galbene diferite. La expeditor punem atingere → trimite; la destinatar, la mesaj → acțiuni. Selectăm culoarea de sub plic. Exemplul folosește portocaliu și albastru; orice două culori distincte sunt acceptate dacă se potrivesc la capete.

Culoarea identifică programele care răspund, nu un anumit personaj. Mai multe personaje pot asculta aceeași culoare. Un personaj ascuns poate primi mesaj. La M2 câinele are două secvențe separate; la M3 fiecare personaj are un singur program, iar fluturele nu mai pornește prin atingere.

Trecem de la o misiune la alta păstrând scena și înlocuind programele care își schimbă rolul. Ghidul explică exact ce păstrăm. O atingere pe scenă, apoi așteptăm finalul; miniatura din stânga selectează pentru editare. Steagul verde nu pornește exemplele. La demo efectul se acumulează, deci resetăm între probe; soluțiile complete se pot repeta fără resetare.

## Testare pe PC în browser

Deschide [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), portul comunitar pentru browser. Din galerie, apasă Open, selectează un SJR și deschide proiectul. Atinge iepurele pe scenă; la M2 și R2 încearcă și fluturele, pe rând. La M3 atingi numai iepurele și urmărești toți cei trei artiști.

La final revino la galerie pentru salvare, redeschide și repetă. Browserul nu se sincronizează cu tabletele. Aceste fișiere sunt numai pentru pregătirea profesorului; copiii construiesc în aplicație.

**Verificat în browser la 10 noiembrie 2026:** toate cele șapte proiecte, cele cinci soluții, repetarea, ordinea lanțului dificil și salvarea/redeschiderea au trecut probele. Am construit și testat manual legătura cu mesaj albastru, inclusiv selectarea culorii la ambele capete. Vezi [raportul](verificare/README.md) pentru dovezi și limite. Lecția 4 nu a fost rulată în aplicația oficială Android; testarea în browser nu înlocuiește proba tactilă și offline pe Lenovo.

## Proba pe Lenovo înainte de clasă

Construiește M1 din soluții și atinge iepurele. Apoi construiește M3 și rulează de două ori fără resetare. La R2 verifică revenirea câinelui ascuns prin atingerea fluturelui. Revino în galerie și redeschide proiectul fără internet. Nu este necesar să imporți fișiere pe tabletă.

## Surse editabile

`lesson.json` definește misiunile, personajele, programele și scenariile de verificare. `Ghid_profesor.md` este sursa ghidului. `python build_pack.py` generează cele două PDF-uri și șapte SJR-uri; `--projects-only` generează numai proiectele. Necesită Python, reportlab, Pillow, pypdf și Arial din Windows. După schimbarea programelor repetă testele în editor.

[Planul celor zece lecții](../Plan_10_lectii_ScratchJr.md). Mesajele sunt introduse aici; lecția 7 va extinde folosirea lor.
