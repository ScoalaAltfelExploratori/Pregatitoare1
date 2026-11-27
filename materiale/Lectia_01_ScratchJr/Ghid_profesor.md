# Lecția 1 - Cursa cu ștafetă

**60 de minute · 6-7 ani · puzzle greu în bază · 10 minute de creație · două rezerve.**

[Plan și capturi PDF](Ghid_profesor_Lectia_01.pdf) · [Lecția pe site](index.html) · [Proiecte demonstrative](solutii_stafeta/README.md)

## Locul lecției în curs

**Reluăm:** Din Robo: o secvență de mișcări și numărul de pași.

**Ce adăugăm:** Programe separate și predarea controlului prin mesaje.

**Verificăm înțelegerea:** Mingea ajunge la B înainte să plece B; ocolul este identic la alergător și minge.

**Cum păstrăm ritmul:** În M1 lucrăm numai cu două fire Steag. În M2 demonstrăm explicit perechea Trimite/Primește portocaliu înainte să adăugăm albastrul. Mesajele sunt noi, nu presupunem că au fost învățate în Robo.

[Progresia celor zece lecții](../Progresia_cursului.md).
## Povestea pentru copii

„Echipa trebuie să ducă mingea la sosire. A aleargă primul și i-o pasează lui B. B trebuie să aștepte mingea înainte să plece. Voi programați alergătorii și mingea, ca predarea să se vadă și echipa să termine cursa.”

## Pregătirea scenei

Proiect nou: Park, Rabbit (A), Dog (B), Ball (Minge). Fence apare în M3. Toate sunt în biblioteca instalată. Copiii construiesc scena; starterul și soluțiile SJR sunt opționale pentru profesor.

Cu grila: A (5, 4), B (12, 4), Minge (6, 5), sosirea la coloana 18. Mai important decât precizia la pixel: B este la 7 pași de A; mingea cu 1 la dreapta și 1 în sus față de A. Sosirea este la 6 pași de B. Micșorează alergătorii la 2-3 pătrățele și mingea la aproximativ unul. Viteză normală pentru toți. START și SOSIRE sunt texte opționale.

Înaintea fiecărei probe: Stop dacă rulează, Reset Characters (săgeata rotundă de sus), apoi Steagul de sus. Mingea nu se atașează automat: ea și alergătorul au mișcări identice. Gardul este o țintă vizuală de ocolire, fără oprire automată la contact.

## Cele 60 de minute

| Minute | Activitate |
| --- | --- |
| 0-7 | Povestea și pregătirea: Echipa trebuie să ducă mingea la sosire, cu o pasă între alergători. Construim scena din bibliotecă. Copiii arată cine aleargă, cine așteaptă și unde se face schimbul. |
| 7-19 | 1. Prima predare: A și mingea merg 4 pași împreună. A se oprește; mingea continuă încă 2 pași până la B. B așteaptă. Copiii construiesc cele două programe și urmăresc pasa. |
| 19-32 | 2. Cursa completă: Mingea trimite portocaliu după pasă. B și mingea parcurg împreună încă 6 pași. La sosire, mingea trimite albastru; A sare și se aude Pop. |
| 32-35 | Pauză activă: Trei copii joacă rolurile A, B și minge. B poate porni doar după predare. Clasa spune când trebuie trimis fiecare semnal. |
| 35-47 | 3. Ocolim gardul, dificil: Punem un gard între B și sosire. Cu exact 3 săgeți, B și mingea îl ocolesc pe sus și termină pe linia inițială. Aceleași direcții, numere și ordine în ambele programe. Fără Așteaptă sau Acasă. |
| 47-57 | Traseul echipei mele: Copilul schimbă ocolul ori poziția gardului și adaptează ambele programe. Păstrează predarea vizibilă și sosirea împreună. Explică o alegere și testează. |
| 57-60 | Verificare și salvare: Reset Characters, o cursă completă, apoi resetare și salvare în galerie. Redeschidem proiectul. Copilul arată cine trimite semnalul de predare. |

## Cum explicăm plicurile

Plicul închis Trimite pornește firele cu plic deschis Primește de aceeași culoare. Portocaliu: mingea a ajuns la B. Verde, numai în R2: mingea a ajuns la C. Albastru: mingea a ajuns la sosire și A poate sărbători. Culorile se aleg din săgeata mică a blocului.

Firele rămân separate. Mingea poate primi și mesajul pe care îl trimite ea însăși. Sari 2 schimbă înălțimea unei sărituri, nu numărul de sărituri. Exemplul de creație este o variantă posibilă, nu o soluție unică. Rezervele pornesc separat din M2.

## 1. Prima predare - 7-19 minute

**Ținta:** A duce mingea, apoi o pasează lui B. B rămâne pe loc.

Alege A și construiește primul program. Alege Minge și construiește al doilea. Pornește cu steagul verde de sus.

[Soluția nativă](solutii_stafeta/m1.sjr).

### A

- Steag → Dreapta 4

### B

Fără program.

### Minge

- Steag → Dreapta 4 → Dreapta 2

**Probă:** Resetează și rulează. A și mingea pornesc împreună; apoi numai mingea continuă. Nu uni cele două blocuri 4 și 2 într-un singur 6: aici vrem să vedem cele două etape.

## 2. Cursa completă - 19-32 minute

**Ținta:** Mingea ajunge la B; B o duce până la sosire. A sărbătorește numai la final.

Pornește din M1. Adaugă la minge mesajul portocaliu după pasă și un al doilea program. B primește portocaliu. A primește un program separat pentru albastru.

[Soluția nativă](solutii_stafeta/m2.sjr).

### A

- Steag → Dreapta 4
- Primește albastru → Sari 2 → Sunet Pop

### B

- Primește portocaliu → Dreapta 6

### Minge

- Steag → Dreapta 4 → Dreapta 2 → Trimite portocaliu
- Primește portocaliu → Dreapta 6 → Trimite albastru

**Probă:** Mingea trimite portocaliu după Dreapta 2. B și mingea au aceeași deplasare de 6. Albastru este trimis abia la sosire.

## 3. Ocolim gardul - 35-47 minute / dificil

**Ținta:** B și mingea ocolesc gardul pe sus și ajung la aceeași sosire.

Pornește din M2. Adaugă Fence la 3 pași în dreapta lui B, pe linia cursei. Folosește exact 3 săgeți pentru ocol, la B și în al doilea program al mingii.

[Soluția nativă](solutii_stafeta/m3.sjr).

### A

- Steag → Dreapta 4
- Primește albastru → Sari 2 → Sunet Pop

### B

- Primește portocaliu → Sus 3 → Dreapta 6 → Jos 3

### Gard

Fără program.

### Minge

- Steag → Dreapta 4 → Dreapta 2 → Trimite portocaliu
- Primește portocaliu → Sus 3 → Dreapta 6 → Jos 3 → Trimite albastru

**Probă:** Urmărește întreaga cursă: ambele trec pe deasupra gardului, mingea rămâne lângă B, iar A sărbătorește numai după sosire. Fără Așteaptă sau Acasă.

**Indicii:** Pe unde poate trece B? Ce trebuie schimbat și la minge? Cum revenim la linia inițială? Sus și Jos au același număr; toate cele trei mișcări se schimbă la ambele personaje.

## 4. Traseul echipei mele - 47-57 minute / exemplu

**Ținta:** Proiectează alt ocol, păstrând mingea lângă alergător și sosirea corectă.

Pornește din M3. Poți muta gardul și schimba ocolul. Exemplul arată un ocol mai larg: 4 în sus și 4 în jos. Găsește și propria variantă.

[Soluția nativă](solutii_stafeta/creatie.sjr).

### A

- Steag → Dreapta 4
- Primește albastru → Sari 2 → Sunet Pop

### B

- Primește portocaliu → Sus 4 → Dreapta 6 → Jos 4

### Gard

Fără program.

### Minge

- Steag → Dreapta 4 → Dreapta 2 → Trimite portocaliu
- Primește portocaliu → Sus 4 → Dreapta 6 → Jos 4 → Trimite albastru

**Probă:** Traseul trebuie să încapă în scenă și să ocolească gardul. Explică ce ai schimbat în ambele programe. Exemplul te ajută dacă te blochezi; poți inventa altă soluție.

## R1. Alt loc de schimb - +5 minute / rezervă

**Ținta:** B primește mingea mai devreme, dar sosirea rămâne în același loc.

Pornește din M2, fără gard. Resetează, apoi mută B cu 2 pași spre stânga. A va alerga mai puțin, B mai mult. Găsește numerele noi.

[Soluția nativă](solutii_stafeta/r1.sjr).

### A

- Steag → Dreapta 2
- Primește albastru → Sari 2 → Sunet Pop

### B

- Primește portocaliu → Dreapta 8

### Minge

- Steag → Dreapta 2 → Dreapta 2 → Trimite portocaliu
- Primește portocaliu → Dreapta 8 → Trimite albastru

**Probă:** Pasa trebuie să ajungă la noua poziție a lui B. Înainte de probă, verifică pozițiile inițiale. După mutarea personajului, noua poziție este locul său de plecare.

## R2. Trei alergători - +10 minute / rezervă dificilă

**Ținta:** Două pase vizibile: A către B, apoi B către C. Mingea ajunge la sosire cu C.

Pornește din M2. Adaugă C, încă un Rabbit, cu 4 pași în dreapta lui B. B aleargă 1 pas, apoi mingea parcurge singură încă 3 până la C. C mai are 2 pași până la sosire.

[Soluția nativă](solutii_stafeta/r2.sjr).

### A

- Steag → Dreapta 4
- Primește albastru → Sari 2 → Sunet Pop

### B

- Primește portocaliu → Dreapta 1

### C

- Primește verde → Dreapta 2

### Minge

- Steag → Dreapta 4 → Dreapta 2 → Trimite portocaliu
- Primește portocaliu → Dreapta 1 → Dreapta 3 → Trimite verde
- Primește verde → Dreapta 2 → Trimite albastru

**Probă:** B pornește la portocaliu; C la verde; A sărbătorește la albastru. În timpul fiecărei pase, următorul alergător stă pe loc. Păstrează o singură minge, mereu vizibilă.

## Încheiere și ajutorul din PDF

Plan p. 1; pregătire p. 2; M1 p. 3; M2 p. 4-5; M3 p. 6-7; creație p. 8-9; R1 p. 10-11; R2 p. 12-13. Alege etapa și personajul la care copilul s-a blocat. Nu este necesar să copieze de la început programele neschimbate.

La final: resetare, cursă completă, resetare și salvare în galerie, apoi redeschidere. Copilul arată cine trimite semnalul de predare și ce a modificat la ocol.

[Verificarea ștafetei în browser](capturi_stafeta/rezultate.json) · [Observații după oră](Observatii_dupa_lectie.md). Înregistrările sunt din portul comunitar ScratchJr Desktop Reborn; nu dovedesc testarea pe Lenovo fizic.

[Arhiva lecției de 50 de minute](Ghid_profesor_50min.md).
