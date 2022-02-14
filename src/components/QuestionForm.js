import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const QuestionForm = (props) => {
  const { users, question } = props;

  const optionOne = question.optionOne.text;
  const optionTwo = question.optionTwo.text;

  const author = question.author;

  return (
    <div className="ui center aligned header " style={{ margin: "20px 0" }}>
      <div className="ui card fluid ">
        <div className="image change-image brown">
          <img src={users[author].avatarURL} alt="" />
        </div>
        <div className="content">
          <div className="header">{users[author].name}</div>
          <h3 className="large header">Would you rather ...</h3>
          <div className="description">
            <span className="meta">-</span> {optionOne}
          </div>
          <div className="description">
            <h2>OR</h2>
          </div>
          <div className="description">
            <span className="meta">-</span> {optionTwo}
          </div>
        </div>
        <Link to={`/questions/${question.id}`} className="btn btn-primary">
          Answer
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users,
    authedUser: state.authedUser,
    question: state.questions[ownProps.questionId],
  };
};
export default connect(mapStateToProps)(QuestionForm);
