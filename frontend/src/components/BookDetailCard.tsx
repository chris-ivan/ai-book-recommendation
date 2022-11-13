import { FC, useState } from 'react';
import { IBookDetail } from '../interfaces/index';
import { parseAuthor } from '../utils/helper';
import {
  ListItem,
  ListItemAvatar,
  Typography,
  Rating,
  Chip,
  Button,
} from '@mui/material';

interface IBookDetailCard {
  book: IBookDetail;
}

const SmallText = ({ children }: { children: string }) => (
  <Typography
    sx={{ display: 'inline' }}
    component="span"
    variant="body2"
    color="text.secondary"
  >
    {children}
  </Typography>
);

const BookDetailCard: FC<IBookDetailCard> = ({ book }) => {
  const [showAll, setShowAll] = useState<boolean>(false);

  const descriptionSummary =
    book.description.length > 200 ? (
      <>
        {book.description.slice(0, 200)}...
        <Button
          sx={{ padding: 0 }}
          size="small"
          onClick={() => setShowAll(true)}
        >
          Lihat selengkapnya
        </Button>
      </>
    ) : (
      book.description
    );

  const redirectToGoodReads = () => {
    window.open(book.url, '_blank');
  };

  return (
    <ListItem
      onClick={redirectToGoodReads}
      alignItems="flex-start"
      sx={{
        padding: '12px',
        marginBottom: '12px',
        borderRadius: '4px',
        border: '1px solid #eeeeee',
      }}
    >
      <ListItemAvatar sx={{ marginTop: 0 }}>
        <img
          src={book.imageUrl}
          style={{
            width: 90,
            height: 140,
            marginRight: 12,
          }}
        />
      </ListItemAvatar>
      <div className="book-detail-card-content">
        <div className="book-detail-card-content-title">
          <p>
            <b>
              {book.title} ({book.publicationYear})
            </b>
          </p>
          <Button variant="outlined" onClick={redirectToGoodReads} size="small">
            Detail
          </Button>
        </div>
        <SmallText>{parseAuthor(book.authors)}</SmallText>
        <div className="book-detail-card-content-rating">
          <Rating
            sx={{ marginRight: '4px' }}
            value={book.averageRating}
            size="small"
            readOnly
          />
          <SmallText>{`(${book.ratingsCount})`}</SmallText>
        </div>
        <div className="book-detail-card-content-tags">
          {book.tags.slice(0, 7).map((tag) => (
            <Chip
              sx={{ margin: '2px 4px 2px 0' }}
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
            />
          ))}
        </div>
        <Typography sx={{ display: 'inline' }} component="span" variant="body2">
          {showAll ? book.description : descriptionSummary}
        </Typography>
      </div>
    </ListItem>
  );
};

export default BookDetailCard;
