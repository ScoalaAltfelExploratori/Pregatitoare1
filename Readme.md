# Robo Explorator · V1

Aventură de programare în română pentru clasa pregătitoare. Include patru misiuni progresive, joc de anticipare, poveste în opt scene și fișe imprimabile.

## Rulare

Deschide `index.html` în Chrome, Edge sau Firefox. Jocul funcționează fără internet, conturi sau instalare. Păstrează fișierele aplicației și directorul `assets/` împreună.

Pentru tablă: conectează laptopul, deschide aplicația și apasă „Ecran complet” sau F11. Dacă tabla nu transmite atingerile către laptop, poți opera jocul cu mouse-ul după comenzile copiilor.

## Prima aventură

1. Începe cu „Prima baterie”. Adaugă două săgeți spre dreapta, apoi apasă „Pornește Robo”.
2. La reușită, următoarea misiune se deblochează. Apasă „Următoarea misiune” pentru a continua.
3. Misiunile trec de la 3×3 la 4×4 și apoi la 5×5. Traseele minime au 2, 3, 4 și 12 comenzi. Orice traseu valid este acceptat.
4. „Pornește Robo” execută numai săgețile încă nefăcute, din poziția curentă. Pașii făcuți primesc o bifă și nu se pot șterge. Adaugă următoarea bucată de drum și pornește din nou.
5. Atinge o săgeată nouă pentru a o șterge; „Șterge cele noi” elimină doar comenzile rămase. „Oprește” păstrează pașii făcuți și permite continuarea fără repetarea lor. După o greșeală, comanda nereușită rămâne de reparat.
6. „La start” readuce Robo la început, păstrează programul și permite editarea tuturor comenzilor. După aceea, „Șterge tot” golește programul. Schimbarea misiunii sau hărții pregătește o încercare nouă.
7. Misiunile terminate pot fi rejucate. Progresul se păstrează în acest browser, dacă stocarea locală este disponibilă. La redeschidere apare următoarea misiune disponibilă. Mutarea pachetului sau schimbarea browserului poate însemna un progres separat.

Limita programului este de 8 comenzi pe misiunile 3×3, 16 pe 4×4 și 32 pe 5×5 sau în jocul liber, inclusiv pașii deja făcuți. Nu trebuie completate toate locurile.

## Cheia și comoara

Aventura are acum patru misiuni: „Prima baterie”, „Floarea de pe deal”, „Ocolim copacul” și „Cheia și comoara”. Am eliminat „Lumina din poiană” și am unit cele două misiuni finale într-un traseu mai lung, pe aceeași hartă 5×5.

- Cheia se află sus, în dreapta, iar cufărul jos, în dreapta. Un traseu complet are minimum 12 pași.
- Robo ia cheia automat când trece prin căsuța ei. Cheia dispare de pe hartă, iar primul obiectiv devine „Cheie găsită”.
- Dacă încearcă să intre în căsuța cufărului fără cheie, se oprește și explică faptul că trebuie găsită mai întâi cheia.
- Misiunea se termină numai când Robo ajunge cu cheia la cufăr. Nu sunt necesare comenzi suplimentare pentru ridicare sau deschidere.
- Poți construi drumul în două etape: → → ↑ ↑ → → ↑ ↑ până la cheie, apoi adaugi ↓ ↓ ↓ ↓ și apeși iar „Pornește Robo”. Cheia și poziția se păstrează, iar primele opt comenzi nu se repetă.
- Oprirea, editarea comenzilor noi și revenirea din anticipare păstrează cheia. „La start” pune cheia înapoi pe hartă și pregătește întregul program pentru o nouă încercare.
- „Arată un drum” calculează continuarea din poziția curentă, ținând cont dacă Robo are cheia. Fișa imprimată arată ambele obiective și ordinea lor.

Progresul din versiunea cu șase misiuni este adaptat automat: primele trei misiuni terminate se păstrează, iar noua finală trebuie rezolvată chiar dacă vechea aventură fusese terminată. Nu este nevoie de resetare manuală.

## Unde crezi că ajunge?

- Apasă „Unde crezi că ajunge?”. Apare o hartă nouă, de aceeași dimensiune ca misiunea curentă, și un program cu exact trei săgeți.
- Copiii urmăresc mental comenzile și aleg o căsuță. Alegerea este marcată cu un ac. Nu se poate selecta un copac.
- Apasă „Verificăm împreună”. Robo execută programul și arată unde s-a oprit. Răspunsul nu afectează progresul misiunilor.
- „Altă provocare” pregătește o rundă nouă. „Programăm” restaurează harta, comenzile, pașii făcuți, poziția și cheia din activitatea anterioară. În anticipare, o verificare oprită se reia de la începutul celor trei săgeți.
- Cu tastatura: Tab pentru focalizare, săgețile pentru deplasarea focalizării între căsuțele libere și Enter sau Spațiu pentru alegere. În modul „Programăm”, săgețile tastaturii adaugă comenzi.

## Animații și sunet

Robo se deplasează lin, reacționează la obstacole și dansează scurt la reușită. Preferința sistemului pentru mișcare redusă dezactivează animațiile.

Sunetul este oprit la deschiderea paginii. „♫ Sunet oprit” activează efecte scurte, generate local prin Web Audio. Același buton oprește sunetul. Nu există înregistrări vocale în această versiune. Jocul rămâne utilizabil dacă browserul nu oferă audio.

## Instrumente pentru adult

Deschide panoul de sub joc pentru:

- „Hartă nouă · joc liber”: hartă 5×5 generată, cu cel puțin un drum în maximum 16 pași.
- „Găsește greșeala”: exemplul original care întâlnește un copac la pasul 3.
- „Harta originală · 5×5”: harta din primul pachet; o soluție este → → ↑ ↑ ↑ → → ↑.
- „Arată un drum”: păstrează pașii făcuți și înlocuiește săgețile noi cu o continuare până la destinație.
- „Tipărește harta”: fișă pentru harta curentă, inclusiv 3×3 și 4×4.
- „Reia aventura de la început”: șterge progresul numai după confirmarea din panou.

Jocul liber și rundele de anticipare nu deblochează misiuni. Nu se salvează nume sau date despre copii.

## Povestea și fișele

„Povestea” păstrează cele opt scene și notițele pentru adult. Scenariul are aproximativ 32 de minute; poți intercala misiunile și rundele de anticipare în ritmul clasei. Primele scene folosesc acum harta simplă 3×3; scena detectivului păstrează exemplul 5×5.

„Fișa de explorator” oferă o hartă de tipărit și roluri pentru lucru în perechi. Din scena dedicată fișei se preia harta activității de programare. „Altă hartă” generează o hartă de aceeași dimensiune.

Tipărire: A4, portret, scară 100%, fără anteturile și subsolurile browserului. Cele două PDF-uri din `materiale/` sunt materialele originale pentru 5×5; pachetul PDF pe niveluri este în backlog.

## Verificări și dezvoltare

Aplicația nu are dependențe la rulare. Node.js și pachetele de mai jos sunt necesare doar pentru teste:

```sh
npm ci
npm run check
npm test
```

Suita include:

- Cele patru misiuni, deblocare, rejucare, salvare și stocare indisponibilă.
- Cheie obligatorie înainte de cufăr, revenirea prin aceleași căsuțe după colectare și migrarea progresului vechi.
- 3.000 de hărți generate și 1.500 de runde de anticipare.
- Continuarea în două porniri, oprire în 15 momente din rulare, apăsări repetate și trecerea paginii în fundal.
- Editarea protejează pașii făcuți; anticiparea restaurează poziția și cheia; soluția și instrumentul WebMCP respectă istoricul executat.
- Răspunsuri corecte și greșite, limite de comenzi, detectiv, fișe și resetare.
- Inițializare audio la cerere, dezactivare și lipsa suportului audio.

Verificarea în browser a V1 acoperă misiuni, anticipare prin tastatură, salvare după reîncărcare, oprire, comutarea sunetului și afișarea la dimensiuni de desktop și telefon. Browserul de testare acceptă numai HTTP/HTTPS, deci deschiderea directă prin `file://` nu a putut fi verificată automat. Testarea atingerii, a volumului și a imprimantei pe echipamentul real al clasei rămâne necesară.

## Fișiere

- `index.html`, `style.css`, `app.js`: interfața și activitățile.
- `game-engine.js`: mișcare, căutarea drumului, generare și misiuni.
- `robo-audio.js`: efecte audio offline.
- `tests/`: teste pentru motor, interfață și sunet.
- `BACKLOG.md`: taskuri și criterii de acceptare pentru versiunile următoare.
- `assets/robot-treasure-island.png`: ilustrația originală.
- `materiale/`: storyboard și fișe PDF originale.

Ilustrația originală a fost generată din descrierea unui robot explorator turcoaz și crem, cu hartă, pe o insulă luminoasă lângă un cufăr auriu. Robotul animat din joc este desenat local în SVG.
