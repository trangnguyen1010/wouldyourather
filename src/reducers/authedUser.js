import { FETCH_AUTHED_USER } from "../actions/authedUser";

const authedUser = (state = null, action) => {
  switch (action.type) {
    case FETCH_AUTHED_USER:
      return action.payload;
    default:
      return state;
  }
};
export default authedUser;
