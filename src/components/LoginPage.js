import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

const LoginPage = (props) => {
  const { users } = props;
  const ref = useRef();

  const [userLogin, setUserLogin] = useState("");
  const [open, setOpen] = useState(false);

  const handleLogin = (id) => {
    props.dispatch(setAuthedUser(id));
  };

  useEffect(() => {
    const onBodyClick = (e) => {
      if (ref.current.contains(e.target)) {
        return;
      }
      setOpen(false);
    };

    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);

  return (
    <div className="ui form segment" ref={ref}>
      <div className="field">
        <h3 className="header">Would you rather than</h3>
        <label className="form-label">Select User </label>
        <div
          className={`ui fluid selection dropdown ${
            open ? "visible active" : ""
          } `}
          onClick={() => setOpen(!open)}
        >
          <i className="dropdown icon"></i>
          <div className="text">{userLogin && users[userLogin].name}</div>
          <div className={`menu ${open ? " visible transition" : ""}`}>
            {Object.values(users).map((user) => (
              <div
                className="item"
                key={user.id}
                onClick={() => setUserLogin(user.id)}
              >
                {user.name}
              </div>
            ))}
          </div>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={() => handleLogin(userLogin)}
          style={{ width: "100%", marginTop: "10px" }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    authedUser: state.authedUser,
  };
};
export default connect(mapStateToProps)(LoginPage);
