# Lecția 6 - Robotul de inspecție

**60 de minute · părțile grele în baza lecției · 10 minute de creație · două rezerve suplimentare.**

[PDF cu plan și capturi](Ghid_profesor_Lectia_06.pdf) · [Proiect de pornire fără cod](solutii_inspectie/start.sjr) · [Toate soluțiile](solutii_inspectie/README.md)

## Povestea pentru copii

„Atelierul se pregătește pentru lucru. Robotul trebuie să ajungă la stația de control și să anunțe că inspecția s-a terminat. Unele zone sunt închise cu bariere, iar locul lor se poate schimba. Când atinge o barieră, robotul trebuie să se oprească, să se retragă și să o ocolească. La stația de control trebuie să se oprească definitiv. După steag, voi doar observați.”

**Ce este nou față de curier:** traseul se schimbă în urma unui contact. Simulăm un senzor de contact, ca un buton din bara de protecție. Nu detectăm obstacolul de la distanță și nu folosim camerele desenate pe robot. Este o simulare în ScratchJr, fără conectare la un robot fizic.

## Înainte de oră: un singur import pe tabletă

Această lecție folosește robotul și atelierul create pentru curs. Ele **nu sunt în biblioteca standard**. Fișierul [start.sjr](solutii_inspectie/start.sjr) conține decorul, robotul, două bariere și stația, toate fără programe. Nu copia imaginile separat.

1. Pe laptop, deschide [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/app/home.html). Din galerie: **Open**, alege `start.sjr`, apoi cardul **L06 Robotul de inspecție - de la zero · 60 min**. La import nu apăsa încă o dată Open; așteaptă apariția cardului.
2. Pe un Lenovo, descarcă `start.sjr` de pe pagina lecției. Din Descărcări/Fișiere deschide-l cu ScratchJr, dacă aplicația este oferită ca destinație. Verifică importul, salvarea și redeschiderea pe modelul folosit în clasă înainte să pregătești restul tabletelor. Browserul de pe laptop nu transferă automat proiectul pe Android. Ruta exactă de deschidere poate depinde de managerul de fișiere; nu a fost verificată pe tableta fizică.
3. Pregătește proiectul pe fiecare tabletă înaintea orei; importul nu consumă cele 60 de minute. Copiii construiesc programele în acest proiect, nu deschid pe rând soluțiile profesorului.
4. Testează o rulare din `m3.sjr` pe tableta de probă și verifică volumul pentru **Pop**. Lecția rămâne inteligibilă și fără sunet.

În browser, toate fișierele au fost importate, rulate și capturate. Versiunea web a raportat o eroare la înregistrarea resurselor în biblioteca globală, însă imaginile din proiect au rămas vizibile după salvare, redeschidere și reîncărcare. De aceea pornim de la SJR-ul inclus și nu cerem căutarea robotului în galeria globală. [Detalii și limitele testării](verificare/Inspectie_60min.md).

## Pregătirea scenei - 0-8 minute

Deschidem proiectul fără cod. Jos sunt robotul, bariera și stația cu bifă. **Bariera 2**, sus în stânga, este pusă deoparte pentru a doua rezervă; nu are cod. Nu schimbăm mărimile. Fundalul este decor: contactul funcționează între personaje, nu cu dulapurile desenate pe perete.

Arată trei lucruri: lista personajelor, programele separate ale fiecăruia și grila. Un pas înseamnă un pătrățel. Robotul pornește la aproximativ 3 pătrățele de marginea stângă, bariera la 9½, stația la 18½; toate pe aceeași linie, aproape de rândul 4. Pozițiile sunt deja pregătite. Grila este un ajutor, nu trebuie să reconstruim decorul.

**Înainte de fiecare probă:** Stop dacă rulează, **Reset Characters** sus, apoi **un singur steag**. Nu mutăm personajele în timpul rulării. Selectarea din lista din stânga deschide codul; atingerea robotului nu pornește aceste programe.

Blocul galben **La ciocnire / Start on Bump** are două siluete. Nu este blocul cu degetul, care pornește la atingerea ecranului. Folosim blocul standard, fără selector de personaj. El reacționează la contact cu orice alt personaj. Barierele și stația nu trebuie să se atingă între ele.

| Semnal | Cine îl trimite | Ce face robotul |
| --- | --- | --- |
| Portocaliu | Bariera atinsă | Oprește deplasarea, se retrage și ocolește |
| Albastru | Stația atinsă | Oprește deplasarea, se retrage puțin și anunță finalul |

Plic închis = Trimite; plic deschis = Primește. Alegem culoarea din săgeata de sub plic. Blocul portocaliu **Stop**, cu mâna, oprește celelalte programe ale aceluiași personaj; firul care l-a executat continuă.

## 1. Frâna de siguranță - 8-20 minute

**Ținta:** steagul pornește robotul. Contactul cu bariera întrerupe mersul; robotul se retrage un pas și rămâne pe loc. Construim întâi firul barierei, apoi cele două fire separate ale robotului; probăm după ce toate sunt conectate.

| Personaj | Program complet |
| --- | --- |
| Robot de inspecție | Steag → Dreapta 20 |
| Robot de inspecție | Primește portocaliu → Stop → Stânga 1 |
| Barieră | La ciocnire → Trimite portocaliu |
| Stație de control | Fără program; nu intervine în această etapă |
| Bariera 2 | Fără program; nu intervine în această etapă |

**Partea grea, pentru toți:** Stop trebuie să fie la robot, în firul portocaliu. La barieră ar opri doar programele barierei. Stânga 1 rupe contactul, astfel încât evenimentul să nu se repete continuu. Nu este întoarcere la poziția inițială.

**Probă în două poziții:** după resetare, mutăm bariera două pătrățele spre stânga, fără să schimbăm Dreapta 20. La următorul steag robotul trebuie să frâneze mai devreme. Readucem bariera la loc pentru M2. Dreapta 20 este o comandă lungă pe care contactul o întrerupe, nu distanța calculată până la obstacol. Fără reacția de contact, personajul poate trece prin barieră și reapărea din cealaltă parte a scenei.

## 2. Retragere și ocolire - 20-32 minute

**Ținta:** după frânare, robotul se retrage, emite Pop și ocolește bariera pe sus. Revine pe linia de mers, în partea cealaltă, și spune „Cale liberă!”. Extindem același fir portocaliu; păstrăm Steag și programul barierei.

| Personaj | Program complet |
| --- | --- |
| Robot de inspecție | Steag → Dreapta 20 |
| Robot de inspecție | Primește portocaliu → Stop → Stânga 1 → Sunet Pop → Sus 3 → Dreapta 5 → Jos 3 → Spune Cale liberă! |
| Barieră | La ciocnire → Trimite portocaliu |
| Stație de control | Fără program; nu intervine în această etapă |
| Bariera 2 | Fără program; nu intervine în această etapă |

**Partea grea, pentru toți:** ordinea este Stop, retragere, urcare, traversare, coborâre. Sus 3 și Jos 3 se compensează; Dreapta 5 lasă loc pentru întregul robot, nu numai pentru centrul lui. Dacă schimbăm mărimile personajelor, trebuie recalibrat ocolul. Nu avem un motor fizic care să împiedice trecerea prin obiecte.

**Probă:** atingere scurtă la început, apoi un singur ocol, fără traversarea barierei pe linia de jos. Stația și Bariera 2 rămân fără cod.

## Pauză activă - 32-35 minute

Un copil mimează robotul, fără să se lovească de nimeni. Profesorul spune „Contact!”. Clasa dictează: oprește, înapoi, ocolește, continuă. La „Stație!” trebuie altă reacție. Legăm fiecare reacție de evenimentul care o pornește.

## 3. Inspecția completă - 35-48 minute · puzzle greu de bază

**Ținta:** un steag pornește inspecția, robotul ocolește bariera, continuă până la stație și se oprește lângă ea. „Inspecție gata!” apare numai la contactul cu stația.

Înlocuim replica „Cale liberă!” din M2 cu Dreapta 20. Adăugăm firul de contact al stației și al treilea fir al robotului, cu plic albastru. Nu unim cele trei declanșatoare într-un singur șir.

| Personaj | Program complet |
| --- | --- |
| Robot de inspecție | Steag → Dreapta 20 |
| Robot de inspecție | Primește portocaliu → Stop → Stânga 1 → Sunet Pop → Sus 3 → Dreapta 5 → Jos 3 → Dreapta 20 |
| Robot de inspecție | Primește albastru → Stop → Stânga 1 → Spune Inspecție gata! |
| Barieră | La ciocnire → Trimite portocaliu |
| Stație de control | La ciocnire → Trimite albastru |
| Bariera 2 | Fără program; nu intervine în această etapă |

**Partea grea, pentru toți:** două contacte au două sensuri. Portocaliu permite continuarea după ocol; albastru oprește inspecția. Stop din firul albastru întrerupe și mersul care a început în firul portocaliu. Retragerea de un pas eliberează contactul cu stația, apoi robotul stă.

**Indicii:** 1. Cine a fost atins? 2. Ce culoare trimite acel personaj? 3. Are robotul un fir separat care primește aceeași culoare? 4. Stop este înaintea noii mișcări?

**Probă completă:** resetare, un steag, contact cu bariera, un ocol, contact cu stația, oprire. Așteptăm și verificăm că nu repornește. Resetăm și repetăm, apoi salvăm și redeschidem. Toți încearcă acest puzzle în timpul de bază.

## Creația mea - 48-58 minute

Copiii aleg locul barierei și înălțimea ocolului. Păstrăm retragerea, loc pentru întregul robot și oprirea finală. Nu cerem o singură soluție. Se poate porni de la M2 dacă M3 încă are nevoie de sprijin.

**Exemplul complet „Ocolul meu”:** mutăm bariera un pătrățel spre stânga față de M3; schimbăm Sus 3/Jos 3 în **Sus 4/Jos 4**. Dreapta 5 rămâne. Stația și robotul pornesc din aceleași locuri. A doua barieră rămâne sus, fără cod. Păstrăm distanță față de ea.

| Personaj | Program complet |
| --- | --- |
| Robot de inspecție | Steag → Dreapta 20 |
| Robot de inspecție | Primește portocaliu → Stop → Stânga 1 → Sunet Pop → Sus 4 → Dreapta 5 → Jos 4 → Dreapta 20 |
| Robot de inspecție | Primește albastru → Stop → Stânga 1 → Spune Inspecție gata! |
| Barieră | La ciocnire → Trimite portocaliu |
| Stație de control | La ciocnire → Trimite albastru |
| Bariera 2 | Fără program; nu intervine în această etapă |

**Probă:** robotul reacționează mai devreme, ocolește mai sus și ajunge tot la stație. Copilul explică ce două numere trebuie schimbate împreună și de ce. Nu mutăm bariera foarte aproape de pornire sau de stație: trebuie loc pentru retragere și coborâre.

## Probă și salvare - 58-60 minute

Resetăm și pornim o dată. Copilul arată unde se întrerupe mersul și explică diferența dintre portocaliu și albastru. Revenim în galerie pentru salvare. Nume sugerat: „Inspecție - prenume”.

## Rezervă 1. Robotul merge mai repede - încă 5 minute

Pornim de la M3. În firul Steag punem **Viteză rapidă** înainte de Dreapta 20; toate celelalte programe rămân complete mai jos. Predicție: unde se produce reacția și ce se schimbă în durată?

| Personaj | Program complet |
| --- | --- |
| Robot de inspecție | Steag → Viteză rapidă → Dreapta 20 |
| Robot de inspecție | Primește portocaliu → Stop → Stânga 1 → Sunet Pop → Sus 3 → Dreapta 5 → Jos 3 → Dreapta 20 |
| Robot de inspecție | Primește albastru → Stop → Stânga 1 → Spune Inspecție gata! |
| Barieră | La ciocnire → Trimite portocaliu |
| Stație de control | La ciocnire → Trimite albastru |
| Bariera 2 | Fără program; nu intervine în această etapă |

**Probă:** aceeași ordine a evenimentelor, un ocol și oprire la stație, într-un timp mai scurt. Contactul se verifică în pași de animație; la viteza mai mare punctul exact de oprire poate diferi puțin. Nu cerem același pixel. Pentru revenire la M3, selectăm explicit Viteză normală; simpla scoatere a blocului rapid nu readuce neapărat viteza.

## Rezervă 2. Două zone închise - încă 10 minute

Pornim de la M3, la viteza normală. Folosim **Bariera 2 deja inclusă în proiect**, nu importăm încă un fișier. Mutăm prima barieră două pătrățele spre stânga; aducem Bariera 2 de sus pe linia robotului, la 6 pătrățele spre dreapta de prima. Modelul are centrele la 7½ și 13½ pătrățele de marginea stângă. Stația rămâne la 18½.

Adăugăm la Bariera 2 același La ciocnire → Trimite portocaliu. Robotul păstrează **un singur fir de evitare**, reutilizat la ambele obstacole.

| Personaj | Program complet |
| --- | --- |
| Robot de inspecție | Steag → Dreapta 20 |
| Robot de inspecție | Primește portocaliu → Stop → Stânga 1 → Sunet Pop → Sus 3 → Dreapta 5 → Jos 3 → Dreapta 20 |
| Robot de inspecție | Primește albastru → Stop → Stânga 1 → Spune Inspecție gata! |
| Barieră | La ciocnire → Trimite portocaliu |
| Stație de control | La ciocnire → Trimite albastru |
| Bariera 2 | La ciocnire → Trimite portocaliu |

**Probă:** două contacte, două retrageri, două ocoluri, apoi contact cu stația și oprire. Nu punem barierele lipite: robotul trebuie să coboare și să reintre pe traseu înaintea următorului contact.

## Când un copil se blochează

- Robotul trece prin barieră: verificăm La ciocnire la barieră, plicurile portocalii și Stop la robot. Fundalul nu detectează contacte.
- Robotul tremură lângă obiect: verificăm Stânga 1 imediat după Stop și faptul că obiectele sunt separate la pornire.
- Ocolul lovește bariera din nou: resetăm; păstrăm mărimile din starter și distanțele Sus 3, Dreapta 5, Jos 3.
- Nu ajunge la stație: în M3, după coborâre trebuie Dreapta 20, în locul replicii din M2.
- Nu se oprește la stație: aceasta trimite albastru, iar robotul primește albastru într-un fir separat cu Stop.
- Un plic apare gol în versiunea web: apasă săgeata și selectează din nou culoarea indicată; nu există un „bloc gol” de adăugat.

PDF: plan p. 1; pregătire p. 2; M1 p. 3; M2 p. 4; M3 p. 5-6; creație p. 7-8; R1 p. 9-10; R2 p. 11-12. În PDF-ul cursului adaugă 61. Capturile arată toate firele, inclusiv pe cele neschimbate.
