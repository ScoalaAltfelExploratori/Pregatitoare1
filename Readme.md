# Robo Explorator · V1.1

Aventură de programare în română, offline, pentru clasa pregătitoare. Lecțiile au etape scurte, cu instrumente introduse pe rând. Primele trei lecții formează parcursul de bază; cheia, acțiunile, repetiția, decizia și rețeta sunt continuări alese în ritmul clasei.

## Pornire

Deschide `index.html` în Chrome, Edge sau Firefox. Nu sunt necesare internet, conturi sau instalare. Păstrează toate fișierele aplicației și directorul `assets/` împreună.

La prima deschidere apare „O singură săgeată”: alege → și apasă „Pornește Robo”. Următoarea etapă adaugă încă o săgeată. Un browser cu progres salvat continuă aventura; adultul poate alege prima lecție din panoul său.

Pe laptop și tablă, harta este în stânga, iar comenzile și programul în dreapta. Ecranul copiilor păstrează obiectivul scurt, harta, săgețile mari și pornirea. Navigarea, sunetul, fișele, lecțiile, contoarele și ștergerea întregului program sunt în meniul „Pentru adult”, sus în dreapta. Pe telefon, panourile se așază unul sub altul. Pentru proiecție: „Ecran complet” din meniul adultului sau F11.

Cele patru direcții ↑ ← ↓ → sunt vizibile și disponibile încă din prima etapă. Rămân vizibile în timpul rulării și după reușită; sunt dezactivate cât Robo execută programul. În timpul rulării se retrag doar controalele acțiunilor și blocurilor. Săgeata activă rămâne evidențiată pe durata deplasării. „Oprește” permite din nou editarea. Programul lung se derulează separat. Întrebarea DA/NU apare lângă program și păstrează harta mare; în acel moment înlocuiește mesajul obișnuit. După reușită rămân drumul făcut și continuarea aleasă explicit.

Deschiderea meniului „Pentru adult” oprește rularea, inclusiv o întrebare în așteptare, fără să piardă pașii făcuți. „Înapoi la copii” sau Escape închide meniul; pornirea continuă din poziția curentă. Instrucțiunile detaliate ale lecției rămân în acest meniu. Pe ecranul copiilor, „↶ Șterge ultima” șterge ultima comandă nouă; atingerea unei comenzi noi o șterge doar pe aceea.

## Parcursul lecțiilor

| Lecția | Etapele introduse | Traseu introductiv |
| --- | --- | --- |
| 1. Prima comoară · Bază | O săgeată, apoi două identice; toate direcțiile sunt vizibile | →, apoi → → |
| 2. Drumul spre căsuță · Bază | O schimbare de direcție, apoi trei săgeți | → ↑, apoi → ↑ ↑ |
| Detectivul Robo | După lecția 2: reparăm o singură săgeată dintre două | Două săgeți, două variante |
| 3. Ocolim copacul · Bază | Un obstacol pe 3×3, cu săgețile deja cunoscute | ↑ → → |
| 4. Cheia și comoara · Continuare | Întâi cheia, apoi cufărul | → ↑, pauză, → ↓ |
| 5. Podul și maneta · Continuare | O acțiune schimbă harta | ↑ ⚙, pauză, → → |
| 6. Grădina lui Robo · Continuare | Udăm o floare, apoi recunoaștem o pereche repetată | → 💧 → |
| 6. Grădina · Extensii | Repetiție, decizie separat, apoi combinare | Detalii mai jos |
| 7. Rețeta lui Robo · Extensie | Un nume pentru pași cunoscuți, apoi reutilizare | 📖, apoi ↑ |

Prima întâlnire se poate încheia după cele trei lecții de bază. „Unde crezi că ajunge?” poate fi intercalat după primele secvențe: începe cu două săgeți pe 3×3 fără obstacole; trei săgeți sunt o alegere separată.

În „Instrumente pentru adult”, alege orice lecție și etapă fără să fie nevoie să termini parcursul. Fiecare etapă are un reper „Observăm”. Avansarea se decide după explicațiile copiilor, fără cronometru. Repetiția, decizia, rețeta și hărțile mai mari sunt opționale.

Hărțile vechi se păstrează ca provocări: doi copaci pe 4×4, comoara de 12 pași, podul de 9 pași și grădina cu trei flori. Harta veche cu doi copaci păstrează și copacul de la rândul 2, coloana 1. Schimbarea etapei pregătește o încercare nouă.

După ocolul 3×3 se pot alege două poteci 5×5: „Toate cele patru săgeți” (12 pași, până la căsuță) și „Comoara din mijloc” (16 pași). Obstacolele cer folosirea tuturor celor patru direcții. Sunt provocări opționale, care se pot construi în bucăți. Toate hărțile au ca destinație o comoară sau o căsuță; obiectele și acțiunile sunt pași pe parcurs.

## Pornirea continuă programul

- „Pornește Robo” execută numai comenzile încă nefăcute, din poziția curentă. Poți construi drumul în bucăți. Cheia, podul, florile și răspunsurile se păstrează.
- Pașii făcuți sunt bifați și protejați. Atinge o comandă nouă pentru a o șterge; „Șterge cele noi” elimină numai restul programului.
- „Oprește” păstrează pasul exact. După o greșeală, comanda nereușită rămâne de reparat.
- „La start” readuce Robo și harta la început, păstrând programul pentru editare. „Șterge tot” îl poate goli după resetare.
- În introducerile scurte cu cheia și maneta, Robo se oprește singur după colectare sau activare. Observați schimbarea, apoi apăsați iar „Pornește Robo”, chiar dacă restul comenzilor era deja pregătit.
- „Arată un drum” înlocuiește comenzile noi cu o continuare validă din starea curentă.

Limita este de 8 pași pe 3×3, 16 pe 4×4 și 32 pe 5×5 sau în jocul liber. Fiecare comandă dintr-o repetiție sau rețetă intră în limită. Blocul decizional numără un pas atât la DA, cât și la NU.

## Acțiunile, repetiția și decizia

„⚙ Activează” se execută pe manetă. Abia atunci podul coboară și permite traversarea. Râul umple fiecare celulă; podul are două jumătăți ridicate care, după activare, se unesc dintr-un mal în celălalt. „💧 Udă” se execută pe floare. O acțiune în alt loc explică problema și oprește programul, păstrând pașii corecți.

Grădina are cinci etape:

1. **Udăm o floare:** → 💧 →, fără poartă sau repetiție.
2. **Observăm ce se repetă:** → 💧 → 💧, apoi → ↑ prin poartă. Identificăm perechea înainte să apară blocul.
3. **Repetăm perechea — opțional:** aceeași hartă. Adaugă → și 💧, deschide „Repetă ultimele 2 comenzi”, alege 2 ori, apoi adaugă → ↑.
4. **Verificăm: este floare? — opțional:** 3×3, fără repetiție. Încearcă 🌱? pe gol, apoi →, 🌱? pe floare și →. Observăm **NU**, apoi **DA**.
5. **Repetăm și verificăm — opțional:** harta mai mare combină ideile exersate. Repetă de 3 ori perechea →, 🌱?, apoi adaugă → ↑. Rezultatele sunt **DA, NU, DA**; florile udate deschid poarta.

🌱? înseamnă „DACĂ este o floare aici, ATUNCI Udă”. Pe gol, Robo nu udă și nu se deplasează; urmează comanda următoare. Pe o floare deja udată, DA nu dublează udarea.

**Întrebarea așteaptă fără limită de timp.** Clasa răspunde, iar adultul apasă „Verificăm răspunsul”. În instrumentele adultului se poate activa răspunsul automat după două secunde. Oprirea înainte de răspuns anulează verificarea în așteptare; reluarea pune întrebarea din nou. Oprirea după răspuns păstrează rezultatul și efectul împreună.

Repetiția grupează exact două comenzi simple, de 2 sau 3 ori. Nu există repetiții imbricate. Programul evidențiază comanda curentă și fiecare pereche făcută. „Desfă în comenzi” permite repararea restului, inclusiv după oprirea în mijlocul unui bloc. Rezolvările fără blocuri sunt acceptate.

## Rețeta opțională

„📖 Udă un rând” este numele secvenței pregătite → 💧 → 💧. Prima etapă o folosește o singură dată pe 3×3, apoi Robo merge ↑ la căsuță.

Imediat după introducerea 3×3 urmează o grădină 5×5 cu trei rânduri, A, B și C, și șase flori. Folosește rețeta la A, mergi ← ← ↑ ↑ până la B și folosește-o din nou. Repetă deplasarea ← ← ↑ ↑ până la C, udă al treilea rând, apoi mergi → → prin poartă la căsuță. Sunt 22 de pași și trei folosiri ale aceleiași rețete; programul poate fi construit și pornit în bucăți. Varianta anterioară cu două rânduri rămâne disponibilă în selectorul adultului. Este o primă procedură cu nume; definiția este vizibilă și nu se editează. „Desfă în comenzi” modifică numai folosirea aleasă.

## Anticiparea și Detectivul Robo

„Unde crezi că ajunge?” oferă două săgeți, cu opțiune pentru trei. Harta arată robotul, fără o comoară care să sugereze răspunsul. Copiii aleg o căsuță și apasă „Verificăm împreună”. Comoara se dezvăluie la destinație după verificare. „Altă provocare” pregătește o rundă nouă. Cu tastatura: Tab pentru focalizare, săgețile pentru alegerea căsuței, Enter sau Spațiu pentru confirmare.

Detectivul are trei cazuri 3×3, cu 2, 3 și 4 săgeți. Începe cu primul: o singură înlocuire dintre două variante mari. „Testăm drumul” arată efectul; „Arată săgeata” indică locul de reparat fără să dea răspunsul. Fără punctaj, cronometru sau limită de încercări. După o schimbare, Robo revine la start pentru a testa drumul reparat. Cazurile următoare sunt opționale.

Ambele activități sunt disponibile de la început și nu schimbă progresul lecțiilor. „Programăm” restaurează aventura, inclusiv poziția, cheia, florile și pașii făcuți.

## Povestea, fișele și instrumentele adultului

Primele șapte scene propun aproximativ 30 de minute: un pas, secvență scurtă, anticipare, reparare, un copac, lucru în perechi și recapitulare. Scena a opta prezintă continuările pentru altă rundă. Adultul citește mesajele; copiii pot răspunde prin gesturi și indicarea săgeților.

Scena de lucru în perechi deschide o fișă simplă cu două comenzi. „Tipărește harta” folosește etapa curentă: locurile pentru comenzi și instrucțiunile se adaptează lecției. Apar elementele relevante: cheie, acțiune, repetiție, decizie sau rețetă. Fișa detectivului include săgețile inițiale și cele două variante.

Tipărire: A4, portret, scară 100%, fără anteturile și subsolurile browserului. PDF-urile din `materiale/` sunt materialele originale pentru 5×5; pachetul PDF pe niveluri rămâne în backlog.

Instrumentele adultului includ selectorul de lecție și etapă, reperul de observare, ritmul întrebării, jocul liber cu hartă generată, harta originală, soluția din starea curentă și tipărirea. Resetarea aventurii cere confirmare în panou.

Sunetul este oprit inițial și se activează din „Pentru adult”. Efectele sunt generate local; nu există replici vocale. Animațiile respectă preferința sistemului pentru mișcare redusă.

## Salvare și compatibilitate

Progresul se păstrează când browserul permite stocarea locală. Finalizarea unei etape intermediare salvează etapa următoare; finalizarea lecției deblochează următoarea. Alegerea unei lecții avansate de către adult nu marchează lecțiile anterioare drept terminate. Programul încercării nu se salvează după închiderea paginii.

Progresul vechi se păstrează: salvările v2/v3 continuă lecțiile, iar salvările cu opt misiuni terminate sunt limitate la cele șapte actuale. Prototipul v1 păstrează primele trei lecții. Etapele noi se salvează separat în `robo-explorator-lessons-v1`, fără resetarea progresului existent. Fără stocare, jocul funcționează în sesiunea curentă. Mutarea pachetului sau schimbarea browserului poate însemna un progres separat. Nu se salvează date despre copii.

## Publicare

Site-ul public este [Robo Explorator](https://scoalaaltfelexploratori.github.io/Pregatitoare1/). GitHub Pages publică automat ramura `main`; un push pe o ramură de lucru nu actualizează site-ul.

La publicarea unor modificări JavaScript sau CSS, actualizează împreună parametrul `v` al fișierelor din `index.html`. Acesta împiedică încărcarea fișierelor vechi din cache alături de pagina nouă. Verifică reușita „pages build and deployment” și prima lecție pe site-ul public înainte de a distribui linkul.

## Dezvoltare și verificare

Aplicația nu are dependențe la rulare. Pentru teste:

```sh
npm ci
npm run check
npm test
```

Suita acoperă etapele și provocările, disponibilitatea comenzilor, progresul, migrarea, cheia, acțiunile, repetițiile, rețeta, anticiparea și detectivul. Verifică oprirea/reluarea în jurul executării comenzilor, răspunsurile DA/NU, așteptarea adultului, anularea întrebărilor la schimbarea activității, fișele și revenirea la program. Sunt verificate mii de hărți și runde generate.

Interfața se verifică în browser pe desktop și telefon. Browserul de testare acceptă numai HTTP/HTTPS, deci deschiderea directă prin `file://` nu a fost verificată automat. Atingerea, lizibilitatea de la distanță, volumul și tipărirea se verifică pe echipamentul clasei.

Fișiere principale:

- `index.html`, `style.css`, `app.js`: interfața, povestea și activitățile.
- `curriculum.js`: lecțiile, etapele, provocările și reperele pentru adult.
- `game-engine.js`: mișcarea, regulile, rezolvarea și generarea hărților.
- `robo-audio.js`: efecte audio offline.
- `tests/`: teste pentru motor, curriculum, interfață și sunet.
- `BACKLOG.md`: implementări și taskuri viitoare.
- `assets/`, `materiale/`: ilustrația și materialele originale.

Robotul animat este desenat local în SVG. Ilustrația originală a fost generată din descrierea unui robot explorator turcoaz și crem, pe o insulă luminoasă lângă un cufăr auriu.
