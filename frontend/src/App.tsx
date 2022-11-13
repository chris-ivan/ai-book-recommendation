import { useState } from 'react';
import { Button } from '@mui/material';
import SearchBook from './components/SearchBook';
import { IBookDetail, RECOMMEND_TYPE } from './interfaces';
import './App.css';
import BookDetailCard from './components/BookDetailCard';
import SearchDescription from './components/SearchDescription';

function App() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<IBookDetail[]>([]);
  const [type, setType] = useState<RECOMMEND_TYPE>(RECOMMEND_TYPE.TITLE);

  const showRecommendations = (recommendations: IBookDetail[]) => {
    setRecommendations(recommendations);
  };

  const handleSetLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const handleSetType = (type: RECOMMEND_TYPE) => () => {
    setType(type);
    setRecommendations([]);
  };

  const Filter = type === RECOMMEND_TYPE.TITLE ? SearchBook : SearchDescription;

  return (
    <div className="App">
      <Filter
        onFetchRecommendation={showRecommendations}
        setLoading={handleSetLoading}
      />
      <Button
        variant="outlined"
        disabled={type == RECOMMEND_TYPE.TITLE}
        onClick={handleSetType(RECOMMEND_TYPE.TITLE)}
      >
        Cari Judul Buku
      </Button>
      <Button
        variant="outlined"
        disabled={type == RECOMMEND_TYPE.DESCRIPTION}
        onClick={handleSetType(RECOMMEND_TYPE.DESCRIPTION)}
      >
        Cari berdasarkan Deskripsi
      </Button>
      {loading ? (
        <p>Loading...</p>
      ) : recommendations.length ? (
        recommendations.map((book) => (
          <BookDetailCard key={book.id} book={book} />
        ))
      ) : (
        <p>Tidak ada rekomendasi buku yang ditemukan.</p>
      )}
    </div>
  );
}

export default App;
