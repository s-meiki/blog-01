#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   bash scripts/fix-studio.sh <host>
# Example:
#   bash scripts/fix-studio.sh meiki-blog-01
#   bash scripts/fix-studio.sh meiki-blog

HOST="${1:-}"
if [ -z "${HOST}" ]; then
  echo "Specify Studio host, e.g. meiki-blog-01" >&2
  exit 1
fi

ORIGIN="https://${HOST}.sanity.studio"

echo "==> Adding CORS origin with credentials: ${ORIGIN}"
npx --yes sanity cors add "${ORIGIN}" --credentials || true

echo "==> Also ensure original host is allowed (credentials)"
npx --yes sanity cors add "https://meiki-blog.sanity.studio" --credentials || true

echo "==> Deploying Hosted Studio to host: ${HOST}"
SANITY_STUDIO_HOST="${HOST}" npx --yes sanity deploy

echo "==> Done. Open: ${ORIGIN}?v=$(date +%s)"

