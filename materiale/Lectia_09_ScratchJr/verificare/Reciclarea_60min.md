# Verificare în browser – Lecția 9 · v1.1

27 noiembrie 2026. Cele șase fișiere SJR au fost importate prin Open în [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/app/home.html), deschise din galerie și rulate prin comenzile aplicației. Nu am folosit un simulator separat al blocurilor.

## Dovezi

- [Fișiere importate, hash-uri și redeschidere](tested-projects.json).
- [138 înregistrări, 3.985 cadre citite din DOM-ul scenei](browser-observations.jsonl).
- [Rezultatele verificării automate a observațiilor](reciclare-rezultate.json).
- [Scriptul care verifică dovezile și pachetele](check_reciclare.py), fără simularea programelor.
- [Pozițiile blocurilor în capturile native](capturi.json) și [acoperirea fiecărui program în PDF](pdf-capture-coverage.json).

## Probe efectuate

M1: sticla ajunge în recipientul de plastic, robotul revine gol. M2: sticlă, doză și hârtie în recipientele corecte, pe rând. M3: lotul mixt complet; oprire în timpul mișcării, resetare și reluare; două sticle în poziții distincte. M3 a fost rulat din nou după redeschidere, în modul prezentare.

R1: hârtia este mai întâi mărită la 2×, apoi micșorată în două etape la 1× înainte de transport. R2: atingerea zonei butonului ascuns înainte de pornire nu are efect; după trei obiecte pauza rămâne stabilă; atingerea Golire ascunde lotul vechi și transportă ultima sticlă. O nouă atingere în timpul transportului nu dublează comanda. R2 a fost rulat din nou după redeschidere.

Starter: 13 personaje fără cod; Steag și atingerea zonei Golire nu produc mișcare; redeschiderea păstrează scena goală de programe. Toate cele șase proiecte au fost redeschise din galerie.

În 543 de eșantioane din transportul comun, diferența dintre centrele obiectului și robotului a fost exact (0, 72) pixeli. Pasul suplimentar de depunere este intenționat separat. În prima încercare, întârzierile diferite decalau obiectul; versiunea finală v1.1 folosește același început Arată → Așteaptă 5 pentru ambele personaje și a fost retestată.

## Capturi și limite

Capturile arată editorul real. Unele pictograme de mesaje/viteză au necesitat reselectarea aceleiași valori în portul web. Capturile finale au pictogramele refăcute în aplicație; PDF-ul decupează numai zona programelor, fără redesenarea blocurilor. Rândurile tăiate și imaginile cu meniul încă deschis au fost recapturate. Pentru programele neschimbate se reutilizează aceeași captură reală, numai după verificarea egalității tuturor blocurilor și valorilor. PDF-ul include separat fiecare program la fiecare etapă.

Resursele incluse în fiecare proiect au fost importate, afișate și păstrate. Nu ne bazăm pe biblioteca globală a portului web. [Jurnalul final al consolei](browser-console.json) nu conține intrări.

Nu a fost testat un Lenovo fizic sau aplicația Android în această revizie. Proba de import și redeschidere pe o tabletă a școlii rămâne necesară. Testarea în browser nu demonstrează asocierea fișierelor pe Android. Robotul execută rute preprogramate; nu există recunoaștere automată sau senzor de umplere.

## Site și PDF

Pagina lecției și ghidul au fost verificate în browser la 1280 × 800 și 390 × 844, fără depășire orizontală. Am deschis și explicația cu imaginea încărcată la cerere. PDF-ul lecției are 17 pagini, cu 66 de programe ilustrate. Toate paginile au fost randate și inspectate vizual. Cele 123 de pagini anterioare ale PDF-ului cursului au conținutul și comenzile de desen neschimbate; Lecția 9 ocupă paginile 124–140.
