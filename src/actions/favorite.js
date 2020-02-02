import firebase from "../apis/firebase";
import {
  DELETE_FAVORITE,
  CREATE_FAVORITE,
  FETCH_FAVORITES,
  FETCH_FAVORITE
} from "./types";

export const deleteFavorite = comicId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await firebase.delete(
        `/favorites/${userId}/${comicId}.json?auth=${token}`
      );

      console.log(response);

      dispatch({
        type: DELETE_FAVORITE,
        payload: comicId
      });
    } catch (err) {
      throw new Error("Favorite could not be deleted");
    }
  };
};

export const createFavorite = comic => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await firebase.put(
        `/favorites/${userId}/${comic.id}.json?auth=${token}`,
        {
          ...comic
        }
      );

      dispatch({
        type: CREATE_FAVORITE,
        payload: response.data
      });
    } catch (err) {
      throw new Error("Favorite could not be created");
    }
  };
};

export const fetchFavorites = page => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await firebase.get(
        `/favorites/${userId}.json?auth=${token}`
      );

      console.log(response);

      dispatch({
        type: FETCH_FAVORITES,
        payload: response.data
      });
    } catch (err) {
      // send to custom analytic server
      throw err;
    }
  };
};

export const fetchFavorite = comicId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await firebase.get(
        `/favorites/${userId}/${comicId}.json?auth=${token}`
      );

      console.log(response);

      if (response.data) {
        dispatch({
          type: FETCH_FAVORITE,
          payload: response.data
        });
      }
    } catch (err) {
      // send to custom analytic server
      throw err;
    }
  };
};
