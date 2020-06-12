import pytest
import json
from flask_login import current_user, login_user
from server.settings import TestingConfig, Config
from server import create_app, db, login_manager
from server.models import Users, Movies, favourite_movies


@pytest.fixture(scope='module')
def test_client():
    app = create_app(TestingConfig)

    app.config['LOGIN_DISABLED'] = True
    login_manager.init_app(app)
    testing_client = app.test_client()

    with app.app_context():
        db.create_all()

        yield testing_client  # this is where the testing happens!

        db.drop_all()

   

def test_can_login_with_google(test_client):
    response = test_client.get('/')
    assert response.status_code == 200
    assert b'<a class="button" href="/login">Google Login</a>'in response.data


def test_no_response_no_current_user(test_client):
    response = test_client.get('/recomend/Happy')
    assert response.status_code == 404
    assert b'Sorry something went wrong, are you logged in?'in response.data

def test_redirect_at_login(test_client):
    response = test_client.get('/login')
    assert response.status_code == 302
    assert b'google'in response.data

def test_not_posting_to_database_without_login(test_client):
    response = test_client.get('/login/callback')
    assert response.status_code == 403
    assert b'need to log in'in response.data
   
def test_not_confirm_user_without_login(test_client):
    response = test_client.get('/user_confirm')
    assert response.status_code == 404
    assert b'Need to be logged in to confirm user'in response.data

def test_on_logout_redirects_to_html_page(test_client):
    response = test_client.get('/logout')
    assert response.status_code == 302
    assert b'HTML'in response.data

data_from_database = {
    "id":8587,
    "title": 'The Lion King'
}

def test_gives_movie_title_on_id(test_client):
    movie = Movies(movie_id = 8587, title = 'The Lion King', description = 'coming together', image = '/deienco.jpg', genre = 'Comedy, Romance', age_rating = 'false', running_time = 200)
    db.session.add(movie)
    db.session.commit()
    response = test_client.get('/movie/8587')
    assert response.status_code == 200
    assert b'The Lion King'in response.data

def test_gives_list_of_favorites_movies(test_client):
    movie = Movies(movie_id = 8588, title = 'The Lion King', description = 'coming together', image = '/deienco.jpg', genre = 'Comedy, Romance', age_rating = 'false', running_time = 200)
    favorites = favourite_movies(user_id=1, movie_id=8588, mood='Happy')
    db.session.add(favorites)
    db.session.add(movie)
    db.session.commit()
    response = test_client.get('/favourites/1')
    non_json = json.loads(response.data)
    assert response.status_code == 200
    assert type(non_json) == list

