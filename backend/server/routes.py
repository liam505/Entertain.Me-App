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



#route for getting all favourites  NEEDS FIXING
@entertain.route('/favourites')
def getAllFavourites():
    fav = favourite_movies.query.all()

    if fav:
        return fav[0].mood
    else:
        return 'something went wrong'

@entertain.route('/favourites/<userID>')
def getUserFavourites(userID):
    
    titles = []
    results = []
    userFavourites = db.session.query(Movies, favourite_movies).join(favourite_movies, (favourite_movies.movie_id == Movies.movie_id)).filter_by(user_id = userID).all()
    # print(json.dumps([dict(r) for r in userFavourites]))
    for fav in userFavourites:
        results.append(fav.Movies.title)
        # print(fav.reg_date)
    
    return json.dumps(results)

@entertain.route('/addfavourites/<userID>/<movieID>/<mood>') #WILL CHANGE TO POST LATER
def postUserFavourites(userID, movieID, mood):
    favourite = favourite_movies(user_id=userID, movie_id=movieID, mood=mood)

    db.session.add(favourite)
    db.session.commit()

    # movie = Movies()

    return "added"


# @entertain.route('/users') #broken
# def getUsers():
    
#     query = db.session.query(Users).all()
#     users = []

#     if query:
#         for u in query:
#             users.append(u.__dict__)
#             print(users)
#             return users
#     else:
#         return 'something went wrong'


#route for getting user by id
# @entertain.route('/user/<userID>') # Returns a single user defined by its ID
# def getUser(userID):
#     user = Users.query.filter_by(user_id=userID).first()
#     if user:
#         return user.username
#     else:
#         return 'something went wrong'


# @entertain.route('/user')
# def addUser():
#     user = Users(username="test username", email="google.com")
#     db.session.add(user)
#     db.session.commit()
#     return "adding user"

# @entertain.route('/user/<userID>', methods = ['DELETE'])
# def deleteUser(userID):
#     user = Users.query.filter_by(user_id=userID).first()
#     db.session.delete(user)
#     db.session.commit()
#     return "deleting user"



#route for deleting from favourites table
# @entertain.route('/favourites/<userID>/<movieID>') #methods = ['DELETE'] )   - uncomment to make work
def deleteFavourites(userID, movieID):
    fav = favourite_movies.query.filter_by(user_id = userID, movie_id = movieID).one()

    db.session.delete(fav)
    db.session.commit()
    print(fav)
    return "deleting user"
