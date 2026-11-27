# Lecția 10 — Robotul grădinar

60 de minute · 6–7 ani · fără creație proprie · puzzle greu în bază · două rezerve.

## Povestea pentru copii

„Instalația de udare din seră s-a oprit. Cele două plante au nevoie de câte două porții de apă. Robotul grădinar poate duce numai trei porții într-o cursă. Îi programăm drumul, pornirea jetului și întoarcerea la stație. Trebuie să terminăm ambele ghivece fără să udăm podeaua și fără să folosim apă pe care nu o mai avem.”

## Ce este nou

Planificăm o resursă care se consumă. Fiecare porție produce două efecte: apare jetul lângă plantă și indicatorul scade cu o unitate. Deplasarea începe numai după oprirea jetului. Scăderile au un rol în alegerea momentului reumplerii.

## Pregătire înaintea orei

Importă [start.sjr](solutii_gradinar/start.sjr) o singură dată pe fiecare tabletă. Are toate imaginile și 13 personaje fără programe. Pe laptop deschide [m3.sjr](solutii_gradinar/m3.sjr) pentru demonstrație. [Import și pornire](README.md).

Copiii construiesc M1–M3 în același proiect. Nu mutăm robotul, ghivecele, plantele sau stația și nu schimbăm dimensiunile. În R1 mutăm numai Indicatorul. Resursele sunt mari și noi, incluse în SJR; nu copiem imagini separat.

Ghiveciul A este sus, B jos. Fiecare etichetă are două picături: necesarul plantei. Indicatorul albastru de pe scară arată porțiile rămase în robot. Plantele udate, jeturile și Apa de la stație sunt ascunse inițial: le alegem din lista personajelor. Stația, ghivecele și scala rămân fără cod.

## Planul orei

| Timp | Activitate | Rezultat |
|---|---|---|
| 0–5 | Poveste, demonstrație, citim necesarul | Două plante × două porții; rezervor de trei. |
| 5–20 | M1: prima plantă | Două jeturi, A udată, o porție rămasă. |
| 20–35 | M2: reumplerea | Robot la stație, jet de alimentare, indicator înapoi la trei. |
| 35–55 | M3: întreaga seră, dificil pentru toți | Două plante udate automat, fără intervenții între ele. |
| 55–60 | Probă și salvare | Stop/Steag, explicăm reumplerea, revenim în galerie. |

Explicăm și testăm după fiecare fir construit. Dacă un copil se blochează, deschidem în PDF programul personajului respectiv. Nu scriem programe greșite pentru a le repara. Rezervele sunt suplimentare și pornesc fiecare separat din M3; nu există atelier de creație proprie.

## Plicurile și temporizarea

| Culoare | Cine răspunde și ce face |
|---|---|
| Roșu | Jetul A execută o porție; Indicatorul face Stânga 1. |
| Portocaliu | Jetul B execută o porție; Indicatorul face Stânga 1. |
| Verde | A ofilită se ascunde; A udată apare. |
| Mov | B ofilită se ascunde; B udată apare. |
| Galben | Apa de la stație apare, așteaptă 20 și dispare. |
| Albastru | Indicatorul revine la poziția inițială: rezervor plin. |

Așteaptă 10 reprezintă aproximativ o secundă; 5 jumătate de secundă; 20 două secunde. Arată și Ascunde au și o scurtă tranziție. Trimite așteaptă programele declanșate; astfel robotul nu pleacă în timp ce curge apa. Folosim un singur fir principal pentru Robot.

Indicatorul este programat prin deplasare, fără variabile sau verificare automată a rezervorului. Dacă programul consumă prea mult, aplicația nu oprește singură udarea: copiii trebuie să citească indicatorul și să aleagă reumplerea. Înflorirea este semnul vizual al misiunii îndeplinite, nu o simulare a timpului real de creștere.

La stație, după returul prin blocuri de mișcare, La poziția inițială restabilește și orientarea gurii rezervorului. Nu îl folosim pentru a sări peste drumul de întoarcere. Păstrăm Viteză normală.

## M1 — Prima plantă

5–20 min. Construim mai întâi Jetul A și Indicatorul, apoi cele două stări ale plantei A și traseul Robotului. Repetă 2 conține un singur Trimite roșu. Verde vine după repetare.

**Întrebare:** De ce mai rămâne apă după ce terminăm prima plantă?

**Indiciu / soluție:** 3 − 2 = 1. Robotul revine la stație; B rămâne ofilită.

[Soluția nativă](solutii_gradinar/m1.sjr).

### Robotul grădinar

- Steag → La poziția inițială → Arată → Viteză normală → Așteaptă 10 → Dreapta 6 → Sus 4 → Repetă 2 { Trimite roșu } → Trimite verde → Jos 4 → Stânga 6 → La poziția inițială → Spune Prima plantă este gata.

### Indicatorul de apă

- Steag → La poziția inițială → Arată → Viteză normală
- Primește roșu → Stânga 1

### Jetul A

- Steag → Ascunde
- Primește roșu → Arată → Așteaptă 10 → Ascunde → Așteaptă 5

### Planta A — ofilită

- Steag → Arată
- Primește verde → Ascunde

### Planta A — udată

- Steag → Ascunde
- Primește verde → Arată

**Fără cod:** Stația de reumplere, Ghiveciul A, Ghiveciul B, Planta B — ofilită, Planta B — udată, Jetul B, Apa de la stație, Scala rezervorului.

## M2 — Reumplem rezervorul

20–35 min. Păstrăm M1. Adăugăm programul Apei de la stație și răspunsul albastru al Indicatorului. Înlocuim replica finală a Robotului cu galben, albastru, apoi noua replică.

**Întrebare:** Putem pleca direct la B cu porția rămasă?

**Indiciu / soluție:** B are nevoie de două porții. La stație reumplem până la 3: mai adăugăm 2.

[Soluția nativă](solutii_gradinar/m2.sjr).

### Robotul grădinar

- Steag → La poziția inițială → Arată → Viteză normală → Așteaptă 10 → Dreapta 6 → Sus 4 → Repetă 2 { Trimite roșu } → Trimite verde → Jos 4 → Stânga 6 → La poziția inițială → Trimite galben → Trimite albastru → Spune Rezervor plin.

### Indicatorul de apă

- Steag → La poziția inițială → Arată → Viteză normală
- Primește roșu → Stânga 1
- Primește albastru → La poziția inițială

### Jetul A

- Steag → Ascunde
- Primește roșu → Arată → Așteaptă 10 → Ascunde → Așteaptă 5

### Planta A — ofilită

- Steag → Arată
- Primește verde → Ascunde

### Planta A — udată

- Steag → Ascunde
- Primește verde → Arată

### Apa de la stație

- Steag → Ascunde
- Primește galben → Arată → Așteaptă 20 → Ascunde

**Fără cod:** Stația de reumplere, Ghiveciul A, Ghiveciul B, Planta B — ofilită, Planta B — udată, Jetul B, Scala rezervorului.

## M3 — Întreaga seră · puzzle greu, pentru toți

35–55 min. Păstrăm M2. Programăm Jetul B, cele două stări ale plantei B și răspunsul portocaliu al Indicatorului. Prelungim firul Robotului: plecare spre B, două porții, mov, retur.

**Întrebare:** Avem nevoie de patru porții, dar încap trei. Unde punem reumplerea ca întregul program să meargă cu un singur Steag?

**Indiciu / soluție:** După cele două porții ale lui A. La final ambele plante sunt udate, jeturile sunt ascunse, robotul este la stație și mai are 1.

[Soluția nativă](solutii_gradinar/m3.sjr).

### Robotul grădinar

- Steag → La poziția inițială → Arată → Viteză normală → Așteaptă 10 → Dreapta 6 → Sus 4 → Repetă 2 { Trimite roșu } → Trimite verde → Jos 4 → Stânga 6 → La poziția inițială → Trimite galben → Trimite albastru → Dreapta 6 → Jos 2 → Repetă 2 { Trimite portocaliu } → Trimite mov → Sus 2 → Stânga 6 → La poziția inițială → Spune Sera este gata!

### Indicatorul de apă

- Steag → La poziția inițială → Arată → Viteză normală
- Primește roșu → Stânga 1
- Primește portocaliu → Stânga 1
- Primește albastru → La poziția inițială

### Jetul A

- Steag → Ascunde
- Primește roșu → Arată → Așteaptă 10 → Ascunde → Așteaptă 5

### Planta A — ofilită

- Steag → Arată
- Primește verde → Ascunde

### Planta A — udată

- Steag → Ascunde
- Primește verde → Arată

### Apa de la stație

- Steag → Ascunde
- Primește galben → Arată → Așteaptă 20 → Ascunde

### Jetul B

- Steag → Ascunde
- Primește portocaliu → Arată → Așteaptă 10 → Ascunde → Așteaptă 5

### Planta B — ofilită

- Steag → Arată
- Primește mov → Ascunde

### Planta B — udată

- Steag → Ascunde
- Primește mov → Arată

**Fără cod:** Stația de reumplere, Ghiveciul A, Ghiveciul B, Scala rezervorului.

## R1 — Rezervor de patru

Rezervă · +5–8 min. Pornim separat din M3. La începutul probei, cu grila activă, tragem Indicatorul de la 3 la 4: noua poziție inițială este x=288. Înlocuim returul și reumplerea dintre plante cu Jos 6. Eliminăm programele nefolosite ale Apei de la stație și răspunsul albastru.

**Întrebare:** Ce comenzi putem scoate dacă încap patru porții?

**Indiciu / soluție:** Reumplerea și ocolul prin stație. Ordine: A, B, retur; indicatorul ajunge la 0.

[Soluția nativă](solutii_gradinar/r1.sjr).

### Robotul grădinar

- Steag → La poziția inițială → Arată → Viteză normală → Așteaptă 10 → Dreapta 6 → Sus 4 → Repetă 2 { Trimite roșu } → Trimite verde → Jos 6 → Repetă 2 { Trimite portocaliu } → Trimite mov → Sus 2 → Stânga 6 → La poziția inițială → Spune Sera este gata!

### Indicatorul de apă

- Steag → La poziția inițială → Arată → Viteză normală
- Primește roșu → Stânga 1
- Primește portocaliu → Stânga 1

### Jetul A

- Steag → Ascunde
- Primește roșu → Arată → Așteaptă 10 → Ascunde → Așteaptă 5

### Planta A — ofilită

- Steag → Arată
- Primește verde → Ascunde

### Planta A — udată

- Steag → Ascunde
- Primește verde → Arată

### Jetul B

- Steag → Ascunde
- Primește portocaliu → Arată → Așteaptă 10 → Ascunde → Așteaptă 5

### Planta B — ofilită

- Steag → Arată
- Primește mov → Ascunde

### Planta B — udată

- Steag → Ascunde
- Primește mov → Arată

**Fără cod:** Stația de reumplere, Ghiveciul A, Ghiveciul B, Apa de la stație, Scala rezervorului.

## R2 — Două treceri

Rezervă · +8–10 min. Pornim separat din M3, cu Indicatorul la 3. Plantele primesc întâi câte o porție. Robotul revine la A pentru a doua, apoi se reumple și termină B. Înlocuim repetările cu mesaje individuale în ordinea traseului.

**Întrebare:** După A, B, A mai putem uda B înainte de stație?

**Indiciu / soluție:** 3 − 1 − 1 − 1 = 0. Reumplem, apoi dăm ultima porție lui B. Verde vine doar la al doilea A, mov doar la al doilea B.

[Soluția nativă](solutii_gradinar/r2.sjr).

### Robotul grădinar

- Steag → La poziția inițială → Arată → Viteză normală → Așteaptă 10 → Dreapta 6 → Sus 4 → Trimite roșu → Jos 6 → Trimite portocaliu → Sus 6 → Trimite roșu → Trimite verde → Jos 4 → Stânga 6 → La poziția inițială → Trimite galben → Trimite albastru → Dreapta 6 → Jos 2 → Trimite portocaliu → Trimite mov → Sus 2 → Stânga 6 → La poziția inițială → Spune Sera este gata!

### Indicatorul de apă

- Steag → La poziția inițială → Arată → Viteză normală
- Primește roșu → Stânga 1
- Primește portocaliu → Stânga 1
- Primește albastru → La poziția inițială

### Jetul A

- Steag → Ascunde
- Primește roșu → Arată → Așteaptă 10 → Ascunde → Așteaptă 5

### Planta A — ofilită

- Steag → Arată
- Primește verde → Ascunde

### Planta A — udată

- Steag → Ascunde
- Primește verde → Arată

### Apa de la stație

- Steag → Ascunde
- Primește galben → Arată → Așteaptă 20 → Ascunde

### Jetul B

- Steag → Ascunde
- Primește portocaliu → Arată → Așteaptă 10 → Ascunde → Așteaptă 5

### Planta B — ofilită

- Steag → Arată
- Primește mov → Ascunde

### Planta B — udată

- Steag → Ascunde
- Primește mov → Arată

**Fără cod:** Stația de reumplere, Ghiveciul A, Ghiveciul B, Scala rezervorului.

## Verificarea de la finalul orei

- Un singur Steag pornește M3; fiecare plantă primește două porții.
- Jetul este vizibil numai cât robotul este oprit lângă ghiveci.
- Indicatorul: 3 → 2 → 1 → 3 → 2 → 1. Reumplerea este la stație.
- Florile apar după a doua porție; robotul revine acasă, jeturile rămân ascunse.
- Stop, apoi Steag reiau totul. Revenim în galerie, redeschidem și rulăm din nou.

## Dacă un copil se blochează

Planta nu se schimbă: verificăm culoarea plicului și cele două personaje, ofilită și udată. Indicatorul nu scade: îi lipsește răspunsul la roșu sau portocaliu. Robotul udă în mers: mesajele și mișcarea trebuie să fie în același fir, în ordinea din PDF. Apa stației nu ajunge în rezervor: verificăm returul și blocul La poziția inițială de la stație.

În portul web, unele pictograme importate pot apărea goale. Deschidem săgeata blocului și alegem din nou aceeași culoare/viteză. Nu există un bloc „gol” de adăugat. Capturile au fost făcute în aplicație după reselectarea valorilor, fără pictograme desenate peste imagine.

## Materiale și testare

[PDF cu plan și toate programele](Ghid_profesor_Lectia_10.pdf) · [Lista proiectelor](solutii_gradinar/README.md) · [Raportul testării](verificare/Gradinarul_60min.md) · [Observații după oră](Observatii_dupa_lectie.md).

Testele sunt în ScratchJr Desktop Reborn în browser. Un Lenovo fizic nu a fost folosit; verifică importul starterului și rularea soluției finale pe o tabletă a școlii înaintea orei.
