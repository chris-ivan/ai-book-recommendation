import {
  mapBookSummaryResponse,
  mapBookDetailResponse,
} from '../utils/responseMapper';
import {
  IBookSummary,
  IBookSummaryResponse,
  IBookDetailResponse,
  ISimilarBookResponse,
} from '../interfaces';

export const fetchBooksByTitle = async (
  query: string
): Promise<IBookSummary[]> => {
  if (!query) {
    return [];
  }

  const url = `${
    import.meta.env.VITE_API_URL
  }/v1/similar-title?title=${query}&limit=5`;

  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    const data = (await response.json()) as IBookSummaryResponse[];
    const parsedData = mapBookSummaryResponse(data);
    return parsedData;
  } catch (_err) {
    alert('Terjadi kesalahan');
    return [];
  }
};

export const fetchSimilarBooksById = async (id: number) => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/v1/recommend-by-id?book_id=${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    const data = (await response.json()) as ISimilarBookResponse;
    const { book_detail, similar_books } = data;

    return {
      bookDetail: mapBookDetailResponse([book_detail])[0],
      similarBooks: mapBookDetailResponse(similar_books),
    };
  } catch (_err) {
    alert('Terjadi kesalahan');

    return {
      bookDetail: null,
      similarBooks: [],
    };
  }
};

export const fetchSimilarBooksByDescription = async (desc: string) => {
  if (!desc) {
    return [];
  }

  const url = `${
    import.meta.env.VITE_API_URL
  }/v1/recommend-by-desc?query=${desc}&limit=10`;

  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    const books = (await response.json()) as IBookDetailResponse[];
    const parsedBooks = mapBookDetailResponse(books);

    return parsedBooks;
  } catch (_err) {
    alert('Terjadi kesalahan');

    return [];
  }
};
