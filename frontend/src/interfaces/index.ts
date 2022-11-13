export interface IBookSummary {
  id: number;
  title: string;
  authors: string;
  imageUrl: string;
}

export interface IBookDetail extends IBookSummary {
  asin: string;
  averageRating: number;
  description: string;
  format: string;
  tags: string[];
  isEbook: boolean;
  isbn: string;
  isbn13: string;
  kindleAsin: string;
  numPages: number;
  publicationYear: number;
  publisher: string;
  ratingsCount: number;
  titleWithoutSeries: string;
  url: string;
  workId: string;
}

export interface IBookSummaryResponse {
  id: number;
  title: string;
  authors: string;
  image_url: string;
}

export interface IBookDetailResponse extends IBookSummaryResponse {
  asin: string;
  average_rating: number;
  description: string;
  format: string;
  tags: string[];
  is_ebook: boolean;
  isbn: string;
  isbn13: string;
  kindle_asin: string;
  num_pages: number;
  publication_year: number;
  publisher: string;
  ratings_count: number;
  title_without_series: string;
  url: string;
  work_id: string;
}

export interface ISimilarBookResponse {
  book_detail: IBookDetailResponse;
  similar_books: IBookDetailResponse[];
}

export enum RECOMMEND_TYPE {
  TITLE = 'title',
  DESCRIPTION = 'description',
}
