# Verificare — Lecția 0

11 noiembrie 2026. Patru fișiere native `.sjr`, importate și verificate în ScratchJr Desktop Reborn. Editorul web propriu a fost înlocuit.

| Proiect | Verificare |
| --- | --- |
| Spectacolul din parc | Cele patru scene pornesc prin apăsare. Iepurașul merge de la 3 la 5; din 7 mingi rămân 4; semnalul are 5 Pop; finala trece prin 4, 7 și 5 artiști. Fluturele apare după program și schimbă pagina. Finala revine la început. |
| Construim spectacolul | Import cu patru programe principale goale. În editor am tras și conectat Dreapta, am schimbat valoarea în 2 și am executat deplasarea de 48 de pixeli, adică două pătrățele ScratchJr. Am salvat și redeschis copia de test. |
| Rezerva Contact | Steagul pornește deplasarea. Contactul produce un Pop și ascunde mingea. |
| Rezerva Statui | Fluturele pornește transformările repetitive. Mingea le oprește; personajele rămân stabile după oprire. |

Proiectul principal final a fost parcurs și în aplicația publică, inclusiv decorul Theatre și întoarcerea la început. [Captură din editorul ScratchJr](spectacol-scratchjr.png).

Înregistrările [drumului](01_drumul.json), [recuzitei](02_recuzita.json), [semnalului](03_semnal.json) și [finalei](04_spectacol.json) provin dintr-o copie locală a aplicației publicate, cu un observator separat pentru transformări și audio. Programele și motorul ScratchJr nu au fost modificate. Capturile de comportament au precedat schimbarea exclusiv vizuală a decorurilor de scenă în Theatre; apoi am parcurs din nou proiectul final în aplicația publică. Cele cinci evenimente audio ale semnalului au semnal nenul. Testul nu măsoară difuzorul fizic al laptopului.

[Contact](05_contact.json) · [Statui](06_statui.json) · [Construcție](07_constructie.json) · [Blocul conectat în editor](constructie-manuala.png)

Toate arhivele au JSON valid, identificatori unici, maximum patru pagini și numai personaje, decoruri și sunete din biblioteca aplicației. Park, Theatre, Rabbit, Dog, Ball, Butterfly și Pop există și în pachetul oficial Android inspectat. Fișierele nu includ personaje sau decoruri personalizate.

Verificarea de aici este pentru varianta comunitară în browser, nu pentru aplicația Android oficială. Importul a fost făcut prin Open, acțiunile și editarea prin interfața ScratchJr.

Website: 126 de teste automate au trecut; după introducerea poveștii, cele nouă verificări ale proiectelor și navigării au trecut din nou. Legăturile și descărcările Lecției 0 au fost verificate la publicare.
