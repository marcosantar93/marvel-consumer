import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchFavorites } from "../../actions/favorite";
import Spinner from "../Spinner";
import "./ComicFavorites.css"

const ComicFavorites = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const comics = useSelector(state =>
    Object.values(state.comics.favorites).sort((a, b) =>
      a.title > b.title ? 1 : -1
    )
  );
  const dispatch = useDispatch();

  const loadComics = useCallback(async () => {
    setError(null);
    try {
      await dispatch(fetchFavorites());
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    loadComics().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadComics]);

  if (isLoading || !comics) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div>
        <div>Something went wrong: {error}</div>
        <div className="menu" onClick={loadComics}>
          Try again
        </div>
      </div>
    );
  }

  const renderList = () => {
    return comics.map(comic => (
      <div className="item" key={comic.id}>
        <div className="content">
          <Link to={`/comics/${comic.id}`} className="header">
            {comic.title}
          </Link>
          <div className="description">
            {" "}
            <div
              className="Container"
              dangerouslySetInnerHTML={{ __html: comic.description }}
            ></div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h2>Favorites</h2>
      <div className="ui celled list favorites">{renderList()}</div>
    </div>
  );
};

export default ComicFavorites;
