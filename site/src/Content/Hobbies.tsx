import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import BooksCollection from "./BooksCollection/BooksCollection";
import VideoGamesCollection from "./VideoGamesCollection/VideoGamesCollection";

const Hobbies = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <h1>My Interests</h1>
      <Tabs value={activeTab} onChange={(_e, val) => setActiveTab(val)} sx={{ mb: 3 }}>
        <Tab label="Books" />
        <Tab label="Videogames" />
      </Tabs>

      {activeTab === 0 && <Box><BooksCollection /></Box>}
      {activeTab === 1 && <Box><VideoGamesCollection /></Box>}
    </div>
  );
};

export default Hobbies;
