# Verificare - Autobuzul spre plajă

18 noiembrie 2026. ScratchJr Desktop Reborn, editorul comunitar în browser, la 1280 × 800 (tabletă în mod landscape). Au fost importate fișierele SJR distribuite. Programele au rulat în motorul aplicației, nu într-o simulare separată.

| Exemplu | Probă observată |
| --- | --- |
| M1 | Ana parcurge drumul, se ascunde la ușă; autobuzul stă. |
| M2 | După urcare, autobuzul pleacă, schimbă pagina și oprește înainte de coborârea Anei. |
| M3 | Toți trei ajung la ușă; autobuzul nu pleacă înainte să fie ascunși toți; toți coboară după oprire, pe trasee diferite. |
| Creație | Aceleași reguli, destinație Park, trasee modificate. |
| R1 | Mara merge lent și urcă ultima, deși are traseul cel mai scurt. Autobuzul o așteaptă fără bloc Așteaptă. |
| R2 | Ana coboară în parc. Autobuzul așteaptă terminarea coborârii; Dan și Mara rămân ascunși și coboară numai la plajă. Ana nu există pe pagina 3. |
| Starter | Două pagini fără programe; steagul nu deplasează personajele. |
| Redeschidere | M3 a fost salvat în galerie, redeschis, resetat și rulat complet din nou. |

Am construit și executat manual un bloc Ascunde în editor, prin tragerea lui din paletă, pentru a verifica pasul de pregătire a pasagerului la sosire. Cele șase soluții complete au fost importate; nu pretindem că toate au fost reconstruite manual bloc cu bloc.

Observațiile poziției, vizibilității și paginii active au fost înregistrate prin citirea interfeței în timpul rulării. [Verificatorul](check_autobuz.py) controlează urcarea la ușă, așteptarea tuturor, oprirea înainte de apariție, pozițiile finale, ordinea pasagerului lent și cele două opriri. Verifică și hash-urile arhivelor, lipsa resurselor externe și starterul fără cod. [Observațiile brute](../capturi_autobuz/verificare.json).

Capturile programelor au fost făcute pentru fiecare personaj din fiecare scenă. În portul web, unele pictograme de mesaje apăreau inițial goale; am reselectat aceeași culoare în editor și am recapturat, fără schimbarea programelor. PDF-ul folosește capturile reale, decupate numai în așezarea paginii.

Limite: testarea nu include un Lenovo fizic, funcționarea offline a portului web sau toate gesturile tactile Android. Pe tablete, lecția se construiește în aplicația instalată, cu biblioteca ei. Regula de utilizare este o singură atingere pe autobuz, apoi așteptarea finalului; nu testăm apăsări repetate în timpul cursei.
