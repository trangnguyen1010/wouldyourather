import api from "../api/api";
import history from "../history";

export const FETCH_AUTHED_USER = "FETCH_AUTHED_USER";

export const setAuthedUser = (id) => async (dispatch) => {
  await api.get("/users");

  dispatch({
    type: FETCH_AUTHED_USER,
    payload: id,
  });
  history.push("/");
};
