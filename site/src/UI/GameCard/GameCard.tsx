import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Close from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ItemProps, GameStatus, GridDensity } from "../../Types/types";
import useScreenSize from "../../Services/ScreenSize";
import { useUpdateGameStatus } from "../../Services/hooks/games/useUpdateGameStatus";
import { useDeleteGame } from "../../Services/hooks/games/useDeleteGame";
import CompletionDialog from "../CompletionDialog/CompletionDialog";

const statusLabel: Record<GameStatus, string> = {
  Completed: "Completed",
  OnHold: "On Hold",
  Playing: "Playing",
  Pending: "Pending",
};

const statusColor: Record<GameStatus, "success" | "warning" | "primary" | "default"> = {
  Completed: "success",
  OnHold: "warning",
  Playing: "primary",
  Pending: "default",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

const statusDateLabel = (status?: GameStatus, updatedAt?: string): string | null => {
  if (!status || !updatedAt) return null;
  const date = formatDate(updatedAt);
  if (status === "Completed") return `Completed on ${date}`;
  if (status === "OnHold") return `On Hold since ${date}`;
  if (status === "Playing") return `Started ${date}`;
  if (status === "Pending") return `Added ${date}`;
  return null;
};

const gridItemSize: Record<GridDensity, { xs: number; sm: number; md: number; lg: number }> = {
  comfortable: { xs: 6, sm: 4, md: 3, lg: 2 },
  compact:     { xs: 4, sm: 3, md: 2, lg: 1 },
};

const GameCard = ({ item, showActions, density = 'comfortable' }: { item: ItemProps; showActions?: boolean; density?: GridDensity }) => {
  const { isMobile } = useScreenSize();
  const [expanded, setExpanded] = useState(false);
  const [completionOpen, setCompletionOpen] = useState(false);
  const { updateStatus, isLoading } = useUpdateGameStatus();
  const { deleteGame, isLoading: isDeleting } = useDeleteGame();

  const status = item.status as GameStatus | undefined;

  const handleStatusChange = async (newStatus: GameStatus) => {
    await updateStatus(item.id, newStatus);
    setExpanded(false);
  };

  const handleCompleted = (rating: number, opinion?: string) => {
    updateStatus(item.id, "Completed", rating, opinion);
    setCompletionOpen(false);
    setExpanded(false);
  };

  const handleDelete = async () => {
    await deleteGame(item.id);
    setExpanded(false);
  };

  return (
    <Grid item {...gridItemSize[density]} sx={{ width: "100%" }}>
      <Card
        sx={{ cursor: "pointer" }}
        onClick={() => setExpanded(true)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${item.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setExpanded(true);
          }
        }}
      >
        <CardMedia
          component="img"
          image={item.image || "/placeholder-game.png"}
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
          {status && (
            <Chip
              size="small"
              label={statusLabel[status]}
              color={statusColor[status]}
              sx={{ mb: 0.5 }}
            />
          )}
          <Typography variant="body2" noWrap title={item.title}>
            {item.title}
          </Typography>
        </CardContent>
      </Card>

      <Dialog open={expanded} onClose={() => setExpanded(false)} fullScreen={isMobile} maxWidth="xs" fullWidth>
        <Card sx={{ height: "100%", overflowY: 'auto' }}>
          <CardHeader
            title={item.title}
            action={
              <IconButton aria-label="close" onClick={() => setExpanded(false)}>
                <Close />
              </IconButton>
            }
          />
          {item.image && (
            <CardMedia
              component="img"
              image={item.image}
              alt={item.title}
              sx={{ maxHeight: 480, objectFit: "contain" }}
            />
          )}
          <CardContent>
            {item.developer && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {item.developer}
              </Typography>
            )}
            {item.rating != null && (
              <Chip icon={<StarBorderIcon />} label={item.rating} sx={{ mb: 1, mr: 1 }} />
            )}
            {status && (
              <Chip
                label={statusLabel[status]}
                color={statusColor[status]}
                sx={{ mb: 1 }}
              />
            )}
            {statusDateLabel(status, item.updatedAt) && (
              <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
                {statusDateLabel(status, item.updatedAt)}
              </Typography>
            )}
            <Typography variant="body1">{item.opinion}</Typography>
          </CardContent>
          {showActions && (
            <CardActions sx={{ px: 2, pb: 2, gap: 1, flexWrap: "wrap" }}>
              {status && status !== "Completed" && (
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  disabled={isLoading}
                  onClick={() => setCompletionOpen(true)}
                >
                  Completed
                </Button>
              )}
              {status && (status === "OnHold" || status === "Pending" || status === "Completed") && (
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  disabled={isLoading}
                  onClick={() => handleStatusChange("Playing")}
                >
                  {status === "Completed" ? "Re-play" : "Resume Playing"}
                </Button>
              )}
              {status === "Playing" && (
                <Button
                  size="small"
                  variant="outlined"
                  color="warning"
                  disabled={isLoading}
                  onClick={() => handleStatusChange("OnHold")}
                >
                  On Hold
                </Button>
              )}
              <IconButton
                aria-label="delete"
                disabled={isDeleting}
                onClick={handleDelete}
                sx={{ color: "error.main", ml: "auto" }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </CardActions>
          )}
        </Card>
      </Dialog>
      <CompletionDialog
        open={completionOpen}
        onClose={() => setCompletionOpen(false)}
        isLoading={isLoading}
        onConfirm={handleCompleted}
      />
    </Grid>
  );
};

export default GameCard;
