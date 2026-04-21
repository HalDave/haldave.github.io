import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CurrentGameCard from '../../UI/CurrentGameCard/CurrentGameCard';
import GameSearchAutocomplete from '../../UI/GameSearchAutocomplete/GameSearchAutocomplete';
import FeedbackSnackbar from '../../UI/FeedbackSnackbar/FeedbackSnackbar';
import GameCard from '../../UI/GameCard/GameCard';
import GridDensityToggle from '../../UI/GridDensityToggle/GridDensityToggle';
import useGridDensity from '../../Services/hooks/useGridDensity';
import { useGameSearch } from '../../Services/hooks/games/useGameSearch';
import { useAddCurrentGame } from '../../Services/hooks/games/useAddCurrentGame';
import { useAddPendingGame } from '../../Services/hooks/games/useAddPendingGame';
import { useCurrentGame } from '../../Services/hooks/games/useCurrentGame';
import { useGames } from '../../Services/hooks/games/useGames';

const VideoGamesDashboard = () => {
  const [gameInput, setGameInput] = useState('');
  const [tbpInput, setTbpInput] = useState('');
  const { data: gameResults, isLoading: isSearchingGames } = useGameSearch(gameInput);
  const { data: tbpResults, isLoading: isTbpSearching } = useGameSearch(tbpInput);
  const { addCurrentGame, isLoading: isSavingGame, error: saveGameError, success: gameSuccess } = useAddCurrentGame();
  const { addPendingGame, isLoading: isTbpSaving, error: tbpError, success: tbpSuccess } = useAddPendingGame();
  const { currentGame, isLoading: isLoadingCurrentGame } = useCurrentGame();
  const { games, isLoading: isLoadingGames } = useGames();
  const { density, setDensity } = useGridDensity();

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>Currently playing</Typography>
      {isLoadingCurrentGame ? (
        <CircularProgress />
      ) : currentGame ? (
        <CurrentGameCard item={currentGame} />
      ) : (
        <GameSearchAutocomplete
          inputValue={gameInput}
          options={gameResults}
          isLoading={isSearchingGames || isSavingGame}
          onInputChange={setGameInput}
          onSelect={addCurrentGame}
        />
      )}

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" sx={{ mb: 2 }}>To Be Played</Typography>
      <GameSearchAutocomplete
        inputValue={tbpInput}
        options={tbpResults}
        isLoading={isTbpSearching || isTbpSaving}
        onInputChange={setTbpInput}
        onSelect={addPendingGame}
      />

      <Divider sx={{ my: 4 }} />
      {isLoadingGames ? (
        <CircularProgress />
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1, px: 6 }}>
            <GridDensityToggle density={density} onChange={setDensity} />
          </Box>
          <Grid container columnSpacing={1} direction="row" sx={{ paddingRight: 6, paddingLeft: 6 }}>
            {games.map((item) => (
              <GameCard key={item.id} item={item} showActions density={density} />
            ))}
          </Grid>
        </>
      )}

      <FeedbackSnackbar open={gameSuccess} message="Game saved as currently playing!" severity="success" />
      <FeedbackSnackbar open={Boolean(saveGameError)} message={saveGameError ?? ''} severity="error" autoHideDuration={4000} />
      <FeedbackSnackbar open={tbpSuccess} message="Game added to To Be Played list!" severity="success" />
      <FeedbackSnackbar open={Boolean(tbpError)} message={tbpError ?? ''} severity="error" autoHideDuration={4000} />
    </>
  );
};

export default VideoGamesDashboard;
