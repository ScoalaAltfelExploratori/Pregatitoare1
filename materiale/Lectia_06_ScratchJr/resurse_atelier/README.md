# Resurse - Robotul pregătește atelierul

Robotul transparent și fundalul atelierului sunt ilustrațiile originale ale cursului, reutilizate din [resurse_robotica](../resurse_robotica/README.md). Fișierele robot.svg și atelier.svg încorporează pixelii PNG, fără adrese externe.

Încărcătorul, segmentele bateriei, resturile, cadrul, ușa și butoanele sunt resurse vectoriale native create în build_atelier.py, în stilul echipamentului existent. Se folosesc contururi simple compatibile cu ScratchJr. Robotul păstrează scara 0,85; echipamentul este mare și împărțit între două scene.

Toate resursele sunt incluse în fiecare SJR care le folosește. Importă [starterul](../solutii_atelier/start.sjr), nu aceste imagini separat. Nu este nevoie ca ele să apară în biblioteca globală a aplicației. Programele folosesc blocuri standard ScratchJr.
