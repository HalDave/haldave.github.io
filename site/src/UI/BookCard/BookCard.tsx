import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Close from "@mui/icons-material/Close";
import { ItemProps, BookStatus } from "../../Types/types";
import useScreenSize from "../../Services/ScreenSize";

const statusLabel: Record<BookStatus, string> = {
  Completed: "Completed",
  OnHold: "On Hold",
  Reading: "Reading",
  Pending: "Pending",
};

const statusColor: Record<BookStatus, "success" | "warning" | "primary" | "default"> = {
  Completed: "success",
  OnHold: "warning",
  Reading: "primary",
  Pending: "default",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

const statusDateLabel = (status?: BookStatus, updatedAt?: string): string | null => {
  if (!status || !updatedAt) return null;
  const date = formatDate(updatedAt);
  if (status === "Completed") return `Completed on ${date}`;
  if (status === "OnHold") return `On Hold since ${date}`;
  if (status === "Reading") return `Started ${date}`;
  if (status === "Pending") return `Added ${date}`;
  return null;
};

const BookCard = ({ item }: { item: ItemProps }) => {
  const { isMobile } = useScreenSize();
  const [expanded, setExpanded] = useState(false);

  return (
    <Grid item xs={6} sm={4} md={3} lg={2} sx={{ width: "100%" }}>
      <Card sx={{ cursor: "pointer" }} onClick={() => setExpanded(true)}>
        <CardMedia
          component="img"
          image={item.image}
          alt={item.title}
          sx={{ objectFit: "cover", aspectRatio: "2/3" }}
        />
        <CardContent sx={{ pb: "8px !important" }}>
          {item.rating != null && (
            <Chip
              size="small"
              icon={<StarIcon fontSize="small" />}
              label={item.rating}
              sx={{ mb: 0.5, mr: 0.5 }}
            />
          )}
          {item.status && (
            <Chip
              size="small"
              label={statusLabel[item.status]}
              color={statusColor[item.status]}
              sx={{ mb: 0.5 }}
            />
          )}
          <Typography variant="body2" noWrap title={item.title}>
            {item.title}
          </Typography>
        </CardContent>
      </Card>

      <Dialog open={expanded} onClose={() => setExpanded(false)} fullScreen={isMobile}>
        <Card sx={{ height: "100%" }}>
          <CardHeader
            title={item.title}
            action={
              <IconButton aria-label="close" onClick={() => setExpanded(false)}>
                <Close />
              </IconButton>
            }
          />
          <CardMedia
            component="img"
            image={item.image}
            alt={item.title}
            sx={{ maxHeight: 480, objectFit: "contain" }}
          />
          <CardContent>
            {item.rating != null && (
              <Chip icon={<StarBorderIcon />} label={item.rating} sx={{ mb: 1, mr: 1 }} />
            )}
            {item.status && (
              <Chip
                label={statusLabel[item.status]}
                color={statusColor[item.status]}
                sx={{ mb: 1 }}
              />
            )}
            {statusDateLabel(item.status, item.updatedAt) && (
              <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
                {statusDateLabel(item.status, item.updatedAt)}
              </Typography>
            )}
            <Typography variant="body1">{item.opinion}</Typography>
          </CardContent>
        </Card>
      </Dialog>
    </Grid>
  );
};

export default BookCard;
