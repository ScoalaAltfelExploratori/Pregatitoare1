# Soluții - Lecția 5 Fabrica de ritmuri

Referințe pentru profesor. Copiii construiesc în aplicație, fără proiecte de importat. Folosim numai Rabbit, Dog, Park și Pop. Scurt = Așteaptă 3, mediu = 6, lung = 12; alte valori sunt acceptate dacă păstrează tiparul sonor.

## M1 Codul secret

[Proiectul](01_Codul_secret.sjr). Iepure: atingere → Pop → așteaptă 3 → Pop → așteaptă 12 → Pop. Câine fără program. Exact trei sunete, scurt-lung între ele.

## M2 Patru sunete, două ritmuri

[Proiectul](02_Patru_sunete_doua_ritmuri.sjr).

- Iepure: atingere → repetă 4 [Pop → așteaptă 6].
- Câine: atingere → repetă 2 [Pop → așteaptă 3 → Pop → așteaptă 12].

Patru sunete fiecare; iepurele are intervale egale, câinele scurt-lung-scurt. Testăm pe rând. Ultima pauză din buclă nu mai adaugă un sunet.

## M3 Salutul secret - dificilă

[Proiectul](03_Salutul_secret.sjr).

- Iepure: atingere → repetă 3 [Pop → așteaptă 3 → Pop → așteaptă 12] → trimite portocaliu.
- Câine: la mesaj portocaliu → Pop.

Șase sunete grupate în trei perechi, apoi un singur răspuns: șapte în total. Mesajul este după buclă. Câinele nu mai are vechiul program la atingere. Același timbru Pop la amândoi; identificăm rolurile și prin programe. Repetăm fără resetare, după liniștea finală.

## R1 Ecoul

[Proiectul](04_Rezerva_Ecoul.sjr).

- Iepure: atingere → Pop → așteaptă 3 → Pop → așteaptă 12 → Pop → așteaptă 12 → trimite portocaliu.
- Câine: la portocaliu → Pop → așteaptă 3 → Pop → așteaptă 12 → Pop.

Șase sunete, două coduri identice de trei; pauză lungă între artiști. Fără mesaj de întoarcere. Înlocuim programele M3.

## R2 Șapte sunete, două blocuri

[Proiectul](05_Rezerva_Sapte_sunete.sjr). Iepure: atingere → repetă 6 [Pop → așteaptă 3] → Pop. Câine fără program.

Exact două blocuri Pop și un Repeat; șapte sunete. Fără mesaje sau alt personaj activ. Este acceptată și ordinea Pop → așteaptă 3 → repetă 6 [Pop → așteaptă 3], care păstrează constrângerile. Diferențiem numărul blocurilor verzi de numărul execuțiilor lor.

## Proba fiecărui proiect

Un tap, numărăm și comparăm pauzele, așteptăm finalul, apoi repetăm fără resetare. Steagul verde nu pornește programele. Salvăm prin galerie și redeschidem. [Raportul](../../verificare/README.md) conține probele și limitele. [Demo](../../proiecte/00_Demo_Pop.sjr) și [starter](../../proiecte/01_Start_Ritmuri.sjr) sunt opționale pentru profesor.
