# Soluții - Lecția 4 Telecomanda fermecată

Referințe pentru profesor. Copiii construiesc din biblioteca aplicației; nu primesc proiecte de importat. Numerele 4 și 10 sunt alegeri ale modelului, nu singurele soluții acceptate.

## 1. Magia la distanță

[Deschide proiectul](01_Magia_la_distanta.sjr).

- Iepure: atingere → trimite portocaliu.
- Câine: la mesaj portocaliu → mărește 4 → așteaptă 10 → mărimea inițială.

Un tap pe iepure; câinele crește și revine normal, iepurele rămâne neschimbat. Se repetă fără resetare.

## 2. Două butoane

[Deschide proiectul](02_Doua_butoane.sjr). Păstrăm M1 și adăugăm fluturele.

- Iepure: atingere → trimite portocaliu.
- Fluture: atingere → trimite albastru.
- Câine, programul 1: la portocaliu → mărește 4 → așteaptă 10 → mărimea inițială.
- Câine, programul 2, separat: la albastru → ascunde → așteaptă 10 → arată.

Testăm pe rând iepurele și fluturele. Nu atingem câinele. Cele două butoane rămân neschimbate; câinele termină vizibil și normal.

## 3. Spectacolul în lanț - dificilă

[Deschide proiectul](03_Spectacolul_in_lant.sjr).

- Iepure: atingere → mărește 4 → așteaptă 10 → mărimea inițială → trimite portocaliu.
- Câine: la portocaliu → ascunde → așteaptă 10 → arată → trimite albastru.
- Fluture: la albastru → mărește 4 → așteaptă 10 → mărimea inițială.

Înlocuim programele M2 cu aceste trei secvențe: câinele nu mai are două porniri, fluturele nu mai are pornire la atingere. Mesajul se trimite după încheierea trucului celui care dă rândul. Nu există mesaj de întoarcere de la fluture. Un singur tap pe iepure pornește întregul lanț; al doilea, după terminare, îl repetă fără resetare.

## R1. Un semnal, două surprize

[Deschide proiectul](04_Rezerva_Un_semnal.sjr).

- Iepure: atingere → trimite portocaliu, un singur bloc de trimitere.
- Câine: la portocaliu → mărește 4 → așteaptă 10 → mărimea inițială.
- Fluture: la portocaliu → ascunde → așteaptă 10 → arată.

Ambele trucuri pornesc de la aceeași culoare. Observăm câinele mare în timp ce fluturele este ascuns; nu cerem același moment de terminare. Scoatem trimiterea albastră din programul câinelui din M3. Toți termină vizibili și normali.

## R2. De-a v-ați ascunselea

[Deschide proiectul](05_Rezerva_Va_ascunselea.sjr).

- Iepure: atingere → trimite portocaliu.
- Fluture: atingere → trimite albastru.
- Câine, două programe separate: la portocaliu → ascunde; la albastru → arată.

Câinele rămâne ascuns până vine comanda albastră. Nu folosim Wait sau revenire automată. Test: iepure, așteptăm, fluture; repetăm fără resetare. Testăm și iepure de două ori, apoi fluture: comenzile au roluri fixe, nu comută automat starea.

## Verificare și folosire

În exemplele finale folosim numai Rabbit, Dog, Butterfly și Park. Personajele sunt inițial vizibile și normale; nu se deplasează. Steagul verde nu declanșează programele. Demo-ul și starterul sunt în [proiecte](../../proiecte/01_Start_Telecomanda.sjr). [Raportul testelor](../../verificare/README.md) precizează ce s-a verificat efectiv în browser și ce rămâne de încercat pe Lenovo.
