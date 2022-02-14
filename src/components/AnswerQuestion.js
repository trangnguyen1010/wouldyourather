import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateAnsweredQuestion } from "../actions/questions";

import { updateAnswerForUser } from "../actions/users";

const AnswerQuestion = (props) => {
  const { users, questions, question, authedUser } = props;
  const author = users[questions[question].author];
  const { optionOne, optionTwo } = questions[question];
  const [option, setOption] = useState("none");
  const [error, setError] = useState(false);

  const values = {
    answers: {
      ...users[authedUser].answers,
      [question]: option,
    },
  };

  const questionDetail = {
    optionOne: {
      ...optionOne,
      votes:
        option === "optionOne"
          ? optionOne.votes.concat(authedUser)
          : [...optionOne.votes],
    },
    optionTwo: {
      ...optionTwo,
      votes:
        option === "optionTwo"
          ? optionTwo.votes.concat(authedUser)
          : [...optionTwo.votes],
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    option === "none"
      ? setError(true)
      : props
          .dispatch(updateAnswerForUser(authedUser, values, question, option))
          .then(
            props.dispatch(updateAnsweredQuestion(question, questionDetail))
          );
  };
  return (
    <div className="ui center aligned header" style={{ margin: "20px 0" }}>
      <div className="ui card fluid">
        <div className="image change-image brown">
          <img src={author.avatarURL} alt="" />
        </div>
        <div className="content ">
          <div className="header">{author.name}</div>
          <h3>Would you rather than...</h3>
          <p className="text-muted ui form">Choose an option</p>
          {error && (
            <div className="text-alert fs-6">Please choose one option</div>
          )}
          <div className="grouped fields ">
            <div className="field" onChange={(e) => setOption(e.target.value)}>
              <div>
                <input type={"radio"} value="optionOne" name="choice" />{" "}
                <label>{optionOne.text}</label>
              </div>
              <div>
                <input type={"radio"} value="optionTwo" name="choice" />{" "}
                <label>{optionTwo.text}</label>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Answer
        </button>
        <Link to={"/"} className="btn btn-danger" style={{ marginTop: "10px" }}>
          Cancel
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authedUser: state.authedUser,
    users: state.users,
    questions: state.questions,
  };
};
export default connect(mapStateToProps)(AnswerQuestion);
