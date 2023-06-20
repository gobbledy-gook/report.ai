# gunicorn_config.py

# Number of worker processes
workers = 4

# Bind address
bind = "0.0.0.0:8000"

# Timeout for handling requests
timeout = 120

# Log level
loglevel = "info"
