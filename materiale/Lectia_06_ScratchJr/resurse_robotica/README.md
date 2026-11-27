# Resurse originale - Robotul de inspecție

`robot-inspectie.png`: robot mobil cu bară de contact portocalie, fundal transparent. `atelier-robotica-v2.png`: atelier 4:3 apropiat, cu banc de lucru și zonă de testare delimitată. `atelier-robotica.png` păstrează prima variantă, nefolosită în proiectele v2.1. Ilustrații originale generate pentru curs; prompturile sunt păstrate în [prompturi.json](prompturi.json). Noul fundal a fost editat cu instrumentul **image_gen** folosind fundalul inițial și robotul ca referințe; cerința exactă și metoda sunt în [prompt-atelier-v2.json](prompt-atelier-v2.json). Nu reprezintă un model comercial de robot.

Imaginile PNG originale sunt păstrate nemodificate. Generatorul le include în SVG-uri ScratchJr cu imagini încorporate; nu depind de URL-uri externe. Barierele și stația sunt SVG-uri vectoriale redesenate pentru lecție, cu contururi compatibile cu ScratchJr. Robotul are scara 0,85 în loc de 0,60; barierele sunt 32 × 88, iar stația 64 × 100 la scara 1. Directorul `native` păstrează aceste patru resurse.

Importă [starterul](../solutii_inspectie/start.sjr), nu imaginile separat. El include ambele bariere; nu este nevoie să găsești resursele în biblioteca globală. Toate blocurile programelor sunt standard ScratchJr, inclusiv La ciocnire și Pop.

Importul, afișarea, rularea și păstrarea resurselor după redeschidere au fost verificate în browser. [Raport și avertizarea versiunii web](../verificare/Inspectie_60min.md). Importul pe Android fizic rămâne de probat înaintea orei.
