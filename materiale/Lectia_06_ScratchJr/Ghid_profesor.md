# Lecția 6 - Robotul pregătește atelierul

**60 de minute · 6-7 ani · puzzle greu în baza lecției · 10 minute de creație · două rezerve.**

[Plan și capturi PDF](Ghid_profesor_Lectia_06.pdf) · [Starter fără cod](solutii_atelier/start.sjr) · [Toate soluțiile](solutii_atelier/README.md)

## Locul lecției în curs

**Reluăm:** Din autobuz: două scene; din curier: operații succesive și așteptarea finalizării.

**Ce adăugăm:** Reacția la contact: restul dispare numai când robotul îl atinge.

**Verificăm înțelegerea:** Un rest mutat în afara traseului rămâne; ușa se ridică complet înainte de traversare.

**Cum păstrăm ritmul:** Aceasta este prima creștere mare de volum. Construim un segment și un rest, apoi copiem firele la celelalte și schimbăm numai întârzierile. Testăm scena 1 și scena 2 separat înainte să le legăm la M4.

Pentru un fir deja înțeles: prinde-l de primul bloc și trage-l peste miniatura personajului destinatar din lista din stânga. Selectează destinatarul și verifică acea copie. Firele rămân independente; schimbă numai culoarea, distanța sau întârzierea cerută. Dacă firul dispare din greșeală, folosește Undo. [Reper oficial](https://sites.bc.edu/scratchjr/learn/).

[Progresia celor zece lecții](../Progresia_cursului.md).
## Povestea pentru copii

„Dimineața, atelierul trebuie pregătit înainte să înceapă lucrul. Robotul are nevoie de încărcare. Pe podea au rămas resturi, iar ușa de acces este închisă. Îl programăm să se încarce, să curețe podeaua și să deschidă ușa înainte să intre. La sfârșit, un singur steag trebuie să pornească întreaga misiune.”

Învățăm trei comportamente diferite: așteptarea unei operații, reacția la contact și coordonarea unui mecanism. Bateria este un indicator animat al încărcării, fără consum automat de energie. Curățenia folosește contactul dintre personaje; nu este detectare la distanță.

## Înainte de oră - pregătirea tabletelor

1. Descarcă [start.sjr](solutii_atelier/start.sjr). Conține două scene, robotul mare, încărcătorul, segmentele bateriei, trei resturi, ușa, cadrul ei și cele două butoane. Toate personajele sunt fără programe. Segmentele pornesc ascunse, dar sunt selectabile în lista din stânga. Resursele personalizate sunt incluse; nu copia imagini separat.
2. Pe laptop, în [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/app/home.html), apasă **Open** în galerie, alege fișierul și așteaptă cardul **L06 Pregătim atelierul - de la zero · v3.1**. Proiectele vechi cu bariere nu se actualizează automat.
3. Pe un Lenovo descarcă SJR-ul, apoi deschide-l din Fișiere/Descărcări cu ScratchJr, dacă aplicația este oferită. Verifică această rută, salvarea, redeschiderea și o rulare a `m4.sjr` înainte de distribuirea pe toate tabletele. Importul pe un Lenovo fizic nu a fost testat aici.
4. Pregătește starterul pe toate tabletele înaintea orei. Copiii construiesc în același proiect; soluțiile M1-M4 sunt repere pentru profesor. În timpul orei nu este necesară altă descărcare. Verifică volumul pentru Pop.

## 0-5 minute - citim cele două scene

**Scena 1:** robotul, încărcătorul și trei segmente. **Scena 2:** robotul, trei resturi, butonul verde, ușa și cadrul ei. Butonul roșu este pregătit pentru rezerva 2; până atunci rămâne fără cod.

Păstrăm mărimile și pozițiile din starter. Arată grila: un pas înseamnă un pătrățel. În scena 1, robotul înaintează 4 pași până la încărcător. În scena 2, resturile formează un traseu în sus și spre dreapta. Copiii pot urmări traseul cu degetul înainte să adauge blocuri.

**Înaintea fiecărei probe:** Stop dacă rulează, selectează scena, Reset Characters sus, apoi un steag. Pentru misiunea completă selectează **scena 1**. Blocul albastru „La poziția inițială” este săgeata curbată cu X, nu Stânga. Selectarea unui personaj din listă deschide codul lui; butonul roșu din rezervă se apasă pe scenă.

| Culoare | Cine primește | Rol |
| --- | --- | --- |
| Portocaliu | Încărcătorul | Pornește încărcarea |
| Galben | Cele trei segmente | Se aprind pe rând |
| Albastru | Butonul verde | Cere deschiderea |
| Mov | Ușa | Ridică ușa |
| Roșu | Robotul și ușa | Oprire de urgență, numai în R2 |

Plic închis = Trimite; plic deschis = Primește. Culoarea se alege din săgeată. **Trimite așteaptă terminarea programelor pornite de mesaj**; de aceea robotul poate aștepta încărcarea și ușa fără pauze ghicite.

## 5-17 minute - M1. Încărcarea

**Ținta:** robotul ajunge la încărcător, stă până se aprind cele trei segmente, apoi revine și spune „Încărcat!”. Lucrăm în scena 1.

Construim firul robotului și firul încărcătorului. La fiecare segment punem două fire separate: Steag → Ascunde și Primește galben → Așteaptă → Arată. La Așteaptă, 10 înseamnă o secundă; segmentele folosesc 10, 20 și 30, deci apar după una, două și trei secunde. Toate primesc același mesaj.

**Partea grea, pentru toți:** robotul așteaptă încărcătorul, iar încărcătorul așteaptă toate cele trei segmente. Stânga 4 se execută numai după ultimul segment. Nu punem câte un steag separat pe mișcarea de întoarcere.

### Încărcare - toate programele

| Personaj | Program complet |
| --- | --- |
| Robot | Steag → La poziția inițială → Dreapta 4 → Trimite portocaliu → Stânga 4 → Spune Încărcat! |
| Încărcător | Primește portocaliu → Trimite galben → Sunet Pop |
| Segment 1 | Steag → Ascunde |
| Segment 1 | Primește galben → Așteaptă 10 → Arată |
| Segment 2 | Steag → Ascunde |
| Segment 2 | Primește galben → Așteaptă 20 → Arată |
| Segment 3 | Steag → Ascunde |
| Segment 3 | Primește galben → Așteaptă 30 → Arată |


**Probă:** vedem trei aprinderi distincte; robotul rămâne lângă încărcător până la a treia. Repetăm după resetare: segmentele trebuie să pornească stinse.

## 17-32 minute - M2. Curățenia

**Ținta:** fiecare dintre cele trei resturi dispare la contact cu robotul și produce Pop. Lucrăm în scena 2. Ușa, cadrul, butonul verde și butonul roșu nu au încă programe.

La FIECARE rest construim Steag → Arată și La ciocnire → Ascunde → Pop. La ciocnire este blocul cu două siluete; blocul cu degetul ar cere atingerea ecranului. Robotul urmează traseul Dreapta 4 → Sus 4 → Dreapta 4 → Jos 4.

### Atelier - toate programele

| Personaj | Program complet |
| --- | --- |
| Cadrul ușii | Fără program |
| Ușă | Fără program |
| Robot | Steag → La poziția inițială → Dreapta 4 → Sus 4 → Dreapta 4 → Jos 4 → Spune Curat! |
| Buton verde | Fără program |
| Rest 1 | Steag → Arată |
| Rest 1 | La ciocnire → Ascunde → Sunet Pop |
| Rest 2 | Steag → Arată |
| Rest 2 | La ciocnire → Ascunde → Sunet Pop |
| Rest 3 | Steag → Arată |
| Rest 3 | La ciocnire → Ascunde → Sunet Pop |


**Partea grea, pentru toți:** numai robotul primește traseul. Resturile reacționează când sunt atinse; nu dispar toate la steag. Mută temporar primul rest în colțul de sus-stânga, departe de traseu, și probează același cod: acel rest trebuie să rămână. Readu-l la loc. Această probă arată diferența dintre contact și dispariția programată după un timp.

**Probă:** trei resturi dispărute, robotul înapoi pe linia de jos, ușa închisă. Copilul arată locul în care a fost atins fiecare rest.

## 32-39 minute - M3. Deschidem ușa

**Ținta:** după curățenie, robotul ajunge la butonul verde, ușa se ridică complet, apoi robotul intră. Continuăm scena 2 și păstrăm programele resturilor.

În firul robotului înlocuim „Curat!” cu Dreapta 2 → Trimite albastru → Dreapta 5 → Spune „Atelier pregătit!”. La butonul verde adăugăm Primește albastru → Pop → Trimite mov. Ușa primește mov și urcă 5 pași. Butonul este activat de mesajul robotului când acesta ajunge la el, nu de un clic al copilului.

### Atelier - toate programele

| Personaj | Program complet |
| --- | --- |
| Cadrul ușii | Fără program |
| Ușă | Steag → La poziția inițială |
| Ușă | Primește mov → Sus 5 |
| Robot | Steag → La poziția inițială → Dreapta 4 → Sus 4 → Dreapta 4 → Jos 4 → Dreapta 2 → Trimite albastru → Dreapta 5 → Spune Atelier pregătit! |
| Buton verde | Primește albastru → Sunet Pop → Trimite mov |
| Rest 1 | Steag → Arată |
| Rest 1 | La ciocnire → Ascunde → Sunet Pop |
| Rest 2 | Steag → Arată |
| Rest 2 | La ciocnire → Ascunde → Sunet Pop |
| Rest 3 | Steag → Arată |
| Rest 3 | La ciocnire → Ascunde → Sunet Pop |


**Partea grea, pentru toți:** robotul așteaptă butonul, iar butonul așteaptă ușa. Dreapta 5 vine după Trimite albastru. Dacă deplasarea este într-un alt fir cu Steag, robotul poate pleca prea devreme.

**Probă:** robotul stă lângă buton pe toată durata ridicării ușii. Abia după terminarea ei traversează. Cadrul ușii nu are program; se mișcă numai panoul.

## 39-47 minute - M4. Atelierul pregătit · puzzle greu pentru toți

**Ținta:** un singur steag din scena 1 pornește încărcarea, curățenia, deschiderea și intrarea. Nu apăsăm manual miniatura scenei 2 în timpul probei.

În scena 1 înlocuim replica „Încărcat!” cu **Pagina 2**, blocul roșu care arată miniatura celeilalte scene. În scena 2 păstrăm toate programele M3. La schimbarea paginii pornesc firele cu Steag de pe pagina nouă. Robotul din fiecare scenă este un personaj separat, cu propriul cod.

### Încărcare - toate programele

| Personaj | Program complet |
| --- | --- |
| Robot | Steag → La poziția inițială → Dreapta 4 → Trimite portocaliu → Stânga 4 → Pagina 2 |
| Încărcător | Primește portocaliu → Trimite galben → Sunet Pop |
| Segment 1 | Steag → Ascunde |
| Segment 1 | Primește galben → Așteaptă 10 → Arată |
| Segment 2 | Steag → Ascunde |
| Segment 2 | Primește galben → Așteaptă 20 → Arată |
| Segment 3 | Steag → Ascunde |
| Segment 3 | Primește galben → Așteaptă 30 → Arată |

### Atelier - toate programele

| Personaj | Program complet |
| --- | --- |
| Cadrul ușii | Fără program |
| Ușă | Steag → La poziția inițială |
| Ușă | Primește mov → Sus 5 |
| Robot | Steag → La poziția inițială → Dreapta 4 → Sus 4 → Dreapta 4 → Jos 4 → Dreapta 2 → Trimite albastru → Dreapta 5 → Spune Atelier pregătit! |
| Buton verde | Primește albastru → Sunet Pop → Trimite mov |
| Rest 1 | Steag → Arată |
| Rest 1 | La ciocnire → Ascunde → Sunet Pop |
| Rest 2 | Steag → Arată |
| Rest 2 | La ciocnire → Ascunde → Sunet Pop |
| Rest 3 | Steag → Arată |
| Rest 3 | La ciocnire → Ascunde → Sunet Pop |


**Verificăm patru condiții:** 1. Robotul așteaptă toate segmentele. 2. Scena se schimbă singură. 3. Toate cele trei resturi dispar. 4. Robotul așteaptă ușa înainte să intre. Resturile rămase se verifică vizual; programul nu le numără automat și nu blochează ușa în funcție de numărul lor.

**Indicii:** cine trimite mesajul, cine îl primește, ce trebuie să termine înainte de următorul bloc? Toți încearcă misiunea completă; ea nu este o rezervă pentru cei rapizi.

## 47-57 minute - Creația mea

Copiii aleg pozițiile celor trei resturi și construiesc o rută proprie. Păstrează încărcarea, curățarea la contact și așteptarea ușii. Nu așeza resturi peste ușă, butoane sau unele peste altele: La ciocnire reacționează la orice personaj atins. Lasă robotului loc să ajungă lângă buton pe linia de jos.

**Exemplul complet:** două resturi sunt sus, la 4 pătrățele distanță pe orizontală, iar al treilea este jos, sub cel din dreapta. Ruta devine Sus 4 → Dreapta 8 → Jos 4; apoi urmează aceleași Dreapta 2, albastru, Dreapta 5. Pozițiile sunt ilustrate în PDF. Copiii pot porni de la M2 dacă încă au nevoie de sprijin la mesaje.

### Încărcare - toate programele

| Personaj | Program complet |
| --- | --- |
| Robot | Steag → La poziția inițială → Dreapta 4 → Trimite portocaliu → Stânga 4 → Pagina 2 |
| Încărcător | Primește portocaliu → Trimite galben → Sunet Pop |
| Segment 1 | Steag → Ascunde |
| Segment 1 | Primește galben → Așteaptă 10 → Arată |
| Segment 2 | Steag → Ascunde |
| Segment 2 | Primește galben → Așteaptă 20 → Arată |
| Segment 3 | Steag → Ascunde |
| Segment 3 | Primește galben → Așteaptă 30 → Arată |

### Atelier - toate programele

| Personaj | Program complet |
| --- | --- |
| Cadrul ușii | Fără program |
| Ușă | Steag → La poziția inițială |
| Ușă | Primește mov → Sus 5 |
| Robot | Steag → La poziția inițială → Sus 4 → Dreapta 8 → Jos 4 → Dreapta 2 → Trimite albastru → Dreapta 5 → Spune Atelier pregătit! |
| Buton verde | Primește albastru → Sunet Pop → Trimite mov |
| Rest 1 | Steag → Arată |
| Rest 1 | La ciocnire → Ascunde → Sunet Pop |
| Rest 2 | Steag → Arată |
| Rest 2 | La ciocnire → Ascunde → Sunet Pop |
| Rest 3 | Steag → Arată |
| Rest 3 | La ciocnire → Ascunde → Sunet Pop |


## 57-60 minute - probă și salvare

Pornim din scena 1, după resetare. Copilul explică un lucru: de ce robotul așteaptă, cum dispare un rest sau de ce nu intră prin ușa închisă. Salvăm revenind în galerie; nume sugerat: „Atelierul - prenume”.

## Rezervă 1. Mai puțini pași - încă 5 minute

Păstrăm aceleași poziții ale resturilor ca în M4. Putem curăța tot cu o rută mai scurtă?

**Soluția testată:** Sus 3 și Jos 3 în loc de 4 și 4. Curățenia folosește 4 + 3 + 4 + 3 = 14 pași, în loc de 16. Celelalte deplasări nu se schimbă. Robotul ocupă o suprafață; centrele nu trebuie să coincidă pentru a exista contact. Aceasta este o soluție mai scurtă, nu o afirmație că nu există una și mai scurtă.

### Încărcare - toate programele

| Personaj | Program complet |
| --- | --- |
| Robot | Steag → La poziția inițială → Dreapta 4 → Trimite portocaliu → Stânga 4 → Pagina 2 |
| Încărcător | Primește portocaliu → Trimite galben → Sunet Pop |
| Segment 1 | Steag → Ascunde |
| Segment 1 | Primește galben → Așteaptă 10 → Arată |
| Segment 2 | Steag → Ascunde |
| Segment 2 | Primește galben → Așteaptă 20 → Arată |
| Segment 3 | Steag → Ascunde |
| Segment 3 | Primește galben → Așteaptă 30 → Arată |

### Atelier - toate programele

| Personaj | Program complet |
| --- | --- |
| Cadrul ușii | Fără program |
| Ușă | Steag → La poziția inițială |
| Ușă | Primește mov → Sus 5 |
| Robot | Steag → La poziția inițială → Dreapta 4 → Sus 3 → Dreapta 4 → Jos 3 → Dreapta 2 → Trimite albastru → Dreapta 5 → Spune Atelier pregătit! |
| Buton verde | Primește albastru → Sunet Pop → Trimite mov |
| Rest 1 | Steag → Arată |
| Rest 1 | La ciocnire → Ascunde → Sunet Pop |
| Rest 2 | Steag → Arată |
| Rest 2 | La ciocnire → Ascunde → Sunet Pop |
| Rest 3 | Steag → Arată |
| Rest 3 | La ciocnire → Ascunde → Sunet Pop |


**Probă:** aceleași trei resturi dispar; încărcarea și ușa se comportă la fel. Dacă un rest rămâne, verificăm mărimile și pozițiile înainte să mai scurtăm traseul.

## Rezervă 2. Oprire de urgență - încă 10 minute

Folosim butonul roșu deja inclus în scena 2. La el punem La atingere → Trimite roșu. Robotul și ușa primesc fiecare câte un fir nou Primește roșu → Stop. Robotul adaugă și replica „Oprit!”.

### Încărcare - toate programele

| Personaj | Program complet |
| --- | --- |
| Robot | Steag → La poziția inițială → Dreapta 4 → Trimite portocaliu → Stânga 4 → Pagina 2 |
| Încărcător | Primește portocaliu → Trimite galben → Sunet Pop |
| Segment 1 | Steag → Ascunde |
| Segment 1 | Primește galben → Așteaptă 10 → Arată |
| Segment 2 | Steag → Ascunde |
| Segment 2 | Primește galben → Așteaptă 20 → Arată |
| Segment 3 | Steag → Ascunde |
| Segment 3 | Primește galben → Așteaptă 30 → Arată |

### Atelier - toate programele

| Personaj | Program complet |
| --- | --- |
| Cadrul ușii | Fără program |
| Ușă | Steag → La poziția inițială |
| Ușă | Primește mov → Sus 5 |
| Ușă | Primește roșu → Stop |
| Robot | Steag → La poziția inițială → Dreapta 4 → Sus 4 → Dreapta 4 → Jos 4 → Dreapta 2 → Trimite albastru → Dreapta 5 → Spune Atelier pregătit! |
| Robot | Primește roșu → Stop → Spune Oprit! |
| Buton verde | Primește albastru → Sunet Pop → Trimite mov |
| Rest 1 | Steag → Arată |
| Rest 1 | La ciocnire → Ascunde → Sunet Pop |
| Rest 2 | Steag → Arată |
| Rest 2 | La ciocnire → Ascunde → Sunet Pop |
| Rest 3 | Steag → Arată |
| Rest 3 | La ciocnire → Ascunde → Sunet Pop |
| Oprire de urgență | La atingere → Trimite roșu |


**Partea grea:** Stop de la robot nu oprește ușa. Amândoi trebuie să primească roșu și să își oprească propriile programe. Niciun fir de deplasare nu trebuie să continue după oprire.

**Două probe:** apasă butonul roșu pe scenă în timp ce robotul merge; apoi reia de la început și apasă în timp ce ușa se ridică. În a doua probă ușa rămâne parțial ridicată și robotul rămâne lângă buton. Așteptăm câteva secunde: nimic nu repornește singur. Reluarea este de la început, cu scena 1, Reset Characters și steag; nu avem un buton de continuare din locul întrerupt.

## Când un copil se blochează

- Segmentul nu apare: verificăm Primește galben, Așteaptă și Arată; numele segmentului este în lista din stânga chiar când el e ascuns.
- Robotul pleacă înainte de încărcare: întoarcerea trebuie să fie după Trimite portocaliu, în același fir.
- Un rest nu dispare: verificăm contactul real, La ciocnire și Ascunde. Un rest așezat în decor nu are program.
- Resturile dispar imediat: la Steag punem Arată; Ascunde este în firul de contact. Nu suprapunem resturile peste alte personaje.
- Ușa se ridică, dar robotul pleacă prea devreme: verificăm lanțul albastru la buton și mov la ușă; traversarea urmează mesajul albastru.
- Scena 2 nu pornește singură: verificăm Pagina 2 la finalul robotului din scena 1 și Steag la robotul din scena 2.
- Butonul roșu oprește numai robotul: lipsește firul roșu cu Stop de la ușă.
- Un plic pare gol în portul web: deschide săgeata și reselectează culoarea; nu există un bloc gol de adăugat.

PDF: plan p. 1; pregătire p. 2; M1 p. 3-4; M2 p. 5-6; M3 p. 7-8; M4 p. 9-12; creație p. 13-16; R1 p. 17-20; R2 p. 21-25. În PDF-ul cursului adaugă 61. Toate programele sunt incluse, chiar când o parte rămâne neschimbată.

[Raportul testării în browser](verificare/Atelierul_60min.md) · [Varianta anterioară cu bariere](README_inspectie_v2.md).
