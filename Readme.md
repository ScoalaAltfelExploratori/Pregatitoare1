# Robo Explorator

Activitate de Școala altfel, în română, pentru copii de aproximativ 7 ani.
Durată orientativă: 32 de minute. Include jocul, povestea în 8 scene și fișa imprimabilă.

## Rulare

Deschide `index.html` în Chrome, Edge sau Firefox. Aplicația funcționează și fără internet: nu folosește servicii externe, conturi sau instalări.

Pentru tablă: conectează laptopul, deschide aplicația și apasă „Ecran complet” sau F11. Dacă tabla nu transmite atingerile către laptop, poți opera jocul cu mouse-ul, după comenzile copiilor.

## Ordinea activității

1. Deschide „Povestea”. Sunt 8 scene, cu notițe pentru părinte.
2. Butonul fiecărei scene pregătește jocul potrivit. Revino la „Povestea” pentru a continua de unde ai rămas.
3. În „Joacă”, apasă săgețile, apoi „Pornește Robo”. O săgeată înseamnă un pătrățel în direcția ecranului; robotul nu trebuie rotit.
4. O comandă din șir se șterge prin atingere. „La start” păstrează programul. „Șterge tot” golește programul.
5. „Găsește greșeala” încarcă un program care întâlnește un copac la pasul 3.
6. „Hartă nouă” construiește o hartă nouă, cu cel puțin un drum posibil. „Arată un drum” încarcă o soluție.
7. „Fișa de explorator” oferă o hartă de tipărit. „Tipărește harta” din joc folosește harta curentă.

Tipărire: A4, orientare portret, scară 100%. Oprește anteturile și subsolurile browserului. PDF-ul inclus oferă două misiuni fără dependență de redarea emoji-urilor.

## Pentru părinte

Materiale: laptop, tablă/ecran conectat, o fișă și un creion pentru fiecare pereche, un pion sau un capac pentru fiecare pereche.

Prima hartă are soluția: → → ↑ ↑ ↑ → → ↑. Există și alte trasee valide.
Nu trebuie completate toate cele 16 căsuțe ale fișei. Un program valid poate avea mai puține comenzi.

Butonul „Hartă nouă” alege poziții și încearcă să adauge obstacole. După fiecare obstacol, caută un drum; păstrează obstacolul doar dacă harta rămâne rezolvabilă în cel mult 16 pași. Acesta este un exemplu de generare procedurală prin reguli, fără model AI.

## Verificări

- Sintaxă JavaScript și referințe locale verificate.
- 1.000 de hărți generate și verificate automat: drum posibil, start și comoară libere, soluții executabile.
- Comenzile, coliziunile, navigarea între scene și fișa au fost verificate într-un DOM simulat.
- Storyboardul și fișele PDF au fost randate și inspectate vizual.
- Previzualizarea într-un browser real și validarea WebMCP în browser nu au fost disponibile în mediul de creare. Înaintea activității, verifică atingerea și tipărirea pe echipamentul clasei.

## Fișiere

- `index.html`, `style.css`, `app.js`, `game-engine.js`: aplicația.
- `assets/robot-treasure-island.png`: ilustrația originală.
- `materiale/`: storyboard și fișe, în pachetul offline.

Ilustrația a fost creată cu instrumentul de generare de imagini. Brief: robot explorator turcoaz și crem, cu hartă, pe o insulă luminoasă, lângă un cufăr auriu; stil de carte pentru copii / 3D blând, fără text.
