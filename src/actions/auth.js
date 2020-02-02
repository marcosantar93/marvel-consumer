import google from "../apis/google";
import { AUTHENTICATE, LOGOUT } from "./types";
import history from "../history";

export const authenticate = (userId, token) => {
  return dispatch => {
    dispatch({ type: AUTHENTICATE, payload: { userId: userId, token: token } });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    try {
      const response = await google.post(
        "/v1/accounts:signUp?key=AIzaSyAM5jcqUkBUo5xC3iVI24sKBnJVlIpdf3Q",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      );
      localStorage.setItem('userId', response.data.localId);
      localStorage.setItem('token', response.data.idToken);
      dispatch(authenticate(response.data.localId, response.data.idToken));
      history.push("/");
    } catch (err) {
      const errorId = err.response.data.error.message;
      let message = "User could not be created";
      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists already";
      }
      throw new Error(message);
    }
  };
};

export const login = (email, password) => {
  return async dispatch => {
    try {
      const response = await google.post(
        "/v1/accounts:signInWithPassword?key=AIzaSyAM5jcqUkBUo5xC3iVI24sKBnJVlIpdf3Q",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      );
      localStorage.setItem('userId', response.data.localId);
      localStorage.setItem('token', response.data.idToken);
      dispatch(authenticate(response.data.localId, response.data.idToken));
      history.push("/");
    } catch (err) {
      console.log(err);
      const errorId = err.response.data.error.message;
      let message = "Login was unsuccessful";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid";
      }
      throw new Error(message);
    }
  };
};

export const logout = () => {
  history.push("/");
  localStorage.clear();
  return { type: LOGOUT };
};
