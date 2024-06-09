import { Delete } from "@mui/icons-material";
import { Fab, Stack, Typography } from "@mui/material";
import React from "react";

const PlayerIcon = ({
  player,
  handlePlayerRemoveFromTeam,
  hideDelete = false,
}) => {
  return (
    <Stack direction="column" alignItems="center" gap={0}>
      {!hideDelete ? (
        <div
          style={{ cursor: "pointer" }}
          onClick={() =>
            handlePlayerRemoveFromTeam(
              player?.playerDetails?.id,
              player?.category
            )
          }
        >
          <Delete fontSize="0.5em" />
        </div>
      ) : null}
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

      <Stack direction="row" alignItems="center">
        <Typography fontSize="0.6rem" component="div">
          {player?.playerDetails?.playerInfo?.name || "N/A"}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PlayerIcon;
