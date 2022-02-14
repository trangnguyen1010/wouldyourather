import { CREATE_QUESTION, FETCH_QUESTIONS } from "../actions/questions";
import _ from "lodash";

export default function questions(state = {}, action) {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return _.mapKeys(action.payload.data, "id");

    case CREATE_QUESTION:
      return {
        ...state,
        [action.payload.data.id]: action.payload.data,
      };

    default:
      return state;
  }
}
