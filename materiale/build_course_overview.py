"""Publish the course progression and keep the same notes in each teacher guide."""
from pathlib import Path
import html,json,re
from render_teacher_guides import teacher_html,blocks,inline
M=Path(__file__).resolve().parent;R=M.parent
DATA=json.loads((M/'Progresia_cursului.json').read_text(encoding='utf-8'))
PLANS={p['number']:p for p in json.loads((M/'Plan_lectii_ScratchJr_60min.json').read_text(encoding='utf-8'))['lessons']}
COPY='Pentru un fir deja înțeles: prinde-l de primul bloc și trage-l peste miniatura personajului destinatar din lista din stânga. Selectează destinatarul și verifică acea copie. Firele rămân independente; schimbă numai culoarea, distanța sau întârzierea cerută. Dacă firul dispare din greșeală, folosește Undo.'
INTRO='''# Parcursul celor zece lecții ScratchJr

**10 întâlniri × 60 de minute · 6-7 ani · puzzle greu în bază · două rezerve la fiecare lecție.**

Copiii cunosc deja secvențele din Robo. Lecția 1 introduce mesajele explicit; experiența cu Robo nu înlocuiește această demonstrație. Lecțiile 1–5 se construiesc din biblioteca instalată. Lecțiile 6–10 au câte un starter cu toate imaginile, importat înaintea orei. Copiii construiesc programele în același proiect.

Dificultatea crește prin relațiile dintre acțiuni: ordine, întrerupere, sincronizare, reacție, stare și resursă limitată. Nu crește obligatoriu numărul de blocuri la fiecare întâlnire. Lecțiile 7 și 9 consolidează mecanisme cunoscute în probleme noi; nu le prezentăm drept descoperirea unor blocuri complet noi.

## Progresia și verificarea înțelegerii

'''
text=INTRO
for e in DATA['lessons']:
 n=e['number'];title=PLANS[n]['title'];folder=f'Lectia_{n:02}_ScratchJr'
 text+=f"### {n}. {title}\n\n**Reluăm:** {e['recap']}\n\n**Pasul următor:** {e['new']}\n\n**Reușită observabilă:** {e['checkpoint']}\n\n**Sprijin:** {e['support']}\n\n[Lecția]({folder}/index.html) · [Ghid]({folder}/ghid-profesor.html) · [PDF cu programe]({folder}/Ghid_profesor_Lectia_{n:02}.pdf)\n\n"
 l=M/folder;p=l/'Ghid_profesor.md';md=p.read_text(encoding='utf-8')
 section=f"## Locul lecției în curs\n\n**Reluăm:** {e['recap']}\n\n**Ce adăugăm:** {e['new']}\n\n**Verificăm înțelegerea:** {e['checkpoint']}\n\n**Cum păstrăm ritmul:** {e['support']}\n\n"
 if n>=3:section+=COPY+' [Reper oficial](https://sites.bc.edu/scratchjr/learn/).\n\n'
 section+='[Progresia celor zece lecții](../Progresia_cursului.md).\n\n'
 if '## Locul lecției în curs' in md:md=re.sub(r'## Locul lecției în curs\n.*?(?=\n## |\Z)',section.rstrip(),md,flags=re.S)
 else:md=md.replace('\n## ', '\n'+section+'## ',1)
 p.write_text(md,encoding='utf-8');teacher_html(l,duration=60)
text+='''## Ritmul orei și sprijinul

Nu cerem reconstruirea întregii soluții la fiecare etapă: păstrăm firele care nu se schimbă. PDF-ul le repetă pentru a putea fi consultat independent. Rezolvăm o operație, o probăm și abia apoi o extindem.

'''+COPY+''' [Reper oficial](https://sites.bc.edu/scratchjr/learn/).

La Lecțiile 6 și 8, numărul de personaje și fire este mai mare. Modelăm întâi un tipar și îl reutilizăm. Dacă ritmul este lent, profesorul construiește împreună cu grupa firele repetitive; copilul decide ruta, ordinea sau culoarea. Puzzle-ul greu rămâne în baza lecției. Lecțiile 1–8 păstrează cele zece minute de creație; Lecțiile 9–10 nu au această etapă.

Rezervele sunt peste ora de bază, pentru cei care termină repede. Nu le folosim înaintea puzzle-ului greu și nu înlocuiesc salvarea. Pauzele active sunt deja în planurile 1–5; în lecțiile 6–10 putem schimba poziția în timpul explicației dintre misiuni.

Duratele sunt ținte de predare, nu timpi măsurați cu această clasă. În fișa de observație notăm timpul real, sprijinul necesar și ce trebuie reluat la întâlnirea următoare.

## Aceeași rutină la fiecare probă

1. Selectăm personajul și identificăm firul corect. Plicurile pereche au aceeași culoare; semnificația culorii este locală proiectului.
2. Pregătim startul după instrucțiunile lecției. L1–2, L6–7: Stop, pagina inițială dacă există, Reset Characters, apoi Steag. În L2 atingem paznicul după pornirea animațiilor. L3: pagina 1, Stop, Reset Characters, Steag, apoi o singură atingere pe autobuz. L4: Steag la M1–M2, atingerea dirijoarei din M3. L5: atingerea mașinii după resetare, nu Steag. L8–10: Stop, apoi Steag; în L8 nu apăsăm Steag între comenzile telecomenzii.
3. Prezicem rezultatul, rulăm și verificăm ținta vizibilă. Nu mutăm obiectele cu degetul în timpul unei probe automate.
4. Salvăm prin revenire în galerie și redeschidem. Pentru o probă completă cu pagini revenim la pagina 1.

Reset Characters readuce personajele la pozițiile inițiale. Blocul albastru La poziția inițială este o comandă din program. Nu îl folosim ca scurtătură atunci când cerința cere un retur vizibil.

ScratchJr nu atașează automat încărcătura, nu recunoaște materialele și nu verifică toate regulile poveștii. Ghidurile spun explicit ce este controlat prin cod și ce verificăm vizual. La grădinar indicatorul nu este o variabilă și nu interzice automat udarea la zero.

[PDF-ul complet](Plan_lectii_ScratchJr_60min.pdf) · [Verificarea cursului](verificare_curs/README.md) · [Surse și adaptări](Surse_oficiale_ScratchJr.md).
'''
(M/'Progresia_cursului.md').write_text(text,encoding='utf-8')
# The website reads the same source; adjust only relative links for its directory.
web=re.sub(r'\]\((?!https?://|#)([^)]+)\)',lambda m:'](../materiale/'+m[1]+')',text)
body=[]
for kind,v in blocks(web):
 if kind.startswith('h'):body.append(f'<{kind}>{inline(v)}</{kind}>')
 elif kind=='step':body.append('<p class="step">'+inline(v)+'</p>')
 else:body.append('<p>'+inline(v)+'</p>')
page='''<!doctype html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Parcursul cursului ScratchJr</title><link rel="stylesheet" href="../site.css"><link rel="stylesheet" href="../site-navigation.css"><style>main{max-width:1000px}h2{margin-top:2rem}h3{margin-top:1.7rem;color:#175a48}p{line-height:1.65}</style></head><body><a class="skip-link" href="#continut">Sari la conținut</a><div class="site-navigation"><nav aria-label="Secțiunile siteului"><a class="site-home" href="../index.html">Școala altfel</a><a href="index.html">ScratchJr · 10 lecții</a><a href="../robo/index.html">Robo · exerciții</a></nav></div><main id="continut"><p class="eyebrow">Pentru profesor · curs complet</p>'''+''.join(body)+'<p><a href="index.html">← Toate lecțiile</a></p></main></body></html>'
(R/'scratchjr/parcurs.html').write_text(page,encoding='utf-8')
print('Updated course progression and all 10 teacher guides.')
