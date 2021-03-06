from flask import Blueprint, render_template, request, redirect, jsonify, url_for, current_app as app
from flask_login import (LoginManager, current_user, login_required, login_user, logout_user)
from oauthlib.oauth2 import WebApplicationClient 
from Reccomendation import select_info
from .extensions import db
import requests
import json


from .models import Users, Movies, favourite_movies

key = "ca3b3298e0c4d85c79e20c33b747a10c"

entertain = Blueprint('entertain', __name__)

@entertain.route('/')
def index():
    if current_user.is_authenticated:
        return '<a class="button" href="/logout">Logout</a>'
    else:
        return '<a class="button" href="/login">Google Login</a>'

@entertain.route('/recomend/<mood>')
@login_required
def reccomendation(mood):
    try:
        user_id = current_user.id
        info = select_info(user_id, mood)
        ids = []
        for item in info:
            if not favourite_movies.query.filter_by(movie_id=item, user_id=user_id).first():
                ids.append(item)
        json_item = json.dumps(ids) 
        return json_item

    except:
         return 'Sorry something went wrong, are you logged in?', 404
   

@entertain.route('/login', methods=['GET'])
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
      
    return redirect(request_uri), 302

@entertain.route("/login/callback")
def callback(): 
    try:
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

    


        user = Users(google_id=unique_id, name=users_name, email=users_email)
    

        # if not Users.query.get(unique_id):
        if not Users.query.filter_by(google_id=unique_id).first():
            db.session.add(user)
            db.session.commit()


        user_find = db.session.query(Users).filter(Users.google_id==unique_id).first()

        user_logged = Users( id=user_find.id, google_id=unique_id, name=users_name, email=users_email)    
        login_user(user_logged)

        return redirect("http://localhost:3000")
    except:
        return 'You need to log in', 403
   

@entertain.route("/user_confirm")
@login_required
def user_confirm():
    try:
        user_id = current_user.id
        json_user_id = json.dumps(user_id)
        return json_user_id
    except: 
        return 'Need to be logged in to confirm user', 404


@entertain.route("/logout")
@login_required
def logout():
    try:
        logout_user()
        return redirect("http://localhost:3000"), 302
    except:
        return redirect(url_for('index')), 302




#route for getting 1 movie using id
@entertain.route('/movie/<movieID>')
@login_required
def get_movie(movieID):
    movie = Movies.query.filter_by(movie_id=movieID).first()

    if movie:
        return movie.title
    else:
        return 'something went wrong'


#route for getting all favourites for a specific user by ID
@entertain.route('/favourites/<userID>')
@login_required
def get_user_favourites(userID):
    
    titles = []
    results = []
    userFavourites = db.session.query(Movies, favourite_movies).join(favourite_movies, (favourite_movies.movie_id == Movies.movie_id)).filter_by(user_id = userID).all()
    for fav in userFavourites:
        a = {"title" : fav.Movies.title,
            "description" : fav.Movies.description,
            "image" : fav.Movies.image,
            "genre" : fav.Movies.genre,
            "age_rating" : fav.Movies.age_rating,
            "running_time" : fav.Movies.running_time,
            "movieID" : fav.Movies.movie_id,
            "mood" : fav.favourite_movies.mood}
        results.append(a)
    
    return json.dumps(results)

#route for getting all favourites for a specifc user in a specific mood
@entertain.route('/myfavourites/<userID>/<mood>')
@login_required
def get_user_favourites_by_mood(userID, mood):
    
    titles = []
    results = []
    userMoodFavourites = db.session.query(Movies, favourite_movies).join(favourite_movies, (favourite_movies.movie_id == Movies.movie_id)).filter_by(user_id = userID, mood = mood).all()
    
    for fav in userMoodFavourites:
        results.append(fav.favourite_movies.user_id)
        results.append(fav.Movies.title)
    
    return json.dumps(results)



#rout for adding a film to favourites and the general movie DBs
@entertain.route('/favourites', methods=["POST"])
@login_required
def post_user_favourites():

    content = request.json
    response = requests.get("https://api.themoviedb.org/3/movie/" + str(content["data"]["id"]) + "?api_key=" + str(key) + "&language=en-US")
    json_data = json.loads(response.content)

    # print(json_data)
    print("__________________________________________________________")
    mTitle = json_data["title"]
    m_id = json_data["id"]
    mRuntime = json_data["runtime"]
    mImageUrl = json_data['poster_path']
    mDescription = json_data["overview"]
    mAge_rating = json_data["adult"]

    print(mTitle)
    print(m_id)
    
    genreList = ""

    for genre in json_data["genres"]:
        genreList += genre["name"] + ","

    print(genreList)
    genre = genreList


    movie = Movies(movie_id = m_id, title = mTitle, description = mDescription, image = mImageUrl, genre = genreList, age_rating = mAge_rating, running_time = mRuntime)
    movie_to_insert = Movies.query.filter_by(movie_id=m_id).all()

    if not movie_to_insert:
        db.session.add(movie)
    else:
        print('Movie already exists in DB')
   
        
    favourite = favourite_movies(user_id = content["userID"], movie_id = content["data"]["id"], mood = content["mood"])
    fav_to_insert = favourite_movies.query.filter_by(movie_id = m_id, user_id=content["userID"]).all()

    if not fav_to_insert:
        db.session.add(favourite)
    else:
        print('User has already favourited')


    db.session.commit()

    return "added"

#route for deleting from favourites table
# @entertain.route('/favourites/<userID>/<movieID>') #methods = ['DELETE'] )   - uncomment to make work

@entertain.route('/deletefavourites', methods=['POST'])
def delete_favourites():

    content = request.json
    print(content)
    print(content["userID"])
    print(content["movieID"])


    # fav = favourite_movies.query.filter_by(user_id = content["userID"], movie_id = content["movieID"]).one()

    fav = favourite_movies.query.filter_by(user_id = content["userID"], movie_id = content["movieID"]).one()

    db.session.delete(fav)
    db.session.commit()
    print(fav)
    return "deleting user"


@entertain.route('/users/deleteMyAccount', methods=['POST']) 
def delete_user():
    user_id = request.json
    print(user_id)

    user_to_delete = Users.query.get_or_404(user_id)
    favourite_movies_to_delete = favourite_movies.query.filter_by(user_id=user_id).all()


    print(user_to_delete)
    print(favourite_movies_to_delete)

    if user_to_delete and favourite_movies_to_delete:
        try:
            for fav in favourite_movies_to_delete:
                db.session.delete(fav)
            db.session.delete(user_to_delete)
            db.session.commit()
            print('Account Deleted')
            logout_user()
            return redirect("http://localhost:3000"), 302

        except Exception as e:
            print(e)
            print('issue deleting account')
            return 'There was an issue deleting account'
    elif (user_to_delete):
        try:
            db.session.delete(user_to_delete)
            db.session.commit()
            logout_user()
            return redirect("http://localhost:3000"), 302
        except Exception as e:
            return 'There was an issue deleting account'
    else:
        return 'There was an issue deleting account'

    
     
    
