import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CurrentReadCard from '../UI/CurrentReadCard/CurrentReadCard';
import BookSearchAutocomplete from '../UI/BookSearchAutocomplete/BookSearchAutocomplete';
import FeedbackSnackbar from '../UI/FeedbackSnackbar/FeedbackSnackbar';
import BookCard from '../UI/BookCard/BookCard';
import { useBookSearch } from '../Services/hooks/useBookSearch';
import { useAddCurrentRead } from '../Services/hooks/useAddCurrentRead';
import { useCurrentRead } from '../Services/hooks/useCurrentRead';
import { useBooks } from '../Services/hooks/useBooks';

const Dashboard = () => {
  const [inputValue, setInputValue] = useState('');
  const { data: bookResults, isLoading: isSearching } = useBookSearch(inputValue);
  const { addCurrentRead, isLoading: isSaving, error: saveError, success } = useAddCurrentRead();
  const { currentRead, isLoading: isLoadingCurrent } = useCurrentRead();
  const { books, isLoading: isLoadingBooks } = useBooks();

  return (
    <div>
      <h1>Dashboard</h1>

      {isLoadingCurrent ? (
        <CircularProgress />
      ) : currentRead ? (
        <CurrentReadCard item={currentRead} />
      ) : (
        <BookSearchAutocomplete
          inputValue={inputValue}
          options={bookResults}
          isLoading={isSearching || isSaving}
          onInputChange={setInputValue}
          onSelect={addCurrentRead}
        />
      )}

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" sx={{ mb: 2 }}>My Books</Typography>
      {isLoadingBooks ? (
        <CircularProgress />
      ) : (
        <Grid container columnSpacing={1} direction="row" sx={{ paddingRight: 6, paddingLeft: 6 }}>
          {books.map((item) => (
            <BookCard key={item.id} item={item} />
          ))}
        </Grid>
      )}

      <FeedbackSnackbar open={success} message="Book saved as current read!" severity="success" />
      <FeedbackSnackbar open={!!saveError} message={saveError ?? ''} severity="error" autoHideDuration={4000} />
    </div>
  );
};

export default Dashboard;