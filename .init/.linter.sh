#!/bin/bash
cd /tmp/kavia/workspace/code-generation/web-scraper-interface-668500-668518/webscraper_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

