import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Work = () => {
  return (
    <Box component="article" sx={{ px: 2, py: 3 }}>
      <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 700, mb: 3 }}>
        Work
      </Typography>
    </Box>
  );
}

export default Work