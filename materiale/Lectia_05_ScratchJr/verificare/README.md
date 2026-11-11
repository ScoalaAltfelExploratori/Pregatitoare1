# Verificarea lecției 5 - Fabrica de ritmuri

Data: **10 noiembrie 2026**. **Rezultat: toate cele șapte proiecte au trecut probele browserului.** Numărul sunetelor și pauzele au fost verificate și în înregistrări ale ieșirii audio reale a browserului.

## Mediul și metoda

Am folosit aplicația [ScratchJr Desktop Reborn pentru browser](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), port comunitar, într-o copie locală a fișierelor publicate. Am adăugat numai un observator pentru Web Audio și butoane de pornire/oprire a înregistrării; programele lecției, motorul de execuție și fișierele aplicației au rămas neschimbate. Observatorul copiază semnalul destinat difuzorului într-un înregistrator silențios, păstrând conexiunea audio originală. Nu folosește microfonul și nu generează sunetele în locul aplicației.

Importul SJR, atingerea personajelor, steagul, construirea manuală și salvarea au fost operate prin interfața browserului. Contextul audio era în starea running la fiecare Pop. Capturile WAV sunt probe ale sunetului sintetizat/redat de browser, nu înregistrări acustice ale difuzorului fizic.

Separat am importat și rulat M3 în editorul public, fără observator: importul și încheierea programului au funcționat. Acea probă suplimentară nu înlocuiește analiza audio detaliată din copia locală. [Rezultat](browser_public_sanity.json), [captură din editorul public](03_Salutul_secret_public.png).

## Ce a trecut

| Proiect | Ținta verificată |
| --- | --- |
| Demo Pop | Exact un Pop la atingerea iepurelui; două probe fără resetare |
| Starter | Fără programe și fără pornirea unei surse audio la atingere sau steag |
| M1 Codul secret | Trei Pop; interval scurt, apoi lung; două rulări |
| M2 Iepure | Patru Pop cu intervale egale; două rulări |
| M2 Câine | Patru Pop grupați în două perechi: scurt-lung-scurt; două rulări |
| M3 Salutul secret - dificilă | Șapte Pop: trei perechi, apoi răspunsul final; scurt-lung repetat; două rulări |
| R1 Ecoul | Șase Pop: două coduri identice de trei, separate de o pauză lungă; două rulări |
| R2 Șapte sunete, două blocuri | Șapte Pop, cu exact două blocuri Pop și un singur Repeat în program; două rulări |

Matricea principală cuprinde **14 rulări sonore, 7 atingeri fără program și 7 probe cu steagul verde**. Am redeschis toate cele șapte proiecte și am făcut **8 probe suplimentare**: ambele personaje la M2 și câte o probă în celelalte proiecte. Toate cele șapte titluri sunt prezente o singură dată după reîncărcarea galeriei.

Din starter am construit manual, prin tragere, **atingere → Pop → Așteaptă 3 → Pop**. Am ales 3 din tastatura editorului și am făcut **două probe fără resetare**. Nu pretindem că toate soluțiile au fost reconstruite manual. [Jurnal](browser_ritmuri_constructie_manuala.json), [captură](constructie_manuala.png).

În total sunt **38 de probe structurate**, dintre care **23 au produs audio**, cu **100 de Pop detectate în WAV-uri**. Celelalte 15 nu au pornit nicio sursă audio. În probele fără sursă, unele înregistrări sunt goale deoarece contextul audio nu fusese încă activat; ele sunt verificate prin lipsa evenimentelor de redare și prin structura proiectului, nu prezentate ca secunde de liniște măsurate.

Personajele și-au păstrat poziția, mărimea și vizibilitatea. Fiecare rulare sonoră s-a încheiat singură și înregistrarea conține liniște după ultimul Pop. A doua rulare nu a necesitat resetare. Atingerea câinelui la M3 și R1 nu pornește răspunsul; acesta are pornire La mesaj. Verificarea programelor confirmă că plicul este după buclă la M3 și că R2 nu folosește alt personaj sau mesaje.

## Dovezile audio

Înregistratorul păstrează timpii reali ai surselor Web Audio și eșantioanele PCM ale ieșirii. Analiza WAV numără atacurile sonore și compară distanțele dintre ele cu evenimentele de redare. Nu deducem rezultatul numai din numărul blocurilor din SJR.

În probele acestei configurații, începuturile Pop au fost separate aproximativ cu 0,54-0,58 secunde la pauza scurtă, 0,89-0,90 la cea medie și 1,46-1,51 la cea lungă. Acestea includ sunetul și ritmul de execuție al editorului; **nu sunt timpi promiși pentru Lenovo**. Criteriul pedagogic este numărul corect și contrastul clar dintre pauze.

- [Codul secret - exemplu de ascultat](audio/exemplu_cod_secret.wav).
- [Salutul dificil - exemplu de ascultat](audio/exemplu_salut_secret.wav).
- [Analiza tuturor înregistrărilor](analiza_audio.json): număr de atacuri, intervale și liniștea finală.
- [Matricea principală](browser_ritmuri_observatii.json), [redeschiderea](browser_ritmuri_redeschidere.json), [persistența](browser_ritmuri_persistenta.json).
- [Rezultate agregate și amprente SHA-256](rezultate.json).

Cele două exemple scurte au fost decupate din înregistrările browserului, păstrând sunetele și pauzele dintre ele. Sunt pentru ascultarea profesorului, nu resurse necesare în aplicația copiilor. Fișierele `p*.wav` și JSON-urile pereche din audio/ sunt înregistrările complete ale probelor. `00_Demo_Pop` păstrează și verificarea inițială a observatorului, în afara celor 38 de probe structurate.

## Materialele și reproducerea

Ghidul de patru pagini și cele cinci cartonașe au fost randate și verificate vizual, pagină cu pagină. Indexul HTML are cinci misiuni și două playere audio funcționale; am verificat redarea până la capăt, încărcarea imaginii soluției, extinderea ei și absența depășirii orizontale la dimensiunea testată. [Verificarea paginii](browser_index.json), [captura paginii](index_materiale.png).

Pentru repetare fără instrumente speciale, urmează [README-ul lecției](../README.md): Open în galeria editorului comunitar, alegerea SJR-ului, un tap pe scenă, numărarea și compararea pauzelor. La M2 probează personajele separat. Așteaptă finalul și repetă fără resetare, apoi salvează prin galerie și redeschide. Copiii construiesc direct în aplicație.

Pentru audit tehnic sunt păstrate [observatorul audio](instrumente/qa-monitor.js), [serverul de probă](instrumente/browser_server.py), [analiza PCM](instrumente/analyze_audio.py) și [manifestul fișierelor publicate folosite](instrumente/upstream_manifest.json). Acestea nu sunt necesare profesorului sau copiilor. Serverul se pornește din copia repo cu Python și servește numai pe 127.0.0.1:8769; descarcă fișierele portului comunitar într-un cache temporar. Manifestul identifică versiunea testată; o descărcare viitoare poate avea alte amprente. Analiza necesită numpy și verifică WAV-urile existente.

## Resurse incluse și limite

Rabbit.svg, Dog.svg, Park.svg și pop.mp3 există în catalogul aplicației oficiale Android 1.5.11 disponibile pentru verificare. Fiecare SJR conține doar datele proiectului și miniatura; nu include imagini sau sunete personalizate. Nu folosim categoriile suplimentare Animals/Instruments/Fun FX ale portului comunitar. Nu distribuim aplicația Android în pachet.

**Lecția 5 nu a fost rulată în aplicația oficială Android sau pe Lenovo K10.** Captura digitală nu verifică difuzorul fizic, volumul în clasă, atingerea cu degetul sau performanța cu 3 GB RAM. Înainte de clasă construiește M1 și M3 pe o tabletă, verifică sunetul, repetarea, salvarea și redeschiderea fără internet. Nu trebuie copiat niciun SJR sau WAV pe tabletele copiilor.

[Referința oficială a blocurilor](https://www.scratchjr.org/pdfs/blocks.pdf) descrie Pop, Wait, Repeat și mesajele. [Codul portului comunitar](https://github.com/richiesamlie/ScratchJr-Desktop-Reborn) identifică aplicația testată.
