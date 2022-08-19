import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";

import ImgDom from "../../Components/ImgDom";
import AdsUnit from "../../Components/AdsUnit";
import Pagination from "../../Components/Pagination";
import PostContentSkeleton from "../../Components/Skeletons/PostContent";
import PostFeaturedSkeleton from "../../Components/Skeletons/PostFeatured";

import { buildUrl, lazyloadContentImages } from "../../utils/helpers";
import { CategoryLink, UserLink, TagLink } from "../../utils/link-generator";

import watchIntersection from "../../libs/intersection";

class Index extends Component {
  constructor(props) {
    super(props);

    this.imgRef = createRef();

    this.state = {
      isInView: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      watchIntersection(this.imgRef.current, () => {
        this.setState({ isInView: true });
      });

      // Lazy load user generated content's images
      lazyloadContentImages();
    }, 2000);
  }

  getPostUrl = () => {
    const { router } = this.props;
    const { query } = router;

    let postUrl = `/post/${query.postSlugId}/${query.postSlugTitle}`;

    return postUrl;
  };

  handlePagination = (e, page) => {
    e.preventDefault();

    const { handleFetch } = this.props;

    Promise.resolve()
      .then(() => handleFetch(page))
      .then(() => {
        let params = { page };
        let postUrl = this.getPostUrl();
        let url = buildUrl(postUrl, params);

        Router.push(url);
      })
      .then(() => setTimeout(() => window.scrollTo(0, 0), 500))
      .then(() => setTimeout(() => lazyloadContentImages(), 2000));
  };

  render() {
    const { post } = this.props;

    if (!post || Object.keys(post).length == 0) return <PostContentSkeleton />;

    const newProps = {
      totalCount: post.post_paginate_total,
      pageNumber: post.post_paginate_current,
      pageSize: 1,
      handlePagination: (e, page) => this.handlePagination(e, page),
      targetUrl: this.getPostUrl(),
    };

    const { isInView } = this.state;

    const ImgSkeleton = <PostFeaturedSkeleton />;
    const ImgDomElem = <ImgDom withLink="false" elem={post} />;

    const ImgElem = isInView ? ImgDomElem : ImgSkeleton;

    return (
      <article id="article">
        <header className="entry-header">
          <span className="meta-category">
            <CategoryLink elem={post}>{post.category?.name}</CategoryLink>
          </span>

          <h1 className="entry-title">{post.title}</h1>
          <div className="entry-date">{post.published_at}</div>
        </header>

        <div className="meta-image" ref={this.imgRef}>
          {ImgElem}
        </div>

        <AdsUnit />

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
              <h4>
                Halaman {post.post_paginate_current == 1 ? "Berikutnya" : ""}:
              </h4>

              <Pagination {...newProps} />
            </>
          )}
        </div>

        <div className="tags-area clearfix">
          <div className="post-tags">
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

export default withRouter(connect(mapStateToProps)(Index));
