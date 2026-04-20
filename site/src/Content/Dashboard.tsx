import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { useBookSearch } from '../Services/hooks/useBookSearch';
import { BookSearchResult } from '../Types/types';

const Dashboard = () => {
  const [inputValue, setInputValue] = useState('');
  const { data: bookResults, isLoading } = useBookSearch(inputValue);

  return (
    <div>
      <h1>Dashboard</h1>
      <Autocomplete<BookSearchResult, false, false, true>
        freeSolo
        filterOptions={(x) => x}
        options={bookResults}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : `${option.title} — ${option.author}`
        }
        inputValue={inputValue}
        onInputChange={(_event, newValue) => setInputValue(newValue)}
        loading={isLoading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search books"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default Dashboard;