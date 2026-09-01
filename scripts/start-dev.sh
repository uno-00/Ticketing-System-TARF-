#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LARAVEL_PID=""
REALTIME_PID=""
FRONTEND_PID=""
FRONTEND_PORT=5173

cleanup() {
  if [[ -n "$LARAVEL_PID" ]] && kill -0 "$LARAVEL_PID" 2>/dev/null; then
    kill "$LARAVEL_PID" 2>/dev/null || true
  fi
  if [[ -n "$REALTIME_PID" ]] && kill -0 "$REALTIME_PID" 2>/dev/null; then
    kill "$REALTIME_PID" 2>/dev/null || true
  fi
  if [[ -n "$FRONTEND_PID" ]] && kill -0 "$FRONTEND_PID" 2>/dev/null; then
    kill "$FRONTEND_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

api_ready() {
  curl -sf --max-time 2 "http://127.0.0.1:4000/api/health" >/dev/null 2>&1 \
    || curl -sf --max-time 2 "http://on-prem.x-dcb.net:4000/api/health" >/dev/null 2>&1
}

realtime_ready() {
  curl -sf --max-time 2 "http://127.0.0.1:4001/health" >/dev/null 2>&1
}

frontend_ready() {
  local port="${1:-$FRONTEND_PORT}"
  curl -sf --max-time 2 "http://127.0.0.1:${port}/" >/dev/null 2>&1 \
    || curl -sf --max-time 2 "http://on-prem.x-dcb.net:${port}/" >/dev/null 2>&1
}

echo ""
echo "NMP Ticketing - starting Laravel API + frontend"
echo ""

if [[ ! -f "$ROOT/laravel/.env" ]]; then
  echo "ERROR: laravel/.env missing"
  exit 1
fi
if [[ ! -f "$ROOT/frontend/.env" ]] && [[ -f "$ROOT/frontend/.env.example" ]]; then
  cp "$ROOT/frontend/.env.example" "$ROOT/frontend/.env"
  echo "Created frontend/.env"
fi

# Shared upload dir + public symlink for artisan serve
mkdir -p "$ROOT/backend/uploads"
if [[ ! -e "$ROOT/laravel/public/uploads" ]]; then
  ln -sfn "$ROOT/backend/uploads" "$ROOT/laravel/public/uploads"
fi

if ! api_ready; then
  echo "Seeding database (MySQL nmp_ticketing)..."
  (
    cd "$ROOT/laravel"
    php artisan nmp:seed
    php artisan nmp:rbac-seed
  ) || {
    echo ""
    echo "ERROR: Seed failed. Start MySQL first, then re-run this script."
    exit 1
  }

  echo "Starting Laravel API on :4000..."
  (
    cd "$ROOT/laravel"
    echo "LARAVEL - keep this process running"
    php artisan serve --host=0.0.0.0 --port=4000
  ) &
  LARAVEL_PID=$!

  echo "Waiting for API on port 4000..."
  ready=false
  for _ in $(seq 1 45); do
    sleep 1
    if api_ready; then
      ready=true
      break
    fi
  done
  if [[ "$ready" != true ]]; then
    echo "ERROR: API did not start. Check MySQL and Laravel logs."
    exit 1
  fi
  echo "API ready: http://127.0.0.1:4000/api/health"
else
  echo "API already running: http://127.0.0.1:4000"
fi

if [[ -f "$ROOT/backend/src/realtime-server.ts" ]]; then
  if ! realtime_ready; then
    echo "Starting realtime sidecar on :4001..."
    (
      cd "$ROOT/backend"
      # Load JWT from laravel/.env when unset (HS256 needs >= 32 bytes for php-jwt)
      if [[ -z "${JWT_SECRET:-}" ]] && [[ -f "$ROOT/laravel/.env" ]]; then
        JWT_SECRET="$(grep -E '^JWT_SECRET=' "$ROOT/laravel/.env" | head -1 | cut -d= -f2-)"
      fi
      export JWT_SECRET="${JWT_SECRET:-change-me-in-production-nmp-ticketing}"
      export REALTIME_INTERNAL_SECRET="${REALTIME_INTERNAL_SECRET:-$JWT_SECRET}"
      export MYSQL_HOST="${MYSQL_HOST:-127.0.0.1}"
      export MYSQL_USER="${MYSQL_USER:-root}"
      export MYSQL_PASSWORD="${MYSQL_PASSWORD:-2026nmpict}"
      export MYSQL_DATABASE="${MYSQL_DATABASE:-nmp_ticketing}"
      echo "REALTIME - keep this process running"
      bun src/realtime-server.ts
    ) &
    REALTIME_PID=$!
    for _ in $(seq 1 20); do
      sleep 1
      if realtime_ready; then
        echo "Realtime ready: http://127.0.0.1:4001/health"
        break
      fi
    done
  else
    echo "Realtime already running: http://127.0.0.1:4001"
  fi
fi

if ! frontend_ready "$FRONTEND_PORT"; then
  echo "Starting frontend..."
  (
    cd "$ROOT/frontend"
    echo "FRONTEND - keep this process running"
    bun run dev
  ) &
  FRONTEND_PID=$!

  echo "Waiting for frontend on port $FRONTEND_PORT..."
  fe_ready=false
  for _ in $(seq 1 60); do
    sleep 1
    if frontend_ready "$FRONTEND_PORT" || frontend_ready 5174; then
      fe_ready=true
      break
    fi
  done
  if [[ "$fe_ready" != true ]]; then
    echo "WARNING: Frontend slow to start. Check frontend logs for the URL."
  fi
else
  echo "Frontend already running on port $FRONTEND_PORT"
fi

echo ""
echo "Open in browser:"
echo "  http://127.0.0.1:${FRONTEND_PORT}/"
echo "  Sign in: http://127.0.0.1:${FRONTEND_PORT}/login"
echo "  Use your museum username/email (org users linked to PAMANA)."
echo "  Example (if in PAMANA): resty.morancil"
echo ""
echo "API:      http://127.0.0.1:4000/api/health"
echo "Realtime: http://127.0.0.1:4001/health (socket.io)"
echo ""
echo "Press Ctrl+C to stop services started by this script."
echo ""

wait
