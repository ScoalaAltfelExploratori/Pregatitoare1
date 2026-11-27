# Verificare - Robotul curier, 60 de minute

27 noiembrie 2026. [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/app/home.html), aplicația din browser, viewport 1280 × 800. Nu este o simulare proprie a motorului și nu este un test pe Android/Lenovo fizic.

Au fost importate cele șase soluții și scena fără cod. Pornirea, resetarea, selectarea personajelor și redeschiderea au fost făcute prin interfață. În timpul rulării au fost citite pozițiile personajelor vizibile și evidențierea blocurilor, aproximativ la 60 ms. Nu au fost apelate direct funcții ale motorului.

[Observații brute](../capturi_curier/verificare.json) · [Verificator](check_curier.py). Verificatorul controlează observațiile salvate; nu reprezintă o nouă execuție în browser.

| Probă | Rezultat observat |
| --- | --- |
| M1 | Mingea se încarcă pe plafon; mașina rămâne pe loc |
| M2 | Încărcare, transport comun, descărcare și retur gol |
| M3 | Fotbal, retur, baschet, retur, final; o singură atingere |
| M3 resetat și reluat | Aceleași două livrări complete |
| M3 salvat și redeschis | Aceleași livrări după resetare |
| Creație | Patru ocoluri: două transporturi și două retururi; fără suprapunerea conturului dreptunghiular al mașinii cu gardul |
| R1 | Încărcare vizibil mai lentă; apoi transport la viteza normală, sincronizat |
| R2 | Baschetul ajunge primul, fotbalul al doilea; retur după fiecare |
| Scena fără cod | Atingerea mașinii nu mișcă niciun personaj |

În toate cursele complete, mingile rămân la destinație și mașina revine la bază. S-a verificat că mașina nu pleacă în timpul încărcării și nu revine înaintea descărcării. Eșantionarea poate sări cadrul exact dintre încărcare și plecare; testul acceptă primul cadru cu mingea deja transportată, verificând permanent distanța față de mașină.

La pregătire, ocolul a fost corectat ca să includă și returul gol. Varianta distribuită și capturile au acest cod. Nu sunt erori raportate în jurnalul browserului. Lecția nu folosește sunete.

Cele șapte arhive SJR au fost verificate: o scenă Gym, numai Car/Soccerball/Basketball/Fence, fără imagini sau sunete externe. Scena de pornire nu conține cod. Sumele SHA-256 din [manifest](../curier.json) corespund fișierelor testate. Capturile sunt imagini reale, integrale din editor; PDF-ul prezintă decupajele relevante.

Rulare verificator: `python materiale/Lectia_05_ScratchJr/verificare/check_curier.py`.
