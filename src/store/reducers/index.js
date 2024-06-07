import { combineReducers } from "@reduxjs/toolkit";
import assetsReducer from "./assetsReducer";

const rootReducer = combineReducers({
  asset: assetsReducer,
});

export default rootReducer;
