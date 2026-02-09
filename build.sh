#!/usr/bin/env bash
# Exit on error
set -o errexit

pip install -r requirements.txt

# Collect static files (CSS for Admin)
python manage.py collectstatic --no-input

# Apply DB migrations
python manage.py migrate