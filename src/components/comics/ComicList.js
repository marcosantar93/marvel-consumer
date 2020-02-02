import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchComics } from "../../actions/marvel";
import Spinner from "../Spinner";
import { COMICS_PER_PAGE } from "../../constants";
import "./ComicList.css";

const ComicList = props => {
  const page = props.match.params.page ? Number(props.match.params.page) : 0;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const comics = useSelector(state =>
    Object.values(state.comics.comics).sort((a, b) =>
      a.title > b.title ? 1 : -1
    )
  );
  const lastPage = useSelector(
    state => (state.comics.total - 1) / COMICS_PER_PAGE
  );
  const dispatch = useDispatch();

  const loadComics = useCallback(async () => {
    setError(null);
    try {
      await dispatch(fetchComics(page));
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, page]);

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
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h2>Comics</h2>
      <div className="ui celled list">{renderList()}</div>
      <div className="button-container">
        <Link
          className={page === 0 ? "ui disabled button" : "ui animated button"}
          tabindex="0"
          to="/0"
        >
          <div className="visible content">First</div>
          {page !== 0 && (
            <div className="hidden content">
              <i className="left arrow icon"></i>
            </div>
          )}
        </Link>
        <Link
          className={page === 0 ? "ui disabled button" : "ui animated button"}
          tabindex="0"
          to={`/${page === 0 ? 0 : page - 1}`}
        >
          <div className="visible content">Previous</div>
          {page !== 0 && (
            <div className="hidden content">
              <i className="left arrow icon"></i>
            </div>
          )}
        </Link>
        <Link
          className={
            page === lastPage ? "ui disabled button" : "ui animated button"
          }
          tabindex="0"
          to={`/${page === lastPage ? lastPage : page + 1}`}
        >
          <div className="visible content">Next</div>
          {page !== lastPage && (
            <div className="hidden content">
              <i className="right arrow icon"></i>
            </div>
          )}
        </Link>
        <Link
          className={
            page === lastPage ? "ui disabled button" : "ui animated button"
          }
          tabindex="0"
          to={`/${lastPage}`}
        >
          <div className="visible content">Last</div>
          {page !== lastPage && (
            <div className="hidden content">
              <i className="right arrow icon"></i>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default ComicList;
