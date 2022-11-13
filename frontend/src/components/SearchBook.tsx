import { OutlinedInput } from '@mui/material';
import { FC, useState } from 'react';
import { IBookDetail, IBookSummary } from '../interfaces/index';
import SearchBookModal from './SearchBookModal';
import { fetchSimilarBooksById } from '../API/index';
import BookDetailCard from './BookDetailCard';

interface ISearchBook {
  onFetchRecommendation: (book: IBookDetail[]) => void;
  setLoading: (loading: boolean) => void;
}

const SearchBook: FC<ISearchBook> = ({ onFetchRecommendation, setLoading }) => {
  const [title, setTitle] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<IBookDetail | null>(null);

  const setOpenModal = (open: boolean) => () => setOpen(open);

  const getSimilarBooks = async (bookId: number) => {
    setLoading(true);
    onFetchRecommendation([]);
    setSelectedBook(null);

    const { bookDetail, similarBooks } = await fetchSimilarBooksById(bookId);
    setSelectedBook(bookDetail);
    onFetchRecommendation(similarBooks);
    setLoading(false);
  };

  const onSelectBook = (book: IBookSummary) => {
    setTitle(book.title);
    getSimilarBooks(book.id);
    setOpenModal(false);
  };

  return (
    <div>
      <OutlinedInput
        id="judul-buku"
        onClick={setOpenModal(true)}
        placeholder="Cari judul buku"
        readOnly
        value={title}
      />
      <SearchBookModal
        isOpen={isOpen}
        onClose={setOpenModal(false)}
        onSelectBook={onSelectBook}
      />
      {selectedBook && <BookDetailCard book={selectedBook} />}
    </div>
  );
};

export default SearchBook;
