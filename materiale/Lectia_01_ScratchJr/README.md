# Lecția 1 — Ne întâlnim la joacă

50 de minute, copii de 6–7 ani. Construim o scenă cu **Rabbit (iepurele), Ball (mingea) și Park (parcul)**, toate din biblioteca ScratchJr. Copiii creează două programe, rezolvă mini-puzzle-ul „Două blocuri până acasă” și inventează un final.

## Varianta simplă pentru clasă

1. Instalează o singură dată [ScratchJr de la Scratch Foundation din Google Play](https://play.google.com/store/apps/details?id=org.scratchjr.android) pe fiecare Lenovo K10. Tabletele rulează aplicația direct, fără emulator.
2. Fă proba de mai jos pe o tabletă înainte de clasă.
3. La lecție, fiecare copil pornește un proiect nou. Demonstrezi pe rând alegerea personajelor, a fundalului și construirea programelor.
4. Copiii folosesc același proiect pentru toate cele trei misiuni. La final revin la galerie și îl redeschid.

**Nu copiem fișiere, imagini sau proiecte pe tabletele copiilor.** Nu sunt necesare descărcări de resurse ori conturi ScratchJr ale copiilor. Regula se aplică întregului [plan de zece lecții](../Plan_10_lectii_ScratchJr.md). După instalare verificăm lucrul fără internet pe tableta reală.

## Materialele profesorului

- [Ghidul pas cu pas](Ghid_profesor.md) și [versiunea PDF](Ghid_profesor_Lectia_01.pdf): pregătire, cele 50 de minute, demonstrații și sprijin.
- [Cele trei cartonașe PDF](Cartonase_Lectia_01.pdf): cerințe de proiectat sau tipărit.
- [Soluțiile misiunilor](solutii/lectia_01/README.md): programele explicate și exemple SJR opționale.
- [Fișa de observații](Observatii_dupa_lectie.md): pentru pilot și proba K10.
- [Raportul testelor și capturile](verificare/README.md): ce a fost verificat efectiv.

`index.html` este un index al materialelor, nu editorul ScratchJr.

## Testare pe PC, direct în browser

Deschide [ScratchJr Desktop Reborn în browser](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), un [port comunitar](https://github.com/richiesamlie/ScratchJr-Desktop-Reborn). Nu necesită instalarea unui emulator sau a aplicației Windows. Este diferit de aplicația oficială Android și are funcții suplimentare; lecția folosește numai blocurile standard ScratchJr.

1. Deschide editorul și intră în galeria proiectelor.
2. Folosește **Open project / Import** și alege un fișier `.sjr`, de exemplu [02_Intalnirea.sjr](proiecte/02_Intalnirea.sjr). Importă pe rând, apoi deschide proiectul din galerie.
3. Apasă steagul verde de sus. Iepurele și mingea se apropie și sar o dată, fără să se acopere.
4. Apasă resetarea personajelor înaintea următoarei rulări. Revino la galerie, redeschide și verifică salvarea.
5. Pentru exercițiul real al copiilor, creează un proiect nou și construiește scena din bibliotecă, urmând ghidul.

Proiectele sunt păstrate în acel browser. Nu presupune sincronizare cu tabletele; exportă separat lucrările profesorului pe care vrei să le păstrezi. Ștergerea datelor browserului poate elimina proiectele locale.

Pe 9 noiembrie 2026, **toate cele șapte exemple finale cu iepure au trecut importul, rularea, resetarea și redeschiderea în browser**. La înlocuirea misiunii 2, cele trei fișiere schimbate și varianta dificilă au fost retestate; celelalte patru au rămas identice, cu amprente verificate. Probele de păstrare după reîncărcare au trecut. Testele s-au făcut într-un browser separat, în fundal, pentru a permite lucrul simultan pe PC.

## Proba pe Lenovo înainte de lecție

Deschide un proiect nou și adaugă Rabbit și Ball din lista de personaje, apoi Park din biblioteca de fundaluri. Elimină personajul inițial dacă ai deja trei. Așază iepurele la stânga și mingea la dreapta. Dacă alegerea personajelor durează, este acceptată și pisica inițială cu un partener.

- Iepure: steag verde → dreapta **3** → sari **2**.
- Minge: steag verde → stânga **3** → sari **2**.

Numărul 3 este pentru starturile modelului; ajustează-l dacă ai așezat personajele altfel. **Sari 2 este o singură săritură de înălțime 2.** Pentru două sărituri folosești două blocuri. Probează conectarea și desprinderea blocurilor cu degetul, tastatura numerică, resetarea, salvarea și redeschiderea fără internet. Proba fizică pe Lenovo nu a fost efectuată de agent.

## Mini-puzzle-ul misiunii 2

Copiii continuă întâlnirea construită de ei și adaugă **exact o săgeată albastră la fiecare program**, astfel încât ambele personaje să revină automat la propriile starturi după săritură. Totul pornește de la un singur steag verde de sus. Nu folosesc blocul Acasă, Repeat, mutarea cu degetul sau resetarea în timpul rulării.

Soluția modelului: iepurele adaugă **stânga 3**, mingea **dreapta 3**. Resetarea este permisă înainte de probă. Provocarea dificilă pentru toți: aceeași revenire cu **exact două săgeți cu numere diferite, pozitive** la fiecare personaj; de exemplu 1 + 2 pași în direcția întoarcerii. Copiii explică alegerea înainte de a vedea soluția.

## Exemple opționale, numai pentru profesor

| Fișier | Conținut |
| --- | --- |
| [01_Start.sjr](proiecte/01_Start.sjr) | Iepure, minge, parc; ambele programe goale |
| [02_Intalnirea.sjr](proiecte/02_Intalnirea.sjr) | Se apropie și sar o dată |
| [03_Puzzle_Revenirea.sjr](proiecte/03_Puzzle_Revenirea.sjr) | Întâlnire funcțională; de completat cu revenirea la start |
| [04_Solutia_profesorului.sjr](proiecte/04_Solutia_profesorului.sjr) | Se apropie, sar o dată și revin fiecare la start |

Alte trei fișiere sunt în `solutii/lectia_01`. Arhivele referă resursele din biblioteca aplicației; nu includ personaje sau fundaluri personalizate. Pentru import opțional pe dispozitivul profesorului vezi [instrucțiunile Android](Import_si_testare_Lenovo.md). Există și un [pachet opțional pentru vechiul Desktop 1.3.2](profesor_pc/README.md); browserul este mai simplu pentru verificarea pe PC.

## Ce știm despre aplicația oficială Android

ScratchJr 1.5.11 a fost instalat din Google Play în emulatorul separat `ScratchJr_Lesson1_Android11` (Android 11 / API 30, 1280 × 800, 3 GB RAM). Două variante inițiale au fost importate și rulate acolo; proba a descoperit problema de distanță corectată ulterior. **Setul final cu iepure nu a fost retestat integral în Android.** Browserul verifică proiectele, dar nu certifică importul, gesturile tactile sau performanța pe K10.

Emulatorul mai vechi `ScratchJr_Lesson1_Tablet`, cu Android 15, nu oferea aplicația compatibilă în Google Play. Nu îl folosi pentru această probă. Pentru clasă este suficientă instalarea directă pe Lenovo; emulatorul nu este necesar.

## Surse editabile

`lesson.json` definește exemplele; `Ghid_profesor.md` este sursa ghidului. `build_pack.py` generează cele două PDF-uri, cele șapte SJR-uri și pachetul opțional Desktop, folosind Python, reportlab, Pillow și pypdf. Rulează `python build_pack.py --projects-only` numai pentru SJR și pachetul Desktop, sau fără opțiune pentru întregul set. După modificarea programelor, repetă testele și actualizează raportul; generarea fișierelor nu înseamnă verificare în aplicație.
