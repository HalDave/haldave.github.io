import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import BookCard from '../../UI/BookCard/BookCard';
import GridDensityToggle from '../../UI/GridDensityToggle/GridDensityToggle';
import useGridDensity from '../../Services/hooks/useGridDensity';
import { useBooks } from '../../Services/hooks/books/useBooks';

const BooksCollection = () => {
  const { books, isLoading } = useBooks();
  const { density, setDensity } = useGridDensity();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1, px: 6 }}>
        <GridDensityToggle density={density} onChange={setDensity} />
      </Box>
      <Grid
        container
        columnSpacing={1}
        direction="row"
        alignItems="left"
        justifyContent="left"
        sx={{ paddingRight: 6, paddingLeft: 6 }}
      >
        {books.map((item) => (
          <BookCard key={item.id} item={item} density={density} />
        ))}
      </Grid>
    </>
  );
};

export default BooksCollection;
