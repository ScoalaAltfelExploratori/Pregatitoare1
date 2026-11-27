# Lecția 2 - Muzeul după închidere

**60 de minute · 6-7 ani.** Exponatele se animă după închiderea muzeului, încremenesc la inspecție și reiau mișcarea după întoarcerea paznicului.

[Lecția pe site](index.html) · [PDF cu plan și capturi](Ghid_profesor_Lectia_02.pdf) · [Ghidul profesorului](ghid-profesor.html) · [Proiectele demonstrative](solutii_muzeu/README.md).

## Ce pregătești

Doar ScratchJr instalat. Copiii pornesc un proiect nou cu **Empty Room, Earth, Planet și Father** din biblioteca aplicației. Personajele sunt diferite de cele din ștafetă. Nu sunt necesare descărcări de imagini, conturi sau copierea proiectelor pe tablete.

Pământul și planeta stau sus; paznicul pornește jos, în stânga. Alegem viteza normală. Detaliile grilei, programele și indiciile sunt în [ghid](Ghid_profesor.md).

## Ora

- 0-8 min: Povestea și scena.
- 8-20 min: 1. Exponatul prinde viață.
- 20-33 min: 2. Încremenim la semnal.
- 33-36 min: Pauză activă.
- 36-48 min: 3. Inspecția completă | dificil.
- 48-58 min: Muzeul meu.
- 58-60 min: Probă și salvare.

Rezerve peste durata orei: **Exponatul somnoros** (+5 min) și **Inspecție pe rând** (+10 min). Toți încearcă puzzle-ul greu și păstrează zece minute de creație proprie.

## PDF-ul pentru sprijin

13 pagini: plan p. 1; pregătire p. 2; M1 p. 3; M2 p. 4-5; M3 p. 6-7; creație p. 8-9; R1 p. 10-11; R2 p. 12-13. Include capturi reale ale programelor fiecărui personaj, la fiecare etapă.

[PDF-ul cursului](../Plan_lectii_ScratchJr_60min.pdf) păstrează Lecția 1 la p. 1-13 și Lecția 2 la p. 14-26; Lecția 3 este la p. 27-41, iar Lecția 4 la p. 42-49. Lecțiile 5-10 nu au fost încă refăcute în formatul de 60 de minute.

## Proiectele profesorului

Pe laptop, maximizează fereastra editorului: într-un panou îngust, lista personajelor poate acoperi o parte din scenă.

În [editorul comunitar în browser](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), revino în galerie, apasă Open, alege fișierul SJR și deschide miniatura. Pornește cu steagul; pentru inspecție atinge paznicul pe scenă. Înaintea unei probe noi: Stop din bara de sus, Reset Characters, steag. Întoarcerea în galerie salvează proiectul.

[Scenă fără cod](solutii_muzeu/start.sjr) · [Cele patru etape](solutii_muzeu/lectia_2.sjr) · [Cele două rezerve](solutii_muzeu/rezerve.sjr). Paginile colecțiilor sunt exemple independente; se aleg manual din dreapta, fără treceri automate.

[Raportul testării](verificare/Muzeul_60min.md) descrie rulările reale și limitele. Nu s-a testat această lecție pe un Lenovo fizic sau în aplicația Android.

## Regenerare

`build_muzeu.py` construiește proiectele și `muzeu.json`; `../render_concise_plans.py` construiește PDF-ul cursului și PDF-ul acestei lecții. Necesită Python, Pillow, reportlab, pypdf și fonturile Arial din Windows. `verificare/check_muzeu.py` verifică observațiile salvate și arhivele distribuite. După schimbarea programelor, repetă probele în editor și înlocuiește capturile.

## Arhiva de 50 de minute

Materialele vechi „Provocările iepurașului” nu sunt soluțiile muzeului: [instrucțiuni](README_50min.md), [ghid online](ghid-profesor-50min.html), [ghid PDF](Ghid_profesor_Lectia_02_50min.pdf), [cartonașe](Cartonase_Lectia_02.pdf), [soluții vechi](solutii/lectia_02/README.md), [pachet vechi](../Lectia_02_ScratchJr.zip). `lesson.json` și `build_pack.py` aparțin acestei versiuni.
