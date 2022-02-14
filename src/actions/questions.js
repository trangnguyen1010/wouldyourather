import api from "../api/api";
import history from "../history";

export const FETCH_QUESTIONS = "FETCH_QUESTIONS";
export const FETCH_QUESTION = "FETCH_QUESTION";
export const CREATE_QUESTION = "CREATE_QUESTION";
export const UPDATE_ANSWERED_QUESTION = "UPDATE_ANSWERED_QUESTION";

export const fetchQuestions = () => async (dispatch) => {
  const request = await api.get("/questions");
  console.log(request);

  dispatch({
    type: FETCH_QUESTIONS,
    payload: request,
  });
};

export const createQuestion = (question) => async (dispatch) => {
  const request = await api.post("/questions", question);

  dispatch({
    type: CREATE_QUESTION,
    payload: request,
  });
  history.push("/");
};

export const updateAnsweredQuestion =
  (questionId, questionDetail) => async (dispatch) => {
    const request = await api.patch(`/questions/${questionId}`, questionDetail);

    dispatch({
      type: UPDATE_ANSWERED_QUESTION,
      payload: request,
    });
  };
