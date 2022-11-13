import { FC } from 'react';
import { IBookDetail } from '../interfaces/index';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

interface IBookDetailCard {
  book: IBookDetail;
}

const BookDetailCard: FC<IBookDetailCard> = ({ book }) => {
  const { title, authors, imageUrl } = book;

  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        padding: '12px 0',
      }}
    >
      <ListItemAvatar sx={{ marginTop: 0 }}>
        <img
          src={imageUrl}
          style={{
            width: 90,
            height: 140,
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
            {authors}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default BookDetailCard;
