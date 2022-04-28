import React, { Component } from "react";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";

import { FetchPosts } from "../../redux/actions";

import Pagination from "../../Components/Pagination";
import PostsListItem from "../../Components/PostListItem";
import PostListSkeleton from "../../Components/Skeletons/PostList";

import { HOME_URL } from "../../utils/route-constants";
import { buildUrl } from "../../utils/helpers";

class PostsList extends Component {
  handlePagination = (page) => {
    const { handleFetch, router } = this.props;
    const { query } = router;

    const { category = null, username = null, tag = null } = query;

    let targetUrl;

    if (category != null) {
      targetUrl = `/category/${category}`;
    } else if (username != null) {
      targetUrl = `/user/${username}`;
    } else if (tag != null) {
      targetUrl = `/tag/${tag}`;
    } else {
      targetUrl = HOME_URL;
    }

    new Promise((resolve) => resolve())
      .then(() => handleFetch(page))
      .then(() => {
        let params = { page };

        const url = buildUrl(targetUrl, params);

        Router.push(url);
      });
  };

  render() {
    const { items, posts, isLoading } = this.props;

    if (!posts) return <PostListSkeleton />;
    if (isLoading) return <PostListSkeleton />;

    const newProps = {
      totalCount: items.total,
      pageNumber: items.current_page,
      pageSize: items.per_page,
      handlePagination: this.handlePagination,
    };

    return (
      <div className="main-box main-content col-12">
        <div className="main-box-inside">
          {posts &&
            posts.map((post, index) => (
              <PostsListItem key={index} elem={post} />
            ))}
        </div>

        <div className="pagination-wrapper d-flex justify-content-center">
          <Pagination {...newProps} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    FetchPosts: (params) => {
      dispatch(FetchPosts(params));
    },
  };
};

export default withRouter(connect(null, mapDispatchToProps)(PostsList));
