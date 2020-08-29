#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python manage.py migrate --no-input
python manage.py initsuperuser --username="$SUPERUSER" --email="$SUPERUSER_EMAIL" --password="$SUPERUSER_PASSWORD"
python manage.py collectstatic --no-input --clear

exec "$@"