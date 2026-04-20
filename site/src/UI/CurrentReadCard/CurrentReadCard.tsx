import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ItemProps } from '../../Types/types';

const CurrentReadCard = ({ item }: { item: ItemProps }) => (
  <Card sx={{ maxWidth: 240, margin: '0 auto' }}>
    {item.image && (
      <CardMedia component="img" image={item.image} alt={item.title} />
    )}
    <CardContent>
      <Typography variant="subtitle2" color="text.secondary">Currently reading</Typography>
      <Typography variant="h6">{item.title}</Typography>
    </CardContent>
  </Card>
);

export default CurrentReadCard;
