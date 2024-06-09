import React, { useState } from "react";
import TeamBoard from "../cards/TeamBoard";
import { useDispatch, useSelector } from "react-redux";
import { Button, Stack, TextField } from "@mui/material";
import { teamActions } from "../../store/reducers/teamsReducer";
import { generateUniqueId, isArrayAndHasContent } from "../../utils/utils";
import toast from "react-hot-toast";

const CreateTeamForm = ({
  formation,
  setTeamAddModal,
  team,
  handleFormationReset,
}) => {
  const dispatch = useDispatch();

  const [teamName, setTeamName] = useState(null);

  const savedTeams = useSelector((state) => state.teams.myTeams);

  const handleSaveTeam = () => {
    let teamReq = {
      id: generateUniqueId(),
      name: teamName,
      formation: formation,
      teamDetails: team,
    };

    let checkName = savedTeams.filter((t) => t.name === teamName);
    if (isArrayAndHasContent(checkName)) {
      toast.error("Same Name Already Exists");
    } else {
      dispatch(teamActions.addTeam(teamReq));
      toast.success("Great job ! Team added successfully!");
      handleFormationReset();
      setTeamAddModal(false);
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center" p={4} gap={4}>
      <TextField
        size="small"
        id="outlined-basic"
        label="Team Name"
        variant="outlined"
        placeholder="Enter Team Name"
        fullWidth
        onChange={(e) => setTeamName(e.target.value)}
        value={teamName === null ? "" : teamName}
        sx={{
          minWidth: "140px",
        }}
      />

      <Button
        disabled={!teamName}
        variant="contained"
        fullWidth
        onClick={() => handleSaveTeam()}
      >
        Save
      </Button>
    </Stack>
  );
};

export default CreateTeamForm;
