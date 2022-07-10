import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class PostComment extends Component {
  render() {
    const { theme, postSlugId, postSlugTitle } = this.props;

    return (
      <div className="comment-wrapper">
        <div id="fb-root"></div>
        <div
          id="comments"
          className="fb-comments"
          data-href={`https://www.zurnal.co/post/${postSlugId}/${postSlugTitle}`}
          data-colorscheme={theme}
          data-width="100%"
          data-numposts="5"
          data-lazy="true"
        ></div>
      </div>
    );
  }
}

PostComment.propTypes = {
  postSlugId: PropTypes.string.isRequired,
  postSlugTitle: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(PostComment);
