import { connect, useDispatch } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchQuestions } from "../actions/questions";
import { fetchUsers } from "../actions/users";

const ViewAnswer = (props) => {
  const { users, questions, question } = props;
  const questionDetail = questions[question];
  const author = users[questionDetail.author];
  const { optionOne, optionTwo } = questionDetail;
  const optionOneVote = optionOne.votes.length;
  const optionTwoVote = optionTwo.votes.length;
  const totalVotes = optionOneVote + optionTwoVote;
  const percent1 = (optionOneVote / totalVotes) * 100;
  const percent2 = (optionTwoVote / totalVotes) * 100;

  console.log(optionOneVote);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuestions);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsers);
  }, [dispatch]);
  return (
    <div className="ui center aligned header" style={{ margin: "20px 0" }}>
      <div className="ui card fluid">
        <div className="image change-image">
          <img alt="" src={author.avatarURL} />
        </div>
        <div className="content">
          <div className="header">{author.name}</div>
          <h3>Would you rather ....</h3>
          <div>
            <div className="progressBar">
              <ProgressBar
                now={percent1}
                label={`${percent1}%`}
                variant="info"
              />
            </div>
            <div className="left floated ">{optionOne.text}</div>
            <div className="right floated text-progress muted">
              {optionOneVote} out of {totalVotes}
            </div>
          </div>

          <div>
            <div className="progressBar">
              <ProgressBar
                now={percent2}
                label={`${percent2}%`}
                variant="success"
              />
            </div>
            <div className="right floated text-progress muted">
              {optionTwoVote} out of {totalVotes}
            </div>
            <div className="left floated">{optionTwo.text}</div>
          </div>
        </div>
        <Link to={"/"} className="btn btn-primary">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    authedUser: state.authedUser,
    users: state.users,
    questions: state.questions,
  };
};

export default connect(mapStateToProps)(ViewAnswer);
