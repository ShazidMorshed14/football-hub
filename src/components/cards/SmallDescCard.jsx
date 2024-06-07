import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { convertToMillion } from "../../utils/utils";

const SmallDescCard = ({ player }) => {
  console.log(player?.marketValue);
  return (
    <div>
      <Card sx={{ cursor: "pointer" }}>
        <CardMedia
          component="img"
          height={"300"}
          image={player?.playerInfo?.image}
          alt="Paella dish"
          aria-setsize="center"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {player?.playerInfo?.name || "N/A"}
          </Typography>
          <Typography gutterBottom fontSize="1rem" component="div">
            Market Value:{" "}
            {player?.marketValue
              ? `${convertToMillion(player?.marketValue?.value || 0)}M ${
                  player?.marketValue?.currency
                }`
              : "N/A"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmallDescCard;
