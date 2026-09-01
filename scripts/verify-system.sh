#!/usr/bin/env bash
set -euo pipefail

BASE="http://on-prem.x-dcb.net:4000"
FAILURES=0
ADMIN_TOKEN=""
RECORDS_TOKEN=""
CLIENT_TOKEN=""

pass() { echo "[OK] $1"; }
fail() { echo "[FAIL] $1 - $2"; FAILURES=$((FAILURES + 1)); }

login() {
  local email="$1"
  local password="$2"
  local response
  response="$(curl -sf --max-time 5 -X POST "$BASE/api/auth/login" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$email\",\"password\":\"$password\"}")" || return 1
  local token
  token="$(printf '%s' "$response" | sed -n 's/.*"token"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')"
  [[ -n "$token" ]] || return 1
  printf '%s' "$token"
}

echo ""
echo "NMP Ticketing system verification"
echo ""

if curl -sf --max-time 5 "$BASE/api/health" | grep -q '"ok"'; then
  pass "API health"
else
  fail "API health" "Health check failed"
fi

if curl -sf --max-time 5 "http://on-prem.x-dcb.net:5173/api/health" | grep -q '"ok"'; then
  pass "Frontend proxy health"
else
  fail "Frontend proxy health" "Frontend health failed"
fi

# Optional overrides for verification logins (museum org / PAMANA accounts).
ADMIN_LOGIN="${NMP_VERIFY_ADMIN_LOGIN:-resty.morancil}"
ADMIN_PASSWORD="${NMP_VERIFY_ADMIN_PASSWORD:-}"
RECORDS_LOGIN="${NMP_VERIFY_RECORDS_LOGIN:-}"
RECORDS_PASSWORD="${NMP_VERIFY_RECORDS_PASSWORD:-}"
CLIENT_LOGIN="${NMP_VERIFY_CLIENT_LOGIN:-resty.morancil}"
CLIENT_PASSWORD="${NMP_VERIFY_CLIENT_PASSWORD:-}"

if ADMIN_TOKEN="$(login "$ADMIN_LOGIN" "${ADMIN_PASSWORD:-__missing__}")"; then
  pass "Admin login ($ADMIN_LOGIN)"
else
  fail "Admin login ($ADMIN_LOGIN)" "Set NMP_VERIFY_ADMIN_PASSWORD or use a valid PAMANA admin login"
fi

if [[ -n "$RECORDS_LOGIN" && -n "$RECORDS_PASSWORD" ]]; then
  if RECORDS_TOKEN="$(login "$RECORDS_LOGIN" "$RECORDS_PASSWORD")"; then
    pass "Records login ($RECORDS_LOGIN)"
  else
    fail "Records login ($RECORDS_LOGIN)" "No token returned"
  fi
else
  echo "[SKIP] Records login — set NMP_VERIFY_RECORDS_LOGIN / NMP_VERIFY_RECORDS_PASSWORD"
fi

if CLIENT_TOKEN="$(login "$CLIENT_LOGIN" "${CLIENT_PASSWORD:-__missing__}")"; then
  pass "Client login ($CLIENT_LOGIN)"
else
  fail "Client login ($CLIENT_LOGIN)" "Set NMP_VERIFY_CLIENT_PASSWORD or use a valid PAMANA client login"
fi

if [[ -n "$CLIENT_TOKEN" ]] && curl -sf --max-time 5 "$BASE/api/forms/published" \
  -H "Authorization: Bearer $CLIENT_TOKEN" >/dev/null; then
  pass "Published forms (client)"
else
  fail "Published forms (client)" "Request failed"
fi

if [[ -n "$ADMIN_TOKEN" ]] && curl -sf --max-time 5 "$BASE/api/tickets" \
  -H "Authorization: Bearer $ADMIN_TOKEN" >/dev/null; then
  pass "Admin tickets list"
else
  fail "Admin tickets list" "Request failed"
fi

if [[ -n "$RECORDS_TOKEN" ]]; then
  resp="$(curl -sf --max-time 5 "$BASE/api/records/forms?status=pending_review" \
    -H "Authorization: Bearer $RECORDS_TOKEN" || true)"
  if printf '%s' "$resp" | grep -q '"items"'; then
    pass "Records pending forms"
  else
    fail "Records pending forms" "Missing items in response"
  fi
else
  fail "Records pending forms" "No records token"
fi

if [[ -n "$ADMIN_TOKEN" ]]; then
  resp="$(curl -sf --max-time 5 "$BASE/api/forms/mine" \
    -H "Authorization: Bearer $ADMIN_TOKEN" || true)"
  if printf '%s' "$resp" | grep -q '"items"'; then
    pass "Admin forms list"
  else
    fail "Admin forms list" "Missing items in response"
  fi
else
  fail "Admin forms list" "No admin token"
fi

if curl -sf --max-time 5 -X POST "$BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_LOGIN\",\"password\":\"wrong-password\"}" >/dev/null 2>&1; then
  fail "Invalid login rejected" "Expected login failure"
else
  pass "Invalid login rejected"
fi

if [[ -n "$RECORDS_TOKEN" ]]; then
  items_json="$(curl -sf --max-time 5 "$BASE/api/records/forms?status=pending_review" \
    -H "Authorization: Bearer $RECORDS_TOKEN" || true)"
  form_id="$(printf '%s' "$items_json" | sed -n 's/.*"_id"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n1)"
  if [[ -z "$form_id" ]]; then
    fail "Records form PDF" "No pending form to test PDF"
  else
    tmp="$(mktemp)"
    if curl -sf --max-time 10 "$BASE/api/records/forms/$form_id/document.pdf" \
      -H "Authorization: Bearer $RECORDS_TOKEN" -o "$tmp"; then
      size="$(wc -c < "$tmp")"
      if [[ "$size" -ge 100 ]]; then
        pass "Records form PDF"
      else
        fail "Records form PDF" "PDF response too small"
      fi
    else
      fail "Records form PDF" "Download failed"
    fi
    rm -f "$tmp"
  fi
else
  fail "Records form PDF" "No records token"
fi

echo ""
if [[ "$FAILURES" -eq 0 ]]; then
  echo "All checks passed."
  exit 0
fi

echo "$FAILURES check(s) failed."
exit 1
