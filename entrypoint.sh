#!/bin/sh
# entrypoint.sh — mysql wait script

set -e

# validate env vars
: "${DB_HOST:=mysql}"
: "${DB_PORT:=3306}"

echo "⏳ Waiting for MySQL to be ready at ${DB_HOST}:${DB_PORT}..."

# Find mysql server
until nc -z -v -w30 $DB_HOST $DB_PORT; do
  echo "❗ MySQL is unavailable - sleeping 3s"
  sleep 20
done

echo "✅ MySQL is up! Starting the application..."

# Run nest js
exec "$@"
