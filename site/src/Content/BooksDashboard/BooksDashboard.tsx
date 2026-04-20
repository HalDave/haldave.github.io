import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CurrentReadCard from '../../UI/CurrentReadCard/CurrentReadCard';
import BookSearchAutocomplete from '../../UI/BookSearchAutocomplete/BookSearchAutocomplete';
import FeedbackSnackbar from '../../UI/FeedbackSnackbar/FeedbackSnackbar';
import BookCard from '../../UI/BookCard/BookCard';
import { useBookSearch } from '../../Services/hooks/books/useBookSearch';
import { useAddCurrentRead } from '../../Services/hooks/books/useAddCurrentRead';
import { useAddPendingBook } from '../../Services/hooks/books/useAddPendingBook';
import { useCurrentRead } from '../../Services/hooks/books/useCurrentRead';
import { useBooks } from '../../Services/hooks/books/useBooks';

const BooksDashboard = () => {
  const [inputValue, setInputValue] = useState('');
  const [tbrInput, setTbrInput] = useState('');
  const { data: bookResults, isLoading: isSearching } = useBookSearch(inputValue);
  const { data: tbrResults, isLoading: isTbrSearching } = useBookSearch(tbrInput);
  const { addCurrentRead, isLoading: isSaving, error: saveError, success } = useAddCurrentRead();
  const { addPendingBook, isLoading: isTbrSaving, error: tbrError, success: tbrSuccess } = useAddPendingBook();
  const { currentRead, isLoading: isLoadingCurrent } = useCurrentRead();
  const { books, isLoading: isLoadingBooks } = useBooks();

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>Currently reading</Typography>
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

      <Typography variant="h5" sx={{ mb: 2 }}>To Be Read</Typography>
      <BookSearchAutocomplete
        inputValue={tbrInput}
        options={tbrResults}
        isLoading={isTbrSearching || isTbrSaving}
        onInputChange={setTbrInput}
        onSelect={addPendingBook}
      />

      <Divider sx={{ my: 4 }} />
      {isLoadingBooks ? (
        <CircularProgress />
      ) : (
        <Grid container columnSpacing={1} direction="row" sx={{ paddingRight: 6, paddingLeft: 6 }}>
          {books.map((item) => (
            <BookCard key={item.id} item={item} showActions />
          ))}
        </Grid>
      )}

      <FeedbackSnackbar open={success} message="Book saved as current read!" severity="success" />
      <FeedbackSnackbar open={!!saveError} message={saveError ?? ''} severity="error" autoHideDuration={4000} />
      <FeedbackSnackbar open={tbrSuccess} message="Book added to To Be Read list!" severity="success" />
      <FeedbackSnackbar open={!!tbrError} message={tbrError ?? ''} severity="error" autoHideDuration={4000} />
    </>
  );
};

export default BooksDashboard;
