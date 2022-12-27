#create a basic flask app
from flask import Flask, request
from tvshow_recommendation import rec_funct_tvshow
from movie_recommendation import rec_funct
from book_recommendation import rec_funct_books

import json
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/show-recommend', methods=['POST'])
def post():
    data = request.get_json()
    show_list = data['content_list']
    print(show_list)
    result = rec_funct_tvshow.tvshow_dict(show_list)
    # convert the result to json
    print(result)
    result = json.dumps(result)
    return result

@app.route('/movie-recommend', methods=['POST'])
def post():
    data = request.get_json()
    movie_list = data['content_list']
    print(movie_list)
    result = rec_funct.movie_dict(movie_list)
    # convert the result to json
    print(result)
    result = json.dumps(result)
    return result

# create a post method get the data from the request
@app.route('/book-recommend', methods=['POST'])
def post():
    data = request.get_json()
    book_list = data['content_list']
    print(book_list)
    result = rec_funct_books.book_dict(book_list)
    # convert the result to json
    print(result)
    result = json.dumps(result)
    return result

#run the app
if __name__ == '__main__':
    app.run()

