import marvel from "../apis/marvel";
import { MARVEL_API_KEY } from "../env.js";
import { FETCH_COMICS, FETCH_COMIC } from "./types";

export const fetchComics = () => async dispatch => {
  const response = await marvel.get(
    `/v1/public/comics?orderBy=title&limit=50&offset=50&apikey=${MARVEL_API_KEY}`
  );

  if (!response.status === 200) {
    throw new Error("Comics could not be fetched");
  }

  dispatch({
    type: FETCH_COMICS,
    payload: response.data.data.results
  });
};

export const fetchComic = id => async dispatch => {
  const response = await marvel.get(
    `/v1/public/comics/${id}?apikey=${MARVEL_API_KEY}`
  );
  console.log(response);
  if (!response.status === 200) {
    throw new Error(`Comic with id ${id} could not be fetched`);
  }

  console.log(response.data);
  dispatch({
    type: FETCH_COMIC,
    payload: response.data.data.results[0]
  });
};
