# Lecția 10 — Robotul grădinar

O oră în ScratchJr, fără creație proprie. Două plante cer câte două porții de apă, iar în rezervor încap trei. Construim udarea, reumplerea și misiunea completă. Puzzle greu în bază și două rezerve: rezervor de patru porții, două treceri prin seră.

[Lecția pe site](index.html) · [Ghidul profesorului](ghid-profesor.html) · [PDF cu plan și toate programele](Ghid_profesor_Lectia_10.pdf) · [Soluții](solutii_gradinar/README.md).

## Pregătirea cea mai simplă

Importă numai [start.sjr](solutii_gradinar/start.sjr) pe fiecare tabletă înaintea orei. Include robotul, sera, ghivecele, plantele, jeturile și indicatorul. Cele 13 personaje sunt fără cod. Copiii construiesc M1–M3 în același proiect; nu se copiază imagini separat și nu sunt necesare descărcări în timpul rulării.

**Pe laptop, în browser:** în [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/app/home.html), apasă Open în galerie, alege fișierul SJR, apoi cardul **L10 Robotul grădinar - de la zero · v1.2**. Nu este necesar un emulator. Acesta este portul comunitar testat, distinct de aplicația Android. Folosește o fereastră lată.

**Pe Lenovo:** cu ScratchJr instalat, descarcă starterul și încearcă deschiderea din Fișiere/Descărcări cu ScratchJr, dacă sistemul oferă aplicația. Înainte de distribuire, verifică importul, salvarea, redeschiderea și soluția [m3.sjr](solutii_gradinar/m3.sjr) pe o tabletă a școlii. Testele acestei lecții nu au folosit un Lenovo fizic. Instalarea ScratchJr nu include aceste resurse noi: este necesar importul starterului.

**Pornire:** Steag. Pentru o probă nouă în timpul mișcării: Stop, apoi Steag. Pentru salvare, revenim în galerie. Starterul nu se mișcă până când copiii adaugă programele. Păstrăm pozițiile și dimensiunile; în R1 mutăm doar Indicatorul de la 3 la 4, cu grila pornită.

Importurile vechi nu se actualizează automat. Folosește cardurile v1.2. Cele cinci soluții sunt pentru consultare; nu trebuie distribuite toate copiilor.

## Materiale

- [Starter și cinci soluții native](solutii_gradinar/README.md), editabile.
- [Ghidul profesorului](Ghid_profesor.md): poveste, orar, întrebări, indicii și programele fiecărui personaj la fiecare etapă.
- [PDF ilustrat](Ghid_profesor_Lectia_10.pdf): plan concis, pregătire și capturi reale ale programelor, inclusiv ambele rezerve.
- [Resurse și proveniență](resurse_gradinar/README.md), incluse în fiecare proiect.
- [Raportul testării în browser](verificare/Gradinarul_60min.md).

## Cum funcționează

Roșu și portocaliu comandă câte o porție pentru A și B. Fiecare porție face să apară jetul și mută Indicatorul cu o unitate la stânga. Verde și mov schimbă planta ofilită cu cea udată, după a doua porție. Galben pornește apa stației; albastru readuce indicatorul la plin.

Indicatorul este un model programat, fără variabile sau oprire automată la zero. Copilul alege când revine la stație. M3: 3 → 2 → 1 → 3 → 2 → 1. R1: 4 → 3 → 2 → 1 → 0. R2: 3 → 2 → 1 → 0 → 3 → 2.

Unele pictograme importate pot apărea goale în portul web. Deschide săgeata blocului și reselectează aceeași culoare/viteză. Capturile programelor au fost făcute în aplicație după reselectare; nu au fost desenate pictograme peste capturi.

## Arhiva veche

[Marea finală · 50 min](arhiva_finala/index.html) · [Ghid vechi](arhiva_finala/ghid-profesor.html) · [PDF vechi](arhiva_finala/Ghid_profesor_Lectia_10.pdf) · [ZIP vechi](../Lectia_10_ScratchJr.zip). Acea versiune continuă insula veche din Lecția 9. Robotul grădinar începe un proiect nou.
