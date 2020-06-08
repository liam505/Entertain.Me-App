import string
from .extensions import db
from server import login_manager
from flask_login import  UserMixin

# favourite_movies = db.Table('favourite_movies',
#     db.Column('entry_id', db.Integer, primary_key=True),
#     db.Column('user_id', db.Integer, db.ForeignKey('users.user_id')), 
#     db.Column('movie_id', db.Integer, db.ForeignKey('movies.movie_id')),
#     db.Column('mood', db.String(512))
# )



@login_manager.user_loader
def load_user(id):
    return Users.query.get(int(id))


class favourite_movies(db.Model):
    __tablename__ = 'favourite_movies'
    entry_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    movie_id = db.Column(db.Integer,  nullable=False)
    mood = db.Column(db.String(30))
    
    def __repr__(self):
        return '<Fav %r>' % self.entry_id

class Users(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    google_id = db.Column(db.String(512), unique=True)
    email = db.Column(db.String(512))
    name = db.Column(db.String(512))

    

    def serialize(self):
        return {"id": self.id,
                "username": self.username}


class Movies(db.Model):
    __tablename__ = 'movies'
    movie_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(512))
    description = db.Column(db.String(512))
    image = db.Column(db.String(512))
    genre = db.Column(db.String(512))
    age_rating = db.Column(db.Integer)
    running_time = db.Column(db.Integer)
    genre = db.Column(db.String(512))

    def __repr__(self):
        return '<Movie %r>' % self.movie_id
        
    
 
    



