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
  getTargetUrl = () => {
    const { router } = this.props;
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

    return targetUrl;
  };

  handlePagination = (e, page) => {
    e.preventDefault();

    let targetUrl = this.getTargetUrl();

    Promise.resolve()
      .then(() => {
        let params = { page },
          url = buildUrl(targetUrl, params);

        Router.push(url);
      })
      .then(() => setTimeout(() => window.scrollTo(0, 0), 500));
  };

  render() {
    const { items, posts, isLoading } = this.props;

    if (!posts) return <PostListSkeleton />;
    if (isLoading) return <PostListSkeleton />;

    const newProps = {
      totalCount: items.total,
      pageNumber: items.current_page,
      pageSize: items.per_page,
      handlePagination: (e, page) => this.handlePagination(e, page),
      targetUrl: this.getTargetUrl(),
    };

    return (
      <div className="main-box main-content col-12">
        <div className="main-box-inside">
          {posts &&
            posts.map((post, index) => (
              <PostsListItem key={index} elem={post} />
            ))}
        </div>

        {items && items.last_page > 1 && (
          <div className="pagination-wrapper d-flex justify-content-center">
            <Pagination {...newProps} />
          </div>
        )}
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
