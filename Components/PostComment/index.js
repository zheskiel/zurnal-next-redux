import React, { Component } from "react";
import PropTypes from "prop-types";

class PostComment extends Component {
  render() {
    const { postSlugId, postSlugTitle } = this.props;

    return (
      <div className="comment-wrapper">
        <div id="fb-root"></div>
        <div
          id="comments"
          className="fb-comments"
          data-href={`https://www.zurnal.co/post/${postSlugId}/${postSlugTitle}`}
          data-colorscheme="light"
          data-width="100%"
          data-numposts="5"
        ></div>
      </div>
    );
  }
}

PostComment.propTypes = {
  postSlugId: PropTypes.string.isRequired,
  postSlugTitle: PropTypes.string.isRequired,
};

export default PostComment;
