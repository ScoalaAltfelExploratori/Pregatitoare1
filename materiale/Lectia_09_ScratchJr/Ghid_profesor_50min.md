# Lecția 9 Insula misterioasă

50 de minute, copii de 6-7 ani. Trei misiuni de construire, inclusiv un puzzle dificil pentru toți, plus două rezerve suplimentare. Fiecare copil lucrează și testează pe propria tabletă. Nu cerem schimb de tablete, lucru în perechi sau testarea proiectului altui copil.

## Ideea: descopăr următorul pas

Nu introducem blocuri noi. Combinăm atingerea, Ascunde/Arată, mesajele și paginile pentru a construi o descoperire în etape. Un personaj ascuns nu poate fi atins pe scenă; un mesaj îl poate face vizibil. Apoi devine următorul lucru pe care îl putem atinge.

Jocul trebuie să poată fi reluat. Programele cu steag pregătesc scena: ascund descoperirile la început și la revenirea prin Go to Page. Alegerea unei miniaturi în editor nu ține locul intrării programate în pagină. Începem proba cu steagul; între două runde complete folosim numai personajele scenei.

## Pregătire din biblioteca aplicației

Proiect nou cu **Beach Day, Butterfly și Dog**. Fluturele în stânga sus, câinele spre centru, separați. La M2 adăugăm **Ball** în dreapta și o a doua pagină, **Beach Night**, cu **Rabbit** și încă o **Ball**. Mingea este ieșirea, apoi întoarcerea. La R1 adăugăm un iepure și pe prima pagină, jos în stânga.

Nu sunt necesare coordonate exacte, grilă, sunete, texte, desene externe sau importuri. Păstrăm mărimile inițiale și distanțe suficiente pentru atingere. Profesorul arată un pas, copiii îl construiesc. SJR-urile sunt numai exemple opționale pentru profesor.

## Demonstrație de 4 minute

Pe o singură pagină: câinele are steag → ascunde și, separat, la mesaj portocaliu → arată. Fluturele are atingere → trimite portocaliu. Apăsăm steagul, apoi fluturele. Întrebăm: „Ce puteam atinge înainte? Ce putem atinge acum?”. Un nou steag ascunde iar câinele. Demo-ul arată mecanismul; în M1 pornim cu două personaje vizibile.

## Cele 50 de minute

| Minute | Activitate | Acțiunea profesorului |
| --- | --- | --- |
| 0-4 | Exemplu și regulă | Scopul jocului și o descoperire. |
| 4-7 | Scena | Fluture, câine și fundal. |
| 7-14 | Misiunea 1 | Reacții repetabile. |
| 14-24 | Misiunea 2 | Ieșire, final și întoarcere. |
| 24-27 | Pauză | Spunem regula fără tabletă. |
| 27-37 | Puzzle dificil | Descoperiri în ordine, două runde. |
| 37-45 | Creația mea | Un secret și o reacție personală. |
| 45-50 | Testez și salvez | Propriul joc; îl păstrăm pentru lecția 10. |

**Păstrăm timp pentru fiecare:** oferim tuturor încercarea puzzle-ului dificil și indicii progresive. Dacă lucrul merge mai lent, construim M2 împreună și simplificăm pregătirea scenei; nu luăm minutele atelierului sau ale salvării. La ora atelierului, copilul personalizează ultima variantă care funcționează. Rezervele și soluțiile lor rămân suplimentare, după o alegere personală sau într-o întâlnire următoare; nu sunt obligații pentru toată clasa.

## Exemplu oficial adaptat: Jocul are o regulă pe care o pot explica

**Reper:** [Animated Genres - proiectul Game](https://www.scratchjr.org/curricula/animatedgenres/full.pdf). Folosim ideea proiectului de joc din Animated Genres: copilul decide un scop și acțiunile jucătorului. Arată o singură descoperire din demo-ul insulei. Copiii spun ce se poate face acum și ce devine posibil după semnal. Nu adăugăm un mecanism nou.

**Model pentru demonstrație:** Dog: steag → ascunde; separat, la portocaliu → arată. Butterfly: atingere → trimite portocaliu. După steag vedem fluturele; după atingere apare câinele.

**Întreabă înainte de rulare:** „Ce îl împiedică pe jucător să sară direct la următorul pas? Copilul descrie ce se vede, nu doar numele blocurilor.”

Exemplul este inclus în timpul de demonstrație sau în introducerea misiunii indicate; nu este o misiune suplimentară. Profesorul îl pregătește în ScratchJr, folosind biblioteca instalată. Copiii construiesc propriile proiecte; nu au fișiere de importat și nu trebuie să deschidă site-ul oficial în timpul lecției.

## Misiunea 1 Insula reacționează

**Ținta:** la atingere, fluturele devine mare o clipă și revine la normal. Câinele dispare o clipă și reapare singur. Celălalt personaj nu se schimbă. Fiecare surpriză funcționează de două ori fără Reset.

- Fluture: atingere → mărime inițială → mărește 4 → așteaptă 10 → mărime inițială.
- Câine: atingere → ascunde → așteaptă 10 → arată.

**Indiciu:** „Cum faci ca surpriza să fie gata pentru încă o încercare?”. Atingem personajul pe scenă, nu miniatura de editare. Așteptăm terminarea efectului înainte de următoarea atingere. 10 înseamnă aproximativ o secundă de pauză.

Copilul poate alege o altă reacție scurtă, cu început și sfârșit clare. Nu adăugăm încă mesaje sau Forever. Reacția trebuie să lase personajul vizibil și gata de folosit.

## Misiunea 2 Ieșirea ascunsă

**Ținta:** steagul ascunde mingea. Fluturele o dezvăluie. Mingea trece la pagina de final, iar mingea de pe final ne aduce înapoi. La revenire, ieșirea este ascunsă din nou.

Adăugăm Ball pe prima pagină și construim pagina 2 cu Beach Night, Rabbit și o altă Ball. Personajele de pe pagini diferite au programe separate. Copiii pot alege alt fundal inclus, dacă diferența dintre scene rămâne clară.

| Personaj | Program |
| --- | --- |
| Fluture, pagina 1 | Înlocuim trucul M1 cu atingere → trimite portocaliu. |
| Minge, pagina 1 | Steag → ascunde. Separat: la portocaliu → arată. Separat: atingere → pagina 2. |
| Minge, pagina 2 | Atingere → pagina 1. |
| Iepure, pagina 2 | Poate rămâne fără program. În exemplul profesorului: steag → mărime inițială → mărește 4 → așteaptă 10 → mărime inițială. |

Câinele de pe prima pagină poate păstra surpriza M1. Exemplul profesorului folosește o mărire scurtă, cu revenire la normal. Trucul lui nu dezvăluie ieșirea. Nu este necesară copierea acestui detaliu pentru a rezolva M2.

**Test propriu:** steag → fluture → minge → final → minge → insulă. La revenire verificăm că ieșirea a dispărut. Reluăm drumul fără un nou steag și fără Reset.

**Indicii:** „Cine primește plicul?”, „Ce trebuie să se întâmple când ajungi înapoi?”, „Programul pentru întoarcere este pe mingea din care pagină?”. Nu mutăm manual mingea și nu folosim miniaturile pentru a trece proba.

## Misiunea 3 Lanțul descoperirilor

**Puzzle dificil pentru toți:** după steag vedem numai fluturele. Fluturele dezvăluie câinele; câinele dezvăluie mingea; mingea deschide finalul. Mingea de pe final ne aduce înapoi, unde trebuie să vedem din nou numai fluturele. Facem două runde complete.

**Trecerea de la M2:** păstrăm fluturele și paginile. Înlocuim surpriza câinelui cu programele de descoperire de mai jos. Mingea primește acum albastru, nu portocaliu. Nu lăsăm vechiul receptor portocaliu pe minge: ar sări peste pasul câinelui.

| Personaj | Programe pe pagina 1 |
| --- | --- |
| Fluture | Atingere → trimite portocaliu. |
| Câine | Steag → ascunde. Separat: la portocaliu → arată. Separat: atingere → trimite albastru. |
| Minge | Steag → ascunde. Separat: la albastru → arată. Separat: atingere → pagina 2. |

Pe pagina 2 păstrăm întoarcerea: mingea are atingere → pagina 1. Iepurele poate rămâne decor sau poate avea mărirea scurtă din exemplul profesorului. Reușita puzzle-ului nu depinde de animația de final.

**Ce este dificil:** două mesaje au roluri diferite, iar vizibilitatea stabilește ordinea acțiunilor disponibile. Ascunderea de la început trebuie să se execute și la întoarcere. Copilul construiește o regulă a jocului, apoi o verifică.

## Testul meu în cinci pași

1. Apăs steagul: văd fluturele; câinele și mingea sunt ascunși.
2. Ating fluturele: apare câinele, dar mingea rămâne ascunsă.
3. Ating câinele: apare mingea.
4. Ating mingea: ajung la final. Mingea de acolo mă aduce înapoi.
5. Văd iar numai fluturele. Repet pașii 2-4, fără Reset sau un nou steag.

**Indicii progresive:** „Fă întâi să apară numai câinele”, „Cine poate trimite a doua culoare?”, „Ce ascunzi pentru o rundă nouă?”, „Poți ajunge la final înainte de a descoperi mingea?”. Profesorul ajută pe tableta copilului, fără o etapă de lucru cu un coleg.

**Loc pentru creație:** alegerea decorului, locurile personajelor și o surpriză de final. Păstrăm țintele și zonele de atingere clare. Nu cerem numărătoare de puncte, inventar sau introducerea unei parole.

## Creația mea: Secretul insulei mele

**Minutele 37-45: 8 minute pentru fiecare copil.** Acest timp este inclus în cele 50 de minute și nu depinde de terminarea puzzle-ului dificil. Copilul continuă cea mai avansată variantă care îi funcționează, chiar dacă este numai M1. Nu trebuie să înceapă alt proiect.

**Spune copiilor:** „Alege ce reprezintă descoperirile: un prieten ascuns, un indiciu și o ieșire, de exemplu. Adaugă un gest scurt care arată bucurie sau surpriză după apariția câinelui, înainte de următoarea comandă. Fiecare lucrează și testează pe propria tabletă.”

**Verificarea autorului:** Spune regula jocului într-o propoziție și joacă două runde. Ieșirea nu trebuie să devină disponibilă prea devreme; la întoarcere se refac ascunderile inițiale.

**Sprijin și extensie:** Personalizează o singură descoperire și păstrează restul legăturilor. Pentru mai multă dificultate, fă indicii vizuale diferite pentru pașii succesivi, fără a adăuga încă o pagină.

Profesorul cere o alegere de comportament sau de regulă; schimbarea decorului poate însoți acea alegere. Nu proiectează o soluție de copiat pentru acest atelier. Soluțiile puzzle-urilor rămân reperele profesorului; creația personală poate avea mai multe rezultate corecte.

**Ce urmăresc la încheiere:** Copilul explică ordinea descoperirilor și verifică din nou starea de început.

## Rezervă 1 Surpriza opțională

**6-8 minute în plus. Pornim de la M3.** Adăugăm Rabbit jos în stânga, separat de fluture și câine. Iepurele rămâne vizibil și face un truc repetabil, fără să dezvăluie câinele sau mingea.

**Model:** iepure, atingere → mărime inițială → mărește 4 → așteaptă 10 → mărime inițială. Copilul poate alege alt truc scurt. Nu îi adăugăm plicurile care deschid descoperirile.

**Test propriu:** după steag ating iepurele; câinele și mingea rămân ascunși. Parcurg lanțul și revin. Surpriza iepurelui funcționează din nou. **Indiciu:** „Cum îl faci distractiv fără să deschidă drumul?”.

## Rezervă 2 Două drumuri

**8-10 minute în plus. Revenim la varianta M2.** Fluturele și câinele sunt vizibili, mingea este ascunsă. Oricare dintre cele două personaje poate dezvălui singur ieșirea. Nu este nevoie să le atingem pe amândouă.

- Fluture și câine: fiecare are atingere → trimite portocaliu.
- Minge pe insulă: steag → ascunde; la portocaliu → arată; atingere → pagina 2.
- Minge de pe final: atingere → pagina 1.

Dacă modificăm M3, scoatem programele de ascundere și apariție ale câinelui și îi schimbăm plicul trimis în portocaliu. Mingea ascultă tot portocaliu. Nu păstrăm vechiul lanț albastru în paralel.

**Test propriu:** intru prin fluture și revin; apoi intru prin câine și revin. La începutul fiecărui traseu mingea este ascunsă. **Indiciu:** „Pot doi expeditori să trimită aceeași culoare?”.

## Dificultăți și sprijin

| Ce observăm | Cum ajutăm |
| --- | --- |
| Descoperirile sunt vizibile la deschidere | Selectăm prima pagină și pornim proba cu steagul. |
| Mingea apare prea devreme în M3 | Numai câinele trimite albastru; mingea ascultă albastru. |
| Personajul nu apare | Verificăm culoarea, personajul selectat și conectarea blocurilor. |
| La întoarcere nu se ascund | Folosim mingea cu Go to Page 1; păstrăm steag → ascunde pe descoperiri. |
| Reacția pare să nu pornească | Atingem personajul pe scenă. Personajele ascunse nu sunt butoane active. |

## Încheiere și continuare

Fiecare copil verifică propria rundă, revine în galerie și redeschide proiectul. La redeschidere alege prima pagină și apasă steagul. Notează oral sau prin desen un lucru de continuat la lecția 10. Prezentarea către alți copii este opțională.

Rezervele sunt peste cele 50 de minute și nu înlocuiesc puzzle-ul dificil sau salvarea. Înainte de clasă probează M3 pe Lenovo, inclusiv atingerea personajelor, întoarcerea și redeschiderea offline. Raportul browserului: verificare/README.md.

**Surse și adaptări:** [reperele oficiale și creditele cursului](../Surse_oficiale_ScratchJr.md). Exemplele sunt adaptări pentru acest curs, nu traduceri oficiale.
