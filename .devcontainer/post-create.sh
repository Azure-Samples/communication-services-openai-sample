#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Part 1: Configure Environment File ---

# Define relative paths from the workspace root
SERVER_DIR="server"
ENV_FILE="$SERVER_DIR/.env"
TEMPLATE_FILE="$SERVER_DIR/.env.template"
TARGET_FILE=""

if [ -f "$ENV_FILE" ]; then
    echo "Found .env file. It will be updated."
    TARGET_FILE="$ENV_FILE"
else
    echo "'.env' file not found. Updating '.env.template' as a fallback."
    TARGET_FILE="$TEMPLATE_FILE"
fi

# Construct and set the dynamic URLs
CLIENT_URL="https://${CODESPACE_NAME}-3000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
SERVER_URL="https://${CODESPACE_NAME}-8080.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
sed -i "s|^CLIENT_ORIGIN_URL=.*|CLIENT_ORIGIN_URL=${CLIENT_URL}|" "$TARGET_FILE"
sed -i "s|^SERVER_CALLBACK_URI=.*|SERVER_CALLBACK_URI=${SERVER_URL}|" "$TARGET_FILE"
echo "Successfully configured environment URLs in '$TARGET_FILE'."


# --- Part 2: Set Port Visibility ---

echo "Setting port 8080 visibility to public..."
gh codespace ports visibility 8080:public --codespace "$CODESPACE_NAME"
echo "Port 8080 is now public."