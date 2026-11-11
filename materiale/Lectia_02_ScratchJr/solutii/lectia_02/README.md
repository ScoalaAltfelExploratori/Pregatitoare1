# Soluțiile lecției 2 - Numai pentru profesor

Copiii construiesc programele; nu primesc SJR-uri. Toate exemplele folosesc Rabbit, Ball și Park din biblioteca instalată. Mingea nu are program.

## 1. Trei patrulări

[Exemplul SJR](01_Trei_patrulari.sjr): **steag → Repeat 3 [dreapta 2, sari 2, stânga 2]**.

Iepurele începe la x=96, y=192, ajunge la x=144 în fiecare patrulare și revine la x=96. Sare de trei ori și încheie la start. Alte distanțe mici sunt acceptate dacă deplasarea dus și întors se compensează, personajul rămâne pe scenă și întregul grup este repetat de trei ori.

## 2. Șase pătrățele

[Exemplul SJR](02_Sase_patratele.sjr): **steag → Repeat 3 [dreapta 2, sari 2]**.

Trei deplasări de câte doi pași însumează șase pași. Un pas are 24 de unități interne. Din x=96 ajunge la x=240, pe coloana mingii, după trei sărituri. În grila afișată, trece de la coloana 5 la coloana 11. Mingea este pe un rând inferior.

O singură deplasare de șase pași sau o săritură pusă după buclă nu îndeplinește cerința. Ajutăm copilul să verifice propria construcție; nu îi cerem să creeze intenționat aceste variante.

## 3. Expediția dificilă

[Exemplul SJR](03_Expeditia_dus_intors.sjr): **steag → Repeat 4 [dreapta 2, sari 2] → Repeat 4 [stânga 2]**.

Prima buclă ajunge la x=288 (coloana afișată 13), după patru sărituri. A doua revine la x=96 (coloana 5). Ambele sunt conectate în același șir; nu există un al doilea steag, bucle imbricate sau resetare în mijlocul programului.

Săriturile la întoarcere sunt permise. Este acceptată și revenirea prin Repeat 2 [stânga 4], dacă elevul o descoperă; modelul furnizat folosește patru pași de câte doi. Toate variantele trebuie să păstreze cele patru deplasări egale și patru sărituri la dus, precum și a doua buclă la întoarcere.

## Indicii și verificare

- Cere copilului să arate grupul care se repetă și numărul buclei.
- La țintă, numărați spațiile de grilă, fără a include startul ca pas.
- Pentru expediție, rezolvă întâi drumul dus, apoi arată direcția de întoarcere și locul celei de-a doua bucle.
- Sari 2 înseamnă o singură săritură de înălțime 2. Numărul Repeat stabilește de câte ori se execută grupul.

Toate cele trei soluții au fost importate, rulate, resetate și redeschise cu succes în browserul comunitar; vezi [raportul](../../verificare/README.md). Aceste verificări nu certifică gesturile tactile sau funcționarea pe Lenovo.
