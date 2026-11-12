# Lecția 8 - Statuile fermecate

**50 de minute, 6-7 ani. Trei misiuni, inclusiv un puzzle dificil pentru toți, plus două rezerve suplimentare.** Ideile noi sunt Repeat Forever și Stop: controlăm un program în timp ce rulează și îl repornim de la un început clar.

## Exemplu, puzzle și creație proprie

Deschidem cu **Dans și înghețare**, pornind de la [CAL clasa I - Freeze Dance Party (lecția 16)](https://sites.bc.edu/codingasanotherlanguage/curricula/scratchjr-curricula/1st-grade-scratchjr/). Păstrăm misiunile, puzzle-ul dificil și rezervele existente.

**Minutele 37-45: Coregrafia mea** - 8 minute rezervate tuturor, cu alegeri de programare și o probă proprie. Copilul poate porni de la orice misiune care îi funcționează. Numai resurse incluse în aplicație, fără importuri pe tabletele copiilor.

[Ghidul profesorului pe site](ghid-profesor.html) · [Ghid PDF](Ghid_profesor_Lectia_08.pdf) · [Surse și adaptări](../Surse_oficiale_ScratchJr.md)

## Pregătire simplă

Numai **Rabbit, Dog, Butterfly, Ball și Park**, din biblioteca ScratchJr. Fără importuri pe tabletele copiilor, descărcări, sunete, înregistrări sau texte de scris. Creăm scena împreună; copiii construiesc programele. SJR-urile sunt referințe opționale pentru profesor.

Iepurele și câinele sunt separați și rămân pe loc. Folosim transformări de mărime, fără coordonate exacte. La M3 adăugăm fluturele pentru Pornire și mingea pentru Înghețare, sus și separate de artiști. Nu micșorăm butoanele.

## Materiale

- [Ghidul profesorului](Ghid_profesor.md) și [PDF de cinci pagini](Ghid_profesor_Lectia_08.pdf).
- [Cinci cartonașe PDF](Cartonase_Lectia_08.pdf), cu ținte și scheme, fără soluțiile complete.
- [Soluții explicate și cinci SJR-uri](solutii/lectia_08/README.md).
- [Demo](proiecte/00_Demo_Statuie.sjr), [scenă fără programe](proiecte/01_Start_Statui.sjr), [index pentru proiector](index.html).
- [Raportul testelor](verificare/README.md) și [fișa de observații](Observatii_dupa_lectie.md).

| Activitate | Ținta |
| --- | --- |
| M1 Artistul neobosit | Mare-normal, la nesfârșit, fără acumularea mărimii |
| M2 Fiecare cu pauza lui | Atingerea oprește numai artistul ales |
| M3 Regizorul statuilor - dificilă | Două butoane și două mesaje: pornire-înghețare de două ori |
| R1 Trei ipostaze | Normal-mare-mic; înghețarea într-o stare aleasă |
| R2 Cortina automată | Un tap pornește artiștii și cronometrul, apoi oprire automată |

Rezervele de 6-8 și 8-10 minute sunt peste cele 50 de minute. Nu înlocuiesc provocarea dificilă, pauza sau salvarea. Copiii construiesc pentru ținte; nu copiază intenționat programe greșite.

## Detalii importante pentru predare

Forever se pune la sfârșitul rutinei. Stop portocaliu se pune în alt program al aceluiași artist. Nu îl confundăm cu End roșu sau cu oprirea generală din bara aplicației. Stop oprește celelalte programe active ale personajului său; pentru doi artiști, fiecare trebuie să primească mesajul de oprire.

O nouă pornire reia rutina de la început, nu din locul întrerupt. Mărime inițială la început permite repetarea fără Reset. Nu cerem o dimensiune exactă la înghețare, cu excepția țintei alese în R1. În R2, mingea cronometrează în paralel, pornită de același mesaj ca artiștii.

## Proba pe PC în browser

Deschide [ScratchJr Desktop Reborn](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), portul comunitar folosit pentru teste. În galerie, Open → alege SJR-ul → deschide proiectul. Demo, M1, M2 și R1 pornesc la steag. M3 și R2 pornesc prin fluture. Starterul nu are programe.

La M1 oprește din bara aplicației. La demo și R1 atinge iepurele. La M2 oprește pe rând iepurele și câinele. La M3 folosește mingea, iar la R2 așteaptă oprirea automată. Repetă fără Reset, oprește, revino în galerie și redeschide.

Browserul nu se sincronizează cu tabletele. [Raportul](verificare/README.md) descrie verificările reale și limitele lor. Înainte de clasă reconstruiește M2 și M3 pe un Lenovo, verifică două reporniri, salvarea și redeschiderea fără internet. Nu trebuie distribuite fișiere copiilor.

## Surse editabile

`lesson.json` definește programele și cartonașele. `Ghid_profesor.md` este sursa ghidului. `python build_pack.py` regenerează cele două PDF-uri și șapte SJR-uri; `--projects-only` generează doar proiectele. Necesită Python, reportlab, Pillow, pypdf și fonturile Arial din Windows. Modificarea programelor cere repetarea testelor în editor.

[Planul celor zece lecții](../Plan_10_lectii_ScratchJr.md).
