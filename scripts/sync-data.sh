#!/bin/bash
# Sync root data/ to web/data/ for GitHub Pages deployment
cp "$(dirname "$0")/../data/"*.json "$(dirname "$0")/../web/data/"
echo "Synced data/*.json → web/data/"