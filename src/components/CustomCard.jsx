import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const CustomCard = ({ movie, onAddToWishlist, onDeleteFromWishlist, isAddedToWishlist, isInWishlist }) => {
  const cardWidth = isInWishlist ? '100%' : '18%';

  return (
    <Card style={{ width: cardWidth, marginBottom: '20px', border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={movie.Poster}
          alt={movie.Title}
        />
        <CardContent>
          <Typography variant="h6">{movie.Title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {movie.Year}
          </Typography>
          {isInWishlist ? (
            <Button style={{ marginTop: '10px' }} variant="contained" onClick={onDeleteFromWishlist}>
              Delete
            </Button>
          ) : (
            <Button style={{ marginTop: '10px' }} variant="contained" onClick={onAddToWishlist}>
              Add To Wishlist
            </Button>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CustomCard;
