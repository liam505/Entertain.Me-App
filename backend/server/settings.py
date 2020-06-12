import os
from dotenv import load_dotenv
load_dotenv()


class Config:
     SQLALCHEMY_DATABASE_URI = 'sqlite:///db.sqlite3' #os.environ.get('DATABASE_URL')
     SQLALCHEMY_TRACK_MODIFICATIONS = False
     SECRET_KEY = os.getenv('SECRET_KEY')
     GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
     GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
     GOOGLE_DISCOVERY_URL = (
        "https://accounts.google.com/.well-known/openid-configuration"
)

class TestingConfig:
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test_db.sqlite3'
    SQLALCHEMY_TRACK_MODIFICATIONS = False






