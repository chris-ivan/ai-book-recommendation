def parse_book(book, summary=False):
    if summary:
        return {
            "id": book["id"],
            "title": book["title"],
            "authors": book["authors"],
            "image_url": book["image_url"],
        }

    return {
        "id": book["id"],
        "asin": book["asin"],
        "authors": book["authors"],
        "average_rating": book["average_rating"],
        "description": book["description"],
        "format": book["format"],
        "tags": book["genres"].split("|")[:5] if book["genres"] else [],
        "image_url": book["image_url"],
        "is_ebook": book["is_ebook"],
        "isbn": book["isbn"],
        "isbn13": book["isbn13"],
        "kindle_asin": book["kindle_asin"],
        "link": book["link"],
        "num_pages": book["num_pages"],
        "publication_year": book["publication_year"],
        "publisher": book["publisher"],
        "ratings_count": book["ratings_count"],
        "title": book["title"],
        "title_without_series": book["title_without_series"],
        "url": book["url"],
        "work_id:": book["work_id"],
    }


def parse_multiple_books(books, summary=False):
    parsed_books = [parse_book(book, summary) for book in books]

    return parsed_books