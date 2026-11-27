# Lecția 4 - Repetiția pentru spectacol

**60 de minute · 6-7 ani · puzzle greu, 10 minute de creație și două rezerve.**

[Plan și programe cu capturi - PDF](Ghid_profesor_Lectia_04.pdf) · [Pagina lecției](index.html) · [Proiecte editabile](solutii_spectacol/README.md)

## Locul lecției în curs

**Reluăm:** Din autobuz: continuarea începe după terminarea acțiunii cerute.

**Ce adăugăm:** Repetarea finită a unui grup și acțiunea executată o singură dată după buclă.

**Verificăm înțelegerea:** Se văd A2, B3, A2, B3, apoi un singur final.

**Cum păstrăm ritmul:** Desenăm cu degetul ce intră în ramă și ce rămâne după ea. Numărul de blocuri poate scădea: dificultatea este gruparea și ordinea, nu lungimea programului.

Pentru un fir deja înțeles: prinde-l de primul bloc și trage-l peste miniatura personajului destinatar din lista din stânga. Selectează destinatarul și verifică acea copie. Firele rămân independente; schimbă numai culoarea, distanța sau întârzierea cerută. Dacă firul dispare din greșeală, folosește Undo. [Reper oficial](https://sites.bc.edu/scratchjr/learn/).

[Progresia celor zece lecții](../Progresia_cursului.md).
## Povestea pentru copii

„Mira și Radu pregătesc un număr pentru spectacolul școlii. Mira bate ritmul, Radu îi răspunde. La repetiția generală, dirijoarea dă intrările: fiecare își așteaptă rândul. Trebuie să repete de două ori și să termine împreună. Voi construiți programul spectacolului.”

Noutatea față de ștafetă, muzeu și autobuz: **Repetă de un număr precis de ori**, cu mai multe acțiuni în interior. La muzeu, Repetă mereu continua până la oprire. Aici bucla se termină singură și programul continuă cu blocurile de după ea.

## Pregătirea - 0-8 minute

1. Proiect nou, fundal **Theatre**, personajul **Teen** cu bluză roșie și pantaloni albaștri: **Mira - A**. Scoate pisica dacă urmezi modelul.
2. Pune Mira în stânga scenei, cu loc deasupra pentru săritură. La M2 adaugă celălalt **Teen**, cu tricou roșu și pantaloni gri: **Radu - B**, în dreapta. La M3 adaugă **Mother**, în față, la mijloc: **Dirijoare**.
3. Personajele au aproximativ 5 pătrățele înălțime; dirijoarea 4. Pozițiile exacte nu schimbă ritmurile. Păstrează viteza normală. Titlul ABC și numele pot fi scrise de profesor; nu sunt condiții pentru funcționare.
4. În categoria verde folosim **Pop**, deja în aplicație. Nu apăsăm microfonul, nu înregistrăm și nu descărcăm sunete. O bătaie în exemple este **Pop → Sari 1**: sunet, apoi o săritură vizibilă.

**Sari 1** stabilește înălțimea unei sărituri. **Repetă 3** stabilește de câte ori executăm grupul. **Așteaptă 10** înseamnă aproximativ o secundă.

**Cum construim bucla:** trage Repetă din categoria portocalie, conectează-l după declanșator, apoi pune blocurile în spațiul din interior. Rama se lărgește. Apasă numărul din partea dreaptă a buclei pentru a-l schimba. Un bloc lipit după săgeata de închidere se execută o singură dată, după toate repetările.

Pentru o probă: Stop sus dacă rulează, apoi Reset Characters. **M1-M2 pornesc cu Steagul sus. Din M3 pornim printr-o singură atingere pe dirijoarea de pe scenă.** Selectarea ei în lista din stânga doar arată codul. Așteptăm sfârșitul înainte de o nouă atingere.

## 1. Ritmul primului artist - 8-20 minute

**Ținta:** două bătăi, pauză; tot motivul de trei ori, apoi liniște. Șase bătăi în total.

| Personaj | Program complet |
| --- | --- |
| Mira - A | Steag → Repetă 3 { Pop → Sari 1 → Pop → Sari 1 → Așteaptă 10 } |

Construiește întâi motivul de două bătăi. Copiii îl mimează, apoi îl cuprind în Repetă 3. Nu copiem șase blocuri Pop. Acoladele din text arată interiorul buclei; nu sunt blocuri separate.

**Întrebare:** „Ce trebuie să se audă din nou: numai ultima bătaie sau tot motivul?” **Indiciu:** și pauza stă în ramă. **Probă:** urmărim trei grupuri de câte două sărituri și pauza dintre grupuri. Apoi programul se oprește singur.

## 2. Răspunsul colegului - 20-32 minute

**Ținta:** Mira face două bătăi; abia după aceea Radu face trei. Un singur Steag pornește totul.

Adaugă Radu. Pentru duet, înlocuiește motivul Mirei cu bucla scurtă de mai jos; nu lăsa vechiul fir cu Steag să ruleze în paralel.

| Personaj | Program complet |
| --- | --- |
| Mira - A | Steag → Repetă 2 { Pop → Sari 1 } → Trimite albastru |
| Radu - B | Primește albastru → Repetă 3 { Pop → Sari 1 } |

**Întrebare:** „Unde punem mesajul ca Radu să nu întrerupă?” **Indiciu:** după închiderea buclei. **Probă:** două sărituri la A, trei la B, fără suprapunere. Plic închis = trimite; plic deschis = primește. Culorile trebuie să coincidă.

## Pauză activă - 32-35 minute

O jumătate de clasă bate de două ori din palme; cealaltă răspunde de trei ori. Profesorul dirijează două runde și arată finalul. Copiii identifică grupul care se repetă: A apoi B.

## 3. Două runde, un singur start - 35-47 minute - puzzle greu

**Ținta:** atingem dirijoarea o singură dată. Ordinea este **A, B, A, B**. A face două bătăi, B trei. Dirijoarea spune „Gata!” numai la final. Folosim o buclă pentru runde, fără copierea întregii secvențe și fără pauze ghicite între artiști.

Adaugă Mother ca dirijoare. Mira primește acum portocaliu în loc de Steag și nu mai trimite albastru: dirijoarea dă ambele intrări. Radu își păstrează programul din M2.

| Personaj | Program complet |
| --- | --- |
| Mira - A | Primește portocaliu → Repetă 2 { Pop → Sari 1 } |
| Radu - B | Primește albastru → Repetă 3 { Pop → Sari 1 } |
| Dirijoare | Atingere → Repetă 2 { Trimite portocaliu → Trimite albastru } → Spune „Gata!” |

**De ce funcționează:** în ScratchJr, Trimite așteaptă terminarea programelor pornite de mesaj. Portocaliul așteaptă ritmul Mirei; albastrul așteaptă ritmul lui Radu. După două runde, bucla se închide și urmează replica. Niciun program al artiștilor nu conține Repetă mereu.

**Indicii, pe rând:** „Ce formează o rundă?”; „Cine dă rândul lui B?”; „Ce trebuie să rămână în afara buclei?” Arată soluția din PDF numai după o încercare.

**Probă:** A2, B3, A2, B3, apoi „Gata!”. Sunt 5 bătăi pe rundă și 10 în spectacol; numerele verifică programul, nu formează un test de matematică separat. Repetă proba după ce se termină. Dacă oprești în mijlocul unei sărituri, resetează înainte de reluare.

## Spectacolul meu - 47-57 minute

Copilul schimbă ritmul unuia sau al ambilor artiști: numărul bătăilor, locul pauzei, înălțimea săriturii. Poate alege alte personaje din biblioteca aplicației. Păstrează două runde, intrările pe rând și finalul.

**Exemplu posibil, nu model obligatoriu:** Mira: Primește portocaliu → Repetă 3 { Pop → Sari 1 }. Radu: Primește albastru → Repetă 2 { Pop → Sari 1 → Așteaptă 5 }. Dirijoarea păstrează codul din M3. Ordinea devine A3, B2, A3, B2; B are o pauză scurtă după fiecare bătaie.

Dacă nu a terminat M3, copilul personalizează duetul funcțional din M2. Toți păstrează timpul de creație. În clasă, volumul poate fi redus; săriturile fac ritmul vizibil.

## Probă și salvare - 57-60 minute

Copilul prezice ordinea, rulează o dată și arată blocul care decide numărul rundelor. Revine în galerie pentru salvare și redeschide proiectul. Profesorul urmărește: bucla cuprinde grupul dorit, artiștii intră pe rând, finalul apare după ultima rundă.

## R1. Ecoul fidel - rezervă, încă 5 minute

**Ținta:** Radu repetă exact ritmul Mirei, inclusiv pauza din mijloc. Două runde, pe rând.

| Personaj | Program complet |
| --- | --- |
| Mira - A | Primește portocaliu → Pop → Sari 1 → Așteaptă 10 → Pop → Sari 1 |
| Radu - B | Primește albastru → Pop → Sari 1 → Așteaptă 10 → Pop → Sari 1 |
| Dirijoare | Atingere → Repetă 2 { Trimite portocaliu → Trimite albastru } → Spune „Gata!” |

**Indiciu:** același număr de sunete nu este suficient; contează locul pauzei. **Probă:** A2, B2, A2, B2; o pauză lungă între cele două bătăi ale fiecărei intervenții. Amândoi rămân pe loc.

## R2. Bis în ordine inversă - rezervă, încă 10 minute

**Ținta:** cele două runde normale sunt urmate de un singur bis în ordinea B, A. Abia apoi apare „Gata!”.

| Personaj | Program complet |
| --- | --- |
| Mira - A | Primește portocaliu → Repetă 2 { Pop → Sari 1 } |
| Radu - B | Primește albastru → Repetă 3 { Pop → Sari 1 } |
| Dirijoare | Atingere → Repetă 2 { Trimite portocaliu → Trimite albastru } → Trimite albastru → Trimite portocaliu → Spune „Gata!” |

**Indiciu:** bisul se pune după buclă. **Probă:** A2, B3, A2, B3, B3, A2. Cele două intervenții consecutive ale lui B sunt corecte: una închide runda, cealaltă începe bisul. Nu adăugăm altă atingere.

## Materiale și verificare

PDF-ul are un plan de o pagină, pregătire și capturi reale cu programele fiecărui personaj la toate cele șase etape. Proiectele SJR sunt opționale pentru profesor; elevii construiesc din biblioteca aplicației, fără importuri. Reper pentru pregătire: [ghidul oficial al blocurilor](https://www.scratchjr.org/explore/blocks), categoriile Sunet și Control.

[Raportul probelor în browser](verificare/Spectacolul_60min.md). Testarea urmărește execuția, ordinea, pauzele și oprirea în ScratchJr Desktop Reborn. Confirmă local volumul Pop înainte de oră.
