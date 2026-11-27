# Lecția 9 – Robotul de reciclare

60 de minute · 6–7 ani · fără creație proprie · puzzle greu în bază · două rezerve.

## Povestea pentru copii

„După evenimentul din parc au rămas sticle de plastic, doze și ambalaje de hârtie. La stația de sortare, robotul poate transporta câte un obiect. Noi îi scriem comenzile: unde îl duce, când îl lasă și cum se întoarce. La final, toate ambalajele trebuie să fie în recipientul potrivit. Vor veni și două sticle: trebuie să le facem loc amândurora.”

## Obiectivul orei

Construim o stație care execută automat un lot mixt. Noul accent este alegerea unor rute diferite prin mesaje și ocuparea unor locuri distincte în același recipient. Copilul vede transportul, depunerea și returul gol. Panoul are programul lotului; robotul și obiectul execută împreună fiecare comandă.

## Pregătire

Importă [start.sjr](solutii_reciclare/start.sjr) o singură dată pe fiecare tabletă înaintea orei. Are o scenă și 13 personaje fără cod. Deschide [m3.sjr](solutii_reciclare/m3.sjr) pe laptop pentru demonstrație. [Instrucțiuni de import](README.md).

Păstrăm pozițiile și dimensiunile din starter. Personajele ascunse se aleg din lista din stânga: Doza, Hârtia, Sticla 2, Buton Golire. Cele trei personaje Recipient și cele trei Etichetă sunt decor și nu primesc cod. O sticlă mică desenată pe etichetă nu este un obiect depus.

Pentru fiecare etapă construim programele din secțiunea ei; programele neschimbate sunt repetate în ghid și în PDF. Copiii nu importă soluția următoare și nu scriu întâi un program greșit. Rezervele pornesc separat din M3.

## Planul de 60 de minute

| Timp | Activitate | Rezultat observabil |
|---|---|---|
| 0–5 | Poveste, demonstrație, identificarea recipientelor | Copiii prezic unde trebuie dus fiecare obiect. |
| 5–20 | M1 – Prima sticlă | Sticla rămâne la plastic; robotul revine gol. |
| 20–35 | M2 – Trei categorii | Câte un obiect în fiecare recipient, transportate pe rând. |
| 35–55 | M3 – Lotul amestecat, dificil pentru toți | Patru obiecte, două sticle vizibile separat, un singur Steag. |
| 55–60 | Probă, explicație, salvare | Copilul explică o pereche de plicuri și redeschide proiectul. |

Dacă un copil se blochează, arătăm numai programul personajului respectiv din PDF. Păstrăm M3 în ora de bază. Cele două rezerve sunt suplimentare pentru cei care termină mai repede, fără secțiune de creație liberă.

## Legenda comenzilor

| Plic | Rol |
|---|---|
| Roșu | Robotul și Sticla 1: locul din stânga al recipientului de plastic. |
| Portocaliu | Robotul și Doza: recipientul de metal. |
| Galben | Robotul și Hârtia: recipientul de hârtie. |
| Verde | Robotul și Sticla 2: al doilea loc din recipientul de plastic. |
| Albastru în R1 | Hârtia: compactare înainte de transport. |
| Albastru în R2 | Toate ambalajele: ascundere pentru golire. |
| Mov în R2 | Arată butonul Golire. |

R1 și R2 sunt proiecte separate: albastrul are alt rol în fiecare. Culorile plicurilor identifică programe; nu sunt culorile recipientelor.

În ScratchJr, Așteaptă 5 înseamnă aproximativ jumătate de secundă, iar 10 aproximativ o secundă. Robotul și obiectul au aceeași viteză normală și același început Arată → Așteaptă 5. După deplasarea comună Jos 3, obiectul mai coboară 1. Robotul așteaptă 10 și se întoarce gol.

Panoul trimite mesajele succesiv. Fiecare Trimitere așteaptă programele pe care le-a pornit; de aceea următorul obiect apare după retur. Nu punem culorile în fire separate pornite toate la Steag.

## Construim primul ciclu

5–20 min. Selectăm Robotul, apoi Sticla 1 și Panoul. Sticla pleacă de sub clește, se așază în stânga recipientului de plastic, iar robotul revine în centru.

**Întrebare:** Ce trebuie să facă obiectul după ce robotul se oprește deasupra recipientului?

**Indiciu / soluție:** Sticla mai coboară 1. Robotul așteaptă, apoi revine: Sus 3, Dreapta 7.

[Soluția nativă](solutii_reciclare/m1.sjr).

### Sticla 1

- Steag → La poziția inițială → Mărime inițială → Ascunde → Viteză normală
- Primește roșu → Arată → Așteaptă 5 → Stânga 7 → Jos 3 → Jos 1

### Robotul de reciclare

- Steag → La poziția inițială → Arată → Viteză normală
- Primește roșu → Arată → Așteaptă 5 → Stânga 7 → Jos 3 → Așteaptă 10 → Sus 3 → Dreapta 7

### Panoul lotului

- Steag → Așteaptă 10 → Trimite roșu → Spune Lot terminat!

**Fără cod:** cele trei recipiente și cele trei etichete; Doza, Hârtia, Sticla 2, Buton Golire.

## Adăugăm celelalte două materiale

20–35 min. Păstrăm M1. Adăugăm Doza și Hârtia, cele două răspunsuri ale robotului și două mesaje la Panou. Ordine: roșu, portocaliu, galben.

**Întrebare:** Doza este deja deasupra recipientului ei. Mai are nevoie de o deplasare laterală?

**Indiciu / soluție:** Nu: doar Jos 3 și depunere. Hârtia merge Dreapta 6, robotul revine Stânga 6.

[Soluția nativă](solutii_reciclare/m2.sjr).

### Sticla 1

- Steag → La poziția inițială → Mărime inițială → Ascunde → Viteză normală
- Primește roșu → Arată → Așteaptă 5 → Stânga 7 → Jos 3 → Jos 1

### Doza

- Steag → La poziția inițială → Mărime inițială → Ascunde → Viteză normală
- Primește portocaliu → Arată → Așteaptă 5 → Jos 3 → Jos 1

### Hârtia

- Steag → La poziția inițială → Mărime inițială → Ascunde → Viteză normală
- Primește galben → Arată → Așteaptă 5 → Dreapta 6 → Jos 3 → Jos 1

### Robotul de reciclare

- Steag → La poziția inițială → Arată → Viteză normală
- Primește roșu → Arată → Așteaptă 5 → Stânga 7 → Jos 3 → Așteaptă 10 → Sus 3 → Dreapta 7
- Primește portocaliu → Arată → Așteaptă 5 → Jos 3 → Așteaptă 10 → Sus 3
- Primește galben → Arată → Așteaptă 5 → Dreapta 6 → Jos 3 → Așteaptă 10 → Sus 3 → Stânga 6

### Panoul lotului

- Steag → Așteaptă 10 → Trimite roșu → Trimite portocaliu → Trimite galben → Spune Lot terminat!

**Fără cod:** cele trei recipiente și cele trei etichete; Sticla 2, Buton Golire.

## Puzzle greu: două sticle, două locuri

35–55 min · dificil. Păstrăm cele trei rute, adăugăm Sticla 2 și comanda verde. Panoul primește ordinea roșu, galben, portocaliu, verde. Un singur Steag; cele două sticle trebuie văzute separat.

**Întrebare:** Prima sticlă este la 7 pași în stânga. Al doilea loc este cu 2 pași mai aproape: cât trebuie să meargă a doua?

**Indiciu / soluție:** 7 − 2 = 5. Robotul și Sticla 2 merg Stânga 5. Returul gol este Sus 3, Dreapta 5. Prima rută rămâne Stânga 7.

[Soluția nativă](solutii_reciclare/m3.sjr).

### Sticla 1

- Steag → La poziția inițială → Mărime inițială → Ascunde → Viteză normală
- Primește roșu → Arată → Așteaptă 5 → Stânga 7 → Jos 3 → Jos 1

### Doza

- Steag → La poziția inițială → Mărime inițială → Ascunde → Viteză normală
- Primește portocaliu → Arată → Așteaptă 5 → Jos 3 → Jos 1

### Hârtia

- Steag → La poziția inițială → Mărime inițială → Ascunde → Viteză normală
- Primește galben → Arată → Așteaptă 5 → Dreapta 6 → Jos 3 → Jos 1

### Sticla 2

- Steag → La poziția inițială → Mărime inițială → Ascunde → Viteză normală
- Primește verde → Arată → Așteaptă 5 → Stânga 5 → Jos 3 → Jos 1

### Robotul de reciclare

- Steag → La poziția inițială → Arată → Viteză normală
- Primește roșu → Arată → Așteaptă 5 → Stânga 7 → Jos 3 → Așteaptă 10 → Sus 3 → Dreapta 7
- Primește portocaliu → Arată → Așteaptă 5 → Jos 3 → Așteaptă 10 → Sus 3
- Primește galben → Arată → Așteaptă 5 → Dreapta 6 → Jos 3 → Așteaptă 10 → Sus 3 → Stânga 6
- Primește verde → Arată → Așteaptă 5 → Stânga 5 → Jos 3 → Așteaptă 10 → Sus 3 → Dreapta 5

### Panoul lotului

- Steag → Așteaptă 10 → Trimite roșu → Trimite galben → Trimite portocaliu → Trimite verde → Spune Lot terminat!

**Fără cod:** cele trei recipiente și cele trei etichete; Buton Golire.

## Rezervă 1: compactăm înainte să transportăm

Rezervă · +5–8 min. Pornim din M3. Pachetul mare de hârtie este prea lat pentru recipient. Îl micșorăm în două etape, apoi îl transportăm. Panoul trimite albastru înainte de galben.

**Întrebare:** Dacă trimitem mai întâi galben, unde s-ar afla hârtia când începe compactarea?

**Indiciu / soluție:** Compactarea trebuie terminată la încărcare. Hârtia: Mărește 10, Arată, Așteaptă 5, Repetă 2 { Micșorează 5, Așteaptă 5 }. Este o reprezentare vizuală prin mărime, fără o presă mecanică.

[Soluția nativă](solutii_reciclare/r1.sjr).

### Sticla 1

- Steag → La poziția inițială → Mărime inițială → Ascunde → Viteză normală
- Primește roșu → Arată → Așteaptă 5 → Stânga 7 → Jos 3 → Jos 1

### Doza

- Steag → La poziția inițială → Mărime inițială → Ascunde → Viteză normală
- Primește portocaliu → Arată → Așteaptă 5 → Jos 3 → Jos 1

### Hârtia

- Steag → La poziția inițială → Mărime inițială → Ascunde → Viteză normală
- Primește galben → Arată → Așteaptă 5 → Dreapta 6 → Jos 3 → Jos 1
- Primește albastru → Mărește 10 → Arată → Așteaptă 5 → Repetă 2 { Micșorează 5 → Așteaptă 5 }

### Sticla 2

- Steag → La poziția inițială → Mărime inițială → Ascunde → Viteză normală
- Primește verde → Arată → Așteaptă 5 → Stânga 5 → Jos 3 → Jos 1

### Robotul de reciclare

- Steag → La poziția inițială → Arată → Viteză normală
- Primește roșu → Arată → Așteaptă 5 → Stânga 7 → Jos 3 → Așteaptă 10 → Sus 3 → Dreapta 7
- Primește portocaliu → Arată → Așteaptă 5 → Jos 3 → Așteaptă 10 → Sus 3
- Primește galben → Arată → Așteaptă 5 → Dreapta 6 → Jos 3 → Așteaptă 10 → Sus 3 → Stânga 6
- Primește verde → Arată → Așteaptă 5 → Stânga 5 → Jos 3 → Așteaptă 10 → Sus 3 → Dreapta 5

### Panoul lotului

- Steag → Așteaptă 10 → Trimite roșu → Trimite albastru → Trimite galben → Trimite portocaliu → Trimite verde → Spune Lot terminat!

**Fără cod:** cele trei recipiente și cele trei etichete; Buton Golire.

## Rezervă 2: operatorul golește recipientele

Rezervă · +8–10 min. Pornim separat din M3. Procesăm sticlă, hârtie, doză. Panoul trimite mov și robotul așteaptă. Golire apare numai atunci. Atingerea lui ascunde lotul vechi și pornește ultima sticlă.

**Întrebare:** Ce mesaj trebuie trimis primul: golirea sau următoarea sticlă?

**Indiciu / soluție:** Albastru golește, apoi verde transportă Sticla 2. Butonul se ascunde imediat; apăsările repetate nu pornesc un al doilea transport. Nu folosim un senzor de umplere.

[Soluția nativă](solutii_reciclare/r2.sjr).

### Sticla 1

- Steag → La poziția inițială → Mărime inițială → Ascunde → Viteză normală
- Primește roșu → Arată → Așteaptă 5 → Stânga 7 → Jos 3 → Jos 1
- Primește albastru → Ascunde

### Doza

- Steag → La poziția inițială → Mărime inițială → Ascunde → Viteză normală
- Primește portocaliu → Arată → Așteaptă 5 → Jos 3 → Jos 1
- Primește albastru → Ascunde

### Hârtia

- Steag → La poziția inițială → Mărime inițială → Ascunde → Viteză normală
- Primește galben → Arată → Așteaptă 5 → Dreapta 6 → Jos 3 → Jos 1
- Primește albastru → Ascunde

### Sticla 2

- Steag → La poziția inițială → Mărime inițială → Ascunde → Viteză normală
- Primește verde → Arată → Așteaptă 5 → Stânga 5 → Jos 3 → Jos 1
- Primește albastru → Ascunde

### Robotul de reciclare

- Steag → La poziția inițială → Arată → Viteză normală
- Primește roșu → Arată → Așteaptă 5 → Stânga 7 → Jos 3 → Așteaptă 10 → Sus 3 → Dreapta 7
- Primește portocaliu → Arată → Așteaptă 5 → Jos 3 → Așteaptă 10 → Sus 3
- Primește galben → Arată → Așteaptă 5 → Dreapta 6 → Jos 3 → Așteaptă 10 → Sus 3 → Stânga 6
- Primește verde → Arată → Așteaptă 5 → Stânga 5 → Jos 3 → Așteaptă 10 → Sus 3 → Dreapta 5

### Panoul lotului

- Steag → Așteaptă 10 → Trimite roșu → Trimite galben → Trimite portocaliu → Trimite mov → Spune Golim recipientele.

### Buton Golire

- Steag → Ascunde
- Primește mov → Arată
- La atingere → Ascunde → Trimite albastru → Trimite verde

**Fără cod:** cele trei recipiente și cele trei etichete.

## Verificare finală și salvare

- M3 pornește cu un singur Steag. Robotul duce patru obiecte în ordinea stabilită și revine gol după fiecare.
- La final sunt două sticle alăturate, o doză și un pachet de hârtie. Nu numărăm pictogramele de pe etichete ca obiecte.
- Reluarea readuce robotul și ambalajele la pozițiile inițiale și ascunde lotul anterior.
- În R1 hârtia se micșorează înainte de deplasare. În R2 avem o pauză reală înainte de Golire; după golire rămâne numai ultima sticlă.
- Revenim în galerie, redeschidem proiectul și verificăm că programele s-au păstrat.

## Dacă un copil se blochează

Verificăm personajul selectat, plicurile de aceeași culoare, numerele și viteza normală. Dacă obiectul se separă de clește, comparăm începutul și deplasările robotului cu ale obiectului. La retur doar robotul urcă. Dacă sticlele se suprapun, a doua rută trebuie să fie 5, nu 7. Dacă lotul pornește simultan, toate mesajele trebuie puse într-un singur fir al Panoului.

Proiectele sunt modele programate: nu recunosc automat materialele. Importul și comportamentul au fost testate în portul web; [raport și limite](verificare/Reciclarea_60min.md). Verifică starterul pe un Lenovo al școlii înainte de oră.
