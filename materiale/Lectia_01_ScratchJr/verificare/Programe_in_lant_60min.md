# Verificarea noului plan de 60 de minute

17 noiembrie 2026. Lecția 1: **Programe în lanț**.

Soluțiile din plan au fost construite ca proiecte native de test, importate prin Open și pornite prin interfața aplicației publice ScratchJr Desktop Reborn. Testele au folosit Rabbit pentru A, Dog pentru B, Ball ca reper și încă un Rabbit pentru C. Copiii pot alege alte personaje din biblioteca aplicației; la clasă construiesc dintr-un proiect nou.

| Probă | Rezultat observat |
| --- | --- |
| M1 - Circuit închis | B execută deplasările și revine la start; A rămâne nemișcat. |
| M2 - Pornire prin semnal | B rămâne la start cât A înaintează; apoi execută circuitul. A rămâne la 6 pași de start. |
| M3 - Confirmare și revenire | A ajunge la capăt înainte să se miște B; așteaptă circuitul; ambii revin la start. A doua rulare, fără Reset Characters, se încheie la aceleași poziții. |
| R1 - Alt drum | Varianta cu Sus 2 înainte de Dreapta 3 rulează și ambii revin la start. |
| R2 - Trei etape | În timpul deplasării lui C, B este deja la start și A încă așteaptă confirmarea. La final, toate cele trei personaje sunt la start; repetarea fără resetare reușește. |

[Observațiile DOM din timpul rulărilor](revizie_60min.json). Pozițiile au fost citite din elementele vizibile ale scenei, fără apelarea directă a motorului aplicației. Întoarcerea poate schimba orientarea unui personaj; ținta este poziția inițială.

Testul acoperă soluțiile complete și mecanismele propuse, nu reconstruirea tuturor blocurilor prin drag-and-drop. Nu reprezintă un test pe Android sau în aplicația Windows instalată; ieșirea audio nu a fost măsurată. Înaintea misiunilor se resetează pozițiile; M3 și R2 au fost reluate și fără resetare.

PDF-ul are 8 pagini A4: planul de 60 de minute, apoi pregătirea și șase exemple ilustrate cu capturi reale din ScratchJr. Toate paginile au fost randate și verificate vizual. Programele M1, M2, M3, R1 și R2 au fost rerulate pentru capturi; noul exemplu de creație proprie (Sus 3, Dreapta 4, Jos 3, Stânga 4) a fost rulat de două ori fără resetare. Plicurile din capturi au culorile vizibile. [Proba exemplului nou](../capturi_60min/verificare.json). Cele cinci teste existente de navigare au trecut.

[Planul nou](../../Plan_lectii_ScratchJr_60min.pdf) · [Pagina lecției](../index.html).
