import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BooksDashboard from './books/BooksDashboard';
import VideoGamesDashboard from './games/VideoGamesDashboard';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box component="article" sx={{ px: 2, py: 3 }}>
      <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 700, mb: 3 }}>
        Dashboard
      </Typography>
      <Tabs value={activeTab} onChange={(_e, val) => setActiveTab(val)} sx={{ mb: 3 }}>
        <Tab id="tab-books" aria-controls="tabpanel-books" label="Books" />
        <Tab id="tab-videogames" aria-controls="tabpanel-videogames" label="Videogames" />
      </Tabs>

      <div role="tabpanel" id="tabpanel-books" aria-labelledby="tab-books" hidden={activeTab !== 0}>
        <Box><BooksDashboard /></Box>
      </div>
      <div role="tabpanel" id="tabpanel-videogames" aria-labelledby="tab-videogames" hidden={activeTab !== 1}>
        <Box><VideoGamesDashboard /></Box>
      </div>
    </Box>
  );
};

export default Dashboard;