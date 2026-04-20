import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from './Image/Image';

export default function BottomBar({isDarkTheme}: {isDarkTheme: boolean}) {
  console.log(isDarkTheme)
  return (
    <AppBar position="static" color="primary" sx={{ paddingBottom: 1 }}>
        <Toolbar variant="dense" sx={{ display: "flex", flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, width: "100%", minHeight: 'auto !important', paddingTop: { xs: 1, sm: 0 }, paddingBottom: { xs: 1, sm: 0 } }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: 2,
            alignItems: 'center',
            gap: 1,
          }}>
            <Typography variant="body2" color="inherit" component="div">
              Powered by:
            </Typography>
            <Chip
              label="Google Books"
              size="small"
              component="a"
              href="https://developers.google.com/books"
              target="_blank"
              rel="noopener noreferrer"
              clickable
              sx={{ color: 'inherit', borderColor: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
              variant="outlined"
            />
            <Chip
              label="IGDB"
              size="small"
              component="a"
              href="https://www.igdb.com"
              target="_blank"
              rel="noopener noreferrer"
              clickable
              sx={{ color: 'inherit', borderColor: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
              variant="outlined"
            />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: 2,
            right: { xs: 'auto', sm: 0 },
            position: { xs: 'static', sm: 'absolute' },
            alignItems: 'center',
            marginRight: { xs: 0, sm: 2 },
            gap: 1,
          }}>
            <Typography variant="body2" color="inherit" component="div">
              This site uses:
            </Typography>
            <Image isDarkTheme src={'/ReactLogo.png'} alt={"React"} title={"React"} />
            <Image isDarkTheme src={'/TsLogo.png'} alt={"TypeScript"} title={"TypeScript"} />
            <Image isDarkTheme src={'/MaterialUILogo.png'} alt={"MaterialUI"} title={"MaterialUI"} />
            <Image isDarkTheme src={'/NodeJSLogo.png'} alt={"Nodejs"} title={"Nodejs"} />
            <Image isDarkTheme src={'/AzureLogo.png'} alt={"Azure"} title={"Azure"} />
            <Image isDarkTheme src={'/CosmosdbLogo.png'} alt={"Cosmosdb"} title={"Cosmosdb"} />
          </Box>
        </Toolbar>
      </AppBar>
  );
}