import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

interface Props {
  open: boolean;
  message: string;
  severity: AlertColor;
  autoHideDuration?: number;
  onClose?: () => void;
}

const FeedbackSnackbar = ({ open, message, severity, autoHideDuration = 3000, onClose }: Props) => (
  <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
    <Alert severity={severity} variant="filled" onClose={onClose}>{message}</Alert>
  </Snackbar>
);

export default FeedbackSnackbar;
