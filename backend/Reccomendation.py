import pandas as pd
from collections import Counter
import sqlite3
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from server import con
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import sigmoid_kernel, linear_kernel

stop_words = stopwords.words('english')
metadata = pd.read_csv('tmdb_5000_movies.csv')

def get_keywords(row):
    some_text = row['description']
    lowered = some_text.lower()
    tokens = nltk.tokenize.word_tokenize(lowered)
    keywords = [keyword for keyword in tokens if keyword.isalpha() and not keyword in stop_words]
    keywords_string = ','.join(keywords)
    return keywords_string

def listToString(s):  
    # initialize an empty string 
    str1 = " " 
    # return string   
    return (str1.join(s)) 



def select_info(user_id, mood):
  df = pd.read_sql_query(f"SELECT * from favourite_movies WHERE user_id ={user_id}  AND mood = '{mood}'", con)
#   print(df.head())
  lenght = int(len(df))
  movies = pd.read_sql_query("SELECT * from movies", con)
  df3 = df.join(movies.set_index('movie_id')[['description']], on='movie_id')
#   print(df3.head(2))
  con.close()

  df3['keywords'] = df3.apply(get_keywords, axis=1)
  words = df3['keywords'].tolist()
  #print(df3.head())
  common_words = [word for word, word_count in Counter(words).most_common(2)]
  most_common_words = listToString(common_words)
  #print(most_common_words)

  df4 = metadata.append(pd.DataFrame([[0, 'none', 'none', 543219790, 'none', 'none', 'favorites', most_common_words, 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none']], columns
  =metadata.columns),  ignore_index=True)
  #print(df4.tail(1))

  tfidf = TfidfVectorizer(stop_words='english')
  df4['overview'] = df4['overview'].fillna('')
  tfidf_matrix = tfidf.fit_transform(df4['overview'])
  cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
  indices = pd.Series(df4.index, index=df4['original_title']).drop_duplicates()

  def get_recommendations(title, cosine_sim=cosine_sim):
        # Get the index of the movie that matches the title
        idx = indices[title]
        
        # Get the pairwsie similarity scores of all movies with that movie
        sim_scores = list(enumerate(cosine_sim[idx]))

        # Sort the movies based on the similarity scores
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        num = 11 + lenght
        # Get the scores of the 10 most similar movies
        sim_scores = sim_scores[1:num]

        # Get the movie indices
        movie_indices = [i[0] for i in sim_scores]
         
        series = (metadata['original_title'].iloc[movie_indices]).tolist() 
        # titles = (metadata['original_title'].iloc[movie_indices]).to_frame()
        # joined_frame = series.join(titles.set_index('movie_indices')[['original_title']], on='movie_indices')
        # joined_frame  = pd.concat([series, titles], axis=1)
        # Return the top 10 most similar movies
        return  series
        # return 'hi'
  reccomendations = get_recommendations('favorites')
  return reccomendations 


  


   
# select_info(1,'happy')


















# print(get_recommendations('favorites'))

