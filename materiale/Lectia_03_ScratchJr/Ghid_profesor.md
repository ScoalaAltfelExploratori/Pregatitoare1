# Lecția 3 - Autobuzul spre plajă

**60 de minute · 6-7 ani · puzzle greu, creație proprie și două rezerve.**

[Plan și programe cu capturi - PDF](Ghid_profesor_Lectia_03.pdf) · [Pagina lecției](index.html) · [Proiectele profesorului](solutii_autobuz/README.md)

## Locul lecției în curs

**Reluăm:** Din muzeu: un eveniment poate porni mai multe personaje; ordinea contează.

**Ce adăugăm:** Ascunde/Arată și continuarea poveștii pe altă pagină, cu personaje independente.

**Verificăm înțelegerea:** Autobuzul așteaptă toți pasagerii; la destinație copiii apar numai după oprire.

**Cum păstrăm ritmul:** Construim întâi cursa cu Ana. Abia după o probă completă adăugăm Dan și Mara; copiem firele comune și schimbăm distanțele. La pagina nouă verificăm separat poziția ușii și starea ascunsă.

Pentru un fir deja înțeles: prinde-l de primul bloc și trage-l peste miniatura personajului destinatar din lista din stânga. Selectează destinatarul și verifică acea copie. Firele rămân independente; schimbă numai culoarea, distanța sau întârzierea cerută. Dacă firul dispare din greșeală, folosește Undo. [Reper oficial](https://sites.bc.edu/scratchjr/learn/).

[Progresia celor zece lecții](../Progresia_cursului.md).
## Povestea pentru copii

„Ana, Dan și Mara pleacă la plajă. Vin din locuri diferite, dar trebuie să prindă același autobuz. Șoferul nu pleacă până nu urcă toți. La plajă, autobuzul oprește înainte să coboare. Voi programați călătoria, astfel încât nimeni să nu rămână în urmă.”

Noutățile față de ștafetă și muzeu: **Ascunde / Arată pentru urcare și coborâre**, respectiv **pagini pentru locurile călătoriei**. Mesajele coordonează etapele. Numerele stabilesc distanțele până la ușă și traseele de coborâre; nu adăugăm întrebări matematice separate.

## Pregătirea scenei - 0-8 minute

1. Proiect nou, fundal **Suburbs**, autobuzul **Bus**, fata **Child** cu fustă mov. Redenumește-o **Ana**. Elimină pisica dacă nu o folosești. Începem cu un singur pasager.
2. Autobuzul: aproximativ **7 pătrățele lățime**; copilul: aproximativ **3 pătrățele înălțime**. Autobuzul privește spre dreapta, cu ușa în față. Copilul merge în fața desenului autobuzului până la ușă.
3. Activează grila. Așază Ana pe linia ușii, la **10 spații spre stânga**. În exemplu: centrul Anei (144, 264), ușa (384, 264), într-o scenă de 480 × 360. Pe tabletă numărăm spațiile, fără coordonate în cod. Dacă alegi alte mărimi, aliniază ușa cu locul unde dispare copilul și adaptează distanța.
4. Poziționează prin tragere înainte de programare. Acestea sunt pozițiile la care revine **Acasă**. Toți pornesc cu viteza normală.
5. Titlurile ABC sunt opționale. Toate imaginile există în aplicație; copiii nu importă proiecte, imagini sau sunete.

**Înaintea fiecărei probe:** pagina 1 → Stop sus dacă rulează → Reset Characters (săgeata rotundă) → Steag sus → o singură atingere pe autobuzul de pe scenă. Așteaptă finalul înainte de o nouă cursă. Selectarea în lista din stânga nu pornește programul.

## 1. Primul pasager - 8-20 minute

**Ținta:** Ana ajunge la ușă și dispare numai acolo. Autobuzul rămâne pe loc.

| Personaj | Fire separate |
| --- | --- |
| Autobuz | Steag → Acasă; Atingere → Trimite portocaliu |
| Ana | Steag → Acasă → Arată; Primește portocaliu → Dreapta 10 → Ascunde |

Ascunde și Arată sunt blocurile mov cu siluetă transparentă, respectiv albă. Copilul rămâne în lista personajelor când este ascuns. Plicul închis trimite, cel deschis primește; alegem aceeași culoare din săgeata mică.

Întreabă: „Unde trebuie să ajungă Ana înainte să dispară?” Verificăm ușa, nu doar dispariția. Dacă o depășește, ajustăm poziția inițială sau distanța.

## 2. Prima cursă - 20-33 minute

**Ținta:** urcare → plecare → plajă → oprire → coborâre. Fără o nouă apăsare a steagului la plajă.

Pe pagina 1, continuă firul autobuzului: **Atingere → Trimite portocaliu → Dreapta 4 → Pagina 2**. Blocul roșu cu miniatura paginii apare după ce există pagina 2 și se pune ultimul.

### Construirea paginii 2

1. Apasă **+** în lista paginilor. Alege **Beach Day**, apoi adaugă din bibliotecă Bus și aceeași fată. Fiecare pagină are propriile personaje și programe; codul nu se transferă automat.
2. Pune temporar autobuzul unde va opri și Ana chiar la ușă. Mută **numai autobuzul 4 spații spre stânga**. Ana rămâne la viitoarea ușă. În exemplu, autobuzul pornește cu centrul la (84, 264), oprește la (180, 264), iar Ana așteaptă la (216, 264).
3. Selectează Ana, trage **Ascunde** în zona albă și atinge blocul: copilul dispare. Folosește apoi blocul în firul de pregătire de mai jos. Ana rămâne selectabilă în lista din stânga.
4. Construiește programele paginii 2:

| Personaj | Fire separate |
| --- | --- |
| Autobuz | Steag → Acasă → Trimite portocaliu → Dreapta 4 → Trimite albastru |
| Ana | Primește portocaliu → Ascunde → Acasă; Primește albastru → Arată → Dreapta 2 → Sus 2 |

**De ce funcționează:** Trimite așteaptă terminarea tuturor firelor pornite de mesaj. Pe pagina 1, autobuzul continuă după urcare. La plajă, albastrul vine după deplasarea autobuzului. Schimbarea paginii pornește automat programele cu Steag de acolo. Mesajele acționează în pagina curentă, deci portocaliul poate avea aici rol de pregătire.

Proba pornește de pe pagina 1. Urmărește ușa la plecare și după oprire. Programul nu detectează automat ușa: construim traseul și verificăm vizual rezultatul.

## Pauză activă - 33-36 minute

Trei copii mimează pasagerii, unul șoferul. Un pasager merge mai încet. Clasa dă semnul plecării când au urcat toți. Discutăm de ce o pauză de două secunde poate fi insuficientă.

## 3. Nimeni nu rămâne în urmă - 36-48 minute - puzzle greu

**Ținta:** trei pasageri cu distanțe diferite. Autobuzul îi așteaptă pe toți, **fără bloc Așteaptă**. La plajă, fiecare merge în alt loc.

Adaugă pe ambele pagini **Child cu tricou galben (Dan)** și **Child cu rochie roz (Mara)**. Pe pagina 1, Dan este la 8 pași de ușă, Mara la 6; Ana păstrează cei 10. Toți au viteza normală.

| Personaj | Pagina 1: urcare | Pagina 2: coborâre |
| --- | --- | --- |
| Ana | Portocaliu → Dreapta 10 → Ascunde | Albastru → Arată → Dreapta 2 → Sus 2 |
| Dan | Portocaliu → Dreapta 8 → Ascunde | Albastru → Arată → Dreapta 4 |
| Mara | Portocaliu → Dreapta 6 → Ascunde | Albastru → Arată → Dreapta 6 → Jos 2 |

Portocaliu și Albastru din tabel sunt **Primește mesaj**, nu Trimite. Fiecare copil are și **Steag → Acasă → Arată** pe pagina 1, respectiv **Primește portocaliu → Ascunde → Acasă** pe pagina 2. La sosire, toți pornesc ascunși din același loc: ușa după oprire. Autobuzul păstrează programele M2.

Indicii: „Cine ajunge ultimul?” → „Ce comandă pornește toate urcările?” → „Unde trebuie să fie plecarea?” Trimite așteaptă toate firele pornite, nu doar primul. Nu pune Repetă mereu în firele de urcare: atunci ele nu se mai termină.

**Reușită:** nimeni nu dispare înaintea ușii; autobuzul stă cât timp mai urcă cineva; copiii apar la plajă după oprire și ajung în trei locuri diferite.

## Excursia mea - 48-58 minute

Copilul alege o altă destinație din bibliotecă și inventează locurile de coborâre. Are **10 minute pentru creație**. Păstrează urcarea la ușă și coborârea după oprire.

Exemplul complet din PDF folosește **Park** și adaugă **Sus 1** la sfârșitul traseului fiecărui pasager. Programele de urcare și ale autobuzului rămân. Este o variantă posibilă, nu singura soluție. Copilul explică unde merge fiecare și testează cursa.

## Probă și salvare - 58-60 minute

Revino la pagina 1, oprește dacă este nevoie, resetează și pornește o cursă completă. Salvează revenind în galerie, apoi redeschide proiectul. Dacă este deschis la destinație, revino la pagina 1 înainte de cursă.

## R1. Pasagerul mai lent - rezervă, +5 minute

Pornește de la M3. La Mara, pe pagina 1: **Primește portocaliu → Viteză lentă → Dreapta 6 → Ascunde**. Selectează pietonul lent din blocul portocaliu Viteză. Restul programelor sunt identice cu M3.

Mara are drumul cel mai scurt, dar ajunge ultima. **Nu modifica programul autobuzului și nu adăuga Așteaptă.** Verifică dacă o așteaptă și ajung toți la plajă. Pentru revenirea la M3, setează Mara din nou la viteza normală.

## R2. Două opriri - rezervă, +10 minute

Trei pagini: **1 Suburbs → 2 Park → 3 Beach Day**. Ana coboară în parc; Dan și Mara continuă spre plajă.

| Pagina | Autobuz | Pasageri |
| --- | --- | --- |
| 1 - Suburbs | Programele M3, inclusiv Pagina 2 | Toți urcă la fel ca în M3 |
| 2 - Park | Steag → Acasă → Trimite portocaliu → Dreapta 4 → Trimite albastru → Dreapta 8 → Pagina 3 | Toți: Primește portocaliu → Ascunde → Acasă. Numai Ana: Primește albastru → Arată → Dreapta 2 → Sus 2. Dan și Mara nu au fir albastru aici. |
| 3 - Beach Day | Steag → Acasă → Trimite portocaliu → Dreapta 4 → Trimite albastru | Adaugă numai Dan și Mara, cu programele de pregătire și coborâre din M3. |

La parc, Trimite albastru așteaptă ca Ana să termine coborârea. Abia apoi autobuzul pleacă. Ana nu se adaugă pe pagina 3, fiindcă a rămas în parc. Nu schimbăm scena manual în timpul probei.

## Ajutorul din PDF

Plan p. 1; pregătire p. 2-3; M1 p. 4; M2 p. 5-6; M3 p. 7-8; creație p. 9-10; R1 p. 11-12; R2 p. 13-15. Fiecare pagină de soluție arată scena și **toate programele fiecărui personaj**. În PDF-ul cursului adaugă 26.

[Raportul probelor în browser](verificare/Autobuzul_60min.md). Proiectele distribuite au fost importate și executate în ScratchJr Desktop Reborn. Proba pe un Lenovo fizic nu este inclusă.
