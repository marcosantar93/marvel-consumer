import marvel from "../apis/marvel";
import { MARVEL_API_KEY } from "../env.js"

export const fetchComics = () => async dispatch => {
  let response;
  try {
    response = await marvel.get(`/v1/public/comics?orderBy=title&limit=50&offset=50&apikey=${MARVEL_API_KEY}`);
    console.log(response.data);
    dispatch({
      type: "FETCH_COMICS",
      payload: response.data.data.results
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "ERROR_COMICS"
    })
  }
};