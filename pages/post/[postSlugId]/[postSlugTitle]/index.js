import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";

import PostContent from "../../../../Sections/PostContent";

import { FetchPost, ResetPost } from "../../../../redux/actions";

import { getPost } from "../../../../apis";

import {
  retryOperation,
  LoadTwitterEmbed,
  processSSR,
  loadScript,
} from "../../../../utils/helpers";

import * as gtag from "../../../../utils/gtag";

import PostShare from "../../../../Components/PostShare";
import PostComment from "../../../../Components/PostComment";
import PostMetaHeader from "../../../../Components/MetaHeader/post";

const scripts = [
  "https://connect.facebook.net/en_US/sdk.js#xfbml=1&appId=396954390897339&version=v2.0",
  "https://platform.twitter.com/widgets.js",
];

class Index extends Component {
  componentDidMount() {
    const { isRobot, query } = this.props;

    if (isRobot) return;

    Promise.resolve()
      .then(() => this.handleFetch(query.page))
      .then(() => scripts.map((script) => loadScript(false, script)))
      .then(() => this.refreshAddthis())
      .then(() => window.FB?.XFBML.parse())
      .then(() => retryOperation(LoadTwitterEmbed, 3000, 3));
  }

  componentWillUnmount() {
    Promise.resolve().then(() => this.props.ResetPost());
  }

  refreshAddthis = () => {
    if (
      window.addthis !== undefined &&
      window.addthis.layers.refresh !== undefined
    ) {
      Promise.resolve()
        .then(() => this.setState({ mounted: true }))
        .then(() => {
          window.addthis.init();
          window.addthis.layers.refresh();
        });
    }
  };

  handleTrack = (page) => {
    const { router } = this.props;
    const { asPath: url } = router;

    console.log("fetch ", page);
    console.log("track  ", url);
    console.log("==================");

    gtag.pageview(url);
  };

  handleFetch = async (page = 1) => {
    const { router, FetchPost } = this.props;
    const { query } = router;

    let params = { ...query, page };

    Promise.resolve()
      .then(() => FetchPost(params))
      .then(this.handleTrack(page));
  };

  render() {
    const { query, isRobot, clientData, ssrData } = this.props;

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
  };
};

const mapDispatchToProps = (dispatch) => ({
  FetchPost: (params) => {
    dispatch(FetchPost(params));
  },
  ResetPost: () => {
    dispatch(ResetPost());
  },
});

export const getServerSideProps = async ({ req, query }) => {
  let userAgent = req.headers["user-agent"];
  let parameters = { query };

  return processSSR(userAgent, getPost, parameters);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
