#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
DuoWatch - Serveur Local avec Sauvegarde Permanente sur Disque
Duo Watchlist • Vision & Xyltax
"""

import http.server
import json
import os
import sys
import webbrowser
import threading

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE_DUO = os.path.join(BASE_DIR, "animes.json")
DATA_FILE_TRIO = os.path.join(BASE_DIR, "animes_trio.json")
DEFAULT_PORT = 8000

class DuoWatchRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        # Enable CORS for cross-origin or file:// access
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Accept')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def get_target_file(self):
        path_lower = self.path.lower()
        if 'list=trio' in path_lower or '/api/trio' in path_lower or 'trio' in path_lower:
            return DATA_FILE_TRIO, "trio"
        return DATA_FILE_DUO, "duo"

    def do_GET(self):
        # API endpoint to retrieve animes from disk
        if self.path.startswith('/api/animes') or self.path.startswith('/api/trio'):
            self.handle_get_animes()
            return
        elif self.path.startswith('/api/status'):
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            status_data = {
                "status": "running",
                "files": {
                    "duo": DATA_FILE_DUO,
                    "trio": DATA_FILE_TRIO
                }
            }
            self.wfile.write(json.dumps(status_data).encode('utf-8'))
            return

        # Serve index.html by default or trio.html
        if self.path == '/' or self.path == '':
            self.path = '/index.html'
        elif self.path == '/trio':
            self.path = '/trio.html'

        super().do_GET()

    def do_POST(self):
        # API endpoint to persist animes directly to animes.json or animes_trio.json
        if self.path.startswith('/api/animes') or self.path.startswith('/api/trio'):
            self.handle_post_animes()
            return

        self.send_error(404, "Endpoint non trouvé")

    def handle_get_animes(self):
        try:
            target_file, list_type = self.get_target_file()
            if not os.path.exists(target_file):
                # If file does not exist, return an empty array
                data = []
            else:
                with open(target_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)

            body = json.dumps(data, ensure_ascii=False, indent=2).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        except Exception as e:
            self.send_error(500, f"Erreur de lecture: {e}")

    def handle_post_animes(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length <= 0:
                self.send_error(400, "Corps de requête vide")
                return

            post_data = self.rfile.read(content_length).decode('utf-8')
            animes = json.loads(post_data)

            if not isinstance(animes, list):
                self.send_error(400, "Le contenu doit être une liste JSON d'animés")
                return

            target_file, list_type = self.get_target_file()

            # Atomic write to target file
            temp_file = target_file + ".tmp"
            with open(temp_file, 'w', encoding='utf-8') as f:
                json.dump(animes, f, ensure_ascii=False, indent=2)
            os.replace(temp_file, target_file)

            response = {
                "status": "ok",
                "list": list_type,
                "message": f"Données {list_type} sauvegardées sur le disque avec succès !",
                "count": len(animes)
            }
            body = json.dumps(response, ensure_ascii=False).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            print(f"[✓] {len(animes)} animés sauvegardés dans {os.path.basename(target_file)} ({list_type})")
        except Exception as e:
            self.send_error(500, f"Erreur d'écriture sur disque: {e}")

def run_server(port=DEFAULT_PORT, auto_open=True):
    for p in range(port, port + 10):
        try:
            server = http.server.ThreadingHTTPServer(('127.0.0.1', p), DuoWatchRequestHandler)
            actual_port = p
            break
        except OSError:
            continue
    else:
        print("Erreur: Impossible de lier un port entre 8000 et 8010.")
        sys.exit(1)

    url = f"http://localhost:{actual_port}"
    print("=" * 60)
    print(" 🍿 DuoWatch & TrioWatch — Watchlist Animé")
    print(" 👥 Duo  : Vision & Xyltax")
    print(" 🤝 Trio : Vision, Xyltax & Limule")
    print("=" * 60)
    print(f" Serveur actif sur : {url}")
    print(f" Page Duo  : {url}/index.html -> {DATA_FILE_DUO}")
    print(f" Page Trio : {url}/trio.html  -> {DATA_FILE_TRIO}")
    print(" Sauvegarde automatique et indépendante des 2 listes !")
    print(" Appuyez sur Ctrl+C dans ce terminal pour quitter.")
    print("=" * 60)

    if auto_open and '--no-browser' not in sys.argv:
        threading.Timer(0.8, lambda: webbrowser.open(url)).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nArrêt du serveur DuoWatch. À bientôt !")
        server.server_close()

if __name__ == '__main__':
    run_server()
