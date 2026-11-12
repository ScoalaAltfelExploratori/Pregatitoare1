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
