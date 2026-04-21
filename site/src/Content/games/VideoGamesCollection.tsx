import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import GameCard from '../../UI/GameCard/GameCard';
import GridDensityToggle from '../../UI/GridDensityToggle/GridDensityToggle';
import useGridDensity from '../../Services/hooks/useGridDensity';
import { useGames } from '../../Services/hooks/games/useGames';

const VideoGamesCollection = () => {
  const { games, isLoading } = useGames();
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
        {games.map((item) => (
          <GameCard key={item.id} item={item} density={density} />
        ))}
      </Grid>
    </>
  );
};

export default VideoGamesCollection;
