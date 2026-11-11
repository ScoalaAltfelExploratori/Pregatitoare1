from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.parse import urlsplit, unquote
import mimetypes

ROOT=Path(__file__).resolve().parents[4]
HERE=Path(__file__).resolve().parent
CACHE=ROOT/'tmp/lectii06_07_browser_cache'
BASE='https://richiesamlie.github.io/ScratchJr-Desktop-Reborn'
class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        path=unquote(urlsplit(self.path).path)
        if '..' in Path(path).parts:self.send_error(400);return
        try:
            if path=='/qa-monitor.js':
                data=(HERE/'qa-monitor.js').read_bytes();mime='text/javascript'
            elif path.startswith('/materiale/'):
                local=(ROOT/path.lstrip('/')).resolve();local.relative_to(ROOT)
                data=local.read_bytes();mime=mimetypes.guess_type(str(local))[0] or 'application/octet-stream'
            else:
                local=CACHE/path.lstrip('/')
                if not local.exists():
                    with urlopen(Request(BASE+path,headers={'User-Agent':'Lessons6-7-browser-test'}),timeout=30) as r:data=r.read()
                    local.parent.mkdir(parents=True,exist_ok=True);local.write_bytes(data)
                data=local.read_bytes();mime=mimetypes.guess_type(path)[0] or 'application/octet-stream'
                if path.endswith('.wasm'):mime='application/wasm'
                if path.endswith('/editor.html'):
                    data=data.replace(b"<script src='../hostClient.js'>",b"<script src='/qa-monitor.js'></script>\n<script src='../hostClient.js'>")
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Content-Length',str(len(data)));self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(data)
        except Exception as e:self.send_error(404,str(e))
    def log_message(self,*args):pass
print('Lessons 6-7 test mirror at http://127.0.0.1:8770/app/home.html',flush=True)
ThreadingHTTPServer(('127.0.0.1',8770),Handler).serve_forever()
