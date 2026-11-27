# Verificare - Robotul pregătește atelierul

27 noiembrie 2026. **Opt fișiere finale v3.1**, importate prin Open și deschise din galerie în [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/app/home.html), la 1280 × 800. Teste în aplicația din browser; nu este un simulator propriu și nu este un test pe Lenovo fizic.

## Probe efectuate

| Probă | Rezultat |
| --- | --- |
| M1 | Segmentele apar pe rând, la aproximativ o secundă distanță; robotul pleacă numai după al treilea |
| M2 | Toate cele trei resturi dispar la contact; ușa rămâne închisă |
| M2, primul rest mutat în afara traseului | Restul mutat rămâne vizibil; celelalte două dispar. Poziția a fost restaurată după probă |
| M3 | Curățenie, robot staționar pe durata ridicării ușii, apoi intrare |
| M4 | Încărcare, trecere automată la scena 2, curățenie și ușă, de la un singur steag |
| M4 resetat și reluat | Aceeași ordine și aceleași rezultate |
| M4 salvat, redeschis și reîncărcat | Toate resursele păstrate; aceeași rulare completă |
| Creație | Amplasarea alternativă și noua rută curăță toate resturile și ajung la final |
| R1 | 14 pași de curățenie în loc de 16; aceleași resturi și aceeași intrare. Atelierul complet: 21 în loc de 23 de pași |
| R2, oprire pe traseu | Robotul rămâne oprit; ușa rămâne închisă |
| R2, oprire în timpul ridicării | Ușa rămâne parțial ridicată; robotul rămâne lângă buton și nu continuă ulterior |
| R2, reluare de la început | Misiunea completă funcționează după cele două opriri |
| Starter, scena 1 | Personaje fără programe, nicio mișcare la steag |
| Starter, scena 2 | Personaje fără programe, nicio mișcare la steag; resurse prezente și după reîncărcare |

Acțiunile au fost făcute prin interfață. Pozițiile, vizibilitatea personajelor și pagina activă au fost citite din DOM la aproximativ 50-70 ms, în segmente scurte. Nu au fost apelate funcții interne ale motorului și nu au fost injectate programe în aplicație. Verificatorul analizează aceste observații; nu pornește o nouă rulare.

## Dovezi

- [Observații brute și SHA-256 ale celor opt fișiere testate](../capturi_atelier/observatii-browser.json).
- [Rezultate calculate](atelier-rezultate.json) · [verificator](check_atelier.py).
- [Manifestul complet, programe și poziții](../atelier.json).
- Capturi reale pentru toate personajele fiecărei variante în capturi_atelier; PDF-ul include și programele neschimbate.

Rulare verificator: `python materiale/Lectia_06_ScratchJr/verificare/check_atelier.py`. Verifică arhivele exacte, resursele încorporate fără URL-uri externe, ordinea aprinderii, staționarea până la terminarea încărcării și deschiderii, colectarea, traseul scurt, opririle stabile și starterul fără cod.

## Limite observate

Unele pictograme ale mesajelor nu s-au desenat la prima deschidere în portul web. Pentru capturile finale a fost selectată din nou aceeași culoare din meniul blocului, fără modificarea logicii. Capturile întârziate după schimbarea personajului au fost refăcute; toate programele din PDF au fost comparate vizual cu explicațiile.

Portul web raportează `unknown items column on usershapes: *` și `unknown items column on userbkgs: *` la înscrierea resurselor în biblioteca globală. [Mesajele originale](../capturi_atelier/avertismente-import.json). Afișarea, rularea și păstrarea imaginilor în proiect au funcționat. Nu declarăm biblioteca globală verificată; starterul conține tot ce este necesar.

Pop este sunetul standard din programe. Volumul și audibilitatea pe tableta clasei nu au fost confirmate. Importul Android, performanța pe Lenovo și salvarea pe acel dispozitiv rămân de verificat înaintea orei.

Bateria este o animație, nu un contor de energie. La ciocnire reacționează la orice personaj, deci resturile nu se suprapun cu echipamentele. Programul nu numără automat resturile rămase; curățenia completă este criteriul vizual al puzzle-ului. Oprirea de urgență se reia de la început, nu din mijlocul traseului.

PDF-ul lecției are 25 de pagini, randate și inspectate vizual. PDF-ul cursului are 86; primele 61 de pagini, pentru lecțiile 1-5, își păstrează textul și fluxurile de desen.
