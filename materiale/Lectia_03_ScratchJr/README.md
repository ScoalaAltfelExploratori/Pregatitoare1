# Lecția 3 - Atelierul de magie

**50 de minute, 6-7 ani. Trei misiuni principale, inclusiv una dificilă, plus două rezerve.** Copiii creează transformări pornite prin atingere: mărire, micșorare, dispariție și reapariție. Personajele rămân pe loc.

## Exemplu, puzzle și creație proprie

Deschidem cu **Când personajul dispare**, pornind de la [Sunset](https://www.scratchjr.org/teach/activities/sunset). Păstrăm misiunile, puzzle-ul dificil și rezervele existente.

**Minutele 37-45: Trucul meu de magician** - 8 minute rezervate tuturor, cu alegeri de programare și o probă proprie. Copilul poate porni de la orice misiune care îi funcționează. Numai resurse incluse în aplicație, fără importuri pe tabletele copiilor.

[Ghidul profesorului pe site](ghid-profesor.html) · [Ghid PDF](Ghid_profesor_Lectia_03.pdf) · [Surse și adaptări](../Surse_oficiale_ScratchJr.md)

## Varianta simplă pentru clasă

ScratchJr este deja instalat. Copiii pornesc un proiect nou și aleg **Rabbit, Dog și Park** din bibliotecă. La prima rezervă adaugă **Butterfly**. Nu copiem fișiere pe tablete, nu importăm proiecte și nu descărcăm resurse. Fundalul alb este acceptat. Eliminăm pisica inițială dacă folosim exact personajele modelului.

Atingerea pe scenă pornește programul. Miniatura din stânga selectează personajul pentru editare. Steagul verde nu pornește aceste trucuri. Pentru o probă de la dimensiunea inițială folosim resetarea personajelor, nu steagul.

## Materialele profesorului

- [Ghidul pas cu pas](Ghid_profesor.md) și [PDF-ul](Ghid_profesor_Lectia_03.pdf): demonstrații, ritm, criterii și indicii.
- [Cinci cartonașe PDF](Cartonase_Lectia_03.pdf): trei misiuni și două rezerve, fără soluțiile complete.
- [Soluțiile explicate](solutii/lectia_03/README.md), cu cinci exemple SJR.
- [Fișa de observații](Observatii_dupa_lectie.md).
- [Raportul testării și capturile](verificare/README.md).

## Cele cinci provocări

| Activitate | Ținta |
| --- | --- |
| 1. Uriaș și pitic | Un tap mărește iepurele; un tap micșorează câinele; celălalt rămâne neschimbat |
| 2. Dispar și revin | Iepurele se ascunde o clipă și reapare singur, fără alt tap |
| 3. Trucul complet - dificilă | Mare, ascuns, apoi direct normal și vizibil; se repetă fără resetare |
| R1. Al treilea secret - 6-8 min | Fluturele are propria surpriză; exemplul are două dispariții și reveniri |
| R2. Magie în cinci blocuri - 8-10 min | Truc propriu cu maximum cinci acțiuni, două schimbări vizibile și final normal |

Rezervele sunt **în plus față de planul de 50 de minute**. Le folosim dacă rămâne timp sau pentru copiii care termină. Păstrăm pauza, provocarea dificilă pentru toți și ultimele cinci minute pentru explicații și salvare. Copiii construiesc; nu le cerem să introducă greșeli intenționat.

## Detalii care contează

- Așteaptă 10 înseamnă aproximativ o secundă. Profesorul introduce valoarea; copiii nu trebuie să calculeze zecimi.
- Mărimea inițială schimbă dimensiunea; Arată schimbă vizibilitatea. Pentru reapariție direct normală, refacem dimensiunea înainte de Arată.
- La M1, efectul de mărire sau micșorare se acumulează la atingeri repetate: resetăm înainte de altă probă. La M3 și R2, tocmai programul trebuie să refacă dimensiunea, ca un al doilea tap să funcționeze fără resetare.
- Atingem o dată și așteptăm finalul. Un personaj ascuns trebuie să reapară prin program, fără să încercăm să-l atingem invizibil.

## Testare pe PC în browser

**Verificat la 10 noiembrie 2026:** toate cele șapte proiecte, fiecare personaj activ, repetarea trucurilor și salvarea/redeschiderea au trecut probele în browser. Am construit și trucul dificil prin tragerea blocurilor în editor și l-am rulat de două ori. Aceste probe nu certifică aplicația Android pe Lenovo.

Deschide [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), un port comunitar. În galerie apasă Open / Import, alege un SJR și deschide proiectul. Pentru început: [demonstrația atingerii](proiecte/00_Demo_Atingere.sjr) sau [scena fără programe](proiecte/01_Start_Magie.sjr). Apoi folosește [soluțiile](solutii/lectia_03/README.md).

Atinge personajul pe scenă, nu steagul verde. Pentru M3 rulează trucul de două ori, fără resetare între ele. Revino la galerie pentru salvare, redeschide și repetă. Browserul nu se sincronizează cu tabletele; copiii nu au nevoie de aceste fișiere.

## Proba pe Lenovo înainte de clasă

În aplicația oficială, construiește atingere → ascunde → așteaptă 10 → arată. Verifică atingerea cu degetul, pauza, revenirea automată, resetarea și salvarea. Apoi construiește trucul complet din soluții și rulează-l de două ori fără resetare. Închide și redeschide proiectul fără internet. Vezi [raportul](verificare/README.md) pentru probele efectuate și limitele lor.

## Surse editabile

`lesson.json` definește personajele, programele, țintele și cartonașele. `Ghid_profesor.md` este sursa ghidului. Rulează `python build_pack.py` pentru PDF-uri și SJR-uri sau `--projects-only` numai pentru proiecte. Necesită Python, reportlab, Pillow, pypdf și Arial din Windows. După modificarea programelor repetă testele; generarea nu înseamnă testare în editor.

[Planul celor zece lecții](../Plan_10_lectii_ScratchJr.md). Vechea variantă cu viteze este păstrată separat în [arhiva profesorului](../Arhiva_profesor/README.md) și nu mai este lecția 3 activă.
