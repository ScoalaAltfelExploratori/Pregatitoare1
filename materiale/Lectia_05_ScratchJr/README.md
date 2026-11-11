# Lecția 5 - Fabrica de ritmuri

**50 de minute, 6-7 ani. Trei misiuni principale, una dificilă și două rezerve suplimentare.** Programăm numărul sunetelor și pauzele dintre ele. Singurul bloc nou este Pop; refolosim Repeat, Așteaptă și mesajele.

## Pregătire simplă

ScratchJr instalat este suficient pentru resurse. Creăm un proiect nou cu **Rabbit, Dog și Park**, din biblioteca aplicației; folosim sunetul inclus **Pop**. Fără importuri, fișiere de copiat pe tablete, microfon, înregistrări sau descărcări. Nu folosim sunetele suplimentare oferite de portul comunitar.

Verifică volumul media și sunetul înainte de clasă. Ascultăm pe rând sau în perechi. Personajele nu trebuie să se deplaseze și nu au nevoie de poziții exacte. Ambele folosesc același Pop, fără voci diferite.

## Materiale

- [Ghidul profesorului](Ghid_profesor.md) și [PDF-ul de patru pagini](Ghid_profesor_Lectia_05.pdf).
- [Cinci cartonașe vizuale PDF](Cartonase_Lectia_05.pdf), cu cerințe și ritmuri, fără programele complete.
- [Soluțiile explicate și cele cinci SJR-uri](solutii/lectia_05/README.md).
- [Demo Pop](proiecte/00_Demo_Pop.sjr), [scenă fără programe](proiecte/01_Start_Ritmuri.sjr), [indexul materialelor](index.html).
- [Raportul testelor](verificare/README.md) și [fișa de observații](Observatii_dupa_lectie.md).

| Activitate | Ținta |
| --- | --- |
| M1 Codul secret | Două Pop apropiate, pauză lungă, încă unul; exact trei sunete |
| M2 Patru sunete, două ritmuri | Iepure: patru sunete regulate; câine: două perechi, cu Repeat |
| M3 Salutul secret - dificilă | Trei perechi la iepure, apoi un singur răspuns al câinelui; șapte sunete |
| R1 Ecoul | Codul de trei sunete, apoi repetarea lui de către câine; șase sunete |
| R2 Șapte sunete, două blocuri | Șapte sunete cu exact două Pop și un singur Repeat |

Rezervele de 6-8 și 8-10 minute sunt **în plus** față de cele 50. Păstrăm provocarea dificilă pentru toți, pauza și salvarea. Copiii construiesc și aleg, fără programe greșite impuse.

## Detalii pentru predare

Modelele folosesc Așteaptă 3 pentru scurt, 6 pentru mediu și 12 pentru lung. Acestea sunt pauze, nu durata totală dintre începuturile sunetelor. Copiii pot alege alte valori dacă ținta se aude clar. Pop are și el propria durată.

Atingem personajul pe scenă o singură dată, apoi așteptăm. Steagul verde nu pornește modelele. Toate se opresc și se pot repeta fără resetare. Păstrăm scena între misiuni, înlocuind programele vechi conform ghidului; la M3 și R1 câinele pornește la mesaj, nu prin atingere. La R2 câinele nu are program.

## Testare pe PC în browser

Deschide [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), portul comunitar folosit pentru verificare. Din galerie apasă Open, selectează un SJR și deschide-l. Atinge iepurele; la M2 testează și câinele, după terminarea iepurelui. Numără sunetele, compară pauzele, așteaptă liniștea finală și repetă fără resetare. Revino în galerie pentru salvare, redeschide și probează din nou.

SJR-urile sunt opționale, numai pentru pregătirea profesorului. Copiii construiesc direct în aplicația de pe tabletă. Browserul nu se sincronizează cu tabletele. [Raportul](verificare/README.md) precizează verificările efective, dovezile audio și limitele lor.

**Verificat la 10 noiembrie 2026:** toate cele șapte proiecte au trecut testele în browser, inclusiv numărul de sunete, pauzele, repetarea și salvarea/redeschiderea. Am analizat ieșirea audio digitală a browserului și am construit manual o secvență cu Pop și pauză. Proba pe Lenovo rămâne de făcut.

Poți asculta direct [codul de trei sunete](verificare/audio/exemplu_cod_secret.wav) și [provocarea celor șapte sunete](verificare/audio/exemplu_salut_secret.wav), sau folosi playerele din [pagina lecției](index.html). Aceste WAV-uri sunt exemple pentru profesor; nu se importă pe tabletele copiilor.

## Proba pe Lenovo înainte de clasă

Construiește M1 și ascultă trei sunete cu două pauze diferite. Construiește M3, numără cele șapte sunete, verifică faptul că răspunsul câinelui este după Repeat și repetă fără resetare. Salvează prin galerie și redeschide fără internet. Nu trebuie copiat niciun fișier pe tabletele copiilor.

## Surse editabile

`lesson.json` definește misiunile, programele și țintele testelor. `Ghid_profesor.md` este sursa ghidului. `python build_pack.py` generează PDF-urile și șapte SJR-uri; `--projects-only` generează numai proiectele. Necesită Python, reportlab, Pillow, pypdf și fonturile Arial din Windows. După schimbarea programelor repetă testele sonore în editor.

[Planul celor zece lecții](../Plan_10_lectii_ScratchJr.md).
