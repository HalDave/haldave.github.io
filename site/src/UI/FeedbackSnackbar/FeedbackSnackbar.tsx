import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

interface Props {
  open: boolean;
  message: string;
  severity: AlertColor;
  autoHideDuration?: number;
}

const FeedbackSnackbar = ({ open, message, severity, autoHideDuration = 3000 }: Props) => (
  <Snackbar open={open} autoHideDuration={autoHideDuration}>
    <Alert severity={severity} variant="filled">{message}</Alert>
  </Snackbar>
);

export default FeedbackSnackbar;
