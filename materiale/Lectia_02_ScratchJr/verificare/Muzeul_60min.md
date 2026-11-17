# Verificare - Muzeul după închidere

17 noiembrie 2026. Lecția 2 refăcută pentru 60 de minute.

## Ce s-a rulat efectiv

Am importat și rulat proiectele native în [ScratchJr Desktop Reborn, editorul comunitar în browser](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), la 1280 × 800. Am acționat steagul și personajele prin interfața editorului. Nu am înlocuit motorul ScratchJr cu o simulare proprie.

Au fost importate toate cele nouă fișiere: șase exemple individuale, scena fără programe și cele două colecții. Am rulat cele șase scenarii atât în colecții, cât și în fișierele individuale. Colecțiile folosesc aceleași programe ca fișierele separate; paginile lor se aleg manual.

| Scenariu | Comportament observat |
| --- | --- |
| M1 | Pământul se rotește continuu pe loc; planeta și paznicul stau. |
| M2 | Ambele se rotesc; atingerea paznicului le oprește. Rămân vizibile și nemișcate. |
| M3, puzzle greu | Ambele se opresc înainte de plecarea paznicului și rămân oprite pe tot drumul. Paznicul parcurge 12 pași dus, face pauza și revine 12; ambele reiau rotația numai la intrare. |
| Creație | Rotirile cu pauze, pasul de rotație 2 al planetei și inspecția mai lungă funcționează. Oprirea și reluarea sunt păstrate. |
| R1 | După inspecție Pământul se rotește, planeta rămâne oprită. Atingerea planetei îi pornește rotația. |
| R2 | La prima inspecție Pământul este oprit și planeta se rotește. La a doua, Pământul se rotește și planeta este oprită. La întoarcere se rotesc ambele. |
| Start | Personajele și fundalul apar; steagul nu produce mișcare. Arhiva nu conține programe. |

Am revenit în galerie pentru salvare, am reîncărcat galeria și am confirmat prezența tuturor celor nouă proiecte. Puzzle-ul greu a fost redeschis și rulat din nou. O a doua inspecție, fără un nou steag între inspecții, a fost verificată la M3 și R2.

## Dovezi și verificări

- [Observațiile în timpul rulării](../capturi_muzeu/verificare.json): poziții, unghiuri și vizibilitate citite din elementele scenei la intervale de aproximativ 80-100 ms. Segmentele sunt în ordine; timpul local al fiecărui segment reîncepe de la zero.
- [Verificarea observațiilor și arhivelor](check_muzeu.py): reperele traseului, înghețarea în timpul deplasării, reluarea, controlul separat, proiectul fără cod și concordanța colecțiilor cu fișierele individuale.
- [Pământul în M3](../capturi_muzeu/m3-earth.jpg), [planeta în M3](../capturi_muzeu/m3-planet.jpg), [paznicul în M3](../capturi_muzeu/m3-guard.jpg).
- [Paznicul în R2](../capturi_muzeu/r2-guard.jpg), [planeta în R2](../capturi_muzeu/r2-planet.jpg).
- [Programele și amprentele fișierelor](../muzeu.json). Arhivele conțin numai datele proiectului și miniatura; scena folosește Earth.svg, Planet.svg, Father.svg și EmptyRoom.svg din biblioteca aplicației.

PDF-urile folosesc capturile reale, decupate la așezarea în pagină. Nu au pictograme de blocuri redesenate. Toate cele 13 pagini ale lecției au fost randate și inspectate vizual. PDF-ul cursului păstrează Lecția 1 la paginile 1-13 și adaugă Lecția 2 la paginile 14-26.

## Observații și limite

La primul import, editorul comunitar a afișat unele plicuri fără pictogramă. Culoarea și comportamentul erau prezente în proiect. Pentru capturi am reselectat aceeași culoare din meniul plicului, apoi am verificat afișarea. Nu am introdus blocuri goale în soluții.

Testele au folosit proiecte importate. Nu am reconstruit manual prin tragere fiecare program al fiecărei misiuni. Animațiile și reacțiile au fost executate de editorul ScratchJr.

Nu s-a testat această lecție în aplicația oficială Android, pe un Lenovo fizic sau offline pe tabletă. Înaintea clasei, profesorul verifică pe un K10 conectarea blocurilor, atingerea, salvarea și redeschiderea. Sunetul nu este necesar în această lecție.

Editorul comunitar trebuie folosit într-o fereastră lată. La 699 × 871, panourile editorului au acoperit o parte din scenă; proba de atingere a fost reluată la 1280 × 800. Acea încercare îngustă nu este inclusă ca probă de reușită.

În R1, atingerea planetei numai după întoarcerea paznicului este o regulă a jocului, nu o interdicție impusă de program. Paznicul nu detectează automat mișcarea exponatelor; reușita se verifică vizual.
