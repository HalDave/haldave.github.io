import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";
import { getPage } from '../Services/PageService';

const drawerWidth = 240;

interface SideBarProps {
  isMobile: boolean;
  mobileOpen: boolean;
  onClose: () => void;
}

export default function SideBar({isMobile, mobileOpen, onClose}: SideBarProps) {
  const drawerVariant = isMobile ? "temporary" : "permanent";

  return (
    <Drawer
      variant={drawerVariant}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
      open={mobileOpen}
      onClose={onClose}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {['About', 'Hobbies', 'Work', 'Dashboard'].map((text, index) =>
            (
              <ListItem key={text} disablePadding
                secondaryAction={text === 'Dashboard' ? <LockIcon fontSize="small" color="disabled" /> : null}
              >
                <ListItemButton component={Link} to={getPage(text).link}>
                  <ListItemIcon>
                    {getPage(text).icon}
                  </ListItemIcon>
                  <ListItemText primary={getPage(text).title} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  )
}