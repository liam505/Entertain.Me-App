from flask import Blueprint, render_template, request, redirect, jsonify
from .extensions import db
import json


from .models import Users, Movies, favourite_movies

key = "ca3b3298e0c4d85c79e20c33b747a10c"

entertain = Blueprint('entertain', __name__)

@entertain.route('/')
def index():
    return "hello"

@entertain.route('/movie/<movieID>')
def getMovie(movieID):
    movie = Movies.query.filter_by(movie_id=movieID).first() # .first() needed?
    if movie:
        return movie.title
    else:
        return 'something went wrong'

@entertain.route('/favourites', methods = ['GET'])
def getAllFavourites():
    fav = db.session.query(favourite_movies).all() #.join(Users)
    fav = json.dumps(fav)
    if fav:
        return fav
    else:
        return 'something went wrong'

@entertain.route('/addmovie/<userID>') #,methods=['POST']
def postMovie(userID):
    movie = Movies(title='test title',description='test description')
    db.session.add(movie)

    statement = favourite_movies.insert().values(user_id=2, movie_id=1, mood='sad')
    db.session.execute(statement)

    db.session.commit()

    return "adding movie"

@entertain.route('/users') #broken
def getUsers():
    
    users = db.session.query(Users).all()
    users = json.dumps(users) ##

    if users:
        return Users
        # return users[0].username
    else:
        return 'something went wrong'

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

@entertain.route('/favourites/<userID>/<movieID>') #methods = ['DELETE'] )
def deleteFavourites(userID, movieID):
    fav = favourite_movies.query.filter_by(user_id = userID, movie_id = movieID).first()

    # test = db.session.query(favourite_movies).filter_by(user_id=userID, movie_id=movieID).one()
    # db.session.delete()
    # db.session.commit()
    print(fav)
    return "deleting user"

# @entertain.route('/api/movie/<movieID>')
# def apiGetMovie(movieID):
#     url = "https://api.themoviedb.org/3/movie/" + movieID +  "?api_key=" + key + "&language=en-US"
#     response = requests.get(url)
#     print(response.ok)
#     print(response.json())


# @entertain.route('/movies/<userID>') #Gets all favourited movies for a user
# def movies(userID):
#     favourite_movies = Favourite_Movies.query.get(userID) 

#     allmovies = []

#     for favourite_movie in favourite_movies:
#         allmovies.append(favourite_movie.mood, Movies.query.get(favourite_movies_id))

#     return allmovies 

    
    

