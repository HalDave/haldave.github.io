import HouseIcon from '@mui/icons-material/House';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import WorkIcon from '@mui/icons-material/Work';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const getPage = (pageName:string):{
  icon: JSX.Element;
  link: string;
  title: string;
} => {
  switch (pageName) {
    case 'About':
      return { icon: <HouseIcon />, link: '/', title: 'About' };
    case 'Work':
      return { icon: <WorkIcon />, link: 'work', title: 'Work' };
    case 'Hobbies':
      return { icon: <VideogameAssetIcon />, link: 'hobbies', title: 'Interests' };
    case 'Dashboard':
      return { icon: <DashboardIcon />, link: 'dashboard', title: 'Dashboard' };
    default:
      return { icon: <QuestionMarkIcon />, link: '/', title: 'Home' };
  }
}