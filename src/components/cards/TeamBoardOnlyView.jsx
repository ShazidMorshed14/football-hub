import { Close } from "@mui/icons-material";
import Field from "../../assets/field.svg";

import {
  Box,
  Drawer,
  Fab,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { isArrayAndHasContent } from "../../utils/utils";
import PlayerIcon from "./PlayerIcon";
import { useNavigate } from "react-router-dom";
import PlayerDetailsPopupCard from "./PlayerDetailsPopupCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  height: "auto",
  bgcolor: "transparent",

  boxShadow: 24,
};

const TeamBoardOnlyView = ({
  formation,
  team,
  hideClose = false,
  setTeamViewModal,
}) => {
  let handlePlayerRemoveFromTeam = (id, category) => {};

  const navigate = useNavigate();

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = React.useState(false);

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
      <Modal
        open={openDetailsModal && selectedPlayer}
        onClose={() => {
          setSelectedPlayer(null);
          setOpenDetailsModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PlayerDetailsPopupCard
            player={selectedPlayer}
            handleClose={() => {
              setSelectedPlayer(null);
              setOpenDetailsModal(false);
            }}
          />
        </Box>
      </Modal>

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
            minHeight: "15vh",
          }}
        >
          {isArrayAndHasContent(
            team?.filter((item) => item.category == "FORWARD")
          )
            ? team
                ?.filter((item) => item.category == "FORWARD")
                ?.map((player, index) => {
                  return (
                    <div
                      onClick={() => {
                        setSelectedPlayer(player);
                        setOpenDetailsModal(true);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <PlayerIcon
                        key={index}
                        player={player}
                        handlePlayerRemoveFromTeam={handlePlayerRemoveFromTeam}
                        hideDelete
                      />
                    </div>
                  );
                })
            : null}
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-around"
          my="4em"
          style={{
            minHeight: "15vh",
          }}
        >
          {isArrayAndHasContent(
            team?.filter((item) => item.category == "MIDFIELDER")
          )
            ? team
                ?.filter((item) => item.category == "MIDFIELDER")
                ?.map((player, index) => {
                  return (
                    <div
                      onClick={() => {
                        setSelectedPlayer(player);
                        setOpenDetailsModal(true);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <PlayerIcon
                        key={index}
                        player={player}
                        handlePlayerRemoveFromTeam={handlePlayerRemoveFromTeam}
                        hideDelete
                      />
                    </div>
                  );
                })
            : null}
        </Stack>

        <Stack direction="row" justifyContent="space-around" mt="0em">
          {isArrayAndHasContent(
            team?.filter((item) => item.category == "DEFENDER")
          )
            ? team
                ?.filter((item) => item.category == "DEFENDER")
                ?.map((player, index) => {
                  return (
                    <div
                      onClick={() => {
                        setSelectedPlayer(player);
                        setOpenDetailsModal(true);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <PlayerIcon
                        key={index}
                        player={player}
                        handlePlayerRemoveFromTeam={handlePlayerRemoveFromTeam}
                        hideDelete
                      />
                    </div>
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
                      cursor: "pointer",
                    }}
                    key={index}
                    player={player}
                    onClick={() => {
                      setSelectedPlayer(player);
                      setOpenDetailsModal(true);
                    }}
                  >
                    <PlayerIcon
                      player={player}
                      handlePlayerRemoveFromTeam={handlePlayerRemoveFromTeam}
                      hideDelete
                    />
                  </div>
                );
              })
          : null}
      </Stack>
    </div>
  );
};

export default TeamBoardOnlyView;
