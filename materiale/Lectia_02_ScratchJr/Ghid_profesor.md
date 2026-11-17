# Lecția 2 - Muzeul după închidere

**60 de minute · 6-7 ani · trei misiuni, creație proprie și două rezerve.**

[Plan și programe cu capturi - PDF](Ghid_profesor_Lectia_02.pdf) · [Pagina lecției](index.html) · [Proiectele profesorului](solutii_muzeu/README.md)

## Povestea pentru copii

„Muzeul s-a închis. În sala de astronomie, macheta Pământului și planeta cu inele încep să se rotească. Paznicul intră să verifice sala. Exponatele trebuie să rămână nemișcate cât timp el le inspectează. Când revine la intrare, își pot relua mișcarea. Voi programați exponatele și inspecția.”

Sunt machete dintr-o poveste; rotația în planul ecranului este o animație, nu o simulare astronomică. Paznicul nu detectează automat mișcarea. Copilul verifică vizual regula poveștii.

## Pregătirea scenei - 0-8 minute

1. Un proiect nou. Alege **Empty Room** (camera cu fereastră și covor), **Earth** (Pământul), **Planet** (planeta cu inele) și **Father** (adultul cu tricou verde). Elimină pisica inițială dacă nu o folosești.
2. Redenumește personajele Pământ, Planetă și Paznic. Micșorează-le aproximativ ca în captura de la pagina 2: Pământul are lățimea a 3-4 pătrățele, planeta 4-5, paznicul înălțimea a 4-5. Mărimea exactă nu schimbă soluția.
3. Activează grila. Repere: Pământ (7, 9), Planetă (15, 9), Paznic (3, 4): primul număr este cel evidențiat jos, al doilea în stânga. Poziționează prin tragere înainte să programezi.
4. Paznicul merge pe linia de jos. Până sub planetă sunt **12 spații**; până sub Pământ, **4**. Aceste distanțe, nu precizia la pixel, contează. Toți au viteza normală.
5. Titlul și INTRARE sunt texte opționale, adăugate cu unealta ABC. Nu se programează și nu sunt butoane.

Sunt alte personaje decât în ștafetă. Toate se găsesc în aplicație; nu copiezi imagini sau proiecte pe tabletele copiilor. Dacă un copil alege alt adult din bibliotecă, păstrează poziția paznicului și traseul.

## 1. Exponatul prinde viață - 8-20 minute

**Ținta:** după o singură apăsare pe steagul de sus, Pământul se rotește continuu, pe loc.

Selectează Pământ. Copiii construiesc **Steag → Rotire dreapta 1 → Repetă mereu**. Rotirea are o săgeată curbă; săgeata dreaptă ar deplasa personajul. Repetă mereu este blocul roșu cu săgeată circulară, la sfârșitul programului. Planeta și paznicul nu au încă programe.

Întreabă: „Ce bloc ne scutește să apăsăm steagul iar și iar?” Rulează câteva secunde. Oprește din bara de sus. Nu introducem un Repeat cu număr; aici animația continuă până primește o comandă de oprire.

## 2. Încremenim la semnal - 20-33 minute

**Ținta:** ambele exponate se rotesc; o atingere a paznicului le oprește pe amândouă.

| Personaj | Programe separate |
| --- | --- |
| Pământ | Steag → Rotire dreapta 1 → Repetă mereu; Primește roșu → Stop |
| Planetă | Steag → Rotire stânga 1 → Repetă mereu; Primește roșu → Stop |
| Paznic | Atingere → Trimite roșu |

**Stop este blocul portocaliu cu mâna.** Oprește celelalte programe ale personajului care îl execută. Dacă îl pui doar la paznic, nu oprește exponatele. Blocul roșu simplu de sfârșit nu are acest rol.

Plicul deschis primește, plicul închis trimite. Alege roșu din săgeata mică a fiecărui plic. Creează firul Primește roșu separat de cel cu steag. Proba: steagul de sus, apoi atingerea paznicului **pe scenă**; selectarea lui în lista din stânga nu pornește inspecția.

## Pauză activă - 33-36 minute

Doi copii mimează exponatele. Al treilea se apropie, inspectează și se întoarce. Clasa arată momentul când exponatele au voie să reia mișcarea. Pregătim regula puzzle-ului, fără tablete.

## 3. Inspecția completă - 36-48 minute - puzzle greu

**Ținta:** o singură atingere a paznicului oprește ambele exponate, pornește inspecția și le repornește automat numai după întoarcerea lui. Fără altă atingere sau steag în timpul inspecției.

La fiecare exponat adaugă un al treilea fir: **Primește albastru → rotația proprie 1 → Repetă mereu**. Primele două fire rămân ca la M2.

Paznic: **Atingere → Acasă → Trimite roșu → Dreapta 12 → Așteaptă 10 → Stânga 12 → Trimite albastru**.

Acasă îl așază la start înainte de inspecție. Întoarcerea se programează cu Stânga 12, ca să o vedem. Așteaptă 10 înseamnă aproximativ o secundă de privit exponatele, nu zece secunde. Pauza are rol de inspecție; repornirea este legată de sfârșitul drumului, prin albastru.

**Indiciile, pe rând:** Cine trebuie să primească oprirea? Ce bloc dovedește că paznicul a revenit? Unde trebuie pus mesajul de repornire? Dacă un singur exponat continuă să se miște, verifică programul lui de oprire și culoarea plicului.

**Verificare:** pornește animațiile, atinge paznicul o dată. Urmărește exponatele pe tot drumul. Ambele reiau rotația la intrare. Repetă o a doua inspecție după revenire. Nu apăsa repede de mai multe ori pe paznic în timpul traseului.

## Muzeul meu - 48-58 minute

Copilul alege o modificare de comportament: alt sens de rotație, un pas de rotație mai mare, o pauză între rotiri sau o inspecție mai lungă. Explică ce a schimbat și probează regula oprire → inspecție → reluare.

**Exemplu complet în PDF:** Pământul rotește dreapta 1 și așteaptă 5; planeta rotește stânga 2 și așteaptă 5. Ambele repetă mereu. Aceleași mișcări se pun atât în firul Steag, cât și în firul Primește albastru. Paznicul așteaptă 20 în loc de 10. Nu este o variantă obligatorie de copiat.

Păstrează cele zece minute pentru toți. Dacă ritmul e lent, construim o parte din M2 împreună și oferim indicii la puzzle; copilul personalizează cea mai avansată variantă care îi funcționează. Rezervele nu înlocuiesc creația proprie.

## Salvare - 58-60 minute

O inspecție completă, apoi Stop din bara de sus și Reset Characters. Revino în galerie și redeschide proiectul. Copilul arată firul care oprește un exponat și mesajul care îl repornește. Înainte de fiecare probă completă: Stop, Reset Characters, steagul de sus.

## R1. Exponatul somnoros - încă 5 minute

Pornim de la M3. După inspecție, Pământul repornește automat, dar planeta cu inele rămâne nemișcată. Trebuie atinsă pentru a se trezi.

La Planetă, înlocuiește numai firul de repornire cu **Atingere → Stop → Rotire stânga 1 → Repetă mereu**. Stop evită două animații ale aceleiași planete dacă este atinsă când încă se rotește. Firele Steag și Primește roșu rămân. Pământul și paznicul păstrează toate programele din M3.

Probă: steag, atingere paznic, întoarcere. Pământul se mișcă; planeta stă. Atinge planeta abia după întoarcere: se mișcă și ea. Această regulă a atingerii face parte din joc; nu există o blocare automată a atingerii în timpul inspecției.

## R2. Inspecție pe rând - încă 10 minute

Pornim din M3, nu din R1. Paznicul verifică întâi Pământul, apoi planeta. Când primul este inspectat, al doilea continuă animația. Apoi rolurile se schimbă. La final ambele se rotesc.

| Personaj | Cele trei fire / cele două fire |
| --- | --- |
| Pământ | Steag → Rotire dreapta 1 → Repetă mereu; Primește roșu → Stop; Primește albastru → Rotire dreapta 1 → Repetă mereu |
| Planetă | Steag → Rotire stânga 1 → Repetă mereu; Primește albastru → Stop; Primește verde → Rotire stânga 1 → Repetă mereu |
| Paznic, firul 1 | Atingere → Stop → Acasă → Trimite roșu → Dreapta 4 → Așteaptă 10 → Trimite albastru |
| Paznic, firul 2 | Primește albastru → Dreapta 8 → Așteaptă 10 → Stânga 12 → Trimite verde |

**Albastrul face trei lucruri:** reia Pământul, oprește planeta și pornește al doilea fir al paznicului. Paznicul primește și propriul mesaj. Stop de la începutul lui oprește firele proprii rămase de la inspecția anterioară.

Păstrează albastrul la sfârșitul primului fir. În ScratchJr, un Trimite așteaptă terminarea firelor pe care le-a pornit. Un exponat care repetă mereu nu încheie acel fir; de aceea continuarea paznicului pornește separat la Primește albastru. Verdele rămâne ultimul în firul 2. Nu lega drumul către al doilea exponat după Trimite albastru în același fir.

Indiciu: dacă ambele se opresc de la început, cine mai primește roșu? Dacă paznicul nu continuă, are un fir separat cu plicul albastru deschis? Probează o inspecție completă, apoi încă una.

## Cum găsești ajutorul în PDF

Plan p. 1; scena p. 2; M1 p. 3; M2 p. 4-5; puzzle greu p. 6-7; creație p. 8-9; R1 p. 10-11; R2 p. 12-13. Fiecare etapă arată programele tuturor personajelor, inclusiv cele care nu se schimbă. Întâi copilul încearcă, apoi compară personajul selectat cu captura.

## Pregătirea profesorului și verificarea

Fișierele SJR sunt opționale pentru demonstrația profesorului. În [editorul comunitar](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), folosește Open din galerie și alege proiectul. Copiii construiesc totul în aplicația instalată. Pe K10 verifică înainte de oră atingerea, conectarea blocurilor, salvarea și funcționarea fără internet.

Cele șase exemple, scena fără cod și cele două colecții au fost importate în browser; animațiile și traseele au fost urmărite în timpul rulării. [Raport și limite](verificare/Muzeul_60min.md). Testul în browser nu reprezintă un test pe Android sau pe tableta Lenovo.

Reper pentru identificarea blocurilor: [ghidul oficial ScratchJr](https://www.scratchjr.org/explore/blocks). Povestea și puzzle-urile muzeului sunt construite pentru acest curs.
