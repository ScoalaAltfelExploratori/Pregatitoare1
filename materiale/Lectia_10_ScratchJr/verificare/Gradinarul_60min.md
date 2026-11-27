# Testarea Lecției 10 — Robotul grădinar

27 noiembrie 2026 · v1.2 · rezultat: PASS.

Testat în [ScratchJr Desktop Reborn pentru browser](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/app/home.html), în format peisaj 1280 × 800. Proiectele au fost importate prin Open și pornite cu Steag. Observațiile provin din scena afișată de aplicație, nu dintr-un simulator al programelor.

| Probă | Rezultat observat |
|---|---|
| Import și redeschidere | Toate cele șase fișiere finale: 13 personaje, resurse incluse. |
| Starter | Zero blocuri; Steag nu schimbă scena. |
| M1 | Două jeturi la A, A înflorește, retur; indicator 3 → 2 → 1. |
| M2 | După A, apa curge la stație; apoi indicatorul revine la 3. |
| M3 | A, reumplere, B, retur; indicator 3 → 2 → 1 → 3 → 2 → 1. |
| R1 | Patru porții, fără reumplere; 4 → 3 → 2 → 1 → 0. |
| R2 | Porții A, B, A, reumplere, B; 3 → 2 → 1 → 0 → 3 → 2. |
| Poziție | În toate cadrele cu jet vizibil, robotul este oprit în locul corect, cu duza orientată corect. |
| Plante | Fiecare înflorește după a doua porție, inclusiv în R2. |
| Stop/Steag | Oprire stabilă; noul Steag reia M3 și ajunge la finalul corect. |
| Salvare | Toate proiectele au fost redeschise; M3 a fost rulat și după redeschidere. |

Prima formă SVG a picăturii a produs o eroare de import; arcul a fost înlocuit cu curbe compatibile. Scala a fost apoi făcută comună pentru ca R1 să nu ceară redesenarea unei etichete. Toate cele cinci soluții v1.2 au fost rulate din nou.

Unele pictograme de viteză importate au necesitat reselectarea aceleiași valori înainte de captură. Blocurile din capturile programelor provin din v1.1 și sunt identice în v1.2; schimbarea finală privește numai scala statică. Capturile scenei arată v1.2. Pentru programe identice se poate reutiliza o captură; PDF-ul verifică egalitatea comenzilor și acoperirea fiecărui bloc, inclusiv corpul repetărilor.

## Dovezi și reproducere

- [Rezultate](gradinar-rezultate.json), calculate din observațiile browserului.
- [Fișierele testate și SHA-256](tested-projects.json).
- [Observații ale scenei](run-log.jsonl); etichetele v12-* indică pachetul final.
- [Metadatele capturilor](capturi.json) și [acoperirea programelor în PDF](pdf-capture-coverage.json).
- [Verificatorul](check_gradinar.py): verifică pachetele și observațiile existente, fără a rula în locul aplicației.

Pentru o nouă probă: importă fișierul final, deschide cardul v1.2, apasă Steag și compară jeturile și valorile de mai sus. Oprește M3 în timpul udării, apoi Steag pentru reluare. Revino în galerie și redeschide.

Un Lenovo fizic nu a fost testat. Înaintea orei rămâne proba de import, rulare, salvare și redeschidere pe o tabletă a școlii. Indicatorul nu este un senzor automat: consumul și reumplerea sunt programate explicit.
