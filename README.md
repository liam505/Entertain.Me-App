# Entertain.Me

## About 
Entertain Me allows users to be matched with entertainment that suits their mood. When they sign up they will give us some details on what type of media they search for when they are in a certain headspace. For example if they are in need of uplifting, what are the top 5 type of films they will turn to? From then on they will be able to input their ‘mood’ and we will return to them recommendations suited to that mood. Our users are be able to store favourites to refer back to in the future, which they can then view

---

## Getting Started 


### Backend
```
cd backend
```
```
pip install -r requirements.txt
```
(set/export/$env dependant on operating system & terminal)
```
set/export/$env   FLASK_APP=index.py 
```
```
set/export/$env   OAUTHLIB_INSECURE_TRANSPORT=1
```

create .env file containing the following (You must supply your own client id & secret key)

```
GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<GOOGLE_CLIENT_SECRET>
```

```
flask run
```
The backend will now be running




### Frontend

```
npm install
```
```
npm start
```

----
## Technologies
### Frontend:
HTML
CSS
JavaScript
React
Bootstrap

#### Backend:
Python
Flask
SQLite
SQLAlchemy
Numpy & Pandas
NLTK
Oauth

### Testing:
Frontend - Jest & Enzyme
Backend - Pytest







## User Stories
- As a User I want to be able to register an account with the email, username and password so that I can store and track favourites 
- As a User I want to be able to  Login into my account so I can access my Favorite list and search for more recommendations 
- As a registered user, I can favourite any media and store it on my dashboard
- As a registered user I want to be able to see images and titles of my saved favourite media on my dashboard
- As a user, I can click on any media item and have it display more details
- As a registered user, I can sign out of my account at any time





