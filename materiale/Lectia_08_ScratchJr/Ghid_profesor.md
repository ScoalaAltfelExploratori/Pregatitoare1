# Lecția 8 Statuile fermecate

50 de minute, copii de 6-7 ani. Trei misiuni, inclusiv un puzzle dificil pentru toți, plus două rezerve suplimentare. Copiii construiesc artiști care se transformă continuu și inventează comenzi pentru a-i îngheța și reporni.

## Ideea nouă: continuă până primește alt semnal

Introducem **Repetă la nesfârșit / Repeat Forever**, blocul roșu cu săgeată circulară, și **Oprește / Stop**, blocul portocaliu. Forever se pune la sfârșitul programului și reia acțiunile acelui program. Repeat cu număr are un sfârșit; Forever continuă până este oprit. Nu punem alte acțiuni după blocul roșu.

Blocul portocaliu Stop întrerupe celelalte programe active ale personajului care îl execută. Nu oprește automat toate personajele. Îl punem într-un program separat, pornit la atingere sau la mesaj. Blocul roșu End nu înlocuiește Stop. Butonul roșu din bara aplicației oprește tot proiectul și rămâne disponibil profesorului.

**Înghețare nu înseamnă reluare din același punct.** La o nouă pornire, rutina începe de la primul bloc. Folosim Mărime inițială la început, astfel încât fiecare repornire să aibă un început clar, chiar după o oprire în mijlocul transformării.

## Pregătire numai cu resurse incluse

Proiect nou: **Park, Rabbit și Dog** din biblioteca instalată. Iepurele în stânga, câinele în dreapta, la mărimile inițiale, cu spațiu între ei. Pozițiile exacte și grila nu sunt necesare. Personajele nu merg și nu se ciocnesc; doar dimensiunile se schimbă.

La M3 adăugăm **Butterfly** sus în stânga pentru Pornire și **Ball** sus în dreapta pentru Înghețare. Nu le micșorăm: trebuie să fie ușor de atins. Folosim toate cele patru personaje pe o singură pagină, fără sunete, texte, înregistrări, importuri sau fișiere copiate pe tablete.

## Demonstrație scurtă

Iepure: steag → mărime inițială → mărește 4 → așteaptă 10 → micșorează 4 → așteaptă 10 → Forever. Arătăm cel puțin trei runde: dimensiunea mare nu crește de la o rundă la alta. Așteaptă 10 înseamnă aproximativ o secundă de pauză.

Separat, pe același iepure: atingere → Stop portocaliu. Atingem personajul pe scenă; rămâne în starea din momentul opririi. Steagul repornește rutina de la început. Miniatura din stânga este pentru editare, nu pentru probă. Nu folosim Reset între cele două rulări; programul însuși își pregătește mărimea.

<!-- pagebreak -->

## Cele 50 de minute

| Minute | Activitate | Ce urmărim |
| --- | --- | --- |
| 0-6 | Demonstrație | Repetare continuă, înghețare, repornire. |
| 6-11 | Scena | Iepure și câine, separați și vizibili. |
| 11-20 | Misiunea 1 | Trei runde fără acumularea mărimii. |
| 20-29 | Misiunea 2 | Fiecare artist poate fi oprit separat. |
| 29-32 | Pauză | Joc de statui, cu tabletele jos. |
| 32-45 | Puzzle dificil | Două butoane controlează ambii artiști. |
| 45-50 | Explic și salvez | Pornire-oprire de două ori, galerie și redeschidere. |

Rezervele de 6-8 și 8-10 minute sunt în plus. Păstrăm puzzle-ul dificil pentru toți, cu indicii. Dacă adăugarea butoanelor durează, o demonstrăm pentru întreaga clasă. Copiii construiesc pentru ținte, fără copierea unor greșeli impuse.

## Misiunea 1 Artistul neobosit

**Ținta:** după steag, iepurele alternează mare-normal, cu o pauză la fiecare mărime, fără să se oprească singur. Câinele rămâne nemișcat. După trei runde, mărimea mare trebuie să fie aceeași ca în prima rundă.

**Soluție:** steag → mărime inițială → mărește 4 → așteaptă 10 → micșorează 4 → așteaptă 10 → Forever. Câinele nu are program. Copiii văd ținta și aleg blocurile deja cunoscute; profesorul demonstrează atașarea noului bloc roșu.

**Verificare:** observăm trei runde. Folosim butonul general de oprire din bara aplicației pentru a încheia proba, apoi steagul pentru o nouă probă. La M2 construim propriul mod de oprire.

**Indicii:** „Ce trebuie să revină la fiecare rundă?”, „Cum faci să vezi starea mare o clipă?”, „De unde începe următoarea rundă?”. Forever reia tot programul de după pornire; nu are număr de runde.

## Misiunea 2 Fiecare cu pauza lui

**Ținta:** steagul pornește doi artiști. Iepurele alternează mare-normal; câinele mic-normal. Atingem iepurele: îngheață, iar câinele continuă. Atingem câinele: îngheață și el. Un nou steag repornește amândoi.

- Iepurele păstrează rutina M1 și primește separat: atingere → Stop portocaliu.
- Câine: steag → mărime inițială → micșorează 4 → așteaptă 10 → mărește 4 → așteaptă 10 → Forever.
- Câinele primește separat: atingere → Stop portocaliu.

**Verificare:** după atingerea iepurelui așteptăm încă o rundă a câinelui. După atingerea câinelui, amândoi rămân înghețați. Repetăm fără Reset. **Indiciu:** „Pe ce personaj trebuie să fie Stop ca să îl oprești numai pe el?”.

<!-- pagebreak -->

## Misiunea 3 Regizorul statuilor

**Puzzle dificil pentru toți:** fluturele pornește ambii artiști; mingea îi îngheață pe amândoi. Repetăm **fluture → minge → fluture → minge**, folosind numai personajele de pe scenă. Artiștii reîncep de la mărimea inițială. Nu apăsăm Reset sau butonul general de oprire în timpul probei.

**Trecere:** păstrăm rutinele M2. Înlocuim steagul fiecărui artist cu La mesaj portocaliu. Înlocuim pornirea La atingere a fiecărui Stop cu La mesaj albastru. Nu lăsăm programele vechi în paralel. Adăugăm Butterfly și Ball, separat de artiști.

| Personaj | Program |
| --- | --- |
| Fluture | Atingere → trimite portocaliu. |
| Minge | Atingere → trimite albastru. |
| Iepure, rutina | La portocaliu → mărime inițială → mărește 4 → așteaptă 10 → micșorează 4 → așteaptă 10 → Forever. |
| Câine, rutina | La portocaliu → mărime inițială → micșorează 4 → așteaptă 10 → mărește 4 → așteaptă 10 → Forever. |
| Fiecare artist, separat | La albastru → Stop portocaliu. |

**Ce este dificil:** un mesaj pornește două rutine continue, iar alt mesaj le întrerupe. Fiecare artist trebuie să primească ambele comenzi. Butonul-minge trimite mesajul; Stop trebuie să fie pe artiști, pentru că fiecare personaj își oprește propriile programe.

**Indicii progresive:** „Fă întâi fluturele să pornească numai iepurele”, „Cine mai ascultă același plic?”, „Unde trebuie să ajungă comanda de înghețare?”, „Cine are nevoie de Stop?”, „Ce pregătește mărimea la o nouă pornire?”.

**Verificare:** două secvențe complete pornire-înghețare. La înghețare așteptăm două secunde: nimeni nu își continuă transformarea. Atingerea directă a artiștilor nu îi oprește în acest model. Folosim câte un tap clar și așteptăm înghețarea înainte de repornire.

Copiii pot alege pauze mai lungi sau alt număr moderat, egal în cele două blocuri de mărire/micșorare. Păstrăm mărimea inițială la începutul rutinei. Nu cerem ca artiștii să înghețe la aceeași dimensiune sau în aceeași fază.

## Rezervă 1 Trei ipostaze

**6-8 minute în plus.** Iepurele trece repetat prin normal, mare, mic, cu pauze vizibile. Partenerul alege ipostaza mare; copilul încearcă să îl înghețe în acea stare. Un nou steag permite încă o încercare. Câinele și butoanele nu au programe în această probă; se pot elimina butoanele.

**Soluție:** steag → mărime inițială → așteaptă 20 → mărește 4 → așteaptă 20 → micșorează 8 → așteaptă 20 → Forever. Separat: atingere → Stop.

**Indiciu:** „Ce trei stări trebuie să vedem?”, „Ce pauză îți dă timp să atingi?”. Dacă este dificil, mărim pauzele la 30. Copiii pot alege apoi altă stare-țintă; nu evaluăm rapiditatea degetului.

<!-- pagebreak -->

## Rezervă 2 Cortina automată

**8-10 minute în plus.** Un singur tap pe fluture pornește ambii artiști. Mingea devine cronometru și trimite singură comanda de înghețare după o pauză. Totul rămâne oprit până la următorul tap pe fluture.

**Pornim de la M3.** Schimbăm numai mingea: La mesaj portocaliu înlocuiește atingerea; adăugăm Așteaptă 50 înainte de plicul albastru.

- Fluture: atingere → trimite portocaliu.
- Iepure și câine: rutinele la portocaliu și Stop la albastru, ca la M3.
- Minge: la portocaliu → așteaptă 50 → trimite albastru.

**Mingea cronometrează în paralel.** Portocaliul pornește trei destinatari: doi artiști și cronometru. Expeditorul unui mesaj așteaptă terminarea programelor pornite de el; de aceea cronometrul este într-un program separat.

**Verificare:** un tap, transformări, înghețare automată; așteptăm încă două secunde. Repetăm fără Reset. 50 înseamnă aproximativ cinci secunde de pauză, nu 50 de secunde sau un număr de runde. Așteptăm înghețarea înainte de repornire.

**Indicii:** „Cine numără în timp ce artiștii lucrează?”, „Ce mesaj îi pornește pe toți trei?”. Copiii pot schimba durata și anticipa rezultatul.

## Dificultăți și sprijin

| Ce observăm | Cum ajutăm |
| --- | --- |
| Se oprește după o rundă | Verificăm Forever roșu, conectat la sfârșit. |
| Devine tot mai mare sau mai mic | Mărimea inițială readuce reperul în fiecare rundă. |
| Atingerea nu îngheață | Blocurile sunt conectate, nu doar suprapuse. Stop este separat, pe artist. La M3 folosim mingea. |
| Mingea nu oprește artiștii | Comparăm plicurile albastre; fiecare artist are La albastru → Stop. |
| Se oprește numai un artist | Adăugăm receptorul albastru și celuilalt. |
| Cronometrul nu încheie show-ul | Mingea are propriul program La portocaliu → Așteaptă → trimite albastru. |

## Încheiere și verificare

Copilul explică „de trei ori” și „până îl opresc”. Un coleg încearcă butoanele. Oprim înainte de editare sau ieșire. Salvăm prin galerie, redeschidem și probăm.

Raport: verificare/README.md. Înainte de clasă reconstruim M2 și M3 pe Lenovo: înghețare, două reporniri, salvare/redeschidere offline. Browserul nu verifică tableta fizică.

**Referințe:** [ghidul de referință ScratchJr](https://scratched.gse.harvard.edu/sites/default/files/scratchjr-reference-page.pdf) și [blocurile oficiale](https://www.scratchjr.org/explore/blocks).
