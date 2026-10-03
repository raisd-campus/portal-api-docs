#!/usr/bin/env bash
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
SRC="$(cd "$HERE/.." && pwd)"
OUT="${1:?usage: render-sdd.sh /output/sdd-dir}"
TEMPLATE="$HERE/sdd-template.html"
mkdir -p "$OUT"
# Styles path from published sdd/ is ../diagrams/styles.css — template assumes Pages layout
for md in "$SRC"/*.md; do
  base="$(basename "$md" .md)"
  filtered="$(mktemp)"
  # Point intra-SDD links at HTML for Pages. Keep ../ai/*.md (Pages serves raw MD).
  sed -E \
    -e 's|\]\(\.\./ai/([^)]+)\)|](__KEEP_AI__\1)|g' \
    -e 's/\]\(([^)#]+)\.md(#[^)]*)?\)/](\1.html\2)/g' \
    -e 's|\]\(__KEEP_AI__([^)]+)\)|](../ai/\1)|g' \
    "$md" > "$filtered"
  pandoc "$filtered" -f markdown -t html5 --standalone \
    --template="$TEMPLATE" --metadata title="$base" \
    -o "$OUT/${base}.html"
  rm -f "$filtered"
  echo "rendered $base.html"
done
