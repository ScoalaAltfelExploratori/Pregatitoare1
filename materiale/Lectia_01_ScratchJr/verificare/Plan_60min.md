# Verificare - Lecția 1: Cursa cu ștafetă

17 noiembrie 2026. Șase exemple native importate prin interfața **Open** și pornite de la steagul din [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/). Sunt folosite Rabbit, Dog, Ball, Fence și Park din biblioteca aplicației.

| Exemplu | Rezultat observat |
| --- | --- |
| M1 - Prima predare | A și mingea se deplasează împreună 4 pași. A se oprește; mingea continuă 2 până la B. B rămâne pe loc. |
| M2 - Cursa completă | B pornește numai după sosirea mingii. B și mingea rămân aliniate pe tot traseul de 6 pași. A sare doar după sosire. |
| M3 - Ocolim gardul | B și mingea urcă 3, merg 6 la dreapta și coboară 3. Au aceeași poziție orizontală și un pas între ele pe verticală în timpul transportului. Ocolesc gardul și ajung împreună. |
| Creație proprie - exemplu | Ocolul cu 4 în sus și 4 în jos păstrează sincronizarea și sosirea. |
| R1 - Alt loc de schimb | B mutat 2 pași spre stânga primește pasa la noua poziție. Etapa sa crește la 8 pași; sosirea este aceeași. |
| R2 - Trei alergători | După prima predare, B merge 1 pas cu mingea. B se oprește; mingea continuă singură 3 până la C. C așteaptă predarea și merge 2 cu mingea până la sosire. |

Pozițiile și vizibilitatea au fost citite din elementele DOM ale scenei la intervale de aproximativ 80-100 ms. Nu a fost apelat direct motorul aplicației. [Observații brute](../capturi_stafeta/verificare.json) · [Rezultate verificate](../capturi_stafeta/rezultate.json).

`check_stafeta.py` verifică observațiile salvate: cele două faze ale primei predări, sincronizarea transportului, ocolirea gardului, a doua predare în R2, pozițiile finale și sărbătorirea numai după sosire. Mingea rămâne vizibilă în toate probele. R2 a fost reluat după aranjarea celui de-al treilea program în dreapta; resetarea, salvarea și redeschiderea au păstrat pozițiile de plecare.

Capturile arată programele reale. În portul de browser, unele pictograme de plic au rămas inițial goale după import; reselectarea aceleiași culori în meniul blocului le-a afișat. Valorile culorilor și rezultatele rulării au rămas aceleași. Toate plicurile din PDF sunt vizibile.

PDF-ul are 13 pagini A4, randate și verificate vizual: plan, pregătire, toate programele pentru misiuni, creație și rezerve. Programele neschimbate ale lui A refolosesc aceeași captură, indicată ca atare în sursele ajutorului vizual.

**Limitele probei:** au fost executate soluțiile complete importate, nu reconstruite toate blocurile prin drag-and-drop. Nu a fost retestată aplicația Android sau Windows instalată; ieșirea audio nu a fost măsurată. Gardul nu produce coliziune automată: regula ocolului se verifică vizual. Înaintea fiecărei probe se resetează pozițiile.

[Plan și programe ilustrate](../../Plan_lectii_ScratchJr_60min.pdf) · [Ghid online](../index.html#profesor) · [Proiecte native](../solutii_stafeta/README.md).

[Arhiva testelor pentru „Programe în lanț”](Programe_in_lant_60min.md).
