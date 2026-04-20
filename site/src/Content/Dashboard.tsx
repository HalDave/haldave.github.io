import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import BooksDashboard from './BooksDashboard/BooksDashboard';
import VideoGamesDashboard from './VideoGamesDashboard/VideoGamesDashboard';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <h1>Dashboard</h1>
      <Tabs value={activeTab} onChange={(_e, val) => setActiveTab(val)} sx={{ mb: 3 }}>
        <Tab label="Books" />
        <Tab label="Videogames" />
      </Tabs>

      {activeTab === 0 && <Box><BooksDashboard /></Box>}
      {activeTab === 1 && <Box><VideoGamesDashboard /></Box>}
    </div>
  );
};

export default Dashboard;