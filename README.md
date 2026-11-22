# GridWise LLM API — Smart Campus Energy Optimization

[![Build checks](https://github.com/0xSaadBinSultan/smart_campus_energy_optimization/actions/workflows/test.yml/badge.svg)](https://github.com/0xSaadBinSultan/smart_campus_energy_optimization/actions/workflows/test.yml)

BUP CSE Fest 2026 Hackathon submission.

Converts free-text campus operator notes into structured schedule directives with
Gemini, validates them deterministically, and solves a 24-hour MILP that minimizes
total grid electricity cost.

```
request → Pydantic contract validation → Gemini (untrusted) → guardrails → MILP → replay-verified response
```

## Endpoints

Public and unauthenticated endpoints. FastAPI's `/docs`, `/redoc` and `/openapi.json` are disabled for strict challenge compliance.

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/` / `/dashboard` | Interactive Web UI Dashboard (dispatch charts, scenario runner, telemetry) |
| GET | `/health` | readiness probe, returns `{"status": "ok"}` |
| POST | `/optimize-energy` | returns the optimized 24-hour schedule |

Malformed requests return a controlled `400` (set `VALIDATION_ERROR_STATUS=422`
for FastAPI's default). Internal failures return a generic `500` with no
traceback and no secret.

## Web UI Dashboard

GridWise includes a high-performance web dashboard accessible at `http://localhost:8000/`:

- **Interactive Operator Directives**: Add/edit up to 3 natural language notes with quick preset snippets.
- **Battery Storage Gauge & Controls**: Real-time visualization of capacity, initial state of charge, and emergency reserves.
- **Dynamic Energy Visualizations**: 24-hour stacked energy balance dispatch, battery SoC curve, and tariff arbitrage charts.
- **Hourly Dispatch Schedule**: Complete 24-hour table with action badges (Charge, Discharge, Idle) and 1-click CSV export.
- **Contract & Verification Inspector**: Live invariant verification (exact energy balance & battery neutrality) and raw JSON viewer.

## Platforms and quick start

The API and browser dashboard run on **Windows, macOS and Linux** with Python
**3.11 or 3.12**. Any current desktop browser can use the dashboard. Phone and
tablet browsers can use a server you deliberately expose on your own network;
there is no native Android/iOS app. The default launcher binds only to localhost.

```sh
git clone https://github.com/0xSaadBinSultan/smart_campus_energy_optimization.git
cd smart_campus_energy_optimization
python -m venv .venv
```

Activate your environment:

| Shell | Command |
| --- | --- |
| Windows PowerShell | `.venv\Scripts\Activate.ps1` |
| Windows Command Prompt | `.venv\Scripts\activate.bat` |
| macOS/Linux bash or zsh | `source .venv/bin/activate` |

Then, on every platform:

```sh
python -m pip install -r requirements.txt
python run.py --open-browser
```

Use `python3` if needed when creating the environment, or `py -3.12` on Windows.
Python 3.14 is not supported by these pinned dependency versions. The dashboard
opens at http://127.0.0.1:8000. You can run the optimizer without a Gemini key;
operator notes become safe no-ops and the deterministic base schedule still runs.
To enable note interpretation, copy `.env.example` to `.env` using your editor or
file manager, and set your own `GEMINI_API_KEY`. Never commit the resulting `.env`.

On Apple Silicon or Linux ARM, install a native CBC solver if the bundled one is
unavailable: `brew install cbc` on macOS, or `sudo apt install coinor-cbc` on Debian.
The optimizer prefers `CBC_PATH`, then `cbc` on PATH, then PuLP's bundled binary.
Windows x64 and Linux x64 can normally use the bundled solver.

## Docker (Windows, macOS and Linux)

With Docker Engine or Docker Desktop and Compose installed:

```sh
docker compose up --build
```

Open http://127.0.0.1:8000. Compose optionally reads your `.env` and injects the
key at runtime. Stop with `docker compose down`. The container includes a native
CBC package and works independently of the host Python installation. Docker
availability, architecture and virtualization requirements depend on your OS.
The image does not bake in API keys or your private `.env`.

For access from another device, `python run.py --host 0.0.0.0` explicitly binds
all interfaces. The API has no authentication and AI requests can consume your
provider quota, so use a trusted private network or add authentication/rate limits
before exposing a hosted instance. No hosted service is configured by this repo.

## Sample request

```bash
curl -s http://localhost:8000/health
curl -s -X POST http://localhost:8000/optimize-energy \
     -H "Content-Type: application/json" \
     -d @sample_request.json | python -m json.tool
```

`sample_request.json` carries three notes — a solar reduction, a no-charge
window, and one irrelevant note. Expected behaviour: the first two become active
directives, the third becomes `no_op` with `applies: false`, and `hourly_plan`
has 24 entries whose battery state returns to `initial_energy_kwh` at hour 23.

## Configuration

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `GEMINI_API_KEY` | for AI notes | — | Google AI Studio key |
| `GEMINI_TIMEOUT_MS` | no | `8000` | provider call timeout |
| `VALIDATION_ERROR_STATUS` | no | `400` | status for schema violations |

Model: `GEMINI_MODEL` when set, with `gemini-2.5-flash` as the fallback;
temperature 0, thinking disabled, JSON response mode. Availability depends on your
Google account and current provider offerings. `CBC_PATH` optionally points to
a native CBC executable.
The client is built lazily, so a missing key degrades every note to `no_op`
rather than taking the process — and `/health` — down at import time.

## Tests

```bash
pip install pytest httpx
pytest -q
```

The Gemini call is stubbed, so tests need no key or provider network access.
GitHub Actions runs Python 3.11/3.12 on Windows x64, Linux x64 and macOS Apple
Silicon and also builds/checks the Linux container. See Actions for actual results.

## Design notes

**The LLM never touches the optimizer directly.** `guardrails.py` sits between
them and treats model output as hostile input. Every malformed shape — wrong
type, NaN, `Infinity`, boolean-as-number, non-string explanation, duplicate or
out-of-range `note_index`, missing `structured_adjustment` — collapses to a safe
`no_op`. The response always carries exactly one interpretation per note, in
ascending index order.

**Charge and discharge are mutually exclusive.** A binary mode variable per hour
makes it impossible for the solver to do both, since the reported plan has a
single `battery_action` field and a judge replaying that action must reproduce
the same state transition.

**The reported numbers replay exactly.** The serialized plan is built from the
rounded battery state chain rather than from the solver's full-precision
internals, so the per-hour energy balance, the state transition and end-of-day
neutrality all hold at the precision that actually leaves the API.
`optimizer.verify_plan()` re-checks all of those invariants — plus rate limits
and capacity bounds — before the response is returned, and fails closed.

## Files

| File | Role |
| --- | --- |
| `main.py` | FastAPI app, endpoints, static file mounting, error handlers |
| `models.py` | strict request/response contract |
| `llm_interpreter.py` | Gemini prompt and call |
| `guardrails.py` | deterministic validation of model output |
| `optimizer.py` | MILP model, serialization, replay verification |
| `static/` | Web UI dashboard (HTML, CSS, modern JavaScript) |
| `tests/test_compliance.py` | regression and judge compliance tests |
| `tests/test_ui.py` | UI routes and static asset tests |

## Security

Keep credentials outside the source tree. `.env` is git-ignored and
docker-ignored, the key is read only from the environment, and no error path
logs or returns it.

## License and contributions

Original project source is [MIT licensed](LICENSE). External packages and the CBC
solver retain their own licenses. See [CONTRIBUTING.md](CONTRIBUTING.md).
