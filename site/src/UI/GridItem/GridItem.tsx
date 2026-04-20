import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ItemProps } from "../../Types/types";
import Close from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Dialog from "@mui/material/Dialog";
import useScreenSize from "../../Services/ScreenSize";
import styles from "./GridItem.module.css";

const GridItem = ({ item }: { item: ItemProps }) => {
  const { isMobile } = useScreenSize();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Grid item xs={12} sm={12} md={6} lg={4} sx={{ width: "100%" }}>
      <Card className={styles.card} onClick={handleExpandClick}>
        <Grid container direction="row" sx={{ cursor: "pointer" }}>
          <Grid item xs={2} sm={3}>
            <CardMedia
              component="img"
              height="128"
              image={item.image}
              alt={item.title}
              sx={{ objectFit: "contain" }}
            />
          </Grid>
          <Grid item xs={10} sm={9}>
            <CardContent
              sx={{
                position: "relative",
                textAlign: "left",
                height: "128px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Chip sx={{ width: "fit-content" }} icon={<StarBorderIcon />} label={item.rating} />
              <Typography variant="body1">{item.title}</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <Dialog open={expanded} onClose={handleExpandClick} fullScreen={isMobile}>
        <Card sx={{ height: "100%" }}>
          <CardHeader
            title={item.title}
            action={
              <IconButton aria-label="settings" onClick={handleExpandClick}>
                <Close />
              </IconButton>
            }
          />
          <CardMedia
            component="img"
            height="640"
            image={item.image}
            alt={item.title}
            sx={{ objectFit: "contain" }}
          />
          <CardContent>
            <Typography variant="body1">{item.opinion}</Typography>
          </CardContent>
        </Card>
      </Dialog>
    </Grid>
  );
};

export default GridItem;
