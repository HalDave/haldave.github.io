import React from 'react';
import Grid from '@mui/material/Grid';
import BookCard from '../../UI/BookCard/BookCard';
import { useBooks } from '../../Services/hooks/books/useBooks';

const BooksCollection = () => {
  const { books } = useBooks();

  return (
    <Grid
      container
      columnSpacing={1}
      direction="row"
      alignItems="left"
      justifyContent="left"
      sx={{ paddingRight: 6, paddingLeft: 6 }}
    >
      {books.map((item) => (
        <BookCard key={item.id} item={item} />
      ))}
    </Grid>
  );
};

export default BooksCollection;
