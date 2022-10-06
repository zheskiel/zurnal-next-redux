import React, { Component } from "react";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";

import PostContent from "../../../../Sections/PostContent";

import {
  FetchPostRelated,
  ResetPostRelated,
  FetchPost,
  ResetPost,
} from "../../../../redux/actions";

import { getPost } from "../../../../apis";

import {
  buildUrl,
  loadScript,
  processSSR,
  processShouldTrack,
  retryOperation,
  LoadTwitterEmbed,
  lazyloadContentImages,
} from "../../../../utils/helpers";
import { PostLink } from "../../../../utils/link-generator";

import AdsUnit from "../../../../Components/AdsUnit";
import PostShare from "../../../../Components/PostShare";
import PostComment from "../../../../Components/PostComment";
import PostMetaHeader from "../../../../Components/MetaHeader/post";

const scripts = [
  "https://connect.facebook.net/en_US/sdk.js#xfbml=1&appId=396954390897339&version=v2.0",
  "https://platform.twitter.com/widgets.js",
];

class Index extends Component {
  componentDidMount() {
    const { isRobot } = this.props;

    if (isRobot) return;

    Promise.resolve()
      .then(() => this.setState({ mounted: true }))
      .then(() => {
        const { router } = this.props;
        const { query } = router;
        const { page } = query;

        this.handleFetch(page);
        this.handleFetchRelated();
      })
      .then(() => this.loadUtility());
  }

  componentWillUnmount() {
    Promise.resolve().then(() => this.props.ResetPost());
  }

  loadUtility = () => {
    Promise.resolve()
      .then(() => scripts.map((script) => loadScript(false, script)))
      .then(() => this.refreshAddthis())
      .then(() => window.FB?.XFBML.parse())
      .then(() => retryOperation(LoadTwitterEmbed, 3000, 3));
  };

  refreshAddthis = () => {
    if (
      window.addthis !== undefined &&
      window.addthis.layers.refresh !== undefined
    ) {
      Promise.resolve().then(() => {
        window.addthis.init();
        window.addthis.layers.refresh();
      });
    }
  };

  getPostUrl = (elem) => {
    return `/post/${elem.post_slug_id}/${elem.post_slug_title}`;
  };

  handleFetch = (page = 1) => {
    const { router, FetchPost } = this.props;
    const { query } = router;

    let params = { ...query, page };

    Promise.resolve().then(() => FetchPost(params));
  };

  handleFetchRelated = () => {
    const { router, FetchPostRelated } = this.props;
    const { query } = router;

    Promise.resolve().then(() => FetchPostRelated(query));
  };

  handleRelated = (e, elem) => {
    e.preventDefault();

    const { FetchPost, FetchPostRelated } = this.props;

    let params = {
      postSlugId: elem.post_slug_id,
      postSlugTitle: elem.post_slug_title,
    };

    Promise.resolve()
      .then(() => FetchPost(params))
      .then(() => FetchPostRelated(params))
      .then(() => {
        let postUrl = this.getPostUrl(elem);
        let url = buildUrl(postUrl);

        Router.push(url);
      })
      .then(() => setTimeout(() => this.loadUtility(), 2000))
      .then(() => setTimeout(() => window.scrollTo(0, 0), 500))
      .then(() => setTimeout(() => lazyloadContentImages(), 2000));
  };

  render() {
    const { query, isRobot, clientData, ssrData, relatedPosts } = this.props;

    let dataSource = isRobot ? ssrData : clientData;
    let dataPost = dataSource.items;

    if (!dataPost) {
      document.location.href = "/";

      return;
    }

    return (
      <>
        <PostMetaHeader elem={dataPost} />

        <div className="main-box main-content post-content col-12">
          <PostContent post={dataPost} handleFetch={this.handleFetch} />

          <AdsUnit />

          <div className="related-post-section">
            <h2>Related Posts</h2>

            <div className="related-post-wrapper">
              {relatedPosts.length > 0 &&
                relatedPosts.map((item) => {
                  const Child = (
                    <a onClick={(e) => this.handleRelated(e, item)}>
                      <img src={item.featured_image} />
                      <p>{item.title}</p>
                    </a>
                  );

                  return (
                    <div className="related-post-item">
                      <PostLink elem={item}>{Child}</PostLink>
                    </div>
                  );
                })}
            </div>
          </div>

          <PostShare />
          <PostComment {...query} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clientData: state.post,
    relatedPosts: state.related.items,
  };
};

const mapDispatchToProps = (dispatch) => ({
  FetchPostRelated: (params) => {
    dispatch(FetchPostRelated(params));
  },
  ResetPostRelated: () => {
    dispatch(ResetPostRelated());
  },
  FetchPost: (params) => {
    dispatch(FetchPost(params));
  },
  ResetPost: () => {
    dispatch(ResetPost());
  },
});

export const getServerSideProps = async ({ req, query }) => {
  let shouldTrack = processShouldTrack(req);
  let userAgent = req.headers["user-agent"];
  let parameters = { shouldTrack, query };

  return processSSR(userAgent, getPost, parameters);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
