import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchQuestions } from "../actions/questions";
import { fetchUsers } from "../actions/users";
import QuestionForm from "./QuestionForm";

export const ANSWERED = "ANSWERED";
export const UNANSWERED = "UNANSWERED";

const HomePage = (props) => {
  const { authedUser, answeredList, unansweredList } = props;

  const [questionList, setQuestionList] = useState(UNANSWERED);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (authedUser === null) {
    return <Redirect to={"/login"} />;
  }

  return (
    <div className="ui segment">
      <div className="ui two column relaxed grid">
        <div className="column">
          <button
            className="ui button fluid positive"
            onClick={() => setQuestionList(UNANSWERED)}
          >
            Unanswered Questions
          </button>
        </div>
        <div className="column">
          <button
            className="ui button fluid orange"
            onClick={() => setQuestionList(ANSWERED)}
          >
            Answered Questions
          </button>
        </div>
      </div>
      {(questionList === UNANSWERED ? unansweredList : answeredList).map(
        (questionId) => (
          <div key={questionId}>
            <QuestionForm
              questionId={questionId}
              questionCheck={questionList}
            />
          </div>
        )
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  let answeredList, unansweredList;
  const { users, questions, authedUser } = state;

  const sort = (a, b) => {
    return (
      new Date(questions[b].timestamp).getTime() -
      new Date(questions[a].timestamp).getTime()
    );
  };

  if (authedUser) {
    answeredList = Object.keys(users[authedUser].answers).sort(sort);
    unansweredList = Object.keys(questions)
      .sort(sort)
      .filter((id) => !answeredList.includes(id));
  }

  return {
    users,
    authedUser,
    questions,
    answeredList,
    unansweredList,
  };
};
export default connect(mapStateToProps)(HomePage);
