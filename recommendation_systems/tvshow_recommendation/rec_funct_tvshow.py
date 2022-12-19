import pickle
import math
import pandas as pd
import numpy as np

df = pickle.load(open('df.pkl', 'rb'))
G = pickle.load(open('graph.pkl', 'rb'))

def get_recommendation(root):
    commons_dict = {}
    for e in G.neighbors(root):
        for e2 in G.neighbors(e):
            if e2==root:
                continue
            if G.nodes[e2]['label']=="MOVIE":
                commons = commons_dict.get(e2)
                if commons==None:
                    commons_dict.update({e2 : [e]})
                else:
                    commons.append(e)
                    commons_dict.update({e2 : commons})
    movies=[]
    weight=[]
    for key, values in commons_dict.items():
        w=0.0
        for e in values:
            w=w+1/math.log(G.degree(e))
        movies.append(key) 
        weight.append(w)
    
    result = pd.Series(data=np.array(weight),index=movies)
    result.sort_values(inplace=True,ascending=False)
    final_list = []
    for i in result.index[0:5]:
        final_list.append(i)
    final_list
    return final_list;

liste = ["Stranger Things", "Deadly Sins", "Winx Club", "Riverdale", "Lupin"]

def tvshow_recommender(liste):
    result = []
    for i in range(len(liste)):
        result.append(get_recommendation(liste[i]))
    result = [item for sublist in result for item in sublist]
    final = []
    for i in range(len(result)):
        final.append(get_recommendation(result[i]))
    final = [item for sublist in final for item in sublist]
    for i in range(len(liste)):
        if liste[i] in final:
            final = list(filter(lambda a: a != liste[i], final))
    tv_dict = {}
    for i in range(len(final)):
        if final[i] in tv_dict:
            tv_dict[final[i]] += 1
        else:
            tv_dict[final[i]] = 1
    tv_dict = {k: v for k, v in sorted(tv_dict.items(), key=lambda item: item[1], reverse=True)}
    return (list(tv_dict.keys())[0:5])

#print(tvshow_recommender(liste))

def tvshow_dict(liste):
    tvshow_dict_list = []
    for tvshow in tvshow_recommender(liste):
        tvshow_dict_list.append(df.loc[df['title'] == tvshow].to_dict())
    return tvshow_dict_list

print(tvshow_dict(liste))






# #get recommendation for list and append 
# result = []
# for i in range(len(liste)):
#     result.append(get_recommendation(liste[i]))

# #concat every value in list
# result = [item for sublist in result for item in sublist]

# final = []
# for i in range(len(result)):
#     final.append(get_recommendation(result[i]))

# #concat every value in final list
# final = [item for sublist in final for item in sublist]


# #delete if in liste
# for i in range(len(liste)):
#     if liste[i] in final:
#         final = list(filter(lambda a: a != liste[i], final))


# #create dict to count the number of times a movie appears in the list
# tv_dict = {}

# for i in range(len(final)):
#     if final[i] in tv_dict:
#         tv_dict[final[i]] += 1
#     else:
#         tv_dict[final[i]] = 1

# #sort the dict by the number of times a movie appears in the list
# tv_dict = {k: v for k, v in sorted(tv_dict.items(), key=lambda item: item[1], reverse=True)}

# print(list(tv_dict.keys())[0:5])

# #return row of the dataframe with the movie name
# #print(df.loc[df['title'] == list(tv_dict.keys())[0]])

