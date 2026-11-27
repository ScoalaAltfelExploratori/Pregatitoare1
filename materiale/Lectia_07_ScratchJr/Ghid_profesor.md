# Lecția 7 - Fabrica de roboți: construim un rover

**60 de minute · 6-7 ani · părțile grele în bază · 10 minute de creație · două rezerve.**

[Plan și programe cu capturi](Ghid_profesor_Lectia_07.pdf) · [Starter fără cod](solutii_fabrica/start.sjr) · [Soluțiile profesorului](solutii_fabrica/README.md)

## Locul lecției în curs

**Reluăm:** Din atelier: mai multe personaje răspund aceluiași mesaj și operația trebuie încheiată.

**Ce adăugăm:** Comparăm montajul în paralel cu montajul pe rând; piesele devin un ansamblu complet.

**Verificăm înțelegerea:** Farul începe numai după ambele roți, inclusiv cea lentă; roverul pleacă după probă.

**Cum păstrăm ritmul:** Ideea de așteptare nu este complet nouă. O facem explicită cu două trasee și două viteze. Piesele nu se lipesc automat: explicăm înlocuirea lor cu imaginea roverului complet.

Pentru un fir deja înțeles: prinde-l de primul bloc și trage-l peste miniatura personajului destinatar din lista din stânga. Selectează destinatarul și verifică acea copie. Firele rămân independente; schimbă numai culoarea, distanța sau întârzierea cerută. Dacă firul dispare din greșeală, folosește Undo. [Reper oficial](https://sites.bc.edu/scratchjr/learn/).

[Progresia celor zece lecții](../Progresia_cursului.md).
## Povestea pentru copii

„Fabrica a primit o comandă: un rover care va transporta piese în atelier. Deocamdată avem șasiul și două roți separate. Programăm instalația să le monteze, să verifice farul și să trimită roverul la lucru. Dacă o roată se montează mai încet, roverul trebuie să o aștepte.”

Ideea nouă este **asamblarea în paralel**: aceeași comandă pornește două operații diferite, iar pasul următor așteaptă ambele rezultate. În rezervă comparăm cu montajul pe rând.

## Înainte de oră

1. Importă [start.sjr](solutii_fabrica/start.sjr) pe fiecare tabletă. Titlul este **L07 Fabrica de roboți - de la zero · v1.0**. Include fundalul și toate personajele, fără programe. Nu copia imagini separat.
2. Pe laptop: [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/app/home.html), **Open** în galerie, alegi SJR-ul, apoi deschizi cardul. Pe Lenovo, încearcă deschiderea fișierului din Descărcări cu ScratchJr, dacă aplicația este oferită; verifică importul, salvarea și redeschiderea pe configurația școlii înainte de distribuire.
3. Pe tabletă sunt necesare doar starterul și aplicația. Copiii construiesc treptat în același proiect. M1-M3, creația și rezervele sunt soluții separate pentru profesor și pentru ajutor. PDF-ul include și programele păstrate neschimbate.
4. Păstrează pozițiile și mărimile. Pornește grila; un pas este un pătrățel. Verifică volumul dacă folosești Pop la creație. Nu sunt necesare descărcări în timpul orei.

## 0-6 minute - citim fabrica

Arată cele șapte personaje din listă: Robot industrial, Șasiu, Roata stângă, Roata dreaptă, Rover complet, Far și Banc de probă. **Rover complet și Far sunt ascunse inițial**, dar pot fi selectate din listă. Banc de probă rămâne fără cod.

Robotul industrial reprezintă controlerul instalației. Brațul lui nu este animat; comenzile lui pun în mișcare piesele. Montăm șasiul și roțile prin trasee programate. După montaj, ascundem piesele și arătăm un personaj nou, Rover complet, în exact aceeași poziție. ScratchJr nu le grupează și nu verifică automat dacă sunt montate corect. Copiii verifică vizual alinierea.

**Înaintea fiecărei probe:** Stop dacă rulează, Reset Characters, apoi un singur steag. Blocul albastru „La poziția inițială” are săgeată curbată și X. Arată și Ascunde sunt în categoria mov.

| Mesaj | Destinatar | Rol |
| --- | --- | --- |
| Portocaliu | Șasiu | Coboară pe banc |
| Albastru | Ambele roți | Pornește montajul în paralel |
| Galben | Far | Proba luminii |
| Verde | Șasiu, ambele roți, Rover complet | Ascunde piesele, arată roverul |
| Roșu | Rover complet | Pornește deplasarea |
| Mov, numai R1 | Roata dreaptă | Montează a doua roată pe rând |

Plic închis = Trimite; plic deschis = Primește. Alege culoarea din săgeata de sub plic. **Trimite așteaptă terminarea tuturor programelor pornite de acel mesaj.** Folosim bucle finite; un destinatar cu Repetă mereu nu ar termina operația.

## 6-18 minute - M1. Șasiul

**Țintă:** șasiul coboară 5 pași până la banc; abia atunci robotul spune „Șasiu montat!”. Roțile stau.

Copiii construiesc întâi firul de resetare al șasiului: Steag, La poziția inițială, Arată. Separat: Primește portocaliu, Jos 5. Robotul trimite portocaliu și apoi vorbește. La fiecare roată pregătesc firul Steag, La poziția inițială, Arată, util pentru probele următoare.

**Întrebare:** „Cine decide când coboară șasiul? De ce replica vine după coborâre?” Dacă nu se mișcă, verifică perechea de plicuri portocalii și faptul că blocurile sunt conectate.

## 18-32 minute - M2. Roțile în paralel

**Țintă:** șasiul este deja pe banc când ambele roți pornesc. Roata stângă merge Dreapta 5, Sus 2; cea dreaptă Stânga 3, Sus 2. Ambele au viteză normală.

La robot, după portocaliu adaugă Trimite albastru; schimbă replica în „Roți montate!”. La ambele roți adaugă un fir nou cu Primește albastru, Viteză normală și traseul propriu. Nu șterge firele cu Steag. „Stângă” și „dreaptă” sunt numele pieselor; săgeata primei roți indică dreapta, spre centrul roverului.

**Probă:** pornesc împreună, dar nu trebuie să termine simultan. Copiii urmăresc dacă fiecare ajunge la butucul potrivit. Două mâini pot mima operațiile înainte de rulare.

## 32-47 minute - M3. Roverul complet | dificil, pentru toți

**Țintă:** un steag execută șasiul, montajul roților, două clipiri, apariția roverului complet și plecarea cu 3 pași. Roata dreaptă este lentă. Nici lumina, nici plecarea nu trebuie să înceapă prea devreme.

1. La roata dreaptă schimbă Viteză normală în **lentă**. Păstrează traseul.
2. La Far: Steag, Ascunde. Separat: Primește galben, Repetă 2 { Arată, Așteaptă 5, Ascunde, Așteaptă 5 }. Ambele pauze sunt în ramă. Așteaptă 5 este aproximativ o jumătate de secundă.
3. La Șasiu și la FIECARE roată: un al treilea fir, Primește verde, Ascunde.
4. La Rover complet: Steag, La poziția inițială, Ascunde. Separat: Primește verde, Arată. Separat: Primește roșu, Dreapta 3.
5. Robotul are un singur fir: Steag, portocaliu, albastru, galben, verde, roșu, Spune Gata! Înlocuiește replica din M2, nu lăsa două fire de comandă concurente.

**Indicii progresive:** „Cine termină ultimul?” → „Ce trebuie să fie gata înaintea luminii?” → „Pune galben imediat după albastru; Trimite așteaptă ambele roți.”

**Verificăm:** dreapta termină ultima; farul clipește de două ori; piesele dispar exact când apare desenul complet; roverul se deplasează cu toate roțile lui. Dacă o piesă rămâne în urmă, verifică firul ei verde. Dacă farul rămâne aprins, verifică Ascunde din buclă. Așezarea finală este o condiție verificată de copil, fără senzor automat.

## 47-57 minute - Proba mea

Fiecare copil inventează altă probă a farului: 1-4 clipiri, alte pauze sau Pop. Păstrează montajul complet, farul stins la sfârșit și plecarea după probă. Copilul prezice numărul clipirilor, pornește o dată și compară.

Exemplul oferit: trei clipiri, fiecare cu Pop, Arată, Așteaptă 3, Ascunde, Așteaptă 7. Toate celelalte programe rămân ca la M3. Exemplul nu este singura soluție.

## 57-60 minute - probă și salvare

Un singur steag și așteptăm „Gata!”. Copilul arată blocul care pornește ambele roți și explică de ce cea lentă nu este abandonată. Resetăm, revenim în galerie și redeschidem proiectul. Nu salvăm numai captura: păstrăm proiectul editabil.

## Rezerva 1 - Montaj pe rând | +5-8 minute

Pornim de la M3. Fabrica poate monta acum o singură roată la un moment dat. Stânga se montează complet, apoi dreapta; proba și plecarea vin după ambele.

La roata dreaptă înlocuiește declanșatorul albastru cu mov. La robot adaugă Trimite mov între albastru și galben. Nu schimba verdele. Compară două rulări: ce operații se suprapuneau în M3 și ce operații nu se mai suprapun aici?

## Rezerva 2 - Două probe, o plecare | +8-10 minute

Pornim separat de la M3, cu roțile în paralel. După montaj, roverul merge 2 pași la dreapta, revine 2 și își verifică farul. Repetă această probă de două ori. La final merge 3 pași la dreapta, o singură dată.

Schimbă numai firul roșu al roverului: Repetă 2 { Dreapta 2, Stânga 2, Trimite galben }, apoi Dreapta 3. **Plecarea stă în afara buclei.** Farul rămâne pe banc, deci îl aprindem numai după întoarcere. Vedem șase clipiri: două inițiale și câte două la fiecare probă.

## Programele complete, etapă cu etapă

Fiecare rând este un fir separat. Acoladele arată interiorul blocului Repetă. Un program nou se adaugă separat, nu se conectează sub declanșatorul altui fir. PDF-ul arată aceleași programe în capturi din aplicație.

### 1. Șasiul

| Personaj | Program complet |
| --- | --- |
| Banc de probă | Fără program |
| Robot industrial | Steag → Trimite portocaliu → Spune Șasiu montat! |
| Șasiu | Steag → La poziția inițială → Arată |
| Șasiu | Primește portocaliu → Jos 5 |
| Roata stângă | Steag → La poziția inițială → Arată |
| Roata dreaptă | Steag → La poziția inițială → Arată |
| Rover complet | Fără program · ascuns |
| Far | Fără program · ascuns |

### 2. Roțile în paralel

| Personaj | Program complet |
| --- | --- |
| Banc de probă | Fără program |
| Robot industrial | Steag → Trimite portocaliu → Trimite albastru → Spune Roți montate! |
| Șasiu | Steag → La poziția inițială → Arată |
| Șasiu | Primește portocaliu → Jos 5 |
| Roata stângă | Steag → La poziția inițială → Arată |
| Roata stângă | Primește albastru → Viteză normală → Dreapta 5 → Sus 2 |
| Roata dreaptă | Steag → La poziția inițială → Arată |
| Roata dreaptă | Primește albastru → Viteză normală → Stânga 3 → Sus 2 |
| Rover complet | Fără program · ascuns |
| Far | Fără program · ascuns |

### 3. Roverul complet

| Personaj | Program complet |
| --- | --- |
| Banc de probă | Fără program |
| Robot industrial | Steag → Trimite portocaliu → Trimite albastru → Trimite galben → Trimite verde → Trimite roșu → Spune Gata! |
| Șasiu | Steag → La poziția inițială → Arată |
| Șasiu | Primește portocaliu → Jos 5 |
| Șasiu | Primește verde → Ascunde |
| Roata stângă | Steag → La poziția inițială → Arată |
| Roata stângă | Primește albastru → Viteză normală → Dreapta 5 → Sus 2 |
| Roata stângă | Primește verde → Ascunde |
| Roata dreaptă | Steag → La poziția inițială → Arată |
| Roata dreaptă | Primește albastru → Viteză lentă → Stânga 3 → Sus 2 |
| Roata dreaptă | Primește verde → Ascunde |
| Rover complet | Steag → La poziția inițială → Ascunde |
| Rover complet | Primește verde → Arată |
| Rover complet | Primește roșu → Dreapta 3 |
| Far | Steag → Ascunde |
| Far | Primește galben → Repetă 2 { Arată → Așteaptă 5 → Ascunde → Așteaptă 5 } |

### 4. Proba mea

| Personaj | Program complet |
| --- | --- |
| Banc de probă | Fără program |
| Robot industrial | Steag → Trimite portocaliu → Trimite albastru → Trimite galben → Trimite verde → Trimite roșu → Spune Gata! |
| Șasiu | Steag → La poziția inițială → Arată |
| Șasiu | Primește portocaliu → Jos 5 |
| Șasiu | Primește verde → Ascunde |
| Roata stângă | Steag → La poziția inițială → Arată |
| Roata stângă | Primește albastru → Viteză normală → Dreapta 5 → Sus 2 |
| Roata stângă | Primește verde → Ascunde |
| Roata dreaptă | Steag → La poziția inițială → Arată |
| Roata dreaptă | Primește albastru → Viteză lentă → Stânga 3 → Sus 2 |
| Roata dreaptă | Primește verde → Ascunde |
| Rover complet | Steag → La poziția inițială → Ascunde |
| Rover complet | Primește verde → Arată |
| Rover complet | Primește roșu → Dreapta 3 |
| Far | Steag → Ascunde |
| Far | Primește galben → Repetă 3 { Sunet Pop → Arată → Așteaptă 3 → Ascunde → Așteaptă 7 } |

### R1. Montaj pe rând

| Personaj | Program complet |
| --- | --- |
| Banc de probă | Fără program |
| Robot industrial | Steag → Trimite portocaliu → Trimite albastru → Trimite mov → Trimite galben → Trimite verde → Trimite roșu → Spune Gata! |
| Șasiu | Steag → La poziția inițială → Arată |
| Șasiu | Primește portocaliu → Jos 5 |
| Șasiu | Primește verde → Ascunde |
| Roata stângă | Steag → La poziția inițială → Arată |
| Roata stângă | Primește albastru → Viteză normală → Dreapta 5 → Sus 2 |
| Roata stângă | Primește verde → Ascunde |
| Roata dreaptă | Steag → La poziția inițială → Arată |
| Roata dreaptă | Primește mov → Viteză lentă → Stânga 3 → Sus 2 |
| Roata dreaptă | Primește verde → Ascunde |
| Rover complet | Steag → La poziția inițială → Ascunde |
| Rover complet | Primește verde → Arată |
| Rover complet | Primește roșu → Dreapta 3 |
| Far | Steag → Ascunde |
| Far | Primește galben → Repetă 2 { Arată → Așteaptă 5 → Ascunde → Așteaptă 5 } |

### R2. Două probe, o plecare

| Personaj | Program complet |
| --- | --- |
| Banc de probă | Fără program |
| Robot industrial | Steag → Trimite portocaliu → Trimite albastru → Trimite galben → Trimite verde → Trimite roșu → Spune Gata! |
| Șasiu | Steag → La poziția inițială → Arată |
| Șasiu | Primește portocaliu → Jos 5 |
| Șasiu | Primește verde → Ascunde |
| Roata stângă | Steag → La poziția inițială → Arată |
| Roata stângă | Primește albastru → Viteză normală → Dreapta 5 → Sus 2 |
| Roata stângă | Primește verde → Ascunde |
| Roata dreaptă | Steag → La poziția inițială → Arată |
| Roata dreaptă | Primește albastru → Viteză lentă → Stânga 3 → Sus 2 |
| Roata dreaptă | Primește verde → Ascunde |
| Rover complet | Steag → La poziția inițială → Ascunde |
| Rover complet | Primește verde → Arată |
| Rover complet | Primește roșu → Repetă 2 { Dreapta 2 → Stânga 2 → Trimite galben } → Dreapta 3 |
| Far | Steag → Ascunde |
| Far | Primește galben → Repetă 2 { Arată → Așteaptă 5 → Ascunde → Așteaptă 5 } |

## Materiale și verificare

[Proiectele editabile](solutii_fabrica/README.md) · [PDF, 18 pagini](Ghid_profesor_Lectia_07.pdf) · [Import și instalare](README.md) · [Raportul verificării în browser](verificare/Fabrica_60min.md) · [Resursele](resurse_fabrica/README.md) · [Observații după oră](Observatii_dupa_lectie.md).

[Arhiva de 50 de minute: Povestea cu două finaluri](Ghid_profesor_50min.md).
