from flask import Blueprint, render_template, request, redirect
from .extensions import db

# from app import app

from .models import users, Movies, favourite_movies

key = "ca3b3298e0c4d85c79e20c33b747a10c"

entertain = Blueprint('entertain', __name__)

@entertain.route('/')
def index():
    return "hello"

@entertain.route('/movie/<movieID>')
def getMovie(movieID):
    movie = Movies.query.get(movieID) # .first() needed?
    return movie 

@entertain.route('/addmovie/<userID>') #,methods=['POST']
def postMovie(userID):
    movie = Movies(title='test title',description='test description')
    db.session.add(movie)
    db.session.commit()
     # Commit twice...?
    favourite = favourite_movies('1', '1', 'Happy')
    db.session.add(favourite)
    db.session.commit() # Commit twice...?

    # Movies.insert().values(movieID=1, title="test title", description="description!", genre="action")
    # Favourite_Movies.insert().values(userID=1, movieID=1, mood="happy")

    return "adding movie"

@entertain.route('/favourite', methods=['DELETE'])
def deleteFavourite():
    uID = 1
    mID = 1
    favourite = favourite_movies('', '1')
    db.session.delete(favourite)
    return "deleting favourite"

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

    
    

# @entertain.route('/add_movie', methods=[POST])
# def add_movie

# @short.route('/<short_url>')
# def redirect_to_url(short_url):
#     link = Link.query.filter_by(short_url=short_url).first_or_404()
#     return redirect(link.original_url)

# @short.route('/')
# def index():
#     return render_template('index.html')

# @short.route('/add_link', methods=['POST'])
# def add_link():
#     original_url = request.form['original_url']
#     link = Link(original_url=original_url)
#     db.session.add(link)
#     db.session.commit()