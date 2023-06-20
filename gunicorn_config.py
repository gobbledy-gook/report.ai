"""
gunicorn configuration file
"""

# pylint: disable=C0103

workers = 4
bind = "0.0.0.0:8000"
timeout = 120
loglevel = "info"
