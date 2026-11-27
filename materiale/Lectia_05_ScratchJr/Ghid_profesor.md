# Lecția 5 - Robotul curier

**60 de minute · 6-7 ani · toate părțile dificile în lecția de bază · 10 minute de creație · două rezerve.**

[PDF cu plan și toate programele ilustrate](Ghid_profesor_Lectia_05.pdf) · [Pagina lecției](index.html) · [Proiecte editabile](solutii_curier/README.md)

## Povestea pentru copii

„În sala de sport începe antrenamentul. Mingile sunt încă în magazie. Un vehicul automat poate duce o singură minge pe platformă. Trebuie să se încarce, să livreze mingea, să revină gol și să plece cu următoarea. Voi îl programați. După pornire, nimeni nu îl mai conduce cu mâna.”

**Ideea de robotică:** un ciclu de lucru complet, cu încărcare, transport, descărcare și întoarcere. Mașina **Car** reprezintă vehiculul automat; mingile sunt încărcătura. Este o simulare pe ecran, fără conectare la un robot fizic. Mișcările de încărcare reprezintă o instalație automată; nu simulăm un braț sau gravitația.

Față de ștafetă, aici același vehicul face două curse și se întoarce fără marfă. Mingea are propriul program: **nu se atașează automat mașinii**. Două programe identice o țin pe platformă în timpul transportului.

## Pregătirea - 0-8 minute

1. Proiect nou. Alege fundalul **Gym**, personajele **Car** și **Soccerball**. Scoate pisica. La M3 adăugăm **Basketball**; la creație, opțional **Fence**. Toate sunt în biblioteca instalată. Nicio descărcare, desen sau import obligatoriu.
2. Activează grila. Micșorează mașina până are aproximativ **5½ pătrățele lățime**, iar mingea până are **un pătrățel diametru**. Pune blocul mov Micșorează singur în zona de cod, fără Steag sau Atingere, și apasă direct pe el; după dimensionare îl scoți. Pune mijlocul mașinii la aproximativ **6 pătrățele de marginea stângă**, jos. Lasă spre dreapta loc pentru transportul de 8 pași și încă 5 pași de descărcare a baschetului.
3. Stabilește locul mingii pe mijlocul plafonului. Poziția de plecare a mingii de fotbal este **3 pătrățele mai jos și 2 la stânga** de acel punct. Mingea de baschet va pleca **3 mai jos și 4 la stânga**. Captura cu grilă din PDF arată modelul. Dacă mingea nu ajunge pe plafon, ajustăm poziția inițială, apoi resetăm și probăm din nou.
4. Pune vehiculul și mingile la viteza normală. Titlurile și etichetele ABC sunt opționale; profesorul le poate scrie. Numele personajelor pot rămâne cele din bibliotecă.

**Înaintea fiecărei probe:** Stop dacă rulează, apoi **Reset Characters** (butonul albastru de sus, cu săgeata spre punctul de pornire). Abia apoi atinge mașina **pe scenă o singură dată**. Steagul nu pornește aceste programe. Selectarea mașinii în lista din stânga doar deschide codul. Așteaptă sfârșitul; nu apăsa repetat. Resetarea readuce și mingile livrate în magazie.

Plic închis = **Trimite**; plic deschis = **Primește**. Apasă săgeata de sub plic pentru culoare. În ScratchJr, Trimite așteaptă terminarea programelor pornite de acel mesaj înainte de următorul bloc din firul său. De aceea folosim mesaje, fără pauze ghicite.

| Culoare | Ce pornește | Cine primește |
| --- | --- | --- |
| Portocaliu | Întreaga livrare a mingii de fotbal | Mingea de fotbal |
| Albastru | Transportul încărcat al mingii de fotbal | Mașina ȘI mingea de fotbal |
| Verde | Întreaga livrare a mingii de baschet | Mingea de baschet |
| Mov | Transportul încărcat al mingii de baschet | Mașina ȘI mingea de baschet |

Introducem primele două culori la M1-M2 și celelalte la M3. Blocurile mișcă spre direcțiile de pe ecran: Stânga rămâne stânga chiar dacă mașina și-a schimbat orientarea.

## 1. Încărcarea corectă - 8-18 minute

**Ținta:** o atingere pe mașină ridică mingea din magazie și o așază vizibil pe plafon. Vehiculul încă nu pleacă.

| Personaj | Program complet |
| --- | --- |
| Robot curier | Atingere → Trimite portocaliu |
| Minge fotbal | Primește portocaliu → Sus 3 → Dreapta 2 |

**Partea dificilă, pentru toți:** mingea trebuie să se oprească exact pe platformă, fără Ascunde sau Salt la început. „De unde pleacă și cât îi lipsește până la plafon?” Distanțele vin din scenă; dacă schimbi locul magaziei trebuie să schimbi și codul. Probă: mingea stă pe plafon, mașina rămâne pe loc.

## 2. Livrare și întoarcere - 18-32 minute

**Ținta:** mașina așteaptă încărcarea, merge cu mingea 8 pași, așteaptă descărcarea și revine goală 8 pași. Mingea rămâne la antrenament. Finalul este „Livrat!”.

Extinde firul portocaliu al mingii; adaugă câte un fir albastru la mașină și la minge. Sunt **două programe separate la fiecare personaj**, nu un singur șir cu doi declanșatori.

| Personaj | Program complet |
| --- | --- |
| Robot curier | Atingere → Trimite portocaliu → Stânga 8 → Spune Livrat! |
| Robot curier | Primește albastru → Dreapta 8 |
| Minge fotbal | Primește portocaliu → Sus 3 → Dreapta 2 → Trimite albastru → Dreapta 3 → Jos 3 |
| Minge fotbal | Primește albastru → Dreapta 8 |

**Partea dificilă, pentru toți:** la albastru, mașina și mingea execută simultan Dreapta 8. Firul portocaliu al mingii așteaptă aceste mișcări, apoi o descarcă: Dreapta 3 și Jos 3. Abia când s-a terminat tot firul portocaliu, mașina execută Stânga 8. Nu adăugăm Așteaptă și nu întoarcem mingea cu mașina.

**Indiciu:** „Ce trebuie să termine mingea înainte să se întoarcă robotul?” **Probă:** urmărește separat încărcarea, drumul împreună, descărcarea și returul gol. Pornește numai după resetare.

## Pauză activă - 32-35 minute

Un copil mimează vehiculul, altul magazia. „Încărcat!” permite plecarea; „Descărcat!” permite întoarcerea. Clasa spune când ar fi prea devreme să plece. Nu avem nevoie de alte materiale.

## 3. Două livrări autonome - 35-48 minute · puzzle greu de bază

**Ținta:** o singură atingere livrează întâi mingea de fotbal, apoi pe cea de baschet. Robotul se întoarce în magazie după fiecare cursă. Ambele mingi rămân la destinație. „Livrate!” apare numai după al doilea retur.

Adaugă Basketball, la 4 pătrățele la stânga și 3 mai jos de locul de încărcare. Păstrează cele două fire ale mingii de fotbal. Adaugă cele două fire ale mingii de baschet și al treilea fir al mașinii. Extinde firul cu Atingere al mașinii.

| Personaj | Program complet |
| --- | --- |
| Robot curier | Atingere → Trimite portocaliu → Stânga 8 → Trimite verde → Stânga 8 → Spune Livrate! |
| Robot curier | Primește albastru → Dreapta 8 |
| Robot curier | Primește mov → Dreapta 8 |
| Minge fotbal | Primește portocaliu → Sus 3 → Dreapta 2 → Trimite albastru → Dreapta 3 → Jos 3 |
| Minge fotbal | Primește albastru → Dreapta 8 |
| Minge baschet | Primește verde → Sus 3 → Dreapta 4 → Trimite mov → Dreapta 5 → Jos 3 |
| Minge baschet | Primește mov → Dreapta 8 |

**Partea dificilă, pentru toți:** verdele stă DUPĂ primul Stânga 8. A doua minge nu pleacă în timp ce mașina este la destinație. Mingile pornesc din locuri diferite și se descarcă în locuri diferite: fotbalul face 2 pași la încărcare și 3 la descărcare; baschetul 4 și 5. Nu schimbăm transportul comun de 8 pași.

**Indicii progresive:** 1. Urmărește firul mașinii cu degetul. 2. Între cele două plicuri lipsește drumul până în magazie? 3. Verifică albastru la ambii participanți ai primei curse și mov la ambii participanți ai celei de-a doua.

**Probă:** o atingere, două încărcări, două transporturi, două descărcări, două retururi. Nicio atingere suplimentară. Resetăm și repetăm; salvăm, redeschidem și repetăm din nou cu resetare.

## Creația mea - 48-58 minute

Copiii aleg o modificare de program: alt loc al magaziei, alte puncte de livrare sau un ocol. Păstrăm încărcarea vizibilă, două curse și întoarcerea goală. Toți au acest timp; nu este o recompensă pentru terminarea rapidă. Pot porni de la cea mai avansată variantă care le funcționează.

**Exemplu complet: Ocolim în ambele sensuri.** Adaugă Fence între magazie și destinație. În model, gardul are puțin peste 2 pătrățele lățime și este pe linia mașinii, la mijlocul drumului. Transportul devine Sus 3 → Dreapta 8 → Jos 3 la **toate cele patru fire** de transport: albastru și mov la mașină, albastru la fotbal, mov la baschet. Fiecare retur gol devine Sus 3 → Stânga 8 → Jos 3. Gardul nu are cod.

| Personaj | Program complet |
| --- | --- |
| Robot curier | Atingere → Trimite portocaliu → Sus 3 → Stânga 8 → Jos 3 → Trimite verde → Sus 3 → Stânga 8 → Jos 3 → Spune Livrate! |
| Robot curier | Primește albastru → Sus 3 → Dreapta 8 → Jos 3 |
| Robot curier | Primește mov → Sus 3 → Dreapta 8 → Jos 3 |
| Minge fotbal | Primește portocaliu → Sus 3 → Dreapta 2 → Trimite albastru → Dreapta 3 → Jos 3 |
| Minge fotbal | Primește albastru → Sus 3 → Dreapta 8 → Jos 3 |
| Minge baschet | Primește verde → Sus 3 → Dreapta 4 → Trimite mov → Dreapta 5 → Jos 3 |
| Minge baschet | Primește mov → Sus 3 → Dreapta 8 → Jos 3 |
| Zonă închisă | Fără program; obstacol vizibil |

**Partea dificilă este inclusă în exemplu:** ocolește și la întoarcere! Nu lăsa Stânga 8 singur în firul mașinii. Gardul nu oprește automat personajele; ocolirea rezultă din program. La altă înălțime a ocolului, toate cele patru fire încărcate trebuie să rămână identice, cu Sus și Jos egale. Verifică și spațiul ocupat de întreaga mașină, nu numai centrul ei.

## Probă și salvare - 58-60 minute

Reset Characters, apoi o singură atingere. Copilul arată blocul care pornește a doua comandă și explică de ce robotul așteaptă mingea. Revenim în galerie pentru salvare. Nume sugerat: „Curierul - prenume”.

## Rezervă 1. Încărcare lentă - încă 5 minute

Pornim de la M3, pe traseul drept. Mingea de fotbal se încarcă lent; robotul așteaptă fără să adăugăm pauze. Înainte să trimită albastru, mingea revine la **viteza normală**, pentru a merge împreună cu mașina. Baschetul nu se schimbă. Alegem vitezele din blocul portocaliu Viteză: lentă, apoi normală.

| Personaj | Program complet |
| --- | --- |
| Robot curier | Atingere → Trimite portocaliu → Stânga 8 → Trimite verde → Stânga 8 → Spune Livrate! |
| Robot curier | Primește albastru → Dreapta 8 |
| Robot curier | Primește mov → Dreapta 8 |
| Minge fotbal | Primește portocaliu → Viteză lentă → Sus 3 → Dreapta 2 → Viteză normală → Trimite albastru → Dreapta 3 → Jos 3 |
| Minge fotbal | Primește albastru → Dreapta 8 |
| Minge baschet | Primește verde → Sus 3 → Dreapta 4 → Trimite mov → Dreapta 5 → Jos 3 |
| Minge baschet | Primește mov → Dreapta 8 |

**Probă:** încărcarea durează mai mult; vehiculul rămâne pe loc. Mingea nu rămâne în urmă la transport. Finalul și cele două retururi sunt aceleași.

## Rezervă 2. Comanda urgentă - încă 10 minute

Pornim de la M3, pe traseul drept. Echipa de baschet are nevoie prima de minge. Inversăm numai cele două comenzi din firul Atingere: verde, retur, portocaliu, retur. Programele mingilor și firele de transport rămân complete mai jos, ca referință.

| Personaj | Program complet |
| --- | --- |
| Robot curier | Atingere → Trimite verde → Stânga 8 → Trimite portocaliu → Stânga 8 → Spune Livrate! |
| Robot curier | Primește albastru → Dreapta 8 |
| Robot curier | Primește mov → Dreapta 8 |
| Minge fotbal | Primește portocaliu → Sus 3 → Dreapta 2 → Trimite albastru → Dreapta 3 → Jos 3 |
| Minge fotbal | Primește albastru → Dreapta 8 |
| Minge baschet | Primește verde → Sus 3 → Dreapta 4 → Trimite mov → Dreapta 5 → Jos 3 |
| Minge baschet | Primește mov → Dreapta 8 |

**Probă:** baschetul este livrat primul. Fotbalul așteaptă returul mașinii. Fiecare minge ajunge la locul ei; „Livrate!” apare la sfârșit.

## Când un copil se blochează

- Mingea nu ajunge pe plafon: resetăm și verificăm poziția inițială, mărimea și cei 3 pași în sus. Nu o mutăm cu degetul în timpul probei.
- Mingea merge, mașina rămâne: verificăm culoarea și existența firului Primește la mașină.
- Se mișcă separat: transportul trebuie să aibă aceleași blocuri, valori și viteze la ambele personaje.
- A doua cursă pornește din loc greșit: verdele trebuie să urmeze primul retur, nu să fie într-un fir Atingere separat.
- La a doua probă mingile sunt la destinație: Stop, Reset Characters, apoi atinge mașina. Programele sunt construite pentru pozițiile de pornire.

PDF-ul are **12 pagini**: plan p. 1; pregătire p. 2; M1 p. 3; M2 p. 4; M3 p. 5-6; creație p. 7-8; R1 p. 9-10; R2 p. 11-12. În PDF-ul cursului, adaugă 49 la aceste pagini. Fiecare variantă are toate programele, inclusiv cele neschimbate și dificile.

[Testarea efectuată în browser](verificare/Curierul_60min.md). Proiectele sunt referințe opționale pentru profesor; copiii construiesc direct în aplicația deja instalată.
