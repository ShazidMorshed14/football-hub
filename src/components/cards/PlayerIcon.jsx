import { Stack, Typography } from "@mui/material";
import React from "react";

const PlayerIcon = ({ player }) => {
  return (
    <Stack direction="column" alignItems="center">
      <img
        src={
          player?.playerDetails?.playerInfo?.image ||
          "https://static.vecteezy.com/system/resources/thumbnails/028/587/951/small/jersey-3d-rendering-icon-illustration-free-png.png"
        }
        style={{
          height: "60px",
          width: "auto",
        }}
      />
      <Typography fontSize="0.6rem" component="div">
        {player?.playerDetails?.playerInfo?.name || "N/A"}
      </Typography>
    </Stack>
  );
};

export default PlayerIcon;
