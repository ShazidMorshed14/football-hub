import { Close } from "@mui/icons-material";
import Field from "../../assets/field.svg";

import { Fab, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { isArrayAndHasContent } from "../../utils/utils";
import PlayerIcon from "./PlayerIcon";
import toast from "react-hot-toast";

const TeamBoard = ({
  formation,
  setTeamViewModal,
  team,
  hideClose,
  setTeam,
  formationObject,
  setFormationObject,
}) => {
  let handlePlayerRemoveFromTeam = (id, category) => {
    let updatedFormationObj = {
      ...formationObject,
      [category]: formationObject[category] + 1,
    };
    setFormationObject(updatedFormationObj);
    let updatedTeam = team.filter((p) => p?.playerDetails?.id !== id);

    setTeam(updatedTeam);
    toast.error("Player Removed!", {
      duration: 1000,
    });
  };
  return (
    <div
      style={{
        background: `url(${Field})`,
        backgroundSize: "cover",
        height: "100%",
        backgroundPosition: "center",
        padding: "0px !important",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "5px",
          left: "25px",
        }}
      >
        <Typography>{formation}</Typography>
      </div>

      {!hideClose && (
        <div
          style={{
            position: "absolute",
            top: "5px",
            right: "25px",
          }}
        >
          <Fab
            size="small"
            color="white"
            aria-label="close"
            onClick={() => setTeamViewModal(false)}
          >
            <Close />
          </Fab>
        </div>
      )}

      <Stack
        direction="column"
        justifyContent="space-around"
        py="30px"
        px="5px"
      >
        <Stack
          direction="row"
          justifyContent="space-around"
          style={{
            minHeight: "10vh",
          }}
        >
          {isArrayAndHasContent(
            team?.filter((item) => item.category == "FORWARD")
          )
            ? team
                ?.filter((item) => item.category == "FORWARD")
                ?.map((player, index) => {
                  return (
                    <PlayerIcon
                      key={index}
                      player={player}
                      handlePlayerRemoveFromTeam={handlePlayerRemoveFromTeam}
                    />
                  );
                })
            : null}
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-around"
          mt="2em"
          style={{
            minHeight: "10vh",
          }}
        >
          {isArrayAndHasContent(
            team?.filter((item) => item.category == "MIDFIELDER")
          )
            ? team
                ?.filter((item) => item.category == "MIDFIELDER")
                ?.map((player, index) => {
                  return (
                    <PlayerIcon
                      key={index}
                      player={player}
                      handlePlayerRemoveFromTeam={handlePlayerRemoveFromTeam}
                    />
                  );
                })
            : null}
        </Stack>

        <Stack direction="row" justifyContent="space-around" my="2em">
          {isArrayAndHasContent(
            team?.filter((item) => item.category == "DEFENDER")
          )
            ? team
                ?.filter((item) => item.category == "DEFENDER")
                ?.map((player, index) => {
                  return (
                    <PlayerIcon
                      key={index}
                      player={player}
                      handlePlayerRemoveFromTeam={handlePlayerRemoveFromTeam}
                    />
                  );
                })
            : null}
        </Stack>

        {isArrayAndHasContent(
          team?.filter((item) => item.category == "GOALKEEPER")
        )
          ? team
              ?.filter((item) => item.category == "GOALKEEPER")
              ?.map((player, index) => {
                return (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "15px",
                      left: "43%",
                    }}
                    key={index}
                    player={player}
                  >
                    <PlayerIcon
                      player={player}
                      handlePlayerRemoveFromTeam={handlePlayerRemoveFromTeam}
                    />
                  </div>
                );
              })
          : null}
      </Stack>
    </div>
  );
};

export default TeamBoard;
