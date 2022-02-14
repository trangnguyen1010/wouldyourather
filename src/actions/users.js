import api from "../api/api";
import history from "../history";
export const FETCH_USERS = "FETCH_USERS";
export const UPDATE_QUESTION_USER = "UPDATE_QUESTION_USER";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";

export const fetchUsers = () => async (dispatch) => {
  const request = await api.get(`/users`);

  dispatch({
    type: FETCH_USERS,
    payload: request,
  });
};

export const updateAnswerForUser =
  (userId, values, question, option) => async (dispatch) => {
    await api.patch(`/users/${userId}`, values);

    dispatch({
      type: UPDATE_QUESTION_USER,
      question,
      option,
      userId,
    });
    history.push("/");
  };

export const addNewQuestionToUser =
  (userId, questionDetail, questionId) => async (dispatch) => {
    await api.patch(`/users/${userId}`, questionDetail);

    dispatch({
      type: ADD_QUESTION_TO_USER,
      questionId,
      userId,
    });

    history.push("/");
  };
