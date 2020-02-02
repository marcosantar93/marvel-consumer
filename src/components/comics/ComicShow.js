import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchComic } from "../../actions/marvel";
import {
  createFavorite,
  fetchFavorite,
  deleteFavorite
} from "../../actions/favorite";
import Spinner from "../Spinner";
import "./ComicShow.css";

const ComicShow = props => {
  const { id } = props.match.params;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const selectedComic = useSelector(state => state.comics.comics[id]);
  const isFavorite = useSelector(state => !!state.comics.favorites[id]);
  const isLoggedIn = useSelector(state => !!state.auth.userId);
  const dispatch = useDispatch();

  const addToFavoritesHandler = useCallback(async () => {
    setError(null);
    try {
      await dispatch(createFavorite(selectedComic));
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, selectedComic]);

  const removeFromFavoritesHandler = useCallback(async () => {
    setError(null);
    try {
      await dispatch(deleteFavorite(id));
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, id]);

  const loadComic = useCallback(async () => {
    setError(null);
    try {
      await dispatch(fetchComic(id));
      if (isLoggedIn) await dispatch(fetchFavorite(id));
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, id, isLoggedIn]);

  useEffect(() => {
    setIsLoading(true);
    loadComic().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadComic]);

  if (isLoading || !selectedComic) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div>
        <div>Something went wrong: {error}</div>
        <div className="menu" onClick={loadComic}>
          Try again
        </div>
      </div>
    );
  }
  console.log(selectedComic);
  return (
    <div>
      <div className="title-container">
        <h2>{selectedComic.title}</h2>

        {isLoggedIn &&
          (isFavorite ? (
            <button
              onClick={removeFromFavoritesHandler}
              className="ui primary button"
            >
              Remove favorite
            </button>
          ) : (
            <button
              onClick={addToFavoritesHandler}
              className="ui primary button"
            >
              Add favorite
            </button>
          ))}
      </div>
      <img
        src={`${selectedComic.thumbnail.path}.${selectedComic.thumbnail.extension}`}
        alt="Comic thumbnail"
        height={300}
      ></img>
      <div className="description">
        <h3>Description</h3>
        <div
          className="Container"
          dangerouslySetInnerHTML={{ __html: selectedComic.description }}
        ></div>
      </div>
      <div className="description">
        <h3>ISBN</h3>
        <div>{selectedComic.isbn}</div>
      </div>
      <div className="description">
        <h3>Creators</h3>
        {selectedComic.creators.items.map(creator => (
          <div>
            {creator.name} - {creator.role}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicShow;
