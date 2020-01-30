import React from "react";
import { connect } from "react-redux";
import { fetchComics } from "../actions";

class ComicList extends React.Component {
  componentDidMount() {
    this.props.fetchComics();
  }

  renderList() {
    return this.props.comics.map(comic => {
      return (
        <div key={comic.id}>
          <div>
            <div>
              <h2>{comic.title}</h2>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderList()}</div>;
  }
}

const mapStateToProps = state => {
  return { comics: state.comics };
};

export default connect(mapStateToProps, { fetchComics })(ComicList);
