# Verificarea meniului siteului

11 noiembrie 2026. Meniu comun, curs ScratchJr cu zece lecții și secțiune separată pentru exercițiile originale Robo.

## Verificări efectuate

- 122 de teste automate au trecut: motorul și interfața Robo, navigarea nouă, compatibilitatea adreselor vechi și existența fișierelor. Verificarea numelor ține cont de litere mari/mici, pentru publicarea pe GitHub Pages.
- 310 URL-uri locale, găsite urmărind 67 de pagini și documente: toate au răspuns HTTP 200, iar conținutul primit a corespuns exact fișierului. Sunt incluse ghidurile, cartonașele, proiectele SJR, imaginile, exemplele audio și cele zece ZIP-uri.
- Cele zece referințe externe au răspuns HTTP 200 la momentul verificării.
- În browser am deschis toate cele zece lecții din catalog și am revenit la meniu. Toate imaginile s-au încărcat. Am parcurs și toate cele nouă legături Înainte, apoi toate cele nouă Înapoi.
- O misiune Robo a fost rezolvată prin butoanele obișnuite. Lecția 22 s-a deschis cu harta 7×7. Linkul vechi pentru lecția 8, varianta 2, a păstrat alegerea; linkul vechi pentru acasă a deschis cele șase misiuni.
- Meniul compact Cursuri din Robo păstrează spațiul pentru hartă și comenzi. La 1280×720, butonul de pornire și mesajul de stare al lecției 22 sunt în fereastră.

## Dovezi

- [Verificarea HTTP locală](local-links.json)
- [Referințe externe](external-links.json)
- [Navigarea în browser](browser.json)
- [Meniul principal](meniu.png)
- [Catalogul ScratchJr](curs_scratchjr.png)

## Repetarea verificării

Din rădăcina repository-ului: `npm run check` și `npm test`. Pentru o probă în browser, servește folderul proiectului prin HTTP și deschide `index.html`. Pentru verificarea adreselor GitHub Pages, folosește același prefix `/Pregatitoare1/`.

`python scripts/package-lessons.py` actualizează cele zece arhive și verifică legăturile locale din fiecare. Arhivele individuale conțin pagina lecției fără meniul întregului site. În copia planului din ZIP, legăturile către alte lecții duc la site; materialele lecției descărcate rămân locale.

Acesta este un test al navigării și al fișierelor website-ului. Nu înlocuiește verificarea tactilă a proiectelor în ScratchJr pe tabletele clasei.
