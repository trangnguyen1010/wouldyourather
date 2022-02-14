import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  users,
  authedUser,
  questions,
  form: formReducer,
});
