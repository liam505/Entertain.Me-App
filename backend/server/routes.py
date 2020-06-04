from flask import Blueprint, render_template, request, redirect
from .extensions import db

# from app import app

from .models import Users, Movies, Favourite_Movies

entertain = Blueprint('entertain', __name__)

@entertain.route('/')
def index():
    return "hello"

@entertain.route('/movie/<movieID>')
def movie(movieID):
    movie = Movies.query.get(movieID) # .first() needed?
    return movie 

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