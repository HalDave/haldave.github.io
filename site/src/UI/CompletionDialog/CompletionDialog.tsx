import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (rating: number, opinion?: string) => void;
  isLoading: boolean;
}

const CompletionDialog = ({ open, onClose, onConfirm, isLoading }: Props) => {
  const [rating, setRating] = useState<number | null>(null);
  const [opinion, setOpinion] = useState('');

  const handleConfirm = () => {
    if (rating) onConfirm(rating, opinion || undefined);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Mark as Completed</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <Box>
            <Typography id="rating-label" variant="body2" gutterBottom>Rating *</Typography>
            <Rating
              aria-labelledby="rating-label"
              value={rating}
              onChange={(_e, val) => setRating(val)}
              max={10}
            />
          </Box>
          <TextField
            label="Opinion (optional)"
            multiline
            rows={3}
            value={opinion}
            onChange={(e) => setOpinion(e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>Cancel</Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleConfirm}
          disabled={!rating || isLoading}
        >
          {isLoading ? <CircularProgress size={18} color="inherit" /> : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompletionDialog;
