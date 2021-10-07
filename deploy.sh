#!/bin/bash
npm run build website/
rm -r docs/
cp -r website/public docs/
cp CNAME docs/

git add .
git commit -m "Update site"
git push
