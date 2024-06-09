import { combineReducers } from "@reduxjs/toolkit";
import assetsReducer from "./assetsReducer";
import teamsReducer from "./teamsReducer";

const rootReducer = combineReducers({
  asset: assetsReducer,
  teams: teamsReducer,
});

export default rootReducer;
