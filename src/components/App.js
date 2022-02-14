import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchUsers } from "../actions/users";
import { Router, Route, Switch } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import history from "../history";
import PollQuestion from "./PollQuestion";
import MainMenu from "./MainMenu";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  if (!props.users) {
    return <div>Loading...</div>;
  }
  return (
    <div className="ui container">
      <Router history={history}>
        {props.authedUser && <MainMenu />}
        <Switch>
          <Route path={"/"} exact component={HomePage} />
          <Route path={"/login"} component={LoginPage} />
          <Route path={"/questions/add"} component={NewQuestion} />
          <Route path={"/questions/:id"} component={PollQuestion} />
          <Route path={"/leaderboard"} component={LeaderBoard} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    authedUser: state.authedUser,
  };
};
export default connect(mapStateToProps)(App);
