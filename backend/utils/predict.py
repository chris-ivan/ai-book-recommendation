import pickle, annoy, sys
import tensorflow as tf

from utils.constant import EMBEDDING_DIMENSION, MODEL_URL, INDEX_FILE, PROJECTION_MTX
from utils.connection import get_book_by_id, get_multiple_book_by_ids

print("Loading the annoy index...", file=sys.stderr)
index = annoy.AnnoyIndex(EMBEDDING_DIMENSION)
index.load(INDEX_FILE, prefault=True)
print("Annoy index is loaded.", file=sys.stderr)

with open(INDEX_FILE + ".mapping", "rb") as handle:
    mapping = pickle.load(handle)
print("Mapping file is loaded.", file=sys.stderr)

print("Loading the TF-Hub model...", file=sys.stderr)
embed_fn = tf.saved_model.load(MODEL_URL)
# embed_fn = hub.load(MODEL_URL)
print("TF-Hub model is loaded.", file=sys.stderr)

print("Loading random projection matrix...", file=sys.stderr)
with open(PROJECTION_MTX, "rb") as handle:
    random_projection_matrix = pickle.load(handle)
print("Random projection matrix is loaded.", file=sys.stderr)


def extract_embeddings(query):
    """Generates the embedding for the query"""
    query_embedding = embed_fn([query])[0].numpy()

    if random_projection_matrix is not None:
        query_embedding = query_embedding.dot(random_projection_matrix)

    return query_embedding


def get_similar_book_ids(embedding, num_matches=5):
    """Finds similar items to a given embedding in the ANN index"""
    ids = index.get_nns_by_vector(
        embedding, num_matches, search_k=-1, include_distances=False
    )
    return ids


def find_similar_books_by_desc(description, num_matches=5):
    query_embedding = extract_embeddings(description)
    ids = get_similar_book_ids(query_embedding, num_matches)

    similar_books = get_multiple_book_by_ids(ids)

    return similar_books