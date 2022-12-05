import { Typography } from '@mui/material';

const TopInfo = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        margin: '20px auto',
      }}
    >
      <h1>You Might Also Love These Books</h1>
      <Typography
        sx={{ display: 'inline' }}
        component="span"
        variant="body2"
        color="text.secondary"
      >
        Web ini bekerja dengan memproses deskripsi dari buku-buku Indonesia dan
        mencari buku-buku serupa dengan algoritma ANN (Approximate Nearest
        Neighbour). Cari buku dengan judul atau masukkan deskripsi untuk
        memulai.
      </Typography>
    </div>
  );
};

export default TopInfo;
