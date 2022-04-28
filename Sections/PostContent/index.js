import React, { Component } from "react";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";

import Pagination from "../../Components/Pagination";
import PostContentSkeleton from "../../Components/Skeletons/PostContent";

import { buildUrl } from "../../utils/helpers";
import { CategoryLink, UserLink, TagLink } from "../../utils/link-generator";

class Index extends Component {
  handlePagination = (page) => {
    const { handleFetch, router } = this.props;
    const { query } = router;

    new Promise((resolve) => resolve())
      .then(() => handleFetch(page))
      .then(() => {
        let params = { page };
        let postUrl = `/post/${query.postSlugId}/${query.postSlugTitle}`;
        let url = buildUrl(postUrl, params);

        Router.push(url);
      });
  };

  render() {
    const { post } = this.props;

    if (!post || Object.keys(post).length == 0) return <PostContentSkeleton />;

    const newProps = {
      totalCount: post.post_paginate_total,
      pageNumber: post.post_paginate_current,
      pageSize: 1,
      handlePagination: this.handlePagination,
    };

    return (
      <article>
        <header className="entry-header">
          <span className="meta-category">
            <CategoryLink elem={post}>{post.category?.name}</CategoryLink>
          </span>

          <h1 className="entry-title">{post.title}</h1>
          <div className="entry-date">{post.published_at}</div>
        </header>

        <div className="meta-image">
          <img
            src={post.featured_image}
            className="img-fluid"
            alt={post.title}
          />
        </div>

        <div className="pagination-area">
          {post.post_paginate_total > 1 && (
            <div>
              Page {post.post_paginate_current} of {post.post_paginate_total}
            </div>
          )}
        </div>

        <div
          className="entry-content"
          dangerouslySetInnerHTML={{
            __html: post.content.replace(/(<? *script)/gi, "illegalscript"),
          }}
        ></div>

        <div className="pagination-area">
          {post.post_paginate_total > 1 && (
            <>
              <h4>Halaman Berikutnya :</h4>

              <Pagination {...newProps} />
            </>
          )}
        </div>

        <div className="tags-area clearfix">
          <div className="post-tags">
            <span>Tagar:</span>
            {post.tags.map((tag, index) => {
              return <TagLink key={index} elem={tag}>{`#${tag.name}`}</TagLink>;
            })}
          </div>
        </div>

        <div className="author-area">
          Published by{" "}
          <UserLink elem={post.user}>{post.user.display_name}</UserLink>
        </div>
      </article>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clientData: state.post,
  };
};

export default withRouter(connect(mapStateToProps, null)(Index));
