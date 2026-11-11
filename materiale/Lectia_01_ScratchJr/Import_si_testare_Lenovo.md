# Lenovo: instalare și import opțional pentru profesor

**Pentru clasă nu importăm proiecte.** Instalăm ScratchJr o dată și construim scenele din biblioteca aplicației. Pașii recomandați sunt în [README](README.md) și [ghid](Ghid_profesor.md).

## Instalarea

Pe Lenovo K10, deschide [pagina oficială ScratchJr din Google Play](https://play.google.com/store/apps/details?id=org.scratchjr.android), verifică dezvoltatorul Scratch Foundation și instalează. Nu alege o aplicație cu nume asemănător, cum ar fi „Scratchjr Projects”. Nu este necesar Android Studio, un emulator sau instalarea unui APK din altă sursă.

Fă pe o tabletă proba cu proiect nou, două personaje, blocuri, salvare și redeschidere. Verifică apoi funcționarea fără internet. Cei 3 GB RAM ai tabletei nu înlocuiesc această probă practică; emulatorul nu reproduce performanța hardware-ului Lenovo.

## Dacă profesorul vrea să importe un exemplu

1. Descarcă sau copiază pe dispozitivul profesorului un singur fișier `.sjr`, de exemplu `proiecte/02_Intalnirea.sjr`. Nu trebuie extras ca ZIP și nu trebuie copiat pe tabletele copiilor.
2. Deschide ScratchJr și intră în galeria proiectelor. În versiunea Android 1.5.11 testată există butonul de import cu pictograma cadou.
3. Alege fișierul din Downloads/Descărcări în selectorul Android. Dacă dispozitivul oferă „Deschide cu ScratchJr” din managerul de fișiere, poți folosi și acea opțiune.
4. Revino în galerie și deschide proiectul importat. Nu confunda importul cu butonul + pentru un proiect gol.
5. Verifică iepurele, mingea și parcul, apoi rulează steagul verde. Resetează, revino la galerie și redeschide.

Dacă fișierul nu apare, verifică extensia `.sjr` și faptul că descărcarea este completă. Nu redenumi ZIP-ul întregului pachet în SJR. Pentru demonstrație poți construi modelul în câteva minute din bibliotecă, fără import.

## Starea testelor

Importul Android de mai sus a fost observat pentru două variante inițiale în aplicația oficială 1.5.11, pe Android 11. Cele șapte variante finale cu iepure au fost importate și rulate în browserul comunitar; nu au fost retestate integral în Android. Vezi [raportul complet](verificare/README.md).

Pe acest PC, emulatorul utilizabil este `ScratchJr_Lesson1_Android11` din Android Studio → Device Manager. Aplicația oficială este deja instalată acolo. Emulatorul Android 15 `ScratchJr_Lesson1_Tablet` a avut incompatibilitate cu listarea Google Play. Pentru pregătirea curentă pe PC recomandăm [browserul](https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/), folosit de agent în fundal, într-o sesiune separată.
