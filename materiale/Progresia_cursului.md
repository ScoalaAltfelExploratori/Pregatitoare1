# Parcursul celor zece lecții ScratchJr

**10 întâlniri × 60 de minute · 6-7 ani · puzzle greu în bază · două rezerve la fiecare lecție.**

Copiii cunosc deja secvențele din Robo. Lecția 1 introduce mesajele explicit; experiența cu Robo nu înlocuiește această demonstrație. Lecțiile 1–5 se construiesc din biblioteca instalată. Lecțiile 6–10 au câte un starter cu toate imaginile, importat înaintea orei. Copiii construiesc programele în același proiect.

Dificultatea crește prin relațiile dintre acțiuni: ordine, întrerupere, sincronizare, reacție, stare și resursă limitată. Nu crește obligatoriu numărul de blocuri la fiecare întâlnire. Lecțiile 7 și 9 consolidează mecanisme cunoscute în probleme noi; nu le prezentăm drept descoperirea unor blocuri complet noi.

## Progresia și verificarea înțelegerii

### 1. Cursa cu ștafetă

**Reluăm:** Din Robo: o secvență de mișcări și numărul de pași.

**Pasul următor:** Programe separate și predarea controlului prin mesaje.

**Reușită observabilă:** Mingea ajunge la B înainte să plece B; ocolul este identic la alergător și minge.

**Sprijin:** În M1 lucrăm numai cu două fire Steag. În M2 demonstrăm explicit perechea Trimite/Primește portocaliu înainte să adăugăm albastrul. Mesajele sunt noi, nu presupunem că au fost învățate în Robo.

[Lecția](Lectia_01_ScratchJr/index.html) · [Ghid](Lectia_01_ScratchJr/ghid-profesor.html) · [PDF cu programe](Lectia_01_ScratchJr/Ghid_profesor_Lectia_01.pdf)

### 2. Muzeul după închidere

**Reluăm:** Din ștafetă: fiecare personaj are codul său; plicurile de aceeași culoare lucrează împreună.

**Pasul următor:** Animație continuă, oprirea propriilor fire și reluare după un eveniment.

**Reușită observabilă:** Ambele exponate stau pe tot drumul paznicului și repornesc după revenire.

**Sprijin:** Comparăm Stop din program cu Stop din bara de sus. Repetă mereu este un bloc de final; bucla cu număr va apărea la Lecția 4. Nu punem o continuare după trimiterea care pornește o animație infinită.

[Lecția](Lectia_02_ScratchJr/index.html) · [Ghid](Lectia_02_ScratchJr/ghid-profesor.html) · [PDF cu programe](Lectia_02_ScratchJr/Ghid_profesor_Lectia_02.pdf)

### 3. Autobuzul spre plajă

**Reluăm:** Din muzeu: un eveniment poate porni mai multe personaje; ordinea contează.

**Pasul următor:** Ascunde/Arată și continuarea poveștii pe altă pagină, cu personaje independente.

**Reușită observabilă:** Autobuzul așteaptă toți pasagerii; la destinație copiii apar numai după oprire.

**Sprijin:** Construim întâi cursa cu Ana. Abia după o probă completă adăugăm Dan și Mara; copiem firele comune și schimbăm distanțele. La pagina nouă verificăm separat poziția ușii și starea ascunsă.

[Lecția](Lectia_03_ScratchJr/index.html) · [Ghid](Lectia_03_ScratchJr/ghid-profesor.html) · [PDF cu programe](Lectia_03_ScratchJr/Ghid_profesor_Lectia_03.pdf)

### 4. Repetiția pentru spectacol

**Reluăm:** Din autobuz: continuarea începe după terminarea acțiunii cerute.

**Pasul următor:** Repetarea finită a unui grup și acțiunea executată o singură dată după buclă.

**Reușită observabilă:** Se văd A2, B3, A2, B3, apoi un singur final.

**Sprijin:** Desenăm cu degetul ce intră în ramă și ce rămâne după ea. Numărul de blocuri poate scădea: dificultatea este gruparea și ordinea, nu lungimea programului.

[Lecția](Lectia_04_ScratchJr/index.html) · [Ghid](Lectia_04_ScratchJr/ghid-profesor.html) · [PDF cu programe](Lectia_04_ScratchJr/Ghid_profesor_Lectia_04.pdf)

### 5. Robotul curier

**Reluăm:** Din ștafetă: transport sincronizat; din spectacol: operații care se termină înainte de continuare.

**Pasul următor:** Un ciclu de lucru complet: încărcare, transport, depunere și retur gol, apoi altă livrare.

**Reușită observabilă:** Robotul nu pleacă înainte de încărcare și nu revine cu mingea încă pe plafon.

**Sprijin:** Validăm o livrare înainte să adăugăm baschetul. Urmărim pe rând comanda livrării și comanda transportului; sunt două niveluri de mesaje, nu două culori fără rol.

[Lecția](Lectia_05_ScratchJr/index.html) · [Ghid](Lectia_05_ScratchJr/ghid-profesor.html) · [PDF cu programe](Lectia_05_ScratchJr/Ghid_profesor_Lectia_05.pdf)

### 6. Robotul pregătește atelierul

**Reluăm:** Din autobuz: două scene; din curier: operații succesive și așteptarea finalizării.

**Pasul următor:** Reacția la contact: restul dispare numai când robotul îl atinge.

**Reușită observabilă:** Un rest mutat în afara traseului rămâne; ușa se ridică complet înainte de traversare.

**Sprijin:** Aceasta este prima creștere mare de volum. Construim un segment și un rest, apoi copiem firele la celelalte și schimbăm numai întârzierile. Testăm scena 1 și scena 2 separat înainte să le legăm la M4.

[Lecția](Lectia_06_ScratchJr/index.html) · [Ghid](Lectia_06_ScratchJr/ghid-profesor.html) · [PDF cu programe](Lectia_06_ScratchJr/Ghid_profesor_Lectia_06.pdf)

### 7. Fabrica de roboți: construim un rover

**Reluăm:** Din atelier: mai multe personaje răspund aceluiași mesaj și operația trebuie încheiată.

**Pasul următor:** Comparăm montajul în paralel cu montajul pe rând; piesele devin un ansamblu complet.

**Reușită observabilă:** Farul începe numai după ambele roți, inclusiv cea lentă; roverul pleacă după probă.

**Sprijin:** Ideea de așteptare nu este complet nouă. O facem explicită cu două trasee și două viteze. Piesele nu se lipesc automat: explicăm înlocuirea lor cu imaginea roverului complet.

[Lecția](Lectia_07_ScratchJr/index.html) · [Ghid](Lectia_07_ScratchJr/ghid-profesor.html) · [PDF cu programe](Lectia_07_ScratchJr/Ghid_profesor_Lectia_07.pdf)

### 8. Robotul submarin

**Reluăm:** Din atelier: contact; din curier: obiect transportat; din fabrică: schimbarea imaginii.

**Pasul următor:** Control interactiv prin patru butoane și trecerea între stările gol/încărcat/depus.

**Reușită observabilă:** Robotul și capsula rămân împreună la toate direcțiile; după depunere capsula rămâne.

**Sprijin:** Volumul de cod este mare, dar cele patru comenzi au același tipar. Construim și probăm o direcție, apoi repetăm tiparul cu alte plicuri. Apăsăm o dată și așteptăm mișcarea completă. Depune se folosește numai deasupra platformei.

[Lecția](Lectia_08_ScratchJr/index.html) · [Ghid](Lectia_08_ScratchJr/ghid-profesor.html) · [PDF cu programe](Lectia_08_ScratchJr/Ghid_profesor_Lectia_08.pdf)

### 9. Robotul de reciclare

**Reluăm:** Din curier: transport și retur; din submarin: încărcat/gol și depunere vizibilă.

**Pasul următor:** Un lot mixt cu rute alese prin mesaje și două locuri distincte în același recipient.

**Reușită observabilă:** Patru ambalaje sunt sortate; cele două sticle rămân alăturate, iar robotul revine gol.

**Sprijin:** Este o lecție de consolidare, fără bloc nou obligatoriu. La M2 și M3 reutilizăm tiparul primei livrări și modificăm ruta și culoarea. Lăsăm cele 20 de minute ale M3 pentru decizie și verificare, nu pentru rescrierea tuturor firelor.

[Lecția](Lectia_09_ScratchJr/index.html) · [Ghid](Lectia_09_ScratchJr/ghid-profesor.html) · [PDF cu programe](Lectia_09_ScratchJr/Ghid_profesor_Lectia_09.pdf)

### 10. Robotul grădinar

**Reluăm:** Din reciclare: operații programate pe rând; din atelier: încărcarea la o stație.

**Pasul următor:** Planificarea consumului unei resurse limitate și reumplerea înainte să se termine.

**Reușită observabilă:** Două porții la fiecare plantă, reumplere între ele și niciun jet în mers.

**Sprijin:** Construim întâi udarea plantei A. Pentru B refolosim tiparul și schimbăm plicurile. Copiii aleg momentul reumplerii urmărind indicatorul; acesta este o animație programată, nu o variabilă și nu blochează automat udarea la zero.

[Lecția](Lectia_10_ScratchJr/index.html) · [Ghid](Lectia_10_ScratchJr/ghid-profesor.html) · [PDF cu programe](Lectia_10_ScratchJr/Ghid_profesor_Lectia_10.pdf)

## Ritmul orei și sprijinul

Nu cerem reconstruirea întregii soluții la fiecare etapă: păstrăm firele care nu se schimbă. PDF-ul le repetă pentru a putea fi consultat independent. Rezolvăm o operație, o probăm și abia apoi o extindem.

Pentru un fir deja înțeles: prinde-l de primul bloc și trage-l peste miniatura personajului destinatar din lista din stânga. Selectează destinatarul și verifică acea copie. Firele rămân independente; schimbă numai culoarea, distanța sau întârzierea cerută. Dacă firul dispare din greșeală, folosește Undo. [Reper oficial](https://sites.bc.edu/scratchjr/learn/).

La Lecțiile 6 și 8, numărul de personaje și fire este mai mare. Modelăm întâi un tipar și îl reutilizăm. Dacă ritmul este lent, profesorul construiește împreună cu grupa firele repetitive; copilul decide ruta, ordinea sau culoarea. Puzzle-ul greu rămâne în baza lecției. Lecțiile 1–8 păstrează cele zece minute de creație; Lecțiile 9–10 nu au această etapă.

Rezervele sunt peste ora de bază, pentru cei care termină repede. Nu le folosim înaintea puzzle-ului greu și nu înlocuiesc salvarea. Pauzele active sunt deja în planurile 1–5; în lecțiile 6–10 putem schimba poziția în timpul explicației dintre misiuni.

Duratele sunt ținte de predare, nu timpi măsurați cu această clasă. În fișa de observație notăm timpul real, sprijinul necesar și ce trebuie reluat la întâlnirea următoare.

## Aceeași rutină la fiecare probă

1. Selectăm personajul și identificăm firul corect. Plicurile pereche au aceeași culoare; semnificația culorii este locală proiectului.
2. Pregătim startul după instrucțiunile lecției. L1–2, L6–7: Stop, pagina inițială dacă există, Reset Characters, apoi Steag. În L2 atingem paznicul după pornirea animațiilor. L3: pagina 1, Stop, Reset Characters, Steag, apoi o singură atingere pe autobuz. L4: Steag la M1–M2, atingerea dirijoarei din M3. L5: atingerea mașinii după resetare, nu Steag. L8–10: Stop, apoi Steag; în L8 nu apăsăm Steag între comenzile telecomenzii.
3. Prezicem rezultatul, rulăm și verificăm ținta vizibilă. Nu mutăm obiectele cu degetul în timpul unei probe automate.
4. Salvăm prin revenire în galerie și redeschidem. Pentru o probă completă cu pagini revenim la pagina 1.

Reset Characters readuce personajele la pozițiile inițiale. Blocul albastru La poziția inițială este o comandă din program. Nu îl folosim ca scurtătură atunci când cerința cere un retur vizibil.

ScratchJr nu atașează automat încărcătura, nu recunoaște materialele și nu verifică toate regulile poveștii. Ghidurile spun explicit ce este controlat prin cod și ce verificăm vizual. La grădinar indicatorul nu este o variabilă și nu interzice automat udarea la zero.

[PDF-ul complet](Plan_lectii_ScratchJr_60min.pdf) · [Verificarea cursului](verificare_curs/README.md) · [Surse și adaptări](Surse_oficiale_ScratchJr.md).
