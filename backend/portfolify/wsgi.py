"""
WSGI config for portfolify project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

# only for dev/test
from dotenv import load_dotenv
TESTING = "test" in sys.argv
load_dotenv(".env.backend.test" if TESTING else ".env.backend.local")

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolify.settings')

application = get_wsgi_application()
