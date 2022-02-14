import {
  ADD_QUESTION_TO_USER,
  FETCH_USERS,
  UPDATE_QUESTION_USER,
} from "../actions/users";
import _ from "lodash";

export default function users(state = {}, action) {
  switch (action.type) {
    case FETCH_USERS:
      return _.mapKeys(action.payload.data, "id");
    case UPDATE_QUESTION_USER:
      const authedUser = action.userId;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [action.question]: action.option,
          },
        },
      };
    case ADD_QUESTION_TO_USER:
      const userId = action.userId;
      return {
        ...state,
        [userId]: {
          ...state[userId],
          questions: state[userId].questions.concat(action.questionId),
        },
      };
    default:
      return state;
  }
}
