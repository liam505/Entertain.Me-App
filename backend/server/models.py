import string
from .extensions import db

class Users(db.Model):
    userID = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(512))
    username = db.Column(db.String(512))
    password = db.Column(db.String(512))



    def serialize(self):
        return {"id": self.userID,
                "username": self.username}

class Movies(db.Model):
    movieID = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(512))
    description = db.Column(db.String(512))
    image = db.Column(db.String(512))
    genre = db.Column(db.String(512))
    age_rating = db.Column(db.Integer)
    running_time = db.Column(db.Integer)
    genre = db.Column(db.String(512))

    def __repr__(self):
        return '<Movie %r>' % self.movieID
    
# class Favourite_Movies(db.Model):
#     userID = db.Column(db.Integer, foreign_key=True) ????
#     movieID = db.Column(db.Integer, foreign_key=True) ????
#     mood = db.Column(db.String(512))  
    



