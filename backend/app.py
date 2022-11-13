import flask_cors
from flask import Flask, render_template, request, jsonify
from utils.helper import parse_multiple_books, parse_book
from utils.connection import get_similar_titles, get_similar_books_by_id, get_book_by_id
from utils.predict import find_similar_books_by_desc

app = Flask(__name__)
app.secret_key = "tugas-ai-book-recommendation"
flask_cors.CORS(app)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/v1/similar-title", methods=["GET"])
def find_similar_titles():
    title = request.args.get("title", "")
    limit = request.args.get("limit", "10")
    limit = int(limit)

    books = get_similar_titles(title, limit)
    response = parse_multiple_books(books, summary=True)

    return jsonify(response), 200


@app.route("/api/v1/recommend-by-id", methods=["GET"])
def get_recommendations_by_id():
    book_id = request.args.get("book_id", 0)

    selected_book = get_book_by_id(book_id)
    books = get_similar_books_by_id(book_id)
    response = {
        "book_detail": parse_book(selected_book),
        "similar_books": parse_multiple_books(books),
    }

    return jsonify(response), 200


@app.route("/api/v1/recommend-by-desc", methods=["GET"])
def get_recommendations_by_description():
    description = request.args.get("query", "")
    limit = request.args.get("limit", "10")
    limit = int(limit)

    if not description:
        return jsonify({"error": "query should not be empty"}), 401

    books = find_similar_books_by_desc(description, limit)
    response = parse_multiple_books(books)

    return jsonify(response), 200


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
