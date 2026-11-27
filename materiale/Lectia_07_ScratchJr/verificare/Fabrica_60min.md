# Verificare - Fabrica de roboți, v1.0

27 noiembrie 2026. Testare în interfața ScratchJr Desktop Reborn din browser, prin importul fișierelor SJR și butoanele aplicației. Programele nu au fost executate într-un simulator propriu.

## Rezultate

Șapte fișiere importate: starter, M1, M2, M3, creație, R1, R2. Zece rulări observate: cele șapte proiecte, M3 după redeschidere, M3 după resetare și M3 reluat printr-un nou steag. Starterul și M3 au fost salvate prin galerie și redeschise, inclusiv după reîncărcarea paginii.

| Probă | Rezultat observat |
| --- | --- |
| Starter | Șapte personaje, fără programe; steagul nu deplasează piesele |
| M1 | Șasiul coboară 5 pași; roțile stau |
| M2 | Roțile pornesc după șasiu, în paralel; ambele ajung la butuci |
| M3 | Dreapta lentă termină ultima; farul așteaptă ambele roți; două clipiri, schimbare de imagine, plecare 3 pași |
| Creație | Trei clipiri; apoi aceeași plecare; blocul Pop este inclus |
| R1 | Dreapta pornește numai după montajul complet al stângii |
| R2 | Două dus-întorsuri, fiecare urmat de două clipiri; șase clipiri total; o singură plecare finală |
| Resetare / nou steag | M3 ajunge din nou la aceeași poziție, fără piese rămase vizibile |
| Redeschidere | Resursele starterului și programele M3 se păstrează; M3 rulează până la final |

## Dovezi reproductibile

- [Manifest și SHA-256](../fabrica.json): fiecare fișier verificat este exact cel livrat.
- [Observații din browser](../capturi_fabrica/observatii-browser.json): poziția și opacitatea elementelor vizibile din DOM, eșantionate aproximativ la 60 ms în timpul rulării.
- [Verificator](check_fabrica.py): compară arhivele, resursele incluse, hashurile și observațiile. Nu simulează ScratchJr.
- [Rezultate detaliate](fabrica-rezultate.json), inclusiv momentul terminării fiecărei roți și prima clipire.
- [Starter în aplicație](../capturi_fabrica/prezentare-fabrica.jpg), [roverul la final](../capturi_fabrica/rover-final.jpg). Capturile fiecărui personaj sunt folosite în PDF.

## Limite și observații

Nu este un test pe Android, pe un Lenovo fizic sau pe hardware robotic. Proba nu certifică redarea audibilă a sunetului Pop; verifică volumul pe tabletele clasei. Montajul și poziția pieselor sunt verificate vizual, nu cu un senzor de prindere. Robotul industrial comandă secvența; articulațiile lui nu se mișcă.

Portul web raportează erori de interogare a bibliotecii globale `usershapes` / `userbkgs`; [jurnalul](../capturi_fabrica/console-browser.json) le păstrează. Importurile, imaginile incluse, rularea și redeschiderea au funcționat. Nu pretindem că acea bibliotecă globală funcționează fără erori.

Unele pictograme de plic/viteză nu s-au desenat la prima selectare a personajului. Pentru capturi am deschis selectorul din interfață și am ales aceeași culoare sau viteză. Programele și arhivele SJR livrate au rămas neschimbate. Capturile au fost apoi refăcute și verificate vizual în PDF.

## PDF și website

Toate cele 18 pagini au fost randate și inspectate vizual: plicuri colorate, numere, ramuri și bucle complete, fără suprapuneri de text. PDF-ul cursului are 104 pagini; primele 86 păstrează identic textul și comenzile de desen ale lecțiilor 1-6.

Cele cinci teste de navigare existente trec. Verificarea HTTP locală a parcurs 126 de pagini/documente și 526 de adrese, fără legături lipsă. În browser au fost verificate meniul → Lecția 7 → ghidul, imaginile, secțiunea pliabilă cu roverul final și afișarea la 390 px, fără depășire orizontală. Pagina și ghidul nu au raportat erori JavaScript.
