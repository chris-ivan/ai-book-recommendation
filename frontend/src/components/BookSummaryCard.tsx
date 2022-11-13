import { FC } from 'react';
import { IBookSummary } from '../interfaces/index';
import {
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { parseAuthor } from '../utils/helper';

interface IBookSummaryCard {
  onClick: (book: IBookSummary) => void;
  book: IBookSummary;
}

const BookSummaryCard: FC<IBookSummaryCard> = ({ onClick, book }) => {
  const { title, authors, imageUrl } = book;

  const handleClick = () => onClick(book);

  return (
    <ListItemButton
      alignItems="flex-start"
      onClick={handleClick}
      sx={{
        padding: '4px 0',
      }}
    >
      <ListItemAvatar sx={{ marginTop: 0 }}>
        <img
          src={imageUrl}
          style={{
            width: 40,
            height: 60,
            marginRight: 12,
          }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.secondary"
          >
            {parseAuthor(authors)}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

export default BookSummaryCard;
