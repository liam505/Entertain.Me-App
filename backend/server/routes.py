from flask import Blueprint, render_template, request, redirect, jsonify, url_for, current_app as app
from flask_login import (LoginManager, current_user, login_required, login_user, logout_user)
from oauthlib.oauth2 import WebApplicationClient 
from .extensions import db
import requests
import json



from .models import Users, Movies, favourite_movies

key = "ca3b3298e0c4d85c79e20c33b747a10c"

entertain = Blueprint('entertain', __name__)

@entertain.route('/')
def index():
    # return "hello"
    if current_user.is_authenticated:
        return '<a class="button" href="/logout">Logout</a>'
    else:
        return '<a class="button" href="/login">Google Login</a>'

@entertain.route('/login')
def login():
   
    client_id = app.config['GOOGLE_CLIENT_ID']
    client = WebApplicationClient(client_id)
    def get_google_provider_cfg():
        google_url = app.config['GOOGLE_DISCOVERY_URL']
        try:
            return requests.get(google_url).json()
        except:
            return 'could not access url'

    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url + "/callback",
        scope=["openid", "email", "profile"],
    )
      
    return redirect(request_uri)

@app.route("/login/callback")
def callback():
    
    client_id = app.config['GOOGLE_CLIENT_ID']
    client_secret = app.config['GOOGLE_CLIENT_SECRET']
    client = WebApplicationClient(client_id)
    def get_google_provider_cfg():
        google_url = app.config['GOOGLE_DISCOVERY_URL']
        try:
            return requests.get(google_url).json()
        except:
            return 'could not access url'
    # Get authorization code Google sent back to you
    code = request.args.get("code")
    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    token_url, headers, body = client.prepare_token_request(
    token_endpoint,
    authorization_response=request.url,
    redirect_url=request.base_url,
    code=code
    )

    token_response = requests.post(
    token_url,
    headers=headers,
    data=body,
    auth=(client_id, client_secret),
    )

    client.parse_request_body_response(json.dumps(token_response.json()))
   
    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        users_name = userinfo_response.json()["given_name"]
    else:
        return "User email not available or not verified by Google.", 400

    user = Users(
        google_id=unique_id, name=users_name, email=users_email)
   

    if not Users.query.get(unique_id):
        db.session.add(user)
        db.session.commit()
        
    login_user(user)

    return 'Logged in!!'


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return 'hey'


#route for getting 1 movie using id
@entertain.route('/movie/<movieID>')
def getMovie(movieID):
    movie = Movies.query.filter_by(movie_id=movieID).first()

    print(movieID)
    print(movie.title)

    if movie:
        return movie.title
    else:
        return 'something went wrong'


#route for getting all favourites for a specifc user by ID
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

#route for getting all favourites for a specifc user in a specific mood
@entertain.route('/myfavourites/<userID>/<mood>')
def getUserFavouritesByMood(userID, mood):
    
    titles = []
    results = []
    userMoodFavourites = db.session.query(Movies, favourite_movies).join(favourite_movies, (favourite_movies.movie_id == Movies.movie_id)).filter_by(user_id = userID, mood = mood).all()
    
    for fav in userMoodFavourites:
        results.append(fav.favourite_movies.user_id)
        results.append(fav.Movies.title)
        # print(fav.reg_date)
    
    return json.dumps(results)

@entertain.route('/favourites', methods=["POST"])
def postUserFavourites():
    content = request.json
    # print(json.dumps(content))
    print(content)
    
    

    # db.session.add(favourite)
    # db.session.commit()

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
