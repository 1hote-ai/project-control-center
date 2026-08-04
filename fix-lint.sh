#!/bin/bash
echo "/* eslint-disable @typescript-eslint/no-require-imports */" | cat - scripts/capture.js > temp && mv temp scripts/capture.js
echo "/* eslint-disable @typescript-eslint/no-require-imports */" | cat - scripts/generate-audit.js > temp && mv temp scripts/generate-audit.js
echo "/* eslint-disable @typescript-eslint/no-require-imports */" | cat - scripts/generate-tree.js > temp && mv temp scripts/generate-tree.js
echo "/* eslint-disable @typescript-eslint/no-unused-vars */" | cat - scripts/generate-audit.js > temp && mv temp scripts/generate-audit.js
