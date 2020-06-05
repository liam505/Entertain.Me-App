from flask import Blueprint, render_template, request, redirect, jsonify
from .extensions import db
import json


from .models import Users, Movies, favourite_movies

key = "ca3b3298e0c4d85c79e20c33b747a10c"

entertain = Blueprint('entertain', __name__)

@entertain.route('/')
def index():
    return "hello"

#route for getting 1 movie using id
@entertain.route('/movie/<movieID>')
def getMovie(movieID):
    movie = Movies.query.filter_by(movie_id=movieID).first() # .first() needed?
    if movie:
        return movie.title
    else:
        return 'something went wrong'

#route for getting all favourites
@entertain.route('/favourites')
def getAllFavourites():
    fav = db.session.query(favourite_movies).all() #.join(Users)
    fav = json.dumps(fav)
    if fav:
        return fav
    else:
        return 'something went wrong'

# @entertain.route('/addmovie/<userID>') #,methods=['POST']
# def postMovie(userID):
#     movie = Movies(title='test title',description='test description')
#     db.session.add(movie)

#     statement = favourite_movies.insert().values(user_id=2, movie_id=1, mood='sad')
#     db.session.execute(statement)

#     db.session.commit()

#     return "adding movie"

@entertain.route('/users') #broken
def getUsers():
    
    query = db.session.query(Users).all()
    users = []

    if query:
        for u in query:
            users.append(u.__dict__)
            print(users)
            return users
    else:
        return 'something went wrong'


#route for getting user by id
@entertain.route('/user/<userID>') # Returns a single user defined by its ID
def getUser(userID):
    user = Users.query.filter_by(user_id=userID).first()
    if user:
        return user.username
    else:
        return 'something went wrong'


@entertain.route('/user')
def addUser():
    user = Users(username="test username", email="google.com")
    db.session.add(user)
    db.session.commit()
    return "adding user"

@entertain.route('/user/<userID>', methods = ['DELETE'])
def deleteUser(userID):
    user = Users.query.filter_by(user_id=userID).first()
    db.session.delete(user)
    db.session.commit()
    return "deleting user"



#route for deleting from favourites table
@entertain.route('/favourites/<userID>/<movieID>') #methods = ['DELETE'] )
def deleteFavourites(userID, movieID):
    fav = favourite_movies.query.filter_by(user_id = userID, movie_id = movieID).one()

    db.session.delete(fav)
    db.session.commit()
    print(fav)
    return "deleting user"
