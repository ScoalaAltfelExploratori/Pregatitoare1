# Robo Explorator · V1.3

Aventură de programare în română, offline, pentru clasa pregătitoare. Modul „La clasă” propune o sesiune interactivă de 90 de minute pe tabla digitală. Modul „Acasă” oferă șase provocări variate și diploma, exclusiv pentru continuarea cu părinții.

## Pornire

Deschide `index.html` în Chrome, Edge sau Firefox. Nu sunt necesare internet, conturi sau instalare. Păstrează toate fișierele aplicației și directorul `assets/` împreună.

Linkul de clasă fără parametri începe mereu la prima activitate, indiferent de progresul vechi. Selectorul de sus permite deschiderea oricărei lecții și variante. Adresa se actualizează, de exemplu `?lesson=7` pentru pod sau `?lesson=9&variant=2` pentru energia pe 5×5. Reîncărcarea reface lecția și varianta de la start, chiar fără localStorage; nu reface programul încercării întrerupte.

Pe laptop și tablă, harta este în stânga, iar comenzile și programul în dreapta. Sus sunt permanent selectorul lecției, varianta, Înapoi/Înainte, Detectivul Robo și Plan · 90 min. Sunetul, ecranul complet și instrumentele detaliate rămân în „Pentru adult”. Pe telefon, panourile se așază unul sub altul. Pentru proiecție: „Ecran complet” din meniul adultului sau F11.

Cele patru direcții ↑ ← ↓ → sunt vizibile și disponibile încă din prima etapă. Rămân vizibile în timpul rulării și după reușită; sunt dezactivate cât Robo execută programul. În timpul rulării se retrag doar controalele acțiunilor și blocurilor. Săgeata activă rămâne evidențiată pe durata deplasării. „Oprește” permite din nou editarea. Programul lung se derulează separat. Întrebarea DA/NU apare lângă program și păstrează harta mare; în acel moment înlocuiește mesajul obișnuit. După reușită rămân drumul făcut și continuarea aleasă explicit.

Deschiderea meniului „Pentru adult” oprește rularea, inclusiv o întrebare în așteptare, fără să piardă pașii făcuți. „Înapoi la copii” sau Escape închide meniul; pornirea continuă din poziția curentă. Instrucțiunile detaliate ale lecției rămân în acest meniu. Pe ecranul copiilor, „↶ Șterge ultima” șterge ultima comandă nouă; atingerea unei comenzi noi o șterge doar pe aceea.

## Parcursul lecțiilor

### Sesiunea de 90 de minute

Un copil lucrează la laptop, restul clasei anticipează și explică. Schimbăm copilul după o încercare sau o etapă. „Alt copil” pregătește aceeași provocare cu program gol; „La start” păstrează programul pentru retestare.

În „Plan · 90 min” → „Cum prezint la nivelul lor?” găsești o introducere și rutina **Arătăm → Alegem → Testăm**. Toată clasa arată direcția, un copil pune una sau două săgeți, altul anticipează, apoi verificăm și reparăm împreună. Pe hărțile mari construim drumul în bucăți. Intercalăm mici pauze de mișcare; cele 12 activități sunt un meniu flexibil, nu o listă obligatorie. Folosim mai întâi „pas”, „săgeată” și „drum”, apoi numim șirul „program”.

„Pentru adult” arată acum o întrebare orală pentru lecția curentă, adaptată și variantelor de energie, comparație și decizie. Nu este necesar ca elevii să citească: adultul pune întrebarea, iar copiii pot răspunde prin gesturi. Destinațiile și cheia se dimensionează după celule; bara de sus este mai compactă, iar selectorul variantei dispare când există o singură variantă.

| Minute | Activitate |
| --- | --- |
| 0–7 | 1. Facem cunoștință cu Robo: o săgeată, apoi două |
| 7–14 | 2. Săgețile în ordine |
| 14–20 | 3. Unde ajunge Robo? |
| 20–28 | 4. Detectivul Robo |
| 28–35 | 5. Ocolim copacul |
| 35–43 | 6. Cheia, apoi comoara |
| 43–51 | 7. Coborâm podul |
| 51–56 | 8. Pauză de mișcare: noi suntem roboții |
| 56–66 | 9. Energia: observăm bateria, apoi încercăm stația pe 5×5 |
| 66–73 | 10. Comparăm două drumuri; alternativ, săgeata lipsă sau steaua |
| 73–81 | 11. Îngrijim o floare; condiția DACĂ rămâne o variantă opțională |
| 81–90 | 12. Misiunea echipei cu toate direcțiile, inclusiv 3 minute de recapitulare |

Timpii sunt orientativi, fără cronometru. Nu trebuie parcurse toate variantele. Planul oferă indicații de participare și deschide fiecare activitate direct. Extensiile din același selector includ repetiția simplă, grădinile, rețeta, povestea ilustrată, fișa și fabrica de hărți. Activitățile clasei nu acordă progres pentru aventura de acasă sau diplome. Selectarea altei lecții oprește sigur rularea curentă și pregătește o încercare nouă.

### Aventurile de acasă

Butonul **„Acasă”** deschide un parcurs separat. Pentru părinți, folosește linkul cu `?adventure=home`; acesta arată pagina de început a aventurii, indiferent de progresul clasei. Linkul complet este disponibil în planul clasei și în „Pentru părinte”. Din folderul offline, deschide `index.html` și apasă același buton.

Cele șase misiuni sunt: schimbarea direcției, săgeata lipsă, cheia, podul, reîncărcarea pe 5×5 și vizitarea unei stele înainte de căsuță. Celelalte hărți au 3×3 celule. La cheie și la activarea podului există o pauză de observație. Prenumele este cerut opțional înainte de începere și apare pe diplomă; poate fi omis sau corectat la final. Următoarea misiune se deblochează după reușită; hărțile terminate se pot rejuca. Nu există note, cronometru sau limită de încercări. Ajutorul adultului nu împiedică obținerea diplomei.

După toate cele șase misiuni apare **„Diploma mea”**. Numele este opțional, data poate fi schimbată, iar previzualizarea reproduce PDF-ul A4 pe orizontală. Imaginea oferită de utilizator este păstrată ca ilustrație, cu numele și data desenate în spațiile libere. PDF-ul este generat local, fără servicii externe, dintr-o imagine de înaltă rezoluție; textul său nu este selectabil. Numele nu este salvat în localStorage și nu este trimis către un server. Se pot crea diplome cu alte nume sau cu spațiul gol pentru scriere de mână.

Progresul se păstrează separat în `robo-adventure-home-v1`; cele trei aventuri opționale au propriile chei. Se salvează misiunile terminate, nu programul încercării în curs. După închiderea paginii, o misiune neterminată reîncepe de la start. În aceeași sesiune, „Înapoi la jocul curent” păstrează încercarea. Dacă browserul refuză salvarea, jocul și diploma funcționează în sesiunea curentă. Progresul nu se transferă automat între dispozitive.

Din vechiul set de acasă se păstrează reușitele pentru hărțile neschimbate. Săgeata lipsă și energia trebuie rezolvate înaintea noii diplome; o salvare veche completă nu le marchează automat ca terminate.

### Aventuri opționale, câte o idee nouă

- **Energia lui Robo:** patru misiuni, de la observarea bateriei la alegerea stațiilor și un traseu 5×5 cu mai multe opriri. Bateria are patru liniuțe; fiecare deplasare reușită consumă una. Stația o umple automat. Oprirea, timpul de așteptare, obstacolele și acțiunile pe loc nu consumă energie. Ultima liniuță poate duce chiar pe stație sau la destinație. La epuizare, „Încercăm din nou de la stație” readuce împreună poziția, bateria, inventarul, lumea și pașii la ultima încărcare; comenzile de după ea se șterg. Înainte de prima stație, revenirea este la start. „La start” reia întreaga hartă și păstrează programul.
- **Pași care se repetă:** întâi → de trei ori pe 4×4, apoi perechea → ↑ de două ori pe o scară 3×3. Pașii desfășurați și pasul activ se văd în program. Soluțiile cu săgeți simple sunt la fel de valide. Nu se cer udare, porți, rețete sau condiții.
- **Mici descoperiri:** vizităm steaua înainte de căsuță; completăm un singur loc `?` între două săgeți; testăm două trasee pregătite și comparăm cei 3, respectiv 5 pași. Comparația se termină după testarea ambelor drumuri.

Aceste activități nu condiționează diploma. Lecțiile și grădinile existente rămân disponibile pentru clasă.

### Biblioteca etapelor individuale

Biblioteca originală cu șapte categorii rămâne în instrumentele adultului. Numerotarea ei este separată de cele 12 activități din planul de 90 de minute; variantele și provocările sunt accesibile și din bara principală.

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

La clasă, limita este de 8 pași pe 3×3, 16 pe 4×4 și 32 pe 5×5. Jocul liber și aventurile de acasă permit 32 de pași. Fiecare comandă dintr-o repetiție sau rețetă intră în limită. Blocul decizional numără un pas atât la DA, cât și la NU.

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

Repetiția grupează una sau două comenzi simple, de 2 sau 3 ori. În grădină grupăm două comenzi; aventura introductivă începe cu una. Nu există repetiții imbricate. Programul evidențiază comanda curentă și fiecare repetare făcută. „Desfă în comenzi” permite repararea restului, inclusiv după oprirea în mijlocul unui bloc. Rezolvările fără blocuri sunt acceptate.

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

Aplicația nu are nevoie de servicii externe la rulare. Biblioteca jsPDF pentru diplomă este inclusă local, cu licența sa. Pentru teste:

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
- `adventures.js`: cele șase misiuni pentru acasă și aventurile opționale.
- `diploma.js`: previzualizarea și generarea PDF în browser, fără salvarea numelui.
- `game-engine.js`: mișcarea, regulile, rezolvarea și generarea hărților.
- `robo-audio.js`: efecte audio offline.
- `tests/`: teste pentru motor, curriculum, interfață și sunet.
- `BACKLOG.md`: implementări și taskuri viitoare.
- `assets/`, `materiale/`: ilustrația și materialele originale.

Robotul animat este desenat local în SVG. Ilustrația originală a fost generată din descrierea unui robot explorator turcoaz și crem, pe o insulă luminoasă lângă un cufăr auriu.
