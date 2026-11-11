# Lecția 2 - Provocările iepurașului

**50 de minute, 6-7 ani. Trei misiuni de construire, cu ținte precise și o provocare dificilă inclusă.** Mecanismul nou este Repeat: repetarea unui grup de acțiuni.

## Pe tabletele copiilor

Dacă ScratchJr este deja instalat, nu mai trebuie instalat sau copiat nimic. Folosim numai **Rabbit, Ball și Park** din biblioteca aplicației. Copiii construiesc scena și programele urmând demonstrațiile scurte ale profesorului. Mingea rămâne fără program și marchează coloana destinației.

Pentru a păstra lecția 1, recomandăm un proiect nou. Copiii pot refolosi scena veche dacă acceptă înlocuirea programelor ei. Nu există un program greșit impus și nu distribuim fișiere de pornire.

## Începe aici

1. Citește [ghidul profesorului](Ghid_profesor.md) sau [PDF-ul](Ghid_profesor_Lectia_02.pdf).
2. Proiectează sau tipărește [cele trei cartonașe](Cartonase_Lectia_02.pdf). Acestea arată cerințele, fără soluțiile complete.
3. Probează manual Repeat pe un Lenovo: pune o acțiune în cadru, schimbă numărul, conectează o a doua buclă, salvează și redeschide.
4. La lecție folosește [soluțiile profesorului](solutii/lectia_02/README.md) numai pentru sprijin, după ce copilul încearcă.
5. Notează ce ai observat în [fișa pilotului](Observatii_dupa_lectie.md).

## Cele trei misiuni

| Misiune | Țintă | Constrângere |
| --- | --- | --- |
| Trei patrulări | Dreapta, săritură, revenire la start, de trei ori | Un singur Repeat cu întregul grup |
| Șase pătrățele | Ajunge pe coloana mingii în trei deplasări egale; sare după fiecare | Copilul găsește distanța unei deplasări |
| Expediția dificilă | Opt pătrățele în patru deplasări egale, cu sărituri; apoi revine singur | Două Repeat în ordine, un singur steag, fără resetare între dus și întors |

Reușita se verifică prin rulare și explicație; ScratchJr nu acordă automat un calificativ. Exercițiul dificil este prezentat tuturor, cu indicii progresive. Nu este obligatoriu să fie terminat fără ajutor.

## Poziționarea pe grilă

Activează grila. Pentru iepure, numerele evidențiate sunt **5 jos, 7 în stânga**. Pentru minge: **11 jos, 3 în stânga**, apoi **13 jos, 3 în stânga** la misiunea dificilă. Selectează fiecare personaj înainte să-i citești poziția. Numerele verticale cresc de jos în sus.

Mingea este mai jos decât iepurele, ca reper. Ținta este coloana ei; nu trebuie atinsă. Numărăm șase sau opt spații de la start, nu includem pătrățelul de pornire în distanță. Acceptăm aceeași coloană, fără precizie la pixel.

## Exemple opționale pentru profesor

| Fișier | Utilizare |
| --- | --- |
| [00_Demo_Repeat.sjr](proiecte/00_Demo_Repeat.sjr) | Două sărituri prin Repeat 2; demonstrația mecanismului |
| [01_Start.sjr](proiecte/01_Start.sjr) | Scenă fără programe, pentru proba profesorului |
| [01_Trei_patrulari.sjr](solutii/lectia_02/01_Trei_patrulari.sjr) | Soluția misiunii 1 |
| [02_Sase_patratele.sjr](solutii/lectia_02/02_Sase_patratele.sjr) | Soluția misiunii 2 |
| [03_Expeditia_dus_intors.sjr](solutii/lectia_02/03_Expeditia_dus_intors.sjr) | Soluția exercițiului dificil |

Pentru verificarea pe PC, deschide [editorul comunitar în browser](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/). În galerie, folosește Open project / Import, alege un SJR și deschide-l. Resetează înainte de fiecare probă completă, apoi apasă steagul. Revino la galerie pentru salvare și redeschide.

Acesta este un port comunitar, nu aplicația oficială Android. Nu presupune sincronizare între browser și tablete. Copiii nu au nevoie de browser sau de aceste fișiere.

## Ce a fost testat

Pe 9 noiembrie 2026, toate cele cinci fișiere au trecut importul și rularea în browser, numărarea săriturilor, verificarea destinației, resetarea, redeschiderea și rerularea. Mingea a rămas nemișcată. Toate au rămas în galerie după reîncărcare.

A fost construit și un program prin tragere, cu o acțiune în Repeat și un al doilea Repeat conectat după primul; schimbarea numărului, rularea și păstrarea la redeschidere au funcționat. [Raportul și capturile](verificare/README.md) descriu verificările. **Lecția 2 nu a fost testată în aplicația oficială Android sau pe un Lenovo fizic.** Proba tactilă și offline rămâne de făcut pe o tabletă înainte de clasă.

## Surse și regenerare

`lesson.json` definește programele și țintele; `Ghid_profesor.md` este sursa ghidului. Cu Python, reportlab, Pillow și pypdf, rulează `python build_pack.py` pentru PDF-uri și SJR-uri sau `python build_pack.py --projects-only` numai pentru proiecte. Generatorul folosește fonturile Arial din Windows. Verificările de structură și calcul nu înlocuiesc testele din editor; actualizează raportul dacă modifici programele.

[Planul celor zece lecții](../Plan_10_lectii_ScratchJr.md). Pagina `index.html` este un index pentru profesor, nu editorul ScratchJr.
