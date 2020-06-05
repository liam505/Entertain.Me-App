import string
from .extensions import db

favourite_movies = db.table('favourite_movies',
    db.Column('user_id', db.Integer, db.ForeignKey('users.user_id')), 
    db.Column('movie_id', db.Integer, db.ForeignKey('movies.movie_id')),
    db.Column('mood', db.String(512))
)

class users(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(512))
    username = db.Column(db.String(512))
    password = db.Column(db.String(512))
    favourite_movies = db.relationship('Movies', secondary=favourite_movies, backref=db.backref('user', lazy='dynamic')), primaryjoin="Enrollment.version_id==CurriculumVersion.id",

    def serialize(self):
        return {"id": self.user_id,
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
        
    
 
    



