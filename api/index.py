import sys
from pathlib import Path

# Add parent directory to sys.path so modules like models, guardrails, optimizer are found
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from main import app

# Vercel looks for the ASGI app variable named `app`
