# Resurse locale

- `diploma-template.js`: imaginea diplomei furnizată de utilizator, încorporată ca data URL. Nu este modificată. Această formă permite generarea PDF inclusiv din `file://`, fără cereri de rețea sau restricții de canvas pentru imagini locale.
- `vendor/jspdf.umd.min.js`: jsPDF **4.2.1**, copiat din pachetul npm fixat în `package-lock.json`. Licența MIT este alături, în `vendor/jspdf.LICENSE.txt`. Este încărcat numai la descărcarea diplomei. Nu se încarcă biblioteci de pe CDN.

Actualizarea bibliotecii: modifică dependența de dezvoltare, copiază distribuția UMD și licența din pachet, apoi verifică din nou PDF-ul descărcat în browser. Nu edita manual distribuția minificată.
