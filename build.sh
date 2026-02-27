#!/usr/bin/env bash
# exit on error
set -o errexit

# 1. Install dependencies
pip install -r requirements.txt

# 2. Build the database tables (replaces the manual migrate command)
python manage.py migrate

# 3. Create the admin user automatically if environment variables are provided
# The "|| true" prevents the build from crashing if the user already exists!
if [[ -n "${DJANGO_SUPERUSER_USERNAME}" && -n "${DJANGO_SUPERUSER_PASSWORD}" && -n "${DJANGO_SUPERUSER_EMAIL}" ]]; then
  python manage.py createsuperuser --noinput || true
fi