import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { GameSearchResult } from '../../Types/types';

interface Props {
  inputValue: string;
  options: GameSearchResult[];
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSelect: (game: GameSearchResult) => void;
}

const GameSearchAutocomplete = ({ inputValue, options, isLoading, onInputChange, onSelect }: Props) => (
  <Autocomplete<GameSearchResult, false, false, true>
    freeSolo
    filterOptions={(x) => x}
    options={options}
    getOptionLabel={(option) =>
      typeof option === 'string' ? option : `${option.title} — ${option.developer}`
    }
    inputValue={inputValue}
    onInputChange={(_e, val) => onInputChange(val)}
    onChange={(_e, value) => {
      if (value && typeof value !== 'string') onSelect(value);
    }}
    loading={isLoading}
    renderOption={(props, option) => (
      <Box component="li" {...props} sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        {typeof option !== 'string' && option.thumbnail ? (
          <Box
            component="img"
            src={option.thumbnail}
            alt={option.title}
            sx={{ width: 36, height: 52, objectFit: 'cover', flexShrink: 0 }}
          />
        ) : (
          <Box sx={{ width: 36, height: 52, flexShrink: 0 }} />
        )}
        <Box>
          <Typography variant="body2">
            {typeof option === 'string' ? option : option.title}
          </Typography>
          {typeof option !== 'string' && (
            <Typography variant="caption" color="text.secondary">{option.developer}</Typography>
          )}
        </Box>
      </Box>
    )}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Search games"
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
);

export default GameSearchAutocomplete;
