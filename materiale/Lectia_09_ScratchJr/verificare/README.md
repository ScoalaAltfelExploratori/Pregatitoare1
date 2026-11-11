# Verificare - Lecția 9

**PASS, 10 noiembrie 2026. Șapte proiecte, 104 verificări finale în browser.** 65 de probe principale, 35 după salvare/redeschidere și patru pentru programul de apariție construit prin tragerea blocurilor. Numărul reprezintă verificări de comportament, nu misiuni distincte.

## Acoperire

| Exemplu | Probe principale | După redeschidere |
| --- | --- | --- |
| Demo | 6 | 3 |
| Scenă fără programe | 6 | 3 |
| M1 Două surprize | 5 | 3 |
| M2 Ieșirea ascunsă | 9 | 5 |
| M3 Lanțul descoperirilor | 15 | 8 |
| R1 Surpriza opțională | 11 | 6 |
| R2 Două drumuri | 13 | 7 |

Fiecare proiect are două parcurgeri principale și încă una după redeschidere. Pentru R2, fiecare parcurgere include separat drumul prin fluture și drumul prin câine: fiecare alegere a fost probată de trei ori. Probele includ pregătirea inițială cu steagul. În M2/M3/R1/R2, între runde nu folosim Reset sau încă un steag; revenim prin mingea de pe pagina 2.

## Ce am observat în aplicație

- Demo: steagul ascunde câinele, fluturele îl dezvăluie. Atingerea locului câinelui ascuns nu îl activează.
- Starter: steagul și atingerile nu declanșează programe.
- M1: fluturele ajunge la scara 0,7 și revine la 0,5; câinele ajunge la opacitate zero și reapare singur. Efectele se repetă fără Reset.
- M2: câinele face propriul truc fără a dezvălui mingea; fluturele dezvăluie ieșirea. Mingea duce la pagina 2, iar întoarcerea ascunde ieșirea.
- M3: numai fluturele este vizibil după pregătire. Prima atingere dezvăluie numai câinele; a doua dezvăluie mingea. Am atins efectiv pe scenă și locurile personajelor ascunse, inclusiv mingea înainte de pasul câinelui: nu au declanșat mesajul sau trecerea de pagină.
- Pagina de final: iepurele din exemple execută o mărire scurtă și revine la normal. Această animație este opțională în cerințele copiilor.
- R1: trucul iepurelui nu dezvăluie nici câinele, nici mingea; apoi lanțul și întoarcerea funcționează. Iepurele este separat de celelalte ținte.
- R2: fiecare expeditor portocaliu dezvăluie singur mingea. La revenire mingea este ascunsă înainte de încercarea celuilalt drum.
- Cele șapte nume au rămas unice după reîncărcarea galeriei. Toate proiectele au fost apoi redeschise și probate.
- Într-o copie parțială a demo-ului, am adăugat manual La mesaj portocaliu și Arată prin tragere din paletă. Expeditorul și Steag → Ascunde erau deja pregătite. Două ascunderi și două apariții au trecut după conectare.

## Mediul și metoda

Am folosit [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), un port comunitar, în browserul din fundal. Copia locală de la 127.0.0.1 a servit fișierele publicate ale aplicației. Nu am schimbat motorul și nu am injectat starea proiectelor în aplicație. Importul s-a făcut prin Open, pornirile prin interfață, salvarea prin galerie.

Un observator separat a înregistrat pagina vizibilă, transformările și opacitatea personajelor, starea butonului de rulare și evenimentele audio. Pentru personajele ascunse am folosit atingerea coordonatelor lor de pe scenă, nu invocarea directă a unui program. Nu există sunete în aceste programe; nu s-au înregistrat surse audio. Aceasta nu este o probă a difuzorului fizic.

Resursele declarate există în catalogul aplicației oficiale Android 1.5.11. Fiecare SJR conține numai datele proiectului și miniatura, fără resurse personalizate. Programele și pozițiile native corespund sursei `lesson.json`. Pozițiile exacte servesc referințelor profesorului; copiii au nevoie doar de personaje separate și ușor de atins.

## Dovezi

- [Rezultate și amprentele proiectelor](rezultate.json), [matricea principală](browser_results.json), fișierele `p*_reopen_results.json`.
- [Persistența galeriei](gallery_persistence.json), [construcția manuală](manual_results.json), [captura blocurilor adăugate](constructie_manuala.png).
- [Starea inițială](00_Start_ascuns.png), [descoperirile vizibile](03_Puzzle_dificil.png).
- [Verificarea paginii lecției](browser_index.json), [captura paginii](pagina_lectiei.png).
- [Observatorul](instrumente/qa-monitor.js), [serverul local](instrumente/browser_server.py), [amprentele aplicației testate](instrumente/upstream_manifest.json).

Fișierele `prototype_*.json` păstrează prima probă a lanțului. Nu se adaugă la numărul final. O verificare intermediară a bonusului folosea vechea poziție de referință a iepurelui; verificarea finală folosește sursa actuală și confirmă poziția observată. Nu a fost necesară modificarea motorului aplicației.

Pentru proba obișnuită folosește [instrucțiunile lecției](../README.md), fără instrumentele de audit. Serverul de audit pornește local la 127.0.0.1:8772 și descarcă fișierele publice într-un cache la prima folosire. Start capture / Stop capture expun observațiile. Nu este necesar microfonul. Versiunea publicată se poate schimba; manifestul identifică fișierele testate aici.

## Limite și proba pe tabletă

Această lecție nu a fost rulată în aplicația Android oficială sau pe Lenovo K10 fizic. Verificarea catalogului nu înlocuiește proba tactilă. Înainte de clasă reconstruiește M3 pe un Lenovo, verifică descoperirile și două runde, apoi salvarea și redeschiderea offline. Copiii nu importă fișiere.

Ghidul are patru pagini și cartonașele au cinci. Toate cele nouă pagini au fost randate și inspectate vizual. Pagina HTML are cinci misiuni, imagine încărcată și nicio depășire orizontală la dimensiunea ferestrei testate.
