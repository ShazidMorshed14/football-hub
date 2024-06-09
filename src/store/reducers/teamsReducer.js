import { createSlice } from "@reduxjs/toolkit";

const initState = {
  myTeams: [],
};

const teamsSlice = createSlice({
  name: "myTeams",
  initialState: initState,
  reducers: {
    addTeam: (state, action) => {
      let newTeamList = [...state.myTeams, action.payload];
      state.myTeams = newTeamList;
    },
    updateTeam: (state, action) => {
      let updatedTeam = state.myTeams.filter((t) => t.id != action.payload);
      state.myTeams = updatedTeam;
    },
  },
});

export const teamActions = teamsSlice.actions;
export default teamsSlice.reducer;
