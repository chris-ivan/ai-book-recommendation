import {
  IBookSummary,
  IBookDetail,
  IBookSummaryResponse,
  IBookDetailResponse,
} from '../interfaces';

const BookSummaryMapper = (response: IBookSummaryResponse): IBookSummary => {
  return {
    id: response.id,
    title: response.title,
    authors: response.authors,
    imageUrl: response.image_url,
  };
};

const mapBookDetailMapper = (response: IBookDetailResponse): IBookDetail => {
  const {
    id,
    asin,
    authors,
    average_rating,
    description,
    format,
    tags,
    is_ebook,
    isbn,
    isbn13,
    kindle_asin,
    num_pages,
    publication_year,
    publisher,
    ratings_count,
    title,
    title_without_series,
    url,
    work_id,
  } = response;

  return {
    id,
    authors,
    asin,
    averageRating: average_rating,
    description,
    format,
    imageUrl: response.image_url,
    isEbook: is_ebook,
    isbn,
    isbn13,
    kindleAsin: kindle_asin,
    numPages: num_pages,
    publicationYear: publication_year,
    publisher,
    ratingsCount: ratings_count,
    tags,
    title,
    titleWithoutSeries: title_without_series,
    url,
    workId: work_id,
  };
};

export const mapBookSummaryResponse = (
  response: IBookSummaryResponse[]
): IBookSummary[] => {
  return response.map(BookSummaryMapper);
};

export const mapBookDetailResponse = (
  response: IBookDetailResponse[]
): IBookDetail[] => {
  return response.map(mapBookDetailMapper);
};
