#!/usr/bin/env bash
set -euo pipefail

# Simple webhook tester for /api/revalidate
# Usage:
#   bash scripts/test-webhook.sh [base_url] [secret]
# Examples:
#   bash scripts/test-webhook.sh                # -> http://localhost:3000 and secret from .env.local
#   bash scripts/test-webhook.sh http://localhost:3000 mysecret

BASE_URL="${1:-http://localhost:3000}"

if [ -n "${2-}" ]; then
  SECRET="$2"
else
  # Try to read from .env.local
  if [ -f .env.local ]; then
    SECRET=$(grep -E '^SANITY_WEBHOOK_SECRET=' .env.local | sed -E 's/^SANITY_WEBHOOK_SECRET=//; s/^"|"$//g' || true)
  else
    SECRET=""
  fi
fi

if [ -z "${SECRET}" ]; then
  echo "SANITY_WEBHOOK_SECRET not provided. Pass as 2nd arg or set in .env.local" >&2
  exit 1
fi

URL="${BASE_URL%/}/api/revalidate?secret=${SECRET}"
PAYLOAD='{"documentId":"test-revalidate-doc"}'

echo "POST ${URL}"
echo "Payload: ${PAYLOAD}"

RESP=$(curl -sS -X POST \
  -H 'Content-Type: application/json' \
  -d "${PAYLOAD}" \
  "${URL}")

if command -v jq >/dev/null 2>&1; then
  echo "$RESP" | jq .
else
  echo "$RESP"
fi

echo "\nDone."
