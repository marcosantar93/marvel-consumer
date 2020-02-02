import marvel from "../apis/marvel";
import { FETCH_COMICS, FETCH_COMIC } from "./types";
import { COMICS_PER_PAGE } from "../constants";

export const fetchComics = page => async dispatch => {
  try {
    const response = await marvel.get(
      `/v1/public/comics?orderBy=title&limit=${COMICS_PER_PAGE}&offset=${
        page ? page * COMICS_PER_PAGE : 0
      }&apikey=e62e7f128f07473b0ce06260e8680e85`
    );
    console.log(response.data.data);
    dispatch({
      type: FETCH_COMICS,
      payload: {
        total: response.data.data.total,
        comics: response.data.data.results
      }
    });
  } catch (err) {
    throw new Error("Comics could not be fetched");
  }
};

export const fetchComic = id => async dispatch => {
  try {
    const response = await marvel.get(
      `/v1/public/comics/${id}?apikey=e62e7f128f07473b0ce06260e8680e85`
    );
    dispatch({
      type: FETCH_COMIC,
      payload: response.data.data.results[0]
    });
  } catch (err) {
    throw new Error(`Comic with id ${id} could not be fetched`);
  }
};
