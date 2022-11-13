import { AppBar } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{
        padding: '8px',
        borderBottom: '1px solid #e0e0e0',
        boxShadow: 'none',
      }}
    >
      <div className="container">
        <b>Book Recommender</b>
      </div>
    </AppBar>
  );
};

export default Navbar;
