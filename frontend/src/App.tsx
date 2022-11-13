import { useState } from 'react';
import { Button, Divider, Typography } from '@mui/material';
import SearchBook from './components/SearchBook';
import { IBookDetail, RECOMMEND_TYPE } from './interfaces';
import './App.css';
import BookDetailCard from './components/BookDetailCard';
import SearchDescription from './components/SearchDescription';
import Navbar from './components/Navbar';
import TopInfo from './components/TopInfo';
import Footer from './components/Footer';

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
      <Navbar />
      <div className="container">
        <TopInfo />
        <Filter
          onFetchRecommendation={showRecommendations}
          setLoading={handleSetLoading}
        />
        <div className="button-container">
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
        </div>
        <Divider sx={{ margin: '24px 0' }}>
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.secondary"
          >
            HASIL REKOMENDASI
          </Typography>
        </Divider>
        <div className="recommendations">
          {loading ? (
            <p>Loading...</p>
          ) : recommendations.length ? (
            recommendations.map((book) => (
              <BookDetailCard key={book.id} book={book} />
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>
              Tidak ada rekomendasi buku yang ditemukan.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
