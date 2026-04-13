#!/bin/bash
set -e

if [ -z "$GITHUB_TOKEN" ]; then
  echo "Error: GITHUB_TOKEN is not set"
  exit 1
fi

REPO_URL="https://${GITHUB_TOKEN}@github.com/Hibanelson/ITI_Final_branch.git"

echo "Setting remote URL with token..."
git remote set-url origin "$REPO_URL"

echo "Current branch: $(git branch --show-current)"
echo "Pushing to GitHub..."
git push origin main

echo "Done! Restoring remote URL (without token)..."
git remote set-url origin "https://github.com/Hibanelson/ITI_Final_branch"
echo "Push successful!"
