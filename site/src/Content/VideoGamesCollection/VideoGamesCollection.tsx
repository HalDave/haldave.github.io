import React from 'react';
import Grid from '@mui/material/Grid';
import GameCard from '../../UI/GameCard/GameCard';
import { useGames } from '../../Services/hooks/games/useGames';

const VideoGamesCollection = () => {
  const { games } = useGames();

  return (
    <Grid
      container
      columnSpacing={1}
      direction="row"
      alignItems="left"
      justifyContent="left"
      sx={{ paddingRight: 6, paddingLeft: 6 }}
    >
      {games.map((item) => (
        <GameCard key={item.id} item={item} />
      ))}
    </Grid>
  );
};

export default VideoGamesCollection;
