# Verificare — Picnicul întrerupt de ploaie

12 noiembrie 2026. Proiecte native `.sjr`, importate prin Open și rulate în ScratchJr Desktop Reborn, portul comunitar pentru browser.

| Probă | Rezultat urmărit |
| --- | --- |
| Ocolul gardului | Iepurașul ocolește gardul, atinge cățelul, se aude Pop și se deschide pagina 2. |
| Drum direct, copie separată de test | Gardul declanșează întoarcerea iepurașului la plecare; pagina rămâne 1. Copia nu se distribuie elevilor. |
| Merele | Trei mere coboară din copac la aceeași înălțime cu cele două de pe masă. Trei Pop. |
| Masa | Cele cinci mere rămân vizibile după pornire. Primul grup mănâncă exact două; al doilea, cele trei rămase. Contactele produc 2, respectiv 3 Pop. |
| Adăpostul | Primii doi ajung la ușă înainte să pornească ceilalți trei. Toți cinci dispar la ușă; apoi norul pleacă, soarele revine și se aude Pop. |
| Repetarea | Repetă 2 [Dreapta 5] produce același ocol. Cățelul răspunde o singură dată și se dă la o parte. |
| Statuile | Toți cinci dansează. Pasărea îi oprește pe primii doi; ceilalți trei continuă. |
| Construim împreună | Cele patru pagini se importă; rămân numai declanșatoarele la sarcinile de construit. Un bloc adăugat manual a fost conectat, schimbat la 4 și rulat. Salvarea a fost verificată separat într-o copie redenumită, cu blocul Jos 1. |

Înregistrări: [ocol](01_ocolul.json), [mere](02_mere.json), [masa înainte de contact](03_masa_initial.json), [primii doi](04_masa_doi.json), [ceilalți trei](05_masa_trei.json), [adăpost](06_adapost.json), [repetare](07_repetare.json), [statui](08_statui.json), [gard](09_gard.json), [construcție](10_constructie.json).

Înregistrările provin dintr-o copie locală a aplicației publice cu un observator pentru transformările scenei și ieșirea audio. Motorul ScratchJr nu este modificat. Proiectul final a fost parcurs și în aplicația publică. Testarea audio verifică semnalul produs de browser, nu difuzorul fizic.

În acest port, scena cu contact trebuie pornită cu steagul. În scena mesei, programul pregătit al mesei menține scena activă în timp ce profesorul discută și apasă personajele. Această particularitate este tratată și în ghid. La prima încărcare, unele pictograme de plic pot rămâne goale în acest port, deși mesajele rulează; alegerea culorii din meniul blocului le redesenează.

Arhivele sunt verificate pentru JSON valid, identificatori unici, destinații existente și maximum patru pagini. Nu conțin personaje sau decoruri personalizate. Rabbit, Chicken, Dog, Duck, Bird, House3, Fence, Table, Tree1, Apple, Thundercloud, Sun, Park și Pop sunt resurse incluse în ScratchJr. Hashurile fișierelor sunt în `lesson.json`.

Verificarea funcțională de aici este în browser; nu reprezintă un test pe tabletele Android ale clasei. Website-ul are și verificări automate pentru proiecte și navigare, inclusiv toate cele zece lecții și secțiunea Robo.

[Scena din aplicația publică](picnicul-scratchjr.png) · [Blocul adăugat manual](constructie-manuala.png) · [Copia salvată și redeschisă](constructie-salvata.png)

Cele zece înregistrări au trecut verificările din `check_results.py`. Cele nouă teste automate pentru arhivele lecției și navigarea website-ului au trecut.

La prima probă, copia proaspăt importată nu a păstrat blocul după ieșire. Redenumirea proiectului înainte de lucru a permis salvarea și redeschiderea cu blocul conectat. Ghidul include acest pas; fișierele originale rămân disponibile pentru reimport.

## Cele trei provocări suplimentare

Verificate pe 12 noiembrie 2026, într-o copie separată a proiectului complet, importată în aplicația publică ScratchJr Desktop Reborn. Copia aplică exact modificările de blocuri descrise în ghid. Cele patru fișiere inițiale nu au fost schimbate.

- O apăsare pe copac coboară toate cele trei mere la înălțimea celor două de pe masă.
- După schimbarea comenzilor celor două personaje, iepurașul cheamă întâi grupul de trei: rămân două mere. Cățelul cheamă apoi grupul de doi: nu mai rămân mere.
- După furtună, apăsarea soarelui îi arată pe toți cinci și îi readuce la pozițiile lor de plecare. Norul rămâne ascuns.

[Stările observate în browser](11_bonus.json). Provocările se construiesc live în proiectul principal, fără imagini sau fișiere suplimentare.

## Soluții descărcabile și ghidul profesorului

Fiecare dintre cele trei bonusuri are acum și un fișier `.sjr` separat în `solutii/`, cu o singură pagină și toate programele completate. Fișierele finale au fost importate și rulate individual în aplicația publică:

- **R3 — Scuturăm pomul:** o apăsare pe copac aduce toate cele trei fructe la nivelul mesei.
- **R4 — Cei trei, primii:** steagul, apoi iepurașul lasă două mere; cățelul pornește a doua servire și rămân zero.
- **R5 — A trecut ploaia:** norul îi conduce pe toți la adăpost; după încheierea furtunii, soarele îi readuce pe toți cinci la coordonatele lor inițiale.

[Rezultatele fișierelor finale](12_solutii.json). Arhivele au structură validă, iar hashurile tuturor celor șapte proiecte sunt în `lesson.json`. Cele patru fișiere inițiale sunt identice cu versiunile testate anterior.

[Ghidul profesorului](../Ghid_profesor.md) acoperă cele patru scene și toate cele cinci rezerve: formularea misiunii, întrebări, blocuri, pornire, rezultat și verificări practice. Versiunea pentru website poate fi tipărită din browser.
