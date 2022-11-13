import { FC, useState } from 'react';
import debounce from 'awesome-debounce-promise';
import useConstant from 'use-constant';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';

import BookSummaryCard from './BookSummaryCard';

import { fetchBooksByTitle } from '../API';
import { IBookSummary } from '../interfaces/index';

interface ISearchBookModal {
  isOpen: boolean;
  onClose: () => void;
  onSelectBook: (book: IBookSummary) => void;
}

const SearchBookModal: FC<ISearchBookModal> = ({
  isOpen,
  onClose,
  onSelectBook,
}) => {
  const [query, setQuery] = useState<string>('');
  const [books, setBooks] = useState<IBookSummary[]>([]);

  const _handleSearch = async (query: string) => {
    const result = await fetchBooksByTitle(query);
    setBooks(result);
  };

  const handleSearch = useConstant(() => debounce(_handleSearch, 200));

  const onChangeQuery = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    await handleSearch(event.target.value);
  };

  const handleSelectBook = (book: IBookSummary) => {
    onSelectBook(book);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Cari Buku</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Judul Buku"
          fullWidth
          variant="outlined"
          value={query}
          onChange={onChangeQuery}
        />
        <List
          sx={{
            width: '100%',
            maxWidth: 720,
            bgcolor: 'background.paper',
          }}
        >
          {books.length ? (
            books.map((book) => (
              <BookSummaryCard
                key={book.id}
                book={book}
                onClick={handleSelectBook}
              />
            ))
          ) : (
            <p>Tidak ada judul buku yang sesuai.</p>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBookModal;
