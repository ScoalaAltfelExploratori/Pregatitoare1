"""Complete solutions for the three optional live coding challenges."""
from copy import deepcopy

def make_bonus(full, script, b, label):
    orchard, meal, rain = deepcopy(full[1:])
    def sprite(page, key):
        return next(s for s in page['sprites'] if s['id'] == key)
    for page, title, focus in [(orchard, 'Rezervă 3: scuturăm pomul', 'pom'),
                               (meal, 'Rezervă 4: cei trei, primii', 'iepuras'),
                               (rain, 'Rezervă 5: a trecut ploaia!', 'soare')]:
        page['build'] = []
        page['focus'] = focus
        page['texts'] = [label(title, 240, 28, 24)]
    sprite(orchard, 'pom')['scripts'] = [script('onclick', b('message', 'Red'))]
    for key in ['mar3', 'mar4', 'mar5']:
        sprite(orchard, key)['scripts'][0]['trigger'] = b('onmessage', 'Red')
    sprite(meal, 'iepuras')['scripts'][0]['actions'] = [b('message', 'Blue')]
    sprite(meal, 'catel')['scripts'][0]['actions'] = [b('message', 'Red')]
    sprite(rain, 'soare')['scripts'].append(script('onclick', b('message', 'Green')))
    for i, key in enumerate(['iepuras', 'pui', 'catel', 'rata', 'pasare']):
        actions = [b('show'), b('down', 4)]
        if i < 4:
            actions.append(b('back', 8 - 2*i))
        sprite(rain, key)['scripts'].append(script('onmessage', *actions, color='Green'))
    return [
        {'name': 'L00 Solutie R3 Scuturam pomul', 'short': 'Pomul', 'path': 'solutii/03_Scuturam_pomul.sjr', 'pages': [orchard]},
        {'name': 'L00 Solutie R4 Cei trei primii', 'short': 'La masa', 'path': 'solutii/04_Cei_trei_primii.sjr', 'pages': [meal]},
        {'name': 'L00 Solutie R5 A trecut ploaia', 'short': 'Soarele', 'path': 'solutii/05_A_trecut_ploaia.sjr', 'pages': [rain]},
    ]
