# Verificare - Lecția 10

**PASS, 11 noiembrie 2026. Șapte proiecte, 102 verificări finale de comportament în browser.** 60 de probe principale, 33 după salvare/redeschidere și nouă pentru copia parțială completată prin tragerea unui bloc în editor. Numărul reprezintă verificări de comportament, nu misiuni distincte. Catalogul resurselor, fișierele native, PDF-urile și pagina HTML au verificări separate.

## Acoperire

| Exemplu | Probe principale | După redeschidere |
| --- | --- | --- |
| Demo | 5 | 3 |
| Starter cu insula L9 | 9 | 5 |
| M1 Sărbătoarea mea | 9 | 5 |
| M2 Butonul așteaptă | 9 | 5 |
| M3 Marea finală | 9 | 5 |
| R1 Încă o dată! | 12 | 6 |
| R2 Întoarcere automată | 7 | 4 |

Fiecare proiect are două parcurgeri principale și încă una după redeschidere. Între rundele aceleiași probe nu folosim Reset sau un nou steag: revenim prin programul mingii. La R1, prima parcurgere include un encore, a doua două encore-uri consecutive; după redeschidere am cerut încă un encore. La R2 întoarcerea este automată. Probele includ pregătirea inițială, descoperirile paginii 1 și rezultatul de pe pagina 2.

## Ce am observat în aplicație

- Pagina 1 păstrează lanțul L9: fluture → câine → minge → pagina 2. La revenire, câinele și mingea sunt din nou ascunse. Demo-ul are intrare scurtă: fluture → pagina 2.
- Starterul are insula funcțională și iepure fără program pe final. Mingea de întoarcere rămâne vizibilă; nu apar transformări.
- M1: iepurele ajunge de două ori la scara 0,7 și revine la 0,5. Mingea rămâne disponibilă. În probă așteptăm spectacolul înainte de întoarcere.
- M2: mingea se ascunde la sosire. Devine vizibilă numai după ambele runde ale iepurelui. Atingerile premature ale locului ei nu schimbă pagina.
- M3 și demo: câinele începe numai după ultima revenire a iepurelui. Scara câinelui coboară de la 0,5 la 0,3 și revine la 0,5; abia apoi se dezvăluie mingea. Pozițiile rămân fixe și personajele nu se suprapun.
- R1: verde pregătește și pornește toate cele patru personaje. Un tap pe fluture reia spectacolul pe aceeași pagină. Mingea și fluturele sunt indisponibile până la final. Am încercat efectiv atingerea lor în timpul show-ului; nu au produs întoarcere sau o pornire suplimentară.
- R2: mingea rămâne ascunsă. După terminarea câinelui există aproximativ trei secunde de pauză, apoi revenire automată. Am urmărit insula încă cel puțin două secunde: a rămas pregătită, fără pornire spontană. Următoarea rundă funcționează.
- Cele șapte nume au rămas unice după reîncărcarea galeriei. Am redeschis și probat fiecare proiect.
- În copia parțială a M2, rutina iepurelui și programele mingii erau deja pregătite. Am tras din paletă Trimite mesaj, l-am conectat după întregul Repeat și am ales albastru. Două parcurgeri complete au confirmat ordinea și apariția mingii. Nu pretindem că toate blocurile tuturor proiectelor au fost construite manual în această probă.

Ascunde are o scurtă tranziție de opacitate. O verificare inițială cerea ca aceasta să fie deja zero înainte de primul vârf al iepurelui; cerința era prea strictă pentru tranziția vizuală. Proba finală urmărește dispariția, păstrarea ascunderii până la terminare și efectul unei atingeri reale, inclusiv în timpul estompării. Nu am modificat motorul sau programele pentru a evita această tranziție. Ghidul o explică.

## Mediul și metoda

Am folosit [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), un port comunitar, în browserul din fundal. Serverul local a servit fișierele publicate ale aplicației; editorul a încărcat separat un panou de observație. Motorul aplicației nu a fost modificat. Proiectele au intrat prin Open, acțiunile prin interfață, salvarea prin galerie. Nu am injectat starea proiectelor în motor.

Observatorul a înregistrat pagina vizibilă, transformările și opacitatea personajelor, starea butonului de rulare și evenimentele audio. Atingerile personajelor ascunse au fost efectuate la coordonatele lor de pe scenă. Aceste programe sunt fără sunete și nu au produs surse audio; nu este o probă a difuzorului fizic.

Cele șase resurse există în catalogul aplicației oficiale Android 1.5.11. Fiecare SJR conține numai datele proiectului și miniatura, fără resurse personalizate. Programele native, inclusiv corpul Repeat, pozițiile și paginile corespund sursei lesson.json. Cele șase exemple cu insula completă păstrează pagina 1 a soluției dificile din L9. Pozițiile exacte sunt pentru referințele profesorului; copiii au nevoie de zone de atingere separate.

## Dovezi și reproducere

- [Rezultate și amprentele proiectelor](rezultate.json), [matricea principală](browser_results.json), fișierele p*_reopen_results.json.
- [Persistența galeriei](gallery_persistence.json), [construcția manuală](manual_results.json), [blocul adăugat](constructie_manuala.png).
- [Puzzle-ul dificil în timpul spectacolului](03_Puzzle_dificil.png), [Encore terminat](04_Encore.png), [observații suplimentare](additional_observations.json).
- [Verificarea paginii lecției](browser_index.json), [captura paginii](pagina_lectiei.png).
- [Observatorul](instrumente/qa-monitor.js), [serverul local](instrumente/browser_server.py), [amprentele aplicației testate](instrumente/upstream_manifest.json).

Fișierele prototype_*.json păstrează probe exploratorii și nu se adaugă la numărul final. Pentru utilizarea obișnuită urmează [instrucțiunile lecției](../README.md), fără instrumentele de audit. Copiii nu importă fișiere.

Serverul de audit pornește la 127.0.0.1:8773, cu rădăcina în repo, și descarcă fișierele publice într-un cache la prima folosire. Start capture / Stop capture expun observațiile. Nu este necesar microfonul. Versiunea publicată se poate schimba; manifestul identifică fișierele testate aici.

## Limite și proba pe tabletă

Lecția 10 nu a fost rulată în aplicația Android oficială sau pe Lenovo K10 fizic. Catalogul resurselor nu înlocuiește proba tactilă. Înainte de clasă reconstruiește M3 pe un Lenovo, verifică ordinea, atingerea, două runde, salvarea și redeschiderea offline. Pentru copiii care au nevoie, folosește intrarea simplă descrisă în ghid.

Ghidul are patru pagini și cartonașele au cinci. Toate cele nouă pagini au fost randate și inspectate vizual. Pagina HTML are cinci misiuni, imagine încărcată și nicio depășire orizontală la 1280 × 720.
