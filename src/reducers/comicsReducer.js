import _ from "lodash";

import {
  FETCH_COMICS,
  FETCH_COMIC,
  CREATE_FAVORITE,
  FETCH_FAVORITE,
  FETCH_FAVORITES,
  DELETE_FAVORITE,
  LOGOUT
} from "../actions/types";

const initState = {
  comics: {},
  favorites: {},
  total: 0
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_COMICS:
      return {
        ...state,
        comics: { ..._.mapKeys(action.payload.comics, "id") },
        total: action.payload.total
      };
    case FETCH_COMIC:
      return {
        ...state,
        comics: { ...state.comics, [action.payload.id]: action.payload }
      };
    case CREATE_FAVORITE: {
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [action.payload.id]: action.payload
        }
      };
    }
    case FETCH_FAVORITE:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [action.payload.id]: action.payload
        }
      };
    case FETCH_FAVORITES:
      return {
        ...state,
        favorites: {
          ...action.payload
        }
      };
    case DELETE_FAVORITE:
      return {
        ...state,
        favorites: {
          ..._.omit(state.favorites, action.payload)
        }
      };
    case LOGOUT:{
      return{
        ...state,
        favorites: {}
      }
    }
    default:
      return state;
  }
};
