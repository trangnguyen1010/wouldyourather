import { Table } from "react-bootstrap";
import { connect } from "react-redux";

const LeaderBoard = (props) => {
  const { users, questions } = props;
  return (
    <div className="ui segment center">
      <h3 className="header">Leaderboard</h3>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SCORE</th>
            <th>USER</th>
            <th>ANSWERED QUESTIONS</th>
            <th>CREATED QUESTIONS</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(users).map((user) => (
            <tr key={user.id}>
              <td>
                {Object.keys(user.answers).length + user.questions.length}
              </td>
              <td>
                <div className="image change-image ui form">
                  <img alt="" src={user.avatarURL} />
                </div>{" "}
                {user.name}
              </td>
              <td>{Object.keys(user.answers).length}</td>
              <td>{user.questions.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    users: state.users,
    questions: state.questions,
  };
};
export default connect(mapStateToProps)(LeaderBoard);
