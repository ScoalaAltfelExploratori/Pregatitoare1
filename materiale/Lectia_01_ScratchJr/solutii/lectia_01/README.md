# Soluții pentru lecția 1

Exemple opționale pentru profesor, cu Rabbit, Ball și Park din biblioteca ScratchJr. Copiii construiesc propriul proiect în aplicație și nu importă aceste fișiere.

| Misiune | Fișier | Rezultat |
| --- | --- | --- |
| 1. Întâlnirea | [01_Misiunea_1_Intalnirea.sjr](01_Misiunea_1_Intalnirea.sjr) | Iepurele merge spre dreapta, mingea spre stânga. Se apropie fără suprapunere și fiecare sare o dată. |
| 2. Două blocuri până acasă | [02_Misiunea_2_Revenirea.sjr](02_Misiunea_2_Revenirea.sjr) | După întâlnire și o săritură, fiecare revine la start. Adăugăm exact o săgeată per personaj. |
| 3. Finalul propriu | [03_Misiunea_3_Final_exemplu.sjr](03_Misiunea_3_Final_exemplu.sjr) | Se apropie, sar de două ori și revin la start. Alte finaluri sunt acceptate. |

## Blocurile

Misiunea 1:

- Iepure: steag verde → dreapta 3 → sari 2.
- Minge: steag verde → stânga 3 → sari 2.

Misiunea 2:

- Iepure: steag verde → dreapta 3 → sari 2 → stânga 3.
- Minge: steag verde → stânga 3 → sari 2 → dreapta 3.

Provocarea dificilă: înlocuim ultima săgeată cu două, având numere diferite, pozitive. Iepurele revine cu stânga 1 → stânga 2, iar mingea cu dreapta 1 → dreapta 2. Se acceptă și ordinea 2 → 1. Dacă drumul de dus diferă, căutăm două distanțe care îl compensează. Fără blocul Acasă, Repeat, resetare sau mutare în timpul rulării; resetăm numai înainte de probă.

Exemplul misiunii 3:

- Iepure: steag verde → dreapta 3 → sari 2 → sari 2 → stânga 3.
- Minge: steag verde → stânga 3 → sari 2 → sari 2 → dreapta 3.

Numărul de pe săritură indică înălțimea. Două blocuri produc două sărituri. Deplasarea 3 se potrivește starturilor incluse: centrele x=96 și x=360, y=240. La întâlnire ajung la x=168 și x=288. Alte poziții sau personaje pot cere alte distanțe. Resetează înainte de fiecare probă.

## Verificare

Toate cele trei soluții finale au trecut importul, rularea, resetarea, redeschiderea și rerularea în portul comunitar pentru browser, pe 9 noiembrie 2026. Soluția M2 a fost retestată după introducerea mini-puzzle-ului; soluțiile M1 și M3 sunt fișierele neschimbate, cu amprente verificate. Varianta dificilă 1 + 2 a trecut o probă separată. Probele de păstrare în galerie după reîncărcare au trecut. Două sărituri distincte și revenirea au fost observate în animația misiunii 3.

Setul final nu este verificat integral în aplicația oficială Android sau pe Lenovo K10. Vezi [raportul](../../verificare/README.md) și [instrucțiunile principale](../../README.md).
