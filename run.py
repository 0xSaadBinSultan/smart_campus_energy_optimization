#!/usr/bin/env python3
"""Start the dashboard locally with the same command on every desktop OS."""
import argparse
from pathlib import Path
import threading
import webbrowser


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--host', default='127.0.0.1')
    parser.add_argument('--port', type=int, default=8000)
    parser.add_argument('--open-browser', action='store_true')
    args = parser.parse_args()
    if not 1 <= args.port <= 65535:
        parser.error('Port must be from 1 to 65535')
    import uvicorn
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).resolve().parent / '.env')
    if args.open_browser:
        host = '127.0.0.1' if args.host in ('0.0.0.0', '::') else args.host
        if ':' in host:
            host = '[' + host + ']'
        timer = threading.Timer(1.5, lambda: webbrowser.open(f'http://{host}:{args.port}/'))
        timer.daemon = True
        timer.start()
    uvicorn.run('main:app', host=args.host, port=args.port,
                app_dir=str(Path(__file__).resolve().parent))


if __name__ == '__main__':
    main()
