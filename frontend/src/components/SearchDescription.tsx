import { FC, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { IBookDetail } from '../interfaces/index';
import { fetchSimilarBooksByDescription } from '../API/index';

interface ISearchDescription {
  onFetchRecommendation: (book: IBookDetail[]) => void;
  setLoading: (loading: boolean) => void;
}

const SearchDescription: FC<ISearchDescription> = ({
  onFetchRecommendation,
  setLoading,
}) => {
  const [description, setDescription] = useState('');

  const getSimilarBooks = async () => {
    setLoading(true);
    onFetchRecommendation([]);

    const similarBooks = await fetchSimilarBooksByDescription(description);
    onFetchRecommendation(similarBooks);
    setLoading(false);
  };

  const onChangeDescription = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const disabled = description.length < 20;

  return (
    <div className="search-description">
      <TextField
        placeholder="Masukkan deskripsi buku yang kamu sukai..."
        error={!!description && disabled}
        value={description}
        multiline
        onChange={onChangeDescription}
        helperText="Masukkan setidaknya 20 karakter."
        rows={4}
        fullWidth
        sx={{
          marginBottom: 1,
        }}
      />
      <Button
        fullWidth
        variant="contained"
        disabled={disabled}
        onClick={getSimilarBooks}
      >
        Cari
      </Button>
    </div>
  );
};

export default SearchDescription;
