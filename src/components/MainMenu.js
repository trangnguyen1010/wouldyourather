import { useState } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { MenuItem, Menu } from "@material-ui/core";
import { setAuthedUser } from "../actions/authedUser";
import { Nav } from "react-bootstrap";

const MainMenu = (props) => {
  const { authedUser, users } = props;
  const authedUserDetail = users[authedUser];
  const [open, setOpen] = useState(null);

  const handleClick = (e) => {
    setOpen(e.currentTarget);
  };

  const handleLogout = () => {
    props.dispatch(setAuthedUser(null));
  };

  return (
    <div className="ui container ">
      <div className="d-flex justify-content-between">
        <div className="header">
          <h3>Would You Rather ?</h3>
        </div>
        <div
          className="image change-image d-flex bd-highlight"
          onClick={handleClick}
        >
          <img
            alt=""
            src={authedUserDetail.avatarURL}
            style={{ width: "40%" }}
          />
          <p className="p-2">{authedUserDetail.name}</p>
        </div>
        <Menu
          keepMounted
          anchorEl={open}
          onClose={() => setOpen(null)}
          open={Boolean(open)}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
      <div className="navbar navbar-dark bg-light ui three item menu">
        <NavLink exact to={"/"} activeClassName="active" className="item">
          Home
        </NavLink>
        <NavLink to={"/leaderboard"} className="item" activeClassName="active">
          LeaderBoard
        </NavLink>
        <NavLink to="/questions/add" className="item" activeClassName="active">
          Create new Question
        </NavLink>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authedUser: state.authedUser,
    users: state.users,
  };
};
export default connect(mapStateToProps)(MainMenu);
