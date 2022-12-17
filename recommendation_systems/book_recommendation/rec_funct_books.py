import pickle

df2 = pickle.load(open('df2.pkl', 'rb'))
idlist = pickle.load(open('idlist.pkl', 'rb'))

def BookRecommender(book_name):
    book_list_name = []
    book_id = df2[df2['title'] == book_name].index
    book_id = book_id[0]
    for newid in idlist[book_id]:
        book_list_name.append(df2.loc[newid].title)
    return book_list_name[1:]

liste =["Harry Potter and the Half-Blood Prince (Harry Potter  #6)","The Hitchhiker's Guide to the Galaxy (Hitchhiker's Guide to the Galaxy  #1)","God Emperor of Dune (Dune Chronicles  #4)","Anna Karenina","Long Way Round: Chasing Shadows Across the World"]


#book reccomendation for the books in the list
result = []
for i in range(len(liste)):
    result.append(BookRecommender(liste[i]))

#concat every value in list
result = [item for sublist in result for item in sublist]


final = []
for i in range(len(result)):
    final.append(BookRecommender(result[i]))

final = [item for sublist in final for item in sublist]

#if element in final list is in liste, delete it
for i in range(len(liste)):
    if liste[i] in final:
        final = list(filter(lambda a: a != liste[i], final))

#create dict to count the number of times a book appears in the list
book_dict = {}
for i in range(len(final)):
    if final[i] not in book_dict:
        book_dict[final[i]] = 1
    else:
        book_dict[final[i]] += 1

book_dict = {k: v for k, v in sorted(book_dict.items(), key=lambda item: item[1], reverse=True)}

#return first 5 books
print(list(book_dict.keys())[:5])