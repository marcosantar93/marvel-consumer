import { AUTHENTICATE, LOGOUT } from "../actions/types";

const initState = {
  userId: null,
  token: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        userId: action.payload.userId,
        token: action.payload.token
      };
    case LOGOUT:
      return initState;
    default:
      return state;
  }
};
