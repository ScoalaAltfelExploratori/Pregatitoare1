# Verificarea Lecției 0

Prezentare: [Laboratorul surprizelor](../../scratchjr/lectia-0/index.html).

Verificare locală în browser, 11 noiembrie 2026. Acest raport privește prezentarea web Lecția 0, nu o nouă testare a aplicației Android ScratchJr.

- Parcurse toate cele **15 scene**: introducere, zece opriri, pauză, încheiere și două rezerve.
- Verificate rezultatele: 5 pași, 6 pași prin repetiție, 4 mingi vizibile, destinatarul portocaliu, 3 impulsuri vizuale, 6 comori rămase, pagina de plajă, 2 dansatori activi, lanțul complet de descoperiri, 5 animale la final, zero mingi, completarea până la 10.
- Răspunsul greșit nu permite continuarea. Răspunsul corect cere încă demonstrația. Nu există avansare automată.
- Personajele ascunse nu pot fi apăsate. Finala oferă întoarcerea numai după terminarea spectacolului. Reia readuce întrebarea și blochează din nou continuarea.
- Verificate cuprinsul și navigarea între toate scenele. Verificate dimensiunile de proiector **1280 × 720** și **1024 × 768**; scena păstrează aceeași proporție, iar controalele rămân în cadru. Pe 4:3 există benzi libere, intenționat.
- Corectate în timpul verificării: lățimea etichetelor plicurilor, contrastul răspunsului corect după selectare și spațiul dintre obiectele de numărat și legenda scenei.
- În browserul integrat, ecranul complet nu este disponibil; butonul oferă indicația F11. Verificarea pe proiectorul fizic rămâne de făcut înainte de clasă.
- Ritmul a fost verificat vizual; fișierul Pop este local. Testele automate verifică și continuarea când browserul refuză sunetul. Volumul și audibilitatea în clasă se verifică pe laptop.
- Pagina nu are dependențe externe. Pornirea directă prin `file://` nu a putut fi testată în browserul integrat, care blochează acest protocol; verificarea interactivă a folosit serverul local. Înainte de utilizare fără internet, deschide fișierul din folder în browserul laptopului.
- **129 teste automate trecute**, inclusiv șapte pentru Lecția 0: calcule 0–10, toate demonstrațiile, răspunsuri și avansare, anularea animațiilor la schimbare/resetare, lanțul de descoperiri, tastatură și adresă de scenă invalidă. Verificarea sintaxei JavaScript a trecut.
- Legăturile locale ale întregului site au fost verificate prin HTTP; raportul este în [local-links.json](../local-links.json).

Datele verificării vizuale: [browser.json](browser.json). Imagini: [16:9](projector-16-9.png), [4:3](projector-4-3.png).
