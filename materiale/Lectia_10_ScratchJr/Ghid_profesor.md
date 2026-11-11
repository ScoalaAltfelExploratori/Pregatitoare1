# Lecția 10 Marea finală

Jocul meu complet. 50 de minute, copii de 6-7 ani. Continuăm insula salvată la lecția 9. Fiecare copil construiește și testează individual, cu ajutorul profesorului. Avem trei misiuni, un puzzle dificil pentru toți și două rezerve peste timpul de bază.

## Ideea: am terminat, poți continua

Un mesaj trimis la sfârșitul programului anunță terminarea unei acțiuni. Folosim acest semnal pentru a porni următorul artist și pentru a face disponibilă întoarcerea. Nu încercăm să ghicim durata întregului spectacol printr-o pauză lungă pe buton.

Mesajele coordonează personaje de pe aceeași pagină. La intrarea prin Go to Page, programele cu steag ale paginii de final pornesc singure. Pagina 1 păstrează descoperirile lecției 9; în această lecție lucrăm în principal pe pagina 2.

## Pregătire simplă

Redeschidem proiectul propriu, pe aceeași tabletă. Pe final avem **Rabbit și Ball**, pe **Beach Night**. La M3 adăugăm **Dog**, iar la R1 încă un **Butterfly**. Acestea sunt din biblioteca instalată. Fără importuri pe tabletele copiilor, descărcări, sunete sau înregistrări.

Iepure în stânga jos, câine în dreapta jos; mingea sus în dreapta. Fluturele de la rezervă stă sus în stânga. Păstrăm mărimile inițiale și separăm zonele de atingere. Nu sunt necesare coordonate exacte. Mingea de pe final are alt program decât mingea de pe insulă.

**Dacă lipsește proiectul L9:** profesorul ajută copilul să facă două pagini simple: pe prima, fluture cu atingere → pagina 2; pe a doua, iepure și minge cu atingere → pagina 1. Aceasta este intrarea scurtă din demo. Nu cerem recuperarea întregii lecții 9 sau importarea unui fișier.

## Demonstrație și ritm

Arătăm demo-ul: fluturele deschide finalul, iepurele performează, apoi câinele; mingea apare la sfârșit. Întrebăm: „Cine poate anunța că s-a terminat?”. Copiii vor construi treptat acest rezultat.

| Minute | Activitate | Ținta |
| --- | --- | --- |
| 0-5 | Demo | Observăm ordinea și butonul care așteaptă. |
| 5-8 | Redeschidem | Propriul proiect și pagina de final. |
| 8-17 | Misiunea 1 | Două transformări, cu revenire. |
| 17-27 | Misiunea 2 | Mesajul de final dezvăluie butonul. |
| 27-30 | Pauză | Tabletele jos. |
| 30-44 | Puzzle dificil | Iepure, câine, apoi întoarcere. |
| 44-50 | Joc complet | Fiecare testează și salvează. |

<!-- pagebreak -->

## Misiunea 1 Sărbătoarea mea

**Ținta:** când ajungem pe pagina 2, iepurele face două măriri egale, cu revenire după fiecare. La sfârșit rămâne normal. Mingea este încă disponibilă pentru întoarcere; în probă așteptăm tot spectacolul.

**Model:** iepure, steag → mărime inițială → repetă 2 [mărește 4 → așteaptă 5 → micșorează 4 → așteaptă 5]. Mingea păstrează atingere → pagina 1. Valoarea 2 indică două runde; 5 la Așteaptă este aproximativ o jumătate de secundă.

Înlocuim vechea animație de pe iepure, dacă există, ca să nu pornească două rutine simultan. Copilul construiește secvența, o pune în Repeat și verifică cele două runde. Poate alege o altă valoare moderată, egală la mărire și micșorare, sau propriul decor inclus în aplicație.

**Test propriu:** parcurg insula, privesc cele două măriri, revin prin minge și ajung din nou la final. Nu apăs Reset între runde. **Indicii:** „Ce revine la fiecare rundă?”, „Care program începe singur când ajungi pe pagină?”.

## Misiunea 2 Butonul așteaptă

**Ținta:** la sosirea pe final, mingea se ascunde și nu poate fi folosită în timpul sărbătorii. Apare numai după ultima revenire a iepurelui la normal. Apoi permite întoarcerea.

| Personaj, pagina 2 | Program |
| --- | --- |
| Iepure | Păstrează rutina M1. După Repeat adaugă trimite albastru. |
| Minge | Steag → ascunde. Separat: la albastru → arată. Separat: atingere → pagina 1. |

Plicul albastru se pune **după întregul Repeat**, în afara lui. Dacă este în interior, butonul se poate deschide după prima rundă. Copiii compară rezultatul propriu cu ținta și aleg unde conectează semnalul; nu copiază intenționat un program greșit.

**De ce mesaj:** dacă iepurele are o pauză mai lungă sau încă o rundă, tot el anunță când a terminat. Pe minge nu punem o așteptare estimată pentru a acoperi durata spectacolului.

**Test propriu:** ajung la final; urmăresc cele două măriri și apariția mingii. Încerc o atingere în locul mingii în timpul spectacolului: nu trebuie să plec de pe pagină. După apariție mă întorc și repet.

**Indiciu:** „Cine știe sigur că iepurele a terminat?”. Ascunde și Arată au o scurtă tranziție vizuală. Atingerea se testează pe scenă, nu în lista personajelor. Un personaj ascuns poate primi un mesaj, dar nu poate fi apăsat pe scenă.

<!-- pagebreak -->

## Misiunea 3 Marea finală

**Puzzle dificil pentru toți:** iepurele face cele două măriri; câinele își așteaptă rândul. Când iepurele termină, câinele se micșorează, așteaptă și revine la normal. Numai apoi apare mingea. Jocul complet funcționează de două ori.

Adăugăm Dog pe pagina 2, separat de iepure. Schimbăm plicul final al iepurelui din albastru în portocaliu. Câinele primește portocaliu și trimite albastru numai după propriul truc. Mingea păstrează receptorul albastru din M2.

| Personaj | Programe pe pagina 2 |
| --- | --- |
| Iepure | Steag → mărime inițială → repetă 2 [mărește 4 → așteaptă 5 → micșorează 4 → așteaptă 5] → trimite portocaliu. |
| Câine | Steag → mărime inițială. Separat: la portocaliu → mărime inițială → micșorează 4 → așteaptă 10 → mărește 4 → trimite albastru. |
| Minge | Steag → ascunde. Separat: la albastru → arată. Separat: atingere → pagina 1. |

Programul câinelui cu steag doar pregătește dimensiunea. Trucul lui pornește la mesaj, nu la steag. Nu păstrăm trimiterea albastră pe iepure: în acest puzzle câinele este cel care anunță sfârșitul întregului spectacol.

## Testul meu complet

1. Selectez pagina 1 și apăs steagul pentru pregătirea insulei.
2. Descopăr câinele și mingea ca la L9, apoi intru pe final. Dacă am intrarea simplă, ating fluturele.
3. Iepurele face două runde. Câinele rămâne normal, fără să înceapă trucul în același timp.
4. Câinele face o micșorare și revine. Mingea rămâne indisponibilă până termină.
5. Ating mingea apărută. Pe insulă, descoperirile sunt ascunse iar. Repet fără Reset sau un nou steag.

**Indicii progresive:** „Ce îl invită pe câine?”, „Cine trebuie să trimită ultimul plic?”, „Unde trebuie să fie plicul: în buclă sau după ea?”, „Când ai voie să folosești întoarcerea?”.

**Loc pentru creație:** decor, poziții și o variație scurtă a unuia dintre artiști. Păstrăm ordinea, finalul vizibil și două jocuri complete. Nu evaluăm viteza de lucru sau prezentarea în fața clasei. Fiecare copil își testează proiectul și poate explica profesorului prin gesturi sau arătarea blocurilor.

<!-- pagebreak -->

## Rezervă 1 Încă o dată!

**8-10 minute în plus. Pornim de la M3.** Adăugăm Butterfly pe final. El și mingea apar numai când artiștii termină. Fluturele cere încă un spectacol pe aceeași pagină; mingea permite întoarcerea.

Folosim verde pentru pregătire și pornire, portocaliu pentru rândul câinelui, albastru pentru final. Verde ajunge la toți cei patru destinatari de pe pagina 2.

| Personaj | Schimbări față de M3 |
| --- | --- |
| Iepure | Steag → trimite verde. Rutina cu cele două măriri și plicul portocaliu începe acum La verde. |
| Câine | Pregătirea mărimii începe La verde în loc de steag. Trucul La portocaliu rămâne. |
| Minge | Ascunderea începe La verde în loc de steag. La albastru → arată și atingere → pagina 1 rămân. |
| Fluture | La verde → ascunde. La albastru → arată. Atingere → trimite verde. |

**Test propriu:** după final ating fluturele. Ambele butoane dispar, iepurele și câinele repetă în ordine, butoanele reapar. Rămân pe pagina 2. Cer încă o repetare, apoi mă întorc prin minge. **Indiciu:** „Ce trebuie pregătit la fiecare spectacol, nu doar la prima sosire?”.

## Rezervă 2 Întoarcere automată

**6-8 minute în plus. Pornim de la M3, separat de R1.** Mingea devine un cronometru ascuns: steag → ascunde; separat, la albastru → așteaptă 30 → pagina 1. Scoatem programul ei de atingere. Iepurele și câinele rămân ca în M3.

**Test propriu:** după câine rămânem pe final aproximativ trei secunde, apoi revenim singuri pe insulă. Acolo așteptăm încă două secunde: jocul nu se reia singur. Atingem fluturele și parcurgem o nouă rundă. 30 înseamnă trei secunde de pauză după terminare, nu durata estimată a artiștilor.

## Dificultăți și sprijin

- Mingea apare prea devreme: plicul de final trebuie să fie după Repeat; în M3 îl trimite câinele.
- Artiștii pornesc simultan: trucul câinelui începe la portocaliu. Steagul lui pregătește numai mărimea.
- Encore nu pregătește butoanele: ambii destinatari au La verde → ascunde.
- Întoarcerea nu reface insula: folosim Go to Page 1 și păstrăm programele de pregătire de pe pagina 1.

Rezervele sunt peste cele 50 de minute și nu înlocuiesc puzzle-ul dificil sau salvarea. La final, fiecare copil joacă, revine în galerie și redeschide. Pentru o nouă probă alege pagina 1 și apasă steagul. Profesorul poate păstra o copie prin rutina de export a clasei. Prezentările sunt opționale.

Înainte de clasă, probează M3 pe Lenovo: atingere, ordine, două runde și redeschidere offline. Raportul browserului: verificare/README.md.
