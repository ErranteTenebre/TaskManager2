import { combineReducers } from "redux";
import workspaceReducer from "./workspaceReducer";

const rootReducer = combineReducers({
  workspace: workspaceReducer,
  // Другие редукторы, если есть
});

export default rootReducer;
