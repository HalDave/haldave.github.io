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
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, top: 'auto', bottom: 0, paddingBottom: 1 }}>
        <Toolbar variant="dense" sx={{ display: "flex", width: "100%" }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: 2,
            alignItems: 'center',
            gap: 1,
          }}>
            <Typography variant="body2" color="inherit" component="div">
              Integrated with:
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
            right: 0,
            position: 'absolute',
            alignItems: 'center',
            marginRight:2,
            gap:1
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
    </Box>
  );
}