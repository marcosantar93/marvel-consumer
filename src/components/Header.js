import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/auth";

const Header = props => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => !!state.auth.userId);
  const logoutHandler = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <div className={props.className}>
      <div className="left menu">
        <Link to="/">
          <button className="ui button">All Comics</button>
        </Link>
        {isLoggedIn && (
          <Link to="/favorite">
            <button className="ui primary button">Favorites</button>
          </Link>
        )}
      </div>

      <div className="right menu">
        {isLoggedIn ? (
          <Link onClick={logoutHandler}>
            <button className="ui button">Logout</button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <button className="ui button">Login</button>
            </Link>
            <Link to="/signup">
              <button className="ui primary button">Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
