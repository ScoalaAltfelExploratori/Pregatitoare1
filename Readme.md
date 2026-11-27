# Școala altfel · ScratchJr și Robo

Cursul ScratchJr și jocurile Robo Explorator, în limba română, pentru clasa pregătitoare.

În Robo, copiii aleg săgeți și acțiuni ca să conducă un roboțel spre o căsuță sau o comoară. Ideea este să încerce, să observe ce se întâmplă și să repare împreună drumul.

[Meniul principal](https://scoalaaltfelexploratori.github.io/Pregatitoare1/) · [Cele 10 lecții ScratchJr](https://scoalaaltfelexploratori.github.io/Pregatitoare1/scratchjr/) · [Exercițiile originale Robo](https://scoalaaltfelexploratori.github.io/Pregatitoare1/robo/) · [Acasă cu Robo](https://scoalaaltfelexploratori.github.io/Pregatitoare1/robo/?adventure=home)

## Meniul siteului

- [Lecția 0 · Picnicul întrerupt de ploaie](scratchjr/lectia-0/index.html): proiect nativ `.sjr` cu patru scene editabile, puzzle-uri 0–10, sunete și două rezerve. Lecția se prezintă în ScratchJr de pe laptop. [Instrucțiuni](materiale/Lectia_00_ScratchJr/README.md).

- `index.html` este intrarea comună, cu două secțiuni separate.
- [ScratchJr](scratchjr/index.html) listează toate cele zece lecții. Lecțiile refăcute au planuri și programe cu capturi; materialele vechi rămân în arhivele lor. Paginile lecțiilor au Înapoi/Înainte și întoarcere la meniu.
- [Robo](robo/index.html) păstrează jocul original, cele 22 de activități pentru clasă și aventura de acasă. Fișele pentru acasă sunt în continuare în antetul jocului.
- Linkurile vechi cu `?lesson=8&variant=2`, `?adventure=home` sau `#joaca` continuă să deschidă Robo. Pagina fără parametri arată meniul. Progresul Robo folosește aceleași chei în același browser.

Nu este un al doilea site sau un alt repository. Toate legăturile sunt relative și funcționează inclusiv sub folderul `/Pregatitoare1/` al GitHub Pages. Pentru utilizarea offline păstrează întregul proiect și deschide `index.html`. ScratchJr se folosește în aplicația instalată; siteul oferă cerințele și materialele profesorului.

[Raportul verificării meniului și legăturilor](verificare_site/README.md).


## Lecția 3 refăcută: Autobuzul spre plajă

O oră, puzzle greu, creație proprie și două rezerve. [Ghid](materiale/Lectia_03_ScratchJr/ghid-profesor.html) · [Plan și programe cu capturi](materiale/Lectia_03_ScratchJr/Ghid_profesor_Lectia_03.pdf) · [Teste în browser](materiale/Lectia_03_ScratchJr/verificare/Autobuzul_60min.md). Numai elemente din aplicație, fără distribuire de fișiere pe tablete.

## Cum folosim Robo

- **La clasă:** proiectăm jocul pe tabla digitală, iar copiii vin pe rând la laptop. Un copil propune câțiva pași, ceilalți spun unde cred că va ajunge Robo, apoi testăm.
- **Acasă:** șase misiuni de făcut împreună cu un părinte. După terminarea lor se poate descărca o diplomă PDF, cu prenumele copilului sau cu spațiul lăsat liber.
- **Fără internet:** descarcă și dezarhivează proiectul, apoi deschide `index.html` într-un browser modern. Păstrează folderul `assets/` alături de fișierele jocului.

Nu sunt necesare conturi. Nu există note, cronometru sau limită de încercări.

## Fișă de lucru pentru acasă

- [Fișa de tipărit, PDF](materiale/Robo_Acasa_Harta_7x7.pdf): o hartă 7×7 pe o pagină A4, cu trei drumuri spre căsuță. Drumul mai lung trece pe la stația de încărcare din E3. Robo are energie pentru 8 pași, apoi trebuie să încarce pentru a ajunge acasă. Copilul completează cele 18 căsuțe cu săgeți, încărcarea bateriei și activarea podului.
- [Soluția pentru părinte, PDF](materiale/Robo_Acasa_Harta_7x7_sol.pdf): traseul marcat, programul complet și explicația consumului de energie.

## Lecțiile Robo

Cele 22 de lecții sunt disponibile direct în selectorul de sus. Unele au mai multe variante de hartă. Putem alege cât lucrăm în funcție de ritmul copiilor:

- **1–2:** primii pași, apoi „Încercăm și reparăm”: Robo se oprește la margine, ștergem săgeata blocată și continuăm cu alta.
- **3:** anticiparea destinației, începând cu ↑ ↑ →. Alte runde păstrează modelul: doi pași în aceeași direcție, apoi o schimbare.
- **4–5:** un drum de patru pași până la căsuța din dreapta sus, apoi ocolirea copacilor.
- **6–8:** trasee 5×5 cu toate direcțiile, cheia pentru comoară și activarea podului.
- **9:** compararea a două drumuri.
- **10–12:** udarea florilor și descoperirea pașilor care se repetă.
- **13–14:** „Udă un rând”, o secvență cu nume, refolosită în grădina cu rândurile A, B și C.
- **15:** „Dacă este o floare” — Robo verifică locul înainte să ude.
- **16:** o hartă 4×4 cu căsuța în dreapta sus. Sunt mai multe drumuri, dar bateria ajunge doar pe traseul care trece la timp prin singura stație de încărcare.
- **17–19:** trei hărți 5×5: un ocol după cheie, o manetă pe malul râului și trei flori care deschid poarta.
- **20–22:** trei hărți 7×7: alegerea stațiilor de încărcare, vizitarea a trei stele și o călătorie care combină podul cu bateria. Putem construi programele în bucăți, schimbând copilul la fiecare oprire.

Câteva controale utile în timpul activității:

- **Pornește Robo** continuă din poziția curentă, cu comenzile noi. Putem construi drumul în bucăți, chiar cu mai mulți copii.
- **La start** reia harta și păstrează programul. **Alt copil** pregătește aceeași hartă cu programul gol; în lecția de reparare, readuce exemplul → ↓.
- **Pentru adult** conține sunetul, ecranul complet, ajutorul pentru traseu și întrebări pentru discuția cu clasa.

Linkul secțiunii Robo începe cu lecția 1. Pentru o anumită lecție se poate folosi, de exemplu, `?lesson=8`; `&variant=2` alege a doua variantă. La reîncărcarea paginii se păstrează alegerea lecției din adresă, iar încercarea pornește de la început.

## Cum este construit

- **HTML, CSS și JavaScript simplu**, fără framework, server de aplicație sau pas de build. Fișierele sunt servite ca atare de GitHub Pages.
- **Hărți definite în cod:** grile de 3×3, 4×4, 5×5 și 7×7, cu poziții `[x, y]` numărate de la zero, obstacole și obiecte precum cheia, maneta, florile sau stațiile de încărcare.
- **Motor separat de interfață:** `game-engine.js` validează comenzile și calculează starea următoare. Funcția `solve()` caută în lățime (BFS) un drum valid, ținând cont și de cheie, pod, flori și energie.
- **Program reprezentat ca date:** săgețile sunt comenzi precum `'R'` și `'U'`; repetițiile au forma `{ repeat: 2, commands: ['R', 'W'] }`, iar rețeta se apelează cu `{ call: 'water-row' }`. Motorul le desfășoară în pași simpli.
- **Execuție pas cu pas:** `app.js` păstrează poziția, obiectele și numărul comenzilor executate. Oprirea sau schimbarea lecției anulează rularea în așteptare, ca să nu execute din nou un pas deja făcut.
- **Grafică și sunet locale:** interfața folosește DOM, CSS și SVG, iar efectele sonore sunt generate cu Web Audio API. Sunetul pornește numai la cererea adultului.
- **Diplomă în browser:** `diploma.js` desenează ilustrația, numele și data pe un canvas, apoi folosește copia locală de jsPDF pentru un PDF A4 pe orizontală. Textul din PDF face parte din imagine.

### Organizarea codului

```mermaid
flowchart TD
    Lessons["classroom.js · ordinea lecțiilor<br/>curriculum.js · etape și hărți<br/>adventures.js · aventurile de acasă"] --> App["app.js<br/>navigare și execuție"]
    App <--> Engine["game-engine.js<br/>reguli, stare și rezolvarea traseelor"]
    App --> UI["robo/index.html + style.css<br/>hartă, comenzi și animații"]
    App <--> Storage["localStorage<br/>progres"]
    App --> Audio["robo-audio.js<br/>Web Audio"]
    App --> Diploma["diploma.js<br/>Canvas + jsPDF"]
    Diploma --> PDF["Diplomă PDF"]
```

- `classroom.js` stabilește numerele, ordinea și variantele lecțiilor. Reordonarea începe aici.
- `curriculum.js` construiește etapele pornind de la hărțile de bază din motor; `adventures.js` definește misiunile de acasă și celelalte seturi de joc.
- `tests/` conține testele motorului, hărților, navigării, progresului și sunetului. Motorul și datele lecțiilor se pot încărca și în Node.js, fără browser.
- `assets/` conține ilustrațiile și copia jsPDF, împreună cu [licența bibliotecii](assets/vendor/jspdf.LICENSE.txt).
- [BACKLOG.md](BACKLOG.md) păstrează istoricul lucrărilor și ideile de continuare.

## Progres și date

- Progresul se salvează în `localStorage`, separat pentru lecții și aventurile de acasă. Finalizarea lecțiilor la clasă nu deblochează diploma de acasă.
- Se păstrează misiunile terminate și etapele, nu programul unei încercări după închiderea paginii.
- Prenumele pentru diplomă este opțional. Rămâne în memorie cât pagina este deschisă; nu este salvat în `localStorage` și nu este trimis unui serviciu extern.
- Progresul rămâne în browserul folosit. Nu se sincronizează între dispozitive; dacă stocarea este indisponibilă, jocul poate continua în sesiunea curentă.

## Dezvoltare

Node.js și npm sunt necesare doar pentru verificări. Din rădăcina proiectului:

```sh
npm ci
npm run check
npm test
```

- `npm run check` verifică sintaxa fișierelor JavaScript.
- `npm test` folosește test runner-ul inclus în Node.js și jsdom pentru interfață. Testele acoperă inclusiv oprirea și reluarea, încărcarea bateriei, ordinea lecțiilor și separarea progresului de acasă.
- Pentru testarea manuală prin HTTP, poți rula `python -m http.server 8765 --bind 127.0.0.1`, apoi deschide `http://127.0.0.1:8765/`.
- La modificarea unei hărți, verifică existența unui traseu cu `solve()` și joacă o dată lecția în browser. Lizibilitatea și comenzile tactile merită încercate și pe tabla clasei.

## Publicare

- GitHub Pages publică din ramura `main`. Un push doar pe o ramură de lucru nu actualizează jocul online.
- La schimbarea fișierelor JavaScript sau CSS, actualizează parametrul `v` în paginile care le încarcă (`index.html`, `robo/index.html`, `scratchjr/index.html` sau paginile lecțiilor), pentru ca browserul să preia versiunea nouă.
- După push, verifică rularea **pages build and deployment** și deschide site-ul public pentru o probă.

## Cursul ScratchJr: lecția 1

[Planul celor zece lecții](materiale/Plan_10_lectii_ScratchJr.md) folosește resursele aplicației, cu cinci excepții: Lecțiile 6–10 includ atelierul, fabrica de roboți, misiunea submarină, stația de reciclare și sera în câte un starter SJR, de importat înaintea orei. Lecția 1 este „Cursa cu ștafetă”: iepure, câine, minge și predare vizibilă. Lecțiile 1–10 au fost refăcute pentru 60 de minute, cu programe ilustrate în PDF.

[README-ul lecției 1](materiale/Lectia_01_ScratchJr/README.md) conține instalarea pe Lenovo, construirea scenei și testarea opțională în browser. [Raportul de verificare](materiale/Lectia_01_ScratchJr/verificare/README.md) separă cele șapte proiecte finale testate în browser de probele Android și Desktop anterioare.

## Cursul ScratchJr: lecția 2

[Muzeul după închidere](materiale/Lectia_02_ScratchJr/index.html): 60 de minute, alte personaje din bibliotecă, animație continuă, oprire la inspecție și reluare. Include puzzle greu, zece minute de creație și două rezerve. [PDF cu capturi](materiale/Lectia_02_ScratchJr/Ghid_profesor_Lectia_02.pdf), [ghid](materiale/Lectia_02_ScratchJr/Ghid_profesor.md) și [testele în browser](materiale/Lectia_02_ScratchJr/verificare/Muzeul_60min.md).

## Cursul ScratchJr: lecția 3

[Autobuzul spre plajă](materiale/Lectia_03_ScratchJr/README.md): 60 de minute, Ascunde și Arată pentru urcare și coborâre, călătorie între scene, puzzle greu și două rezerve. [PDF cu toate programele](materiale/Lectia_03_ScratchJr/Ghid_profesor_Lectia_03.pdf) · [Testele în browser](materiale/Lectia_03_ScratchJr/verificare/Autobuzul_60min.md). Numai elemente din aplicație.

## Cursul ScratchJr: lecția 4

[Repetiția pentru spectacol](materiale/Lectia_04_ScratchJr/README.md) are 60 de minute: ritmuri cu Repetă finit, duet, puzzle cu două runde dirijate, 10 minute de creație și două rezerve. [PDF-ul cu capturi](materiale/Lectia_04_ScratchJr/Ghid_profesor_Lectia_04.pdf) arată programele tuturor personajelor; cele șapte proiecte folosesc numai Theatre, Teen, Mother și Pop. [Raportul testării în browser](materiale/Lectia_04_ScratchJr/verificare/Spectacolul_60min.md).

## Cursul ScratchJr: lecția 5

[Robotul curier](materiale/Lectia_05_ScratchJr/README.md) are 60 de minute: încărcare vizibilă, transport sincronizat, retur gol și două livrări autonome. Toate părțile dificile sunt în lecția de bază; păstrăm 10 minute de creație și două rezerve. [PDF-ul de 12 pagini](materiale/Lectia_05_ScratchJr/Ghid_profesor_Lectia_05.pdf) arată toate programele. Numai Gym, Car, Soccerball, Basketball și Fence; fără fișiere de distribuit pe tablete. [Testele în browser](materiale/Lectia_05_ScratchJr/verificare/Curierul_60min.md).

## Cursul ScratchJr: lecția 6

[Robotul pregătește atelierul](materiale/Lectia_06_ScratchJr/README.md): 60 de minute, încărcare vizibilă, curățenie la contact și ușă automată. Puzzle greu în bază, 10 minute de creație, traseu economic și oprire de urgență. [Starter cu două scene](materiale/Lectia_06_ScratchJr/solutii_atelier/start.sjr), cu toate resursele incluse. [PDF de 25 de pagini cu capturi](materiale/Lectia_06_ScratchJr/Ghid_profesor_Lectia_06.pdf) · [Teste în browser](materiale/Lectia_06_ScratchJr/verificare/Atelierul_60min.md).

## Cursul ScratchJr: lecția 7

[Fabrica de roboți: construim un rover](materiale/Lectia_07_ScratchJr/index.html): 60 de minute, montaj în paralel, roată lentă, probă a farului și plecare. Părțile grele sunt în bază; 10 minute de creație și două rezerve. [Starter cu resurse noi și mari](materiale/Lectia_07_ScratchJr/solutii_fabrica/start.sjr), [PDF de 18 pagini cu toate programele](materiale/Lectia_07_ScratchJr/Ghid_profesor_Lectia_07.pdf), [ghid](materiale/Lectia_07_ScratchJr/ghid-profesor.html) și [testele în browser](materiale/Lectia_07_ScratchJr/verificare/Fabrica_60min.md).

## Cursul ScratchJr: lecția 8

[Robotul submarin](materiale/Lectia_08_ScratchJr/index.html): 60 de minute, telecomandă, recuperare la contact, transport și depunere. Puzzle greu în bază, 10 minute de creație și două rezerve: transport fragil, întoarcere automată. [Starter cu resurse noi și mari](materiale/Lectia_08_ScratchJr/solutii_submarin/start.sjr), [PDF de 19 pagini cu toate programele](materiale/Lectia_08_ScratchJr/Ghid_profesor_Lectia_08.pdf), [ghid](materiale/Lectia_08_ScratchJr/ghid-profesor.html) și [testele în browser](materiale/Lectia_08_ScratchJr/verificare/Submarinul_60min.md).

## Cursul ScratchJr: lecția 9

[Robotul de reciclare](materiale/Lectia_09_ScratchJr/README.md): 60 de minute, fără creație proprie. Transport vizibil, trei categorii și puzzle greu cu două sticle în locuri distincte. Două rezerve: compactarea hârtiei și golirea recipientelor. Șase proiecte native, resurse noi și mari incluse în starter, ghid și PDF de 17 pagini cu programele tuturor personajelor. [Verificat în browser](materiale/Lectia_09_ScratchJr/verificare/Reciclarea_60min.md); Lenovo fizic netestat.

## Cursul ScratchJr: lecția 10

[Robotul grădinar](materiale/Lectia_10_ScratchJr/index.html): 60 de minute, fără creație proprie. Udare, consum de apă și reumplere; puzzle greu în bază și două rezerve. [Starter cu resurse noi și mari](materiale/Lectia_10_ScratchJr/solutii_gradinar/start.sjr), [PDF de 20 de pagini cu toate programele](materiale/Lectia_10_ScratchJr/Ghid_profesor_Lectia_10.pdf), [ghid](materiale/Lectia_10_ScratchJr/ghid-profesor.html) și [testele în browser](materiale/Lectia_10_ScratchJr/verificare/Gradinarul_60min.md). Meniul reunește toate cele zece lecții de o oră, iar Robo rămâne separat.
