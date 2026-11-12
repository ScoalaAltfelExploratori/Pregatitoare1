# Lecția 2 - Provocările iepurașului

50 de minute pentru copii de 6-7 ani. Ideea nouă: **Repeat repetă un grup de acțiuni, în aceeași ordine**. Copiii construiesc trei proiecte succesive în aceeași scenă: patrulare, deplasare la țintă și o expediție dus-întors.

## Pregătirea profesorului

Instalarea existentă de ScratchJr este suficientă. Folosim Rabbit, Ball și Park din biblioteca aplicației. Copiii nu importă proiecte, nu descarcă resurse și nu au nevoie de conturi ScratchJr. Fișierele SJR din pachet sunt exclusiv exemple opționale pentru profesor.

Pe dispozitivul tău, probează introducerea acțiunilor în Repeat, schimbarea numărului și conectarea a două bucle una după alta. Consultă verificare/README.md pentru testele efective; verifică separat gesturile tactile și salvarea pe un Lenovo K10.

Pregătește cartonașele, proiecția aplicației și repartizarea tabletelor. Copiii primesc ținta și constrângerile. Arată mecanismul nou, apoi lasă-i să aleagă și să construiască. Nu cerem să copieze programe greșite; îi ajutăm cu nepotrivirile care apar în propriile creații.

## Scena construită de copii

Varianta care păstrează lecția 1: creează un proiect nou din galerie. Adaugă iepurele maro Rabbit și mingea dungată Ball din + al listei din stânga; elimină personajul inițial ținând apăsat și folosind X. Alege Park din pictograma peisajului. Fundalul alb este acceptabil dacă selectarea durează prea mult. Păstrează dimensiunile inițiale.

Poți continua scena lecției 1 dacă nu este necesar să păstrați programul vechi. În acest caz, desprinde șirul vechi de la primul bloc și trage-l în paletă pentru a-l elimina. Fă asta la ambele personaje. Verifică să nu rămână un al doilea program ascuns. Mingea trebuie să fie fără blocuri în toată lecția 2.

Activează grila din bara de sus. Selectează iepurele și urmărește numerele evidențiate: **5 jos și 7 în stânga**. Selectează mingea: **11 jos și 3 în stânga**. Numerele rândurilor cresc de jos în sus. Urmărim indicatorul personajului selectat, nu vârful urechilor sau botul. Profesorul poate ajuta la poziționare.

| Element | Poziția în modelul profesorului |
| --- | --- |
| Rabbit, toate misiunile | Grila afișată: (5, 7). Intern: x=96, y=192 |
| Ball, misiunile 1 și 2 | Grila afișată: (11, 3). Intern: x=240, y=288 |
| Ball, misiunea dificilă | Grila afișată: (13, 3). Intern: x=288, y=288 |

Mingea marchează **coloana destinației**. Iepurele trece deasupra ei; nu trebuie să o atingă și nu folosim blocul de coliziune. Între coloanele afișate 5 și 11 sunt șase pași, iar între 5 și 13 sunt opt. Numărăm spațiile parcurse, fără a număra startul ca pas. Coordonatele interne sunt numai pentru profesor și nu sunt numerele de pe grila afișată. Pentru copii acceptăm alinierea pe aceeași coloană, fără precizie la pixel.

## Cele 50 de minute

| Minute | Activitate | Acțiunea profesorului |
| --- | --- | --- |
| 0-7 | Scena și exemplul | Iepure, reper fix și săritura repetată. |
| 7-15 | Misiunea 1 | O patrulare, apoi trei ture. |
| 15-23 | Misiunea 2 | Trei deplasări egale până la țintă. |
| 23-26 | Pauză | Mimăm grupul de acțiuni. |
| 26-37 | Puzzle dificil | Dus și întors cu două bucle; indicii pe rând. |
| 37-45 | Creația mea | O patrulă cu reguli alese de copil. |
| 45-50 | Explic și salvez | Arătăm grupul repetat și redeschidem proiectul. |

**Păstrăm timp pentru fiecare:** oferim tuturor încercarea puzzle-ului dificil și indicii progresive. Dacă lucrul merge mai lent, construim M2 împreună și simplificăm pregătirea scenei; nu luăm minutele atelierului sau ale salvării. La ora atelierului, copilul personalizează ultima variantă care funcționează. Rezervele și soluțiile lor rămân suplimentare, după o alegere personală sau într-o întâlnire următoare; nu sunt obligații pentru toată clasa.

## Exemplu oficial adaptat: O săritură, de mai multe ori

**Reper:** [Dribble a Basketball](https://www.scratchjr.org/teach/activities/dribble-a-basketball). Preluăm ideea repetării săriturii din exemplul cu mingea. În demonstrația noastră sare iepurele, iar mingea rămâne reper fix, ca în misiuni. Întâi rulează o singură săritură; apoi încadreaz-o în Repeat.

**Model pentru demonstrație:** Rabbit: steag → Repeat 2 [sari 2]. Mingea nu are program. Arată diferența dintre numărul repetărilor și înălțimea saltului. Acesta este și modelul din 00_Demo_Repeat.sjr.

**Întreabă înainte de rulare:** „Ce număr schimb pentru trei sărituri, fără să sar mai sus? Lasă un copil să arate numărul înainte să rulezi.”

Exemplul este inclus în timpul de demonstrație sau în introducerea misiunii indicate; nu este o misiune suplimentară. Profesorul îl pregătește în ScratchJr, folosind biblioteca instalată. Copiii construiesc propriile proiecte; nu au fișiere de importat și nu trebuie să deschidă site-ul oficial în timpul lecției.

## Demonstrația noului mecanism

1. Selectează iepurele. Din categoria galbenă, trage steagul verde în zona de programare.
2. Deschide categoria portocalie Control. Alege Repeat, blocul în formă de cadru cu număr; nu alege blocul roșu de repetare fără sfârșit.
3. Conectează Repeat după steag. Din categoria albastră, trage o săritură în interiorul cadrului. Verifică să fie cuprinsă în buclă, nu atașată după ea.
4. Atinge numărul buclei și pune 2. Lasă săritura la înălțimea 2. Rulează: iepurele sare de două ori.
5. Arată cele două numere: Repeat 2 numără repetările; Sari 2 stabilește înălțimea unei singure sărituri. Numărul unei săgeți stabilește distanța.

Exemplul demonstrativ este în proiecte/00_Demo_Repeat.sjr. Arată plasarea blocurilor în cadru și schimbarea numărului, fără să dezvălui toate soluțiile misiunilor.

Pentru introducerea mai multor acțiuni, conectează-le una după alta în interiorul cadrului portocaliu. Cadrul se lărgește. Copilul trebuie să poată arăta cu degetul exact ce grup se repetă.

## Rutina de lucru

Spunem ce vrem să se întâmple, construim, anticipăm rezultatul, resetăm pozițiile și apăsăm steagul verde. Apoi verificăm ținta și explicăm o alegere. O nepotrivire este un motiv să încercăm o ajustare, nu un exercițiu separat de copiere a unei greșeli.

Resetarea se folosește **înaintea unei probe complete**. În misiunea dificilă, întoarcerea trebuie produsă de program, fără resetare sau tragerea personajului în timpul rulării. Nu modifica startul iepurelui între misiuni; mutăm numai mingea la ultima provocare.

## Misiunea 1 - Trei patrulări

**Citește copiilor:** „Iepurașul merge la dreapta, sare și se întoarce la locul de unde a pornit. Fă această patrulare de trei ori, cu un singur Repeat.”

Copilul construiește o singură patrulare în interiorul buclei. El poate alege o distanță mică, dacă există loc pe scenă. Pentru model folosim doi pași. Nu sunt necesare trei copii ale grupului de mișcări.

**Soluția profesorului:** steag verde; Repeat 3 cu [dreapta 2, sari 2, stânga 2] în interior.

**Reușită:** trei sărituri, revenire după fiecare patrulare și terminare la start. Copilul arată cele trei acțiuni care se repetă. Mingea rămâne pe loc.

**Indicii progresive:** „Ce trebuie să facă o singură dată?”; „Cum revine de unde a plecat?”; „Ce acțiuni trebuie să fie în cadru?”. Dacă este nevoie, construim împreună o patrulare, apoi copilul o repetă.

## Misiunea 2 - Șase pătrățele până la țintă

**Citește copiilor:** „Mingea arată ținta, la șase pătrățele spre dreapta. Ajungi deasupra ei în trei deplasări egale și sari după fiecare. Folosește Repeat.”

Numărați împreună cele șase spații dintre start și coloana mingii. Mingea este mai jos, deci nu acoperă iepurele. Copilul construiește o buclă cu deplasare și săritură; poate adapta programul propriu din misiunea 1. Revenirea din fiecare patrulare nu mai face parte din noua țintă.

**Soluția profesorului:** steag verde; Repeat 3 cu [dreapta 2, sari 2] în interior. Iepurele se oprește la x=240, y=192, deasupra mingii.

**Reușită:** trei deplasări egale, trei sărituri și oprire pe coloana țintei. Toate deplasările și săriturile fac parte din buclă. Nu este suficient să ajungă la țintă printr-o singură deplasare de șase pași.

**Indicii progresive:** arată cele trei opriri posibile; numărați pașii cu degetul; întreabă „Ce distanță ai putea parcurge de fiecare dată?”. Numărarea și încercările sunt suficiente; nu cerem împărțire scrisă.

## Cum sprijinim creația

Profesorul circulă și cere copilului să arate ținta, programul și rezultatul. Întrebările sunt scurte: „Ce ai vrut?”, „Ce a făcut?”, „Ce ai încerca acum?”. Colegul poate explica, dar copilul păstrează controlul tabletei.

Acceptăm programe echivalente care respectă constrângerile. Alegerea altui fundal nu înlocuiește construcția comportamentului. Nu impunem viteză și nu folosim clasamente.

## Misiunea 3 - Expediția dus-întors

**Exercițiul dificil este inclus pentru toată clasa.** Mută mingea două pătrățele spre dreapta, pe coloana afișată 13, rândul 3. Iepurele rămâne la start, pe coloana afișată 5, rândul 7.

**Citește copiilor:** „Ținta este acum la opt pătrățele. Ajungi acolo în patru deplasări egale, cu o săritură după fiecare. Apoi un al doilea Repeat te aduce înapoi. Un singur steag pornește toată expediția.”

Copiii pot adapta programul lor din misiunea 2. Construiesc a doua buclă după prima, nu în interiorul ei. Noul grup de întoarcere folosește mișcări cunoscute; nu introducem un mecanism nou.

**Soluția profesorului:** steag verde; Repeat 4 cu [dreapta 2, sari 2]; apoi Repeat 4 cu [stânga 2]. Cele două cadre sunt conectate unul după celălalt. Săriturile la întoarcere sunt o alegere acceptată, dar nu sunt obligatorii.

**Reușită:** patru sărituri la dus; ajunge pe coloana mingii, la x=288; a doua buclă îl aduce la x=96. Totul se întâmplă după o singură pornire, fără resetare, tras de personaj sau încă un steag. Mingea rămâne nemișcată.

**Indiciul 1:** „Construiește mai întâi numai drumul până la țintă.” **Indiciul 2:** „În ce direcție este startul acum?” **Indiciul 3:** „Poți repeta și mișcarea de întoarcere într-un al doilea cadru?”. Oferă un singur indiciu, apoi lasă timp de lucru.

Pentru cei care termină: păstrează rezultatul și fă doar două deplasări egale la întoarcere, tot într-un al doilea Repeat. Profesorul poate verifica Repeat 2 cu stânga 4; aceasta este o extensie, nu o a patra misiune obligatorie.

## Creația mea: Patrula mea

**Minutele 37-45: 8 minute pentru fiecare copil.** Acest timp este inclus în cele 50 de minute și nu depinde de terminarea puzzle-ului dificil. Copilul continuă cea mai avansată variantă care îi funcționează, chiar dacă este numai M1. Nu trebuie să înceapă alt proiect.

**Spune copiilor:** „Inventează un grup de două sau trei acțiuni și repetă-l de două, trei sau patru ori. Alege o distanță mică, cu loc pe scenă. Decide dacă patrula revine după fiecare tur sau înaintează spre o destinație aleasă de tine.”

**Verificarea autorului:** Spune înainte unde crezi că se oprește. Rulează și arată exact grupul repetat. Mingea poate marca destinația aleasă, dar rămâne fără program.

**Sprijin și extensie:** Pleacă de la o patrulare reușită din M1 și schimbă înălțimea saltului și numărul turelor. Pentru mai multă dificultate, revino la start printr-o a doua buclă diferită.

Profesorul cere o alegere de comportament sau de regulă; schimbarea decorului poate însoți acea alegere. Nu proiectează o soluție de copiat pentru acest atelier. Soluțiile puzzle-urilor rămân reperele profesorului; creația personală poate avea mai multe rezultate corecte.

**Ce urmăresc la încheiere:** Copilul deosebește numărul de ture de numărul de pași sau de înălțimea saltului.

## Dificultăți și sprijin

| Ce observăm | Cum ajutăm |
| --- | --- |
| Sare o singură dată | Verificăm dacă săritura este în cadrul Repeat. |
| Se repetă numai o parte | Copilul arată toate blocurile cuprinse în cadru. |
| Mingea se mișcă | Selectăm mingea și eliminăm programul rămas din lecția 1. |
| Oprirea nu coincide cu reperul | Verificăm centrele și numărarea spațiilor pe grilă înainte de a schimba programul. |
| Întoarcerea începe prea devreme | Verificăm că al doilea Repeat este după primul, nu în interiorul lui. |
| Obosește la provocarea dificilă | Recunoaștem drumul dus reușit și construim revenirea cu indicii. |

## Încheiere și referințe

Fiecare arată unui coleg grupul repetat și numărul de repetări. Revenim la galerie, denumim opțional „L02 Iepuraș” și redeschidem. Notăm nivelul de sprijin în Observatii_dupa_lectie.md. La următoarea lecție păstrăm aceeași tabletă.

Repere: [interfața oficială](https://sites.bc.edu/scratchjr/learn/), [blocurile ScratchJr](https://www.scratchjr.org/explore/blocks) și [salvarea proiectelor](https://mitscratch.freshdesk.com/en/support/solutions/articles/4000211814-how-can-i-save-or-export-my-project-on-scratchjr-). Testele browserului comunitar sunt separate de proba fizică pe Lenovo.

**Surse și adaptări:** [reperele oficiale și creditele cursului](../Surse_oficiale_ScratchJr.md). Exemplele sunt adaptări pentru acest curs, nu traduceri oficiale.
