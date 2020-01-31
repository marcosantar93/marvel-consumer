import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchComic } from "../../actions";
import Spinner from "../Spinner";

const ComicShow = props => {
  const { id } = props.match.params;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const selectedComic = useSelector(state => state.comics[id]);
  const dispatch = useDispatch();

  const loadComic = useCallback(async () => {
    setError(null);
    try {
      await dispatch(fetchComic(id));
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, id]);

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

  return (
    <div>
      <h2>{selectedComic.title}</h2>
      <div className="description">
        <div
          className="Container"
          dangerouslySetInnerHTML={{ __html: selectedComic.description }}
        ></div>
      </div>
    </div>
  );
};

export default ComicShow;
