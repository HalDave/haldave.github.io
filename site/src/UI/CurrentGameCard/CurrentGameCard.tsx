import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { ItemProps } from '../../Types/types';
import { useUpdateGameStatus } from '../../Services/hooks/games/useUpdateGameStatus';
import CompletionDialog from '../CompletionDialog/CompletionDialog';

const CurrentGameCard = ({ item }: { item: ItemProps }) => {
  const { updateStatus, isLoading } = useUpdateGameStatus();
  const [completionOpen, setCompletionOpen] = useState(false);

  return (
    <Card sx={{ maxWidth: 240, margin: '0 auto' }}>
      {item.image && (
        <CardMedia component="img" image={item.image} alt={item.title} />
      )}
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">Currently playing</Typography>
        <Typography variant="h6">{item.title}</Typography>
        {item.developer && (
          <Typography variant="body2" color="text.secondary">{item.developer}</Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          size="small"
          variant="contained"
          color="success"
          disabled={isLoading}
          onClick={() => setCompletionOpen(true)}
        >
          {isLoading ? <CircularProgress size={16} color="inherit" /> : 'Completed'}
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="warning"
          disabled={isLoading}
          onClick={() => updateStatus(item.id, 'OnHold')}
        >
          On Hold
        </Button>
      </CardActions>
      <CompletionDialog
        open={completionOpen}
        onClose={() => setCompletionOpen(false)}
        isLoading={isLoading}
        onConfirm={(rating, opinion) => {
          updateStatus(item.id, 'Completed', rating, opinion);
          setCompletionOpen(false);
        }}
      />
    </Card>
  );
};

export default CurrentGameCard;
