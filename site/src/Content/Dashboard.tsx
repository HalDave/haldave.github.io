import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import CurrentReadCard from '../UI/CurrentReadCard/CurrentReadCard';
import BookSearchAutocomplete from '../UI/BookSearchAutocomplete/BookSearchAutocomplete';
import FeedbackSnackbar from '../UI/FeedbackSnackbar/FeedbackSnackbar';
import { useBookSearch } from '../Services/hooks/useBookSearch';
import { useAddCurrentRead } from '../Services/hooks/useAddCurrentRead';
import { useCurrentRead } from '../Services/hooks/useCurrentRead';

const Dashboard = () => {
  const [inputValue, setInputValue] = useState('');
  const { data: bookResults, isLoading: isSearching } = useBookSearch(inputValue);
  const { addCurrentRead, isLoading: isSaving, error: saveError, success } = useAddCurrentRead();
  const { currentRead, isLoading: isLoadingCurrent } = useCurrentRead();

  if (isLoadingCurrent) {
    return (
      <div>
        <h1>Dashboard</h1>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {currentRead ? (
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
      <FeedbackSnackbar open={success} message="Book saved as current read!" severity="success" />
      <FeedbackSnackbar open={!!saveError} message={saveError ?? ''} severity="error" autoHideDuration={4000} />
    </div>
  );
};

export default Dashboard;