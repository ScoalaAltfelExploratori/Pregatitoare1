"""Refresh standalone teacher downloads without website-only navigation."""
from pathlib import Path, PurePosixPath
from urllib.parse import urljoin, urlsplit, unquote
import re
import zipfile
from html.parser import HTMLParser

ROOT = Path(__file__).resolve().parents[1]
MATERIALS = ROOT / 'materiale'
PUBLIC = 'https://scoalaaltfelexploratori.github.io/Pregatitoare1/'

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []

    def handle_starttag(self, tag, attrs):
        if tag in ('a', 'link', 'script', 'img', 'audio', 'source'):
            for key, value in attrs:
                if key in ('href', 'src'):
                    self.refs.append(value)

def standalone_index(text):
    for marker in ('site-navigation', 'lesson-pager'):
        text = re.sub(r'<!-- ' + marker + r'-start -->.*?<!-- ' + marker + r'-end -->', '', text, flags=re.S)
    return re.sub(r'<link rel="stylesheet" href="../../site-navigation.css[^\"]*">', '', text)

def course_plan(folder):
    text = (MATERIALS / 'Plan_10_lectii_ScratchJr.md').read_text(encoding='utf-8')
    def link(match):
        label, target = match.groups()
        if urlsplit(target).scheme or target.startswith(('#', folder + '/')):
            return match.group(0)
        return f'[{label}]({urljoin(PUBLIC + "materiale/", target)})'
    return re.sub(r'\[([^\]]+)\]\(([^)]+)\)', link, text)

for number in range(1, 11):
    folder = MATERIALS / f'Lectia_{number:02}_ScratchJr'
    archive = MATERIALS / (folder.name + '.zip')
    with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as output:
        for source in sorted(folder.rglob('*')):
            if not source.is_file() or '__pycache__' in source.parts or source.suffix == '.pyc':
                continue
            name = source.relative_to(MATERIALS).as_posix()
            if source.name == 'index.html':
                output.writestr(name, standalone_index(source.read_text(encoding='utf-8')))
            else:
                output.write(source, name)
        output.writestr('Plan_10_lectii_ScratchJr.md', course_plan(folder.name))
        if number == 3:
            for source in sorted((MATERIALS / 'Arhiva_profesor').iterdir()):
                if source.is_file():
                    output.write(source, source.relative_to(MATERIALS).as_posix())

    with zipfile.ZipFile(archive) as check:
        assert check.testzip() is None
        names = set(check.namelist())
        for name in names:
            if not name.endswith(('.html', '.md')):
                continue
            text = check.read(name).decode('utf-8-sig')
            if name.endswith('.html'):
                parser = Links()
                parser.feed(text)
                refs = parser.refs
            else:
                refs = re.findall(r'\]\(([^)]+)\)', text)
            for ref in refs:
                if urlsplit(ref).scheme or ref.startswith('#'):
                    continue
                target = unquote(urlsplit(urljoin('https://archive.test/' + name, ref)).path.lstrip('/'))
                assert target in names, (archive.name, name, ref)
print('Ten archives rebuilt; every local document and page link inside them resolves.')
