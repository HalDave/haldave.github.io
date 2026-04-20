import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useBookSearch } from '../Services/hooks/useBookSearch';
import { useAddCurrentRead } from '../Services/hooks/useAddCurrentRead';
import { useCurrentRead } from '../Services/hooks/useCurrentRead';
import { BookSearchResult } from '../Types/types';

const Dashboard = () => {
  const [inputValue, setInputValue] = useState('');
  const { data: bookResults, isLoading } = useBookSearch(inputValue);
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
        <Card sx={{ maxWidth: 240, margin: '0 auto' }}>
          {currentRead.image && (
            <CardMedia
              component="img"
              image={currentRead.image}
              alt={currentRead.title}
            />
          )}
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Currently reading
            </Typography>
            <Typography variant="h6">{currentRead.title}</Typography>
          </CardContent>
        </Card>
      ) : (
        <Autocomplete<BookSearchResult, false, false, true>
          freeSolo
          filterOptions={(x) => x}
          options={bookResults}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : `${option.title} — ${option.author}`
          }
          inputValue={inputValue}
          onInputChange={(_event, newValue) => setInputValue(newValue)}
          onChange={(_event, value) => {
            if (value && typeof value !== 'string') {
              addCurrentRead(value);
            }
          }}
          loading={isLoading || isSaving}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search books"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading || isSaving ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
      <Snackbar open={success} autoHideDuration={3000}>
        <Alert severity="success" variant="filled">Book saved as current read!</Alert>
      </Snackbar>
      <Snackbar open={!!saveError} autoHideDuration={4000}>
        <Alert severity="error" variant="filled">{saveError}</Alert>
      </Snackbar>
    </div>
  );
};

export default Dashboard;