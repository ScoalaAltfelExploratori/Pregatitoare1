# Lecția 8 - Robotul submarin: recuperăm capsula de cercetare

60 de minute · 6-7 ani · puzzle greu în bază · 10 minute de creație · două rezerve suplimentare.

[Plan și programe cu capturi](Ghid_profesor_Lectia_08.pdf) · [Proiect de pornire](solutii_submarin/start.sjr) · [Toate soluțiile](solutii_submarin/README.md).

## Povestea pentru copii

„O capsulă cu măsurători s-a desprins de la stația de cercetare și a ajuns pe fundul mării. Robotul submarin poate ajunge la ea. Noi îi construim telecomanda: trebuie să ocolească stânca, să prindă capsula și să o aducă pe platformă. După depunere, robotul trebuie să poată pleca singur la următoarea misiune.”

Noutatea față de fabrică: pilotul decide următoarea mișcare în timpul rulării. Același robot lucrează gol sau încărcat. Mesajele coordonează telecomanda și sarcina; apariția unui buton arată ce acțiune este disponibilă.

## Înaintea orei

Importă numai start.sjr pe fiecare tabletă. Cardul este **L08 Robotul submarin - de la zero · v1.3**. Toate cele 12 personaje sunt fără programe; resursele sunt deja incluse. Nu copiem imagini separat. Verifică importul și redeschiderea pe un Lenovo al școlii; testele acestui pachet au folosit portul din browser.

Păstrează pozițiile și dimensiunile starterului. Platforma și stânca sunt repere. Capsula are trei copii: pe fund, transportată și livrată. Ultimele două sunt ascunse la început, ca și butoanele Depune și Întoarcere. Personajele ascunse pot fi selectate în lista din stânga. M1, M2 și M3 se construiesc în același proiect; soluțiile separate sunt repere, nu importuri obligatorii la fiecare pas.

Pentru probe: un steag pornește stația. Butonul devine Stop și rămâne așa în timpul pilotajului. **O apăsare de săgeată, apoi așteptăm terminarea mișcării.** Pentru reluare: Stop, apoi Steag. Nu apăsăm steagul între două comenzi. Salvare: Stop, revenire în galerie, redeschidere.

## 0-7 minute - Citim scena

Arată capsula, cleștele, platforma și stânca. Copiii propun traseul fără să miște robotul cu degetul. Verificăm grila: o apăsare Dreapta/Stânga va însemna 2 pătrățele; Sus/Jos, 1 pătrățel. Stânca trebuie ocolită și cu încărcătura, nu doar cu corpul robotului.

Întrebarea orei: „Cum facem ca robotul și capsula să rămână împreună, chiar când schimbăm direcția?”

## 7-20 minute - M1. Telecomanda

**Țintă:** patru butoane comandă același robot. Dreapta, Jos, Stânga, Sus îl aduc înapoi la punctul de pornire.

1. Platforma: Steag → Așteaptă 10 → Repetă mereu. Aceasta este stația care rămâne pornită cât timp așteaptă comenzile pilotului. Folosim blocul roșu Repetă mereu, nu rama portocalie cu număr.
2. Robotul: Steag → La poziția inițială → Arată → Viteză normală.
3. Buton Stânga: La atingere → Trimite roșu. Robotul: un fir separat Primește roșu → Stânga 2. Fă această pereche împreună cu ei, apoi fiecare construiește celelalte trei.
4. Buton Dreapta trimite portocaliu; robotul primește portocaliu și face Dreapta 2. Sus trimite galben, robotul face Sus 1. Jos trimite albastru, robotul face Jos 1.
5. La fiecare săgeată: Steag → Arată. La Capsula de pe fund: Steag → Arată. Celelalte copii și cele două butoane speciale rămân fără cod, ascunse.

**Probă:** steag; Dreapta, Jos, Stânga, Sus. Copilul arată o pereche de plicuri și explică cine trimite și cine execută. Dacă robotul nu răspunde, verificăm culoarea, conectarea și personajul selectat. Nu înlocuim cele patru fire cu un singur traseu automat.

## 20-32 minute - M2. Recuperarea

**Țintă:** ajungem deasupra capsulei, coborâm și o ridicăm vizibil sub clește. Capsula de pe fund nu dispare până la contact.

1. Selectează Capsula transportată din listă. Steag → La poziția inițială → Ascunde → Viteză normală. Poziția ei inițială este sub cleștele robotului, nu pe fundul mării.
2. Copiază cele patru fire cu mesaje de mișcare de la robot la această capsulă. În ScratchJr poți trage un fir în miniatura altui personaj. Verifică fiecare culoare și număr după copiere. Ambele personaje trebuie să răspundă la aceleași patru comenzi.
3. Capsula de pe fund: un fir nou La ciocnire → Așteaptă 5 → Ascunde → Trimite verde. Pauza scurtă lasă cleștele să termine coborârea. Păstrează Steag → Arată.
4. Capsula transportată: Primește verde → Arată. Ea a urmat invizibil robotul; apare exact în locul capsulei de pe fund.

**Probă:** Stop, Steag; 5 apăsări Dreapta, apoi 5 Jos. Așteaptă să se termine prinderea. Apasă Sus: capsula trebuie să urce sub clește. În M2 nu există încă depunere.

**Indicii:** „Cine primește plicul albastru?” → „Ambele imagini au același număr?” → „De unde pornește copia ascunsă?” Nu mutăm cu degetul doar copia transportată ca să reparăm decalajul: refacem poziția din starter și perechile de programe.

## 32-47 minute - M3. Misiunea completă | dificil, pentru toți

**Țintă:** recuperăm, ocolim stânca, depunem pe platformă și plecăm cu robotul gol. Toate aceste părți sunt în baza orei.

1. Capsula transportată: adaugă Primește mov → Ascunde.
2. Capsula livrată: Steag → Ascunde; separat Primește mov → Arată. Această copie este deja așezată pe marcajul platformei; nu îi adăuga săgeți de deplasare.
3. Buton Depune: Steag → Ascunde; Primește verde → Arată; La atingere → Ascunde → Trimite mov. Astfel apare abia după prindere și dispare după folosire.
4. Păstrăm toate firele din M1 și M2. Buton Întoarcere rămâne fără cod și ascuns.

**Traseu de verificare:** 5 Dreapta, 5 Jos; după prindere, 5 Sus, 5 Stânga. Capsula ajunge deasupra marcajului verde. Apasă Depune și așteaptă schimbarea. Apoi Dreapta: robotul pleacă, capsula rămâne pe platformă.

**Criterii:** capsula apare sub clește; rămâne la aceeași distanță în toate direcțiile; ocolim stânca; depunem aliniat; capsula livrată nu urmează robotul; o nouă pornire reface scena.

**Reguli ale simulării:** stânca nu blochează automat robotul. Copilul verifică vizual traseul. Butonul Depune nu testează poziția robotului: îl folosim numai deasupra platformei. O apăsare în alt loc ar schimba imaginile și ar face capsula să pară că sare pe platformă; aceasta nu este o livrare corectă. La ciocnire reacționează la orice personaj vizibil, de aceea nu mutăm decorul peste capsulă.

## 47-57 minute - Pilotajul meu

Copilul alege o poziție nouă a capsulei, pe aceeași linie de fund, și decide cât de fin răspunde telecomanda. Modifică pașii orizontali la robot **și** la copia transportată. Înainte de probă spune traseul; după probă explică o schimbare.

Exemplul din soluție: capsula este cu un pătrățel mai la dreapta. Stânga/Dreapta devin câte 1 pas pentru ambele personaje. 11 Dreapta, 5 Jos; după prindere 5 Sus, 11 Stânga, Depune. Exemplul este o posibilitate, nu o cerință pentru toată clasa. Păstrăm platforma, distanța robot-capsulă și spațiul pentru ocolire.

## 57-60 minute - Probă și salvare

Copilul arată capsula rămasă pe platformă și mișcă robotul gol. Explică unul dintre plicuri sau motivul pentru care două personaje primesc aceeași comandă. Stop, Steag pentru resetare, Stop, apoi salvare în galerie și redeschidere.

## Rezerva 1 - Transport fragil | +5-8 minute

Capsula conține un senzor sensibil. Robotul merge normal când este gol și lent când o transportă. Pornim din M3.

Robotul primește verde → Viteză lentă; mov → Viteză normală. La capsula transportată, după Arată din firul verde punem Viteză lentă; după Ascunde din firul mov punem Viteză normală. Steagul setează normal la ambele. Nu schimbăm distanțele.

**Probă:** drumul încărcat durează mai mult, dar capsula nu rămâne în urmă. După Depune, o apăsare Dreapta mută robotul gol cu viteza normală. Dacă schimbăm viteza doar la unul, încărcătura se desface de clește.

## Rezerva 2 - Întoarcere automată | +8-10 minute

După prindere, pilotul pornește un traseu automat cunoscut. Pornim separat din M3, cu viteza normală și pași orizontali de 2; nu din R1 sau din creație.

1. La fiecare săgeată: Primește verde → Ascunde; Primește mov → Arată. Păstrăm cele două fire inițiale. Din momentul prinderii, pilotul nu mai poate schimba traseul manual.
2. Buton Întoarcere: Steag → Ascunde; Primește verde → Arată. La atingere → Ascunde → Repetă 5 { Trimite galben } → Repetă 5 { Trimite roșu } → Trimite mov.
3. Buton Depune rămâne ascuns și fără programe în această variantă. Depunerea este ultima comandă a traseului automat.

**Probă:** 5 Dreapta, 5 Jos, așteptăm prinderea, apoi o singură atingere a butonului Întoarcere. Săgețile dispar, robotul urcă, revine, depune. Săgețile apar din nou; robotul poate pleca gol. Apăsările în locul săgeților ascunse nu schimbă traseul. Dacă mutăm capsula sau schimbăm pasul, recalculăm buclele: programul nu caută singur platforma.

## Programele complete, etapă cu etapă

Fiecare rând este un fir separat. PDF-ul arată aceleași programe în capturi reale, inclusiv firele păstrate din etapa anterioară. Repetă mereu este blocul roșu; Repetă 5 este rama portocalie. Platforma are programul stației; Stânca nu are cod.

### 1. Telecomanda

| Personaj | Program complet |
| --- | --- |
| Platforma | Steag → Așteaptă 10 → Repetă mereu |
| Stânca | Fără program |
| Capsula de pe fund | Steag → Arată |
| Capsula livrată | Fără program · ascuns |
| Capsula transportată | Fără program · ascuns |
| Robot submarin | Steag → La poziția inițială → Arată → Viteză normală |
| Robot submarin | Primește roșu → Stânga 2 |
| Robot submarin | Primește portocaliu → Dreapta 2 |
| Robot submarin | Primește galben → Sus 1 |
| Robot submarin | Primește albastru → Jos 1 |
| Buton Stânga | La atingere → Trimite roșu |
| Buton Stânga | Steag → Arată |
| Buton Dreapta | La atingere → Trimite portocaliu |
| Buton Dreapta | Steag → Arată |
| Buton Sus | La atingere → Trimite galben |
| Buton Sus | Steag → Arată |
| Buton Jos | La atingere → Trimite albastru |
| Buton Jos | Steag → Arată |
| Buton Depune | Fără program · ascuns |
| Buton Întoarcere | Fără program · ascuns |

### 2. Recuperarea

| Personaj | Program complet |
| --- | --- |
| Platforma | Steag → Așteaptă 10 → Repetă mereu |
| Stânca | Fără program |
| Capsula de pe fund | Steag → Arată |
| Capsula de pe fund | La ciocnire → Așteaptă 5 → Ascunde → Trimite verde |
| Capsula livrată | Fără program · ascuns |
| Capsula transportată | Steag → La poziția inițială → Ascunde → Viteză normală |
| Capsula transportată | Primește roșu → Stânga 2 |
| Capsula transportată | Primește portocaliu → Dreapta 2 |
| Capsula transportată | Primește galben → Sus 1 |
| Capsula transportată | Primește albastru → Jos 1 |
| Capsula transportată | Primește verde → Arată |
| Robot submarin | Steag → La poziția inițială → Arată → Viteză normală |
| Robot submarin | Primește roșu → Stânga 2 |
| Robot submarin | Primește portocaliu → Dreapta 2 |
| Robot submarin | Primește galben → Sus 1 |
| Robot submarin | Primește albastru → Jos 1 |
| Buton Stânga | La atingere → Trimite roșu |
| Buton Stânga | Steag → Arată |
| Buton Dreapta | La atingere → Trimite portocaliu |
| Buton Dreapta | Steag → Arată |
| Buton Sus | La atingere → Trimite galben |
| Buton Sus | Steag → Arată |
| Buton Jos | La atingere → Trimite albastru |
| Buton Jos | Steag → Arată |
| Buton Depune | Fără program · ascuns |
| Buton Întoarcere | Fără program · ascuns |

### 3. Misiunea completă

| Personaj | Program complet |
| --- | --- |
| Platforma | Steag → Așteaptă 10 → Repetă mereu |
| Stânca | Fără program |
| Capsula de pe fund | Steag → Arată |
| Capsula de pe fund | La ciocnire → Așteaptă 5 → Ascunde → Trimite verde |
| Capsula livrată | Steag → Ascunde |
| Capsula livrată | Primește mov → Arată |
| Capsula transportată | Steag → La poziția inițială → Ascunde → Viteză normală |
| Capsula transportată | Primește roșu → Stânga 2 |
| Capsula transportată | Primește portocaliu → Dreapta 2 |
| Capsula transportată | Primește galben → Sus 1 |
| Capsula transportată | Primește albastru → Jos 1 |
| Capsula transportată | Primește verde → Arată |
| Capsula transportată | Primește mov → Ascunde |
| Robot submarin | Steag → La poziția inițială → Arată → Viteză normală |
| Robot submarin | Primește roșu → Stânga 2 |
| Robot submarin | Primește portocaliu → Dreapta 2 |
| Robot submarin | Primește galben → Sus 1 |
| Robot submarin | Primește albastru → Jos 1 |
| Buton Stânga | La atingere → Trimite roșu |
| Buton Stânga | Steag → Arată |
| Buton Dreapta | La atingere → Trimite portocaliu |
| Buton Dreapta | Steag → Arată |
| Buton Sus | La atingere → Trimite galben |
| Buton Sus | Steag → Arată |
| Buton Jos | La atingere → Trimite albastru |
| Buton Jos | Steag → Arată |
| Buton Depune | Steag → Ascunde |
| Buton Depune | Primește verde → Arată |
| Buton Depune | La atingere → Ascunde → Trimite mov |
| Buton Întoarcere | Fără program · ascuns |

### 4. Pilotaj de precizie

| Personaj | Program complet |
| --- | --- |
| Platforma | Steag → Așteaptă 10 → Repetă mereu |
| Stânca | Fără program |
| Capsula de pe fund | Steag → Arată |
| Capsula de pe fund | La ciocnire → Așteaptă 5 → Ascunde → Trimite verde |
| Capsula livrată | Steag → Ascunde |
| Capsula livrată | Primește mov → Arată |
| Capsula transportată | Steag → La poziția inițială → Ascunde → Viteză normală |
| Capsula transportată | Primește roșu → Stânga 1 |
| Capsula transportată | Primește portocaliu → Dreapta 1 |
| Capsula transportată | Primește galben → Sus 1 |
| Capsula transportată | Primește albastru → Jos 1 |
| Capsula transportată | Primește verde → Arată |
| Capsula transportată | Primește mov → Ascunde |
| Robot submarin | Steag → La poziția inițială → Arată → Viteză normală |
| Robot submarin | Primește roșu → Stânga 1 |
| Robot submarin | Primește portocaliu → Dreapta 1 |
| Robot submarin | Primește galben → Sus 1 |
| Robot submarin | Primește albastru → Jos 1 |
| Buton Stânga | La atingere → Trimite roșu |
| Buton Stânga | Steag → Arată |
| Buton Dreapta | La atingere → Trimite portocaliu |
| Buton Dreapta | Steag → Arată |
| Buton Sus | La atingere → Trimite galben |
| Buton Sus | Steag → Arată |
| Buton Jos | La atingere → Trimite albastru |
| Buton Jos | Steag → Arată |
| Buton Depune | Steag → Ascunde |
| Buton Depune | Primește verde → Arată |
| Buton Depune | La atingere → Ascunde → Trimite mov |
| Buton Întoarcere | Fără program · ascuns |

### R1. Transport fragil

| Personaj | Program complet |
| --- | --- |
| Platforma | Steag → Așteaptă 10 → Repetă mereu |
| Stânca | Fără program |
| Capsula de pe fund | Steag → Arată |
| Capsula de pe fund | La ciocnire → Așteaptă 5 → Ascunde → Trimite verde |
| Capsula livrată | Steag → Ascunde |
| Capsula livrată | Primește mov → Arată |
| Capsula transportată | Steag → La poziția inițială → Ascunde → Viteză normală |
| Capsula transportată | Primește roșu → Stânga 2 |
| Capsula transportată | Primește portocaliu → Dreapta 2 |
| Capsula transportată | Primește galben → Sus 1 |
| Capsula transportată | Primește albastru → Jos 1 |
| Capsula transportată | Primește verde → Arată → Viteză lentă |
| Capsula transportată | Primește mov → Ascunde → Viteză normală |
| Robot submarin | Steag → La poziția inițială → Arată → Viteză normală |
| Robot submarin | Primește roșu → Stânga 2 |
| Robot submarin | Primește portocaliu → Dreapta 2 |
| Robot submarin | Primește galben → Sus 1 |
| Robot submarin | Primește albastru → Jos 1 |
| Robot submarin | Primește verde → Viteză lentă |
| Robot submarin | Primește mov → Viteză normală |
| Buton Stânga | La atingere → Trimite roșu |
| Buton Stânga | Steag → Arată |
| Buton Dreapta | La atingere → Trimite portocaliu |
| Buton Dreapta | Steag → Arată |
| Buton Sus | La atingere → Trimite galben |
| Buton Sus | Steag → Arată |
| Buton Jos | La atingere → Trimite albastru |
| Buton Jos | Steag → Arată |
| Buton Depune | Steag → Ascunde |
| Buton Depune | Primește verde → Arată |
| Buton Depune | La atingere → Ascunde → Trimite mov |
| Buton Întoarcere | Fără program · ascuns |

### R2. Întoarcere automată

| Personaj | Program complet |
| --- | --- |
| Platforma | Steag → Așteaptă 10 → Repetă mereu |
| Stânca | Fără program |
| Capsula de pe fund | Steag → Arată |
| Capsula de pe fund | La ciocnire → Așteaptă 5 → Ascunde → Trimite verde |
| Capsula livrată | Steag → Ascunde |
| Capsula livrată | Primește mov → Arată |
| Capsula transportată | Steag → La poziția inițială → Ascunde → Viteză normală |
| Capsula transportată | Primește roșu → Stânga 2 |
| Capsula transportată | Primește portocaliu → Dreapta 2 |
| Capsula transportată | Primește galben → Sus 1 |
| Capsula transportată | Primește albastru → Jos 1 |
| Capsula transportată | Primește verde → Arată |
| Capsula transportată | Primește mov → Ascunde |
| Robot submarin | Steag → La poziția inițială → Arată → Viteză normală |
| Robot submarin | Primește roșu → Stânga 2 |
| Robot submarin | Primește portocaliu → Dreapta 2 |
| Robot submarin | Primește galben → Sus 1 |
| Robot submarin | Primește albastru → Jos 1 |
| Buton Stânga | La atingere → Trimite roșu |
| Buton Stânga | Steag → Arată |
| Buton Stânga | Primește verde → Ascunde |
| Buton Stânga | Primește mov → Arată |
| Buton Dreapta | La atingere → Trimite portocaliu |
| Buton Dreapta | Steag → Arată |
| Buton Dreapta | Primește verde → Ascunde |
| Buton Dreapta | Primește mov → Arată |
| Buton Sus | La atingere → Trimite galben |
| Buton Sus | Steag → Arată |
| Buton Sus | Primește verde → Ascunde |
| Buton Sus | Primește mov → Arată |
| Buton Jos | La atingere → Trimite albastru |
| Buton Jos | Steag → Arată |
| Buton Jos | Primește verde → Ascunde |
| Buton Jos | Primește mov → Arată |
| Buton Depune | Fără program · ascuns |
| Buton Întoarcere | La atingere → Ascunde → Repetă 5 { Trimite galben } → Repetă 5 { Trimite roșu } → Trimite mov |
| Buton Întoarcere | Steag → Ascunde |
| Buton Întoarcere | Primește verde → Arată |

## Ajutor rapid

- Robotul nu răspunde: verifică Steagul, plicurile pereche și personajul selectat.
- Capsula nu se prinde: stația de pe Platformă trebuie să ruleze, iar cleștele să atingă capsula. Așteaptă finalul prinderii înainte de altă comandă.
- Capsula alunecă: robotul și copia transportată trebuie să aibă aceiași pași, aceleași viteze și pozițiile inițiale din starter.
- Capsula sare la depunere: aliniază robotul deasupra platformei înainte de Depune.
- Plic gol în portul web: deschide săgeata și selectează din nou aceeași culoare. Nu este un bloc special.
- Reluare: Stop, apoi Steag. Copia de pe fund reapare; copiile transportată și livrată se ascund.

## Repere și verificare

[Ghidul oficial al blocurilor](https://www.scratchjr.org/explore/blocks): evenimente, mesaje, mișcare, vizibilitate și control. Povestea și puzzle-urile submarinului sunt locale. [Raportul testelor](verificare/Submarinul_60min.md) separă verificarea în browser de proba necesară pe Lenovo. [Resursele originale](resurse_submarin/README.md) sunt incluse în fiecare proiect.
