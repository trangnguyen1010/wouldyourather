import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import AnswerQuestion from "./AnswerQuestion";
import ViewAnswer from "./ViewAnswer";

const PollQuestion = (props) => {
  const { authedUser, selectedQuestionId, users } = props;

  if (!authedUser) {
    return <Redirect to={"/"} />;
  }
  const listQuestions = Object.keys(users[authedUser].answers);

  return (
    <div className="ui center aligned header" style={{ margin: "20px 0" }}>
      {listQuestions.includes(selectedQuestionId) ? (
        <ViewAnswer question={selectedQuestionId} />
      ) : (
        <AnswerQuestion question={selectedQuestionId} />
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users,
    authedUser: state.authedUser,
    selectedQuestionId: ownProps.match.params.id,
  };
};

export default connect(mapStateToProps)(PollQuestion);
