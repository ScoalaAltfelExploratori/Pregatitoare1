# Verificarea cursului complet

27 noiembrie 2026. Rezultat: **PASS** pentru verificările descrise mai jos. [Rezultatele automate](course-results.json) · [Parcursul cursului](../../scratchjr/parcurs.html) · [PDF complet](../Plan_lectii_ScratchJr_60min.pdf).

## Ce am corectat

- Ghidul principal și PDF-ul individual al Lecției 1 prezentau încă varianta de 50 de minute, „Ne întâlnim la joacă”. Acum prezintă ștafeta, cu toate programele și rezervele; varianta veche are fișiere și legături distincte în arhivă.
- Generatorul PDF actualiza numai ultima lecție. Acum regenerează toate cele zece PDF-uri individuale împreună cu volumul cursului.
- Meniul și paginile Lecțiilor 1–5 aveau anunțuri de revizie depășite. Planul general încă numea vechea insulă la Lecția 9 și limita importurile la Lecțiile 6–8. Acum reflectă reciclarea și starterele pentru 6–10.
- Fișele de observație pentru Lecțiile 1–3 și unele trimiteri la reperele oficiale descriau vechile activități. Acum corespund ștafetei, muzeului și autobuzului.
- Fiecare ghid și fiecare plan PDF explică legătura cu lecția anterioară, pasul nou și sprijinul necesar. Lecțiile 7 și 9 sunt prezentate ca aprofundări, nu ca introduceri ale unor blocuri complet noi. La 6 și 8 reutilizăm fire deja înțelese, pentru a limita munca repetitivă.

Toate planurile au 60 de minute consecutive, puzzle greu în programul de bază și două rezerve suplimentare. Lecțiile 9–10 nu au creație proprie. Nu a fost necesară modificarea programelor SJR în această revizie.

## Proiecte și PDF-uri

[Verificatorul cursului](check_course.py) controlează integritatea celor **73 de exporturi SJR curente**, identitatea față de manifestele lecțiilor, programele fiecărui personaj, valorile blocurilor și corpurile repetițiilor, pozițiile inițiale, vizibilitatea și perechile de mesaje din fiecare pagină. Pentru starterele personalizate verifică includerea resurselor în fișier. Cele două colecții suplimentare ale ștafetei sunt comparate cu proiectele individuale.

Cele zece PDF-uri individuale au același text și aceleași imagini ca secțiunile corespunzătoare din volumul de **160 de pagini**, cu numerotare locală. Paginile au fost randate și inspectate vizual. Planurile, capturile programelor, continuările și rezervele sunt incluse. Pentru Lecțiile 9–10 există suplimentar hărți de acoperire a fiecărui fir; la Lecția 10 se verifică inclusiv toate blocurile din fragmentele și repetițiile programelor lungi.

## Probe noi în aplicația din browser

Am importat din nou proiectul dificil al fiecărei lecții în [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/app/home.html), apoi l-am pornit prin comenzile obișnuite ale interfeței. Observațiile citesc pozițiile, vizibilitatea și transformările personajelor afișate. Nu folosesc un simulator separat al blocurilor.

| Lecția | Proba nouă | Rezultat observat | Captură |
| --- | --- | --- | --- |
| 1 | M3, ștafeta cu gard | B și mingea ocolesc împreună și ajung la sosire | [Imagine](lectia-01.jpg) |
| 2 | M3, inspecția completă | Ambele exponate stau pe durata drumului paznicului și reiau rotația la întoarcere | [Imagine](lectia-02.jpg) |
| 3 | M3, trei pasageri | Călătoria ajunge pe pagina 2; coborârea are loc după oprirea autobuzului | [Imagine](lectia-03.jpg) |
| 4 | M3, două runde | Patru sărituri la A, șase la B, apoi terminarea programului | [Imagine](lectia-04.jpg) |
| 5 | M3, două livrări | Mingile ajung în două locuri distincte; robotul revine gol | [Imagine](lectia-05.jpg) |
| 6 | M4, misiunea completă | Trecere în atelier, trei resturi strânse, intrare numai după ridicarea ușii | [Imagine](lectia-06.jpg) |
| 7 | M3, rover complet | Roțile sunt montate înaintea probei; două clipiri, roverul pleacă | [Imagine](lectia-07.jpg) |
| 8 | M3, pilotaj și depunere | Patru direcții, recuperare, transport solidar; după depunere robotul pleacă și capsula rămâne | [Imagine](lectia-08.jpg) |
| 9 | M3, lot mixt | Sticlă, hârtie, doză, a doua sticlă; locuri distincte, robotul revine între obiecte | [Imagine](lectia-09.jpg) |
| 10 | M3, întreaga seră | Două porții la fiecare plantă, reumplere, o porție rămasă; fără jet în timpul deplasării | [Imagine](lectia-10.jpg) |

[Observațiile brute](browser-runs.json) și [pașii telecomenzii submarinului](submarin-steps.json) conțin 1.674 de eșantioane. Fiecare rulare este legată de amprenta SHA-256 a proiectului importat. În Lecția 2, înregistrarea `rotating` surprinde pregătirea, înainte ca pagina editorului să fie gata; proba activă începe la `rotating-ready`. Captura finală nu dovedește singură ordinea evenimentelor; verificatorul folosește succesiunea eșantioanelor.

## Variantele și rezervele

Am rulat din nou cei zece verificatori existenți ai lecțiilor; toți au trecut. Aceștia verifică **observațiile înregistrate anterior în aplicația reală**, inclusiv variantele, rezervele, starterele și probele de salvare prevăzute de fiecare lecție. Nu înseamnă că toate variantele au fost executate din nou acum. Fișierele SJR au rămas identice cu cele din acele probe.

Rapoartele și capturile originale sunt în directoarele `verificare` ale fiecărei lecții. [Rezumatul rerulării verificatorilor](previous-checks.json).

## Reproducerea verificării

Din rădăcina repository-ului, cu Python și bibliotecile reportlab, Pillow și pypdf:

```text
python materiale/build_course_overview.py
python materiale/render_concise_plans.py
python materiale/verificare_curs/check_course.py
node --test tests/navigation.test.js
```

Generatorul PDF folosește fonturile Arial din Windows. Testele de navigație folosesc dependențele Node ale repository-ului. Pentru o modificare a programelor, rulează mai întâi din nou proiectele afectate în aplicație și păstrează observațiile; schimbarea amprentelor nu înlocuiește testul. Verificarea legăturilor controlează separat că paginile, PDF-urile, imaginile și proiectele se pot descărca de pe site.

## Limitele probei

Aceasta este o verificare în portul comunitar din browser, nu o nouă probă în aplicația Android de pe Lenovo K10. Ieșirea audio nu a fost măsurată. Duratele de predare sunt ținte pentru lecție, nu timpi măsurați cu o clasă de copii. Înaintea folosirii la clasă rămâne proba pe o tabletă: import, conectarea blocurilor prin atingere, sunet, salvare și redeschidere fără internet.
