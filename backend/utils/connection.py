import sqlite3
from utils.constant import DATABASE


def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def get_similar_titles(title, limit):
    conn = get_db_connection()
    query = f"SELECT * FROM books WHERE title LIKE '%{title}%' LIMIT 10"
    books = conn.execute(query).fetchall()
    conn.close()

    return books


def get_book_by_id(book_id):
    conn = get_db_connection()
    query = f"SELECT * FROM books WHERE id = {book_id}"
    book = conn.execute(query).fetchone()
    conn.close()

    return book


def get_multiple_book_by_ids(book_ids):
    book_ids = ",".join([str(book_id) for book_id in book_ids])
    conn = get_db_connection()
    query = f"SELECT * FROM books WHERE id IN ({book_ids})"
    books = conn.execute(query).fetchall()
    conn.close()

    return books


def get_similar_books_by_id(book_id):
    conn = get_db_connection()
    query = f"SELECT * FROM books WHERE id = {book_id}"
    book = conn.execute(query).fetchone()
    conn.close()

    book_ids = book["similar_books"].split(",")
    similar_books = get_multiple_book_by_ids(book_ids)

    return similar_books