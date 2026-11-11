# Lecția 1 Ne întâlnim la joacă

Ghid de 50 de minute pentru copii de 6-7 ani care au parcurs deja exercițiile Robo. Copiii creează o scenă cu două personaje, programe separate și un final inventat de ei.

## Totul se construiește în ScratchJr

Instalăm ScratchJr o singură dată. Copiii încep cu un proiect nou și folosesc numai biblioteca aplicației. Nu descarcă imagini, nu importă proiecte și nu au nevoie de conturi individuale. Fișierele SJR și soluțiile din pachet sunt referințe opționale pentru profesor.

Exemplul folosește **Rabbit (iepurele), Ball (mingea dungată) și Park (parcul)**. Toate sunt incluse în aplicația oficială Android. Păstrăm dimensiunea inițială a personajelor. Desenele de pe cartonașe sunt scheme; arată clasei și personajele reale din aplicație.

Dacă un copil găsește greu un personaj, poate păstra pisica inițială și adăuga mingea sau alt personaj din bibliotecă. Criteriul este comportamentul programului, nu reproducerea unui desen. Ajustăm distanțele pentru personajele și pozițiile alese.

## Pregătirea profesorului

1. Instalează ScratchJr de la Scratch Foundation pe tabletele K10. Pe o tabletă, verifică selectarea personajelor, conectarea blocurilor, schimbarea numărului și salvarea.
2. Construiește pe dispozitivul tău întâlnirea de mai jos. Poți folosi și exemplul opțional 02_Intalnirea.sjr, dar copiii nu trebuie să-l primească.
3. Pregătește proiecția aplicației sau o demonstrație în grup mic. Cartonașele rămân vizibile și profesorul citește cerințele.
4. Numerotează tabletele și păstrează repartizarea copiilor. Verifică deschiderea unui proiect fără internet după instalare.
5. Încheie fiecare întâlnire prin revenire în galerie și redeschidere. Numele automat și miniatura sunt suficiente dacă un copil nu scrie încă.

**Verificare:** raportul actual, capturile și limitele testării sunt în verificare/README.md. Testele browserului comunitar sunt distincte de cele din aplicația oficială Android. Proba tactilă pe un K10 rămâne necesară înainte de clasă.

## Construim scena împreună, fără fișiere

1. Apasă căsuța pentru galerie, apoi **+** pentru un proiect nou.
2. Apasă **+ din lista personajelor din stânga**. Alege iepurele maro din bibliotecă și confirmă cu bifa. Nu folosi + din dreapta, care adaugă o pagină.
3. Adaugă mingea dungată în același fel. Pentru scena cu exact două personaje, ține apăsat personajul inițial din lista din stânga până apare X și elimină-l. Alternativ, păstrează personajul inițial și adaugă doar un partener.
4. Apasă pictograma peisajului din bara de sus, alege parcul și confirmă. Fundalul alb este acceptat dacă selecția durează prea mult.
5. Așază iepurele în stânga și mingea în dreapta, la aceeași înălțime. Nu adăuga alte pagini.
6. Selectează iepurele în lista din stânga. Arată că programul de jos aparține numai personajului selectat.

Profesorul poate folosi grila pentru exemplul exact: pozițiile afișate sunt (5, 5) pentru iepure și (16, 5) pentru minge, pe aceeași linie. Copiii pot poziționa vizual și pot regla mișcarea prin încercări.

## Programul model

| Personaj | Blocuri conectate, în ordine |
| --- | --- |
| Iepurele din stânga | Steag verde, dreapta 3, sari 2 |
| Mingea din dreapta | Steag verde, stânga 3, sari 2 |

Un pas orizontal ScratchJr reprezintă 24 de unități pe scena standard de 480. Din starturile exemplului, centrele ajung la x=168 și x=288, fără suprapunere. Numărul 3 reprezintă distanța; nu este o valoare obligatorie pentru alte starturi.

**Sari 2 înseamnă o singură săritură de înălțime 2.** Pentru două sărituri conectăm două blocuri de săritură. Săgețile drepte deplasează personajul; săgețile curbe îl rotesc.

Pentru fiecare probă: apasă resetarea personajelor din bara de sus, apoi steagul verde. Nu muta manual personajele în timpul rulării. Revenirea la galerie salvează proiectul.

## Cele 50 de minute

| Minute | Activitate | Acțiunea profesorului |
| --- | --- | --- |
| 0-5 | Vedem întâlnirea | Rulează exemplul. Întreabă ce face fiecare personaj și ce cred copiii că ai programat. |
| 5-12 | Construim scena | Proiect nou, două personaje și un fundal din bibliotecă. Demonstrează câte un pas, apoi lasă copiii să-l execute. |
| 12-22 | Programăm întâlnirea | Demonstrează steag, deplasare și săritură pe un singur personaj. Copiii construiesc ambele programe. |
| 22-25 | Pauză | Tabletele jos. Doi copii mimează întâlnirea. |
| 25-35 | Două blocuri până acasă | Completăm întâlnirea cu o săgeată de revenire per personaj, apoi prezentăm varianta dificilă. |
| 35-45 | Inventăm un final | Fiecare adaugă o acțiune sau o secvență proprie. |
| 45-50 | Arătăm și salvăm | Demonstrație în perechi, două exemple pentru clasă, galerie și redeschidere. |

Dacă alegerea personajelor consumă prea mult timp, păstrează personajul inițial și un singur partener; fundalul este opțional. Scurtează demonstrația inițială și oferă indicii în timpul construirii. Păstrează provocarea dificilă vizibilă și minimum cinci minute pentru creația personală.

## Misiunea 1 Fă-i să se întâlnească

**Cerința:** „Iepurele și mingea vin din părți diferite. La steagul verde se apropie și sar.”

Arată blocul galben cu steag, apoi o săgeată dreaptă din categoria albastră. Trage blocurile în zona de programare și conectează-le. Atinge numărul și schimbă-l. Adaugă săritura și pornește cu steagul din bara de sus.

Copiii programează apoi al doilea personaj, în direcția opusă. Lasă-i să aleagă distanța și să ajusteze rezultatul. Pentru starturile modelului funcționează deplasarea 3 și săritura de înălțime 2.

**Reușită:** ambele personaje pornesc, se apropie fără să se acopere și execută o acțiune la final. Copilul poate selecta și explica programul fiecăruia.

**Sprijin:** construim întâi un program complet. Colegul poate explica, dar copilul păstrează controlul tabletei.

**Extensie:** schimbă starturile și găsește alte distanțe care păstrează întâlnirea.

## Misiunea 2 Două blocuri până acasă

**Mini-puzzle:** „Prietenii se întâlnesc, sar și se întorc fiecare exact de unde a plecat. Ai voie să adaugi doar o săgeată albastră la fiecare program. Ce direcție și ce număr alegi?”

Continuăm proiectul funcțional din misiunea 1. Copiii păstrează deplasarea și săritura, apoi conectează câte o săgeată la final. Nu construiesc o greșeală și nu importă alt proiect. În exemplul profesorului, fișierul 03_Puzzle_Revenirea.sjr conține întâlnirea pregătită pentru completare.

**Reguli:** un singur steag verde de sus pornește întâlnirea, săritura și revenirea ambelor personaje. Folosim numai săgețile albastre de deplasare pentru întoarcere: fără blocul Acasă, fără Repeat, fără mutare cu degetul și fără resetare în timpul rulării. Resetăm numai înainte de probă.

Lasă un minut de gândire înainte să trageți blocurile. Copiii arată cu degetul direcția revenirii, apoi construiesc și verifică. Pentru starturile modelului, iepurele adaugă stânga 3, iar mingea dreapta 3. Dacă deplasarea de dus are alt număr, întoarcerea trebuie să compenseze acea distanță.

**Reușită:** ambele personaje se apropie, sar o dată și revin la propriile starturi fără intervenție. Fiecare program are exact o săgeată nouă. Copilul explică de ce a ales direcția și numărul. Dacă ai grila pornită, compară pozițiile de la început și de la sfârșit.

**Indicii, pe rând:** „Pe unde ai venit?”, „În ce parte este locul tău de pornire?”, „Câte pătrățele ai mers la dus?”. Nu arăta imediat blocurile soluției.

**Provocarea dificilă, prezentată tuturor:** „Poți face aceeași întoarcere din exact două săgeți, cu numere diferite, mai mari decât zero?” Copiii înlocuiesc săgeata de revenire cu două și păstrează întâlnirea. Pentru dus 3, o soluție este stânga 1 + stânga 2 la iepure și dreapta 1 + dreapta 2 la minge; ordinea 2 + 1 este la fel de bună. Indiciu: „Cum împărțim trei pași în două drumuri diferite?”. Toți văd provocarea, fără obligația de a termina în același ritm.

În cele zece minute: aproximativ 2 minute cerință și predicție, 5 minute construire și probă, 3 minute provocarea dificilă și explicarea unei soluții.

## Misiunea 3 Inventează finalul

**Cerința:** „Ce fac după întâlnire? Acum alegi tu.”

- Sar de două sau trei ori, folosind mai multe blocuri de săritură.
- Un personaj merge puțin în sus și apoi în jos.
- Înainte de întoarcere, personajele fac un mic dans inventat de copil.
- Copilul alege alte personaje din bibliotecă și păstrează o acțiune proprie.

Exemplul opțional al profesorului: iepurele face dreapta 3, sari 2, sari 2, stânga 3; mingea face stânga 3, sari 2, sari 2, dreapta 3. Ambele pornesc la steag, se apropie, sar de două ori și revin la start. Nu este singurul final corect.

**Reușită:** copilul adaugă cel puțin o acțiune și poate explica ce a vrut să se întâmple. Alegerea decorului nu înlocuiește schimbarea comportamentului.

## Dificultăți și sprijin

| Ce observăm | Cum ajutăm |
| --- | --- |
| Se mișcă un singur personaj | Verificăm steagul și conectarea blocurilor la fiecare personaj. |
| Copilul schimbă programul greșit | Întâi arată personajul selectat în lista din stânga. |
| Personajul se rotește | Înlocuim săgeata curbată cu cea dreaptă. |
| Personajele se acoperă | Micșorăm distanța sau depărtăm starturile. Nu impunem aceeași valoare tuturor scenelor. |
| Sari 2 este înțeles ca două sărituri | Rulăm un bloc, apoi conectăm încă unul. |
| Se mută tot șirul | Prindem ultimul bloc. La nevoie folosim Undo. |
| Rezultatul diferă între probe | Resetăm înainte de fiecare rulare. |
| Nu găsește un personaj | Acceptăm un alt personaj din bibliotecă și ajustăm distanța. |
| Termină repede | Cere revenirea cu două săgeți cu numere diferite, apoi un final propriu. |

## Încheiere și observare

În perechi, autorul arată proiectul și explică un bloc. Fiecare revine la galerie și redeschide proiectul. Păstrăm aceeași tabletă la următoarea întâlnire.

Pe fișa de observații, notează „singur”, „cu indiciu” sau „mai exersăm” pentru: selectarea personajului, conectarea blocurilor, ajustarea unei valori, planificarea revenirii și explicarea finalului. Nu folosim clasamente sau viteză impusă.

## Referințe

- [Interfața ScratchJr](https://sites.bc.edu/scratchjr/learn/): biblioteca, blocurile, resetarea și salvarea.
- [Blocurile ScratchJr](https://www.scratchjr.org/explore/blocks): mișcare, săritură și repetiție.
- [Salvare și export](https://mitscratch.freshdesk.com/en/support/solutions/articles/4000211814-how-can-i-save-or-export-my-project-on-scratchjr-): proiectele se păstrează pe dispozitiv.

Programarea copiilor se face în ScratchJr. Site-ul lecției este un index pentru profesor, iar testele în browser folosesc separat un port comunitar al editorului.
