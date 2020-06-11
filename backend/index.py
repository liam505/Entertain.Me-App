from flask import Flask
from server import create_app

app = create_app()

app.secret_key = "TTk4jZVp8Bj82zWSPQiZLik4ewDTuhM4"

if __name__ == '__main__':
    app.run(debug=True, ssl_context="adhoc")