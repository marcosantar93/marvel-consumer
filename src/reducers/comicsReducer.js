import _ from "lodash";

import { FETCH_COMICS, FETCH_COMIC } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_COMICS:
      return { ...state, ..._.mapKeys(action.payload, "id")};
    case FETCH_COMIC: 
      return { ...state, [action.payload.id]: action.payload} ;
    default:
      return state;
  }
};
