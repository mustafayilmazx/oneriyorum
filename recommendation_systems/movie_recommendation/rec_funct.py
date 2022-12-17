import requests
import pickle

df2 = pickle.load(open("dataframe.pkl","rb"))
indices = pickle.load(open("indices.pkl","rb"))
cosine_sim = pickle.load(open("cosine_sim.pkl","rb"))

def get_recommendations(title, cosine_sim=cosine_sim):

    # Get the index of the movie that matches the title
    idx = indices[title]

    # Get the pairwsie similarity scores of all movies with that movie
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sort the movies based on the similarity scores
    sim_scores = (sorted(sim_scores, key=lambda x: x[1], reverse=True))

    # Get the scores of the 10 most similar movies
    sim_scores = sim_scores[0:4]

    # Get the movie indices
    movie_indices = [i[0] for i in sim_scores]

    result = df2['title'].iloc[movie_indices]._values
    # Return the top 10 most similar movies
    return result

# print(get_recommendations('Alvin and the Chipmunks: Chipwrecked'))

liste = ["Avatar", "Alvin and the Chipmunks: Chipwrecked", "The Dark Knight Rises", "The Avengers"]

#get recommendation for list and append 
result = []
for i in range(len(liste)):
    result.append(get_recommendations(liste[i]))

#concat every value in list
result = [item for sublist in result for item in sublist]

final = []
for i in range(len(result)):
    final.append(get_recommendations(result[i]))

#concat every value in final list
final = [item for sublist in final for item in sublist]

#if element in final list is in liste list, delete it
for i in range(len(liste)):
    if liste[i] in final:
        final = list(filter(lambda a: a != liste[i], final))

#create dict to count the number of times a movie appears in the list
movie_dict = {}

for i in range(len(final)):
    if final[i] in movie_dict:
        movie_dict[final[i]] += 1
    else:
        movie_dict[final[i]] = 1

#sort the dict by the number of times a movie appears in the list
movie_dict = {k: v for k, v in sorted(movie_dict.items(), key=lambda item: item[1], reverse=True)}

#return the first 5 movies
print(list(movie_dict.keys())[0:6])





def fetch_poster(movie_id):
    url = "https://api.themoviedb.org/3/movie/{}?api_key=4657d180fd350e82288e57d6fa9de986&language=en-US".format(movie_id)
    data = requests.get(url)
    data = data.json()
    poster_path = data['poster_path']
    full_path = "https://image.tmdb.org/t/p/w500/" + poster_path
    return full_path
