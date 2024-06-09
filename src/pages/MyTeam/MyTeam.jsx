import {
  Box,
  Button,
  Card,
  Container,
  Fab,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isArrayAndHasContent } from "../../utils/utils";
import NoDataPlaceholder from "../../components/global/NoDataPlaceholder";
import TeamBoardOnlyView from "../../components/cards/TeamBoardOnlyView";
import { Details } from "@mui/icons-material";
import { teamActions } from "../../store/reducers/teamsReducer";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: "90vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const MyTeam = () => {
  const dispatch = useDispatch();
  const savedTeams = useSelector((state) => state.teams.myTeams);

  const [teamViewModal, setTeamViewModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleDeleteTeam = (id) => {
    dispatch(teamActions.updateTeam(id));
    toast.success("Team Deleted Successfully!");
  };

  return (
    <div style={{ position: "relative" }}>
      <Modal
        open={teamViewModal && selectedTeam}
        onClose={() => {
          setSelectedTeam(null);
          setTeamViewModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TeamBoardOnlyView
            formation={selectedTeam?.formation}
            team={selectedTeam?.teamDetails}
            setTeamViewModal={setTeamViewModal}
          />
        </Box>
      </Modal>
      <Container maxWidth="xl">
        <Box mt="10px">
          <Typography variant="h6" py="1em">
            My Teams
          </Typography>
          {isArrayAndHasContent(savedTeams) ? (
            <Stack direction="column" gap={2}>
              {savedTeams?.map((item, i) => {
                return (
                  <Card key={i} sx={{ minHeight: "10vh" }} elevation={3}>
                    <Stack
                      p="1em"
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Typography>{item?.name || "N/A"}</Typography>
                      <Stack direction="row" gap={1}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => {
                            setSelectedTeam(item);
                            setTeamViewModal(true);
                          }}
                        >
                          Details
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleDeleteTeam(item?.id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                      {/* <TeamBoardOnlyView
                        formation={item?.formation}
                        team={item?.teamDetails}
                      /> */}
                    </Stack>
                  </Card>
                );
              })}
            </Stack>
          ) : (
            <>
              <NoDataPlaceholder serverError={false} />
            </>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default MyTeam;
