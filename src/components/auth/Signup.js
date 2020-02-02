import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { signup } from "../../actions/auth";
import Spinner from "../Spinner";
import "./Form.css"

export const Signup = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const authHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(signup(email, password));
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div>
        <div>Something went wrong: {error}</div>
        <div className="menu" onClick={authHandler}>
          Try again
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={authHandler}>
      <h2>Sign up</h2>
      <div className="ui input">
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          autoComplete="email"
        />
      </div>
      <div className="ui input">
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />
      </div>
      <button type="submit" value="Submit" className="ui button primary">
        Submit
      </button>
    </form>
  );
};

export default Signup;
