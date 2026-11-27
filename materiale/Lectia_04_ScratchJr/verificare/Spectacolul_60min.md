# Verificare - Repetiția pentru spectacol, 60 de minute

27 noiembrie 2026. Aplicație: [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/app/home.html), în browser, format de tabletă 1280 × 800. Nu este un simulator propriu și nu este testare pe Android/Lenovo fizic.

Au fost importate și rulate cele șase soluții native și verificată scena fără cod. S-au observat pozițiile reale ale personajelor și evidențierea blocurilor în interfața aplicației, aproximativ la fiecare 60 ms. Nu au fost invocate direct funcții ale motorului. [Observații brute](../capturi_spectacol/verificare.json) · [Verificator reproductibil](check_spectacol.py).

| Probă | Rezultat observat |
| --- | --- |
| M1 | Șase sărituri, grupate 2 + 2 + 2; pauza mai lungă între motive; oprire |
| M2 | A2 apoi B3, fără suprapunere |
| M3 | A2, B3, A2, B3; replica finală executată după ultima săritură |
| Reluare M3 | Aceeași ordine la a doua atingere, după terminarea primei rulări |
| Salvare și redeschidere M3 | Aceeași ordine după galerie, redeschidere și resetare |
| Creație | A3, B2, A3, B2, final; pauze în ritmul lui B |
| R1 | A2, B2, A2, B2; pauza interioară păstrată de ambii artiști |
| R2 | A2, B3, A2, B3, B3, A2; final după bis |
| Scena fără cod | Steagul nu pornește mișcări |
| Construire manuală | Steag, Repetă, Pop și Sari trase din paletă; 2 repetări, Sari 1; două sărituri și oprire |

Toate personajele au revenit la înălțimea de plecare. Nu s-au suprapus săriturile celor doi artiști. Bucla manuală a fost construită într-o copie importată a scenei fără cod; fișierul distribuit rămâne fără programe.

**Sunet:** proiectele folosesc exclusiv blocul nativ Pop (`pop.mp3`). S-a verificat execuția blocurilor și succesiunea vizibilă a bătăilor. Nu s-a înregistrat sau ascultat ieșirea audio a difuzoarelor; volumul și redarea efectivă trebuie confirmate pe dispozitiv înainte de oră. Nu sunt necesare sunetele suplimentare oferite de unele versiuni Desktop.

Arhivele au fost validate: o singură scenă, doar trei tipuri de personaje implicite, Theatre și Pop; fără imagini/sunete externe. Capturile sunt imagini reale din editor, păstrate integral; PDF-ul decupează numai zonele relevante.

Rulare: Python cu `python materiale/Lectia_04_ScratchJr/verificare/check_spectacol.py`. Verificarea folosește observațiile salvate; o rulare nouă în browser trebuie să le recolteze din nou.

## Documente și site

PDF-ul lecției: 8 pagini, toate randate și inspectate vizual. PDF-ul cursului: 49 de pagini; primele 41 păstrează identic textul și conținutul paginilor precedente. Fiecare etapă are programele tuturor personajelor implicate.

Cele 5 teste de navigare au trecut. Verificarea HTTP locală a parcurs 102 pagini/documente și 433 de adrese: toate au răspuns corect și au corespuns fișierelor. În browser au fost verificate meniul cu 10 lecții, cardul Lecției 4, ghidul, instrucțiunile expandabile și deschiderea PDF-ului.
