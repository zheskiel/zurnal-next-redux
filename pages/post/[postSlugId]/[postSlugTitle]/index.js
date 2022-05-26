import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";

import PostContent from "../../../../Sections/PostContent";

import PostShare from "../../../../Components/PostShare";

import { FetchPost, ResetPost } from "../../../../redux/actions";

import { getPost } from "../../../../apis";

import { processSSR, loadScript } from "../../../../utils/helpers";

import PostComment from "../../../../Components/PostComment";
import PostMetaHeader from "../../../../Components/MetaHeader/post";

const scripts = [
  "https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-6209f866f185a6e6",
  "https://connect.facebook.net/en_US/sdk.js#xfbml=1&appId=396954390897339&version=v2.0",
];

const initialState = {
  mounted: false,
};
class Index extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentDidMount() {
    const { isRobot, query } = this.props;

    if (isRobot) return;

    Promise.resolve()
      .then(() => {
        let { page } = query;

        this.handleFetch(page);
      })
      .then(() => scripts.map((script) => loadScript(false, script)))
      .then(() => this.refreshAddthis())
      .then(() => window.FB?.XFBML.parse());
  }

  componentWillUnmount() {
    Promise.resolve()
      .then((props) => {
        this.props.ResetPost();
      })
      .then(() => this.setState({ mounted: false }));
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

  handleFetch = async (page = 1) => {
    const { router, FetchPost } = this.props;
    const { query } = router;

    let params = { ...query, page };

    await FetchPost(params);
  };

  render() {
    const { mounted } = this.state;
    const { query, isRobot, clientData, ssrData } = this.props;

    let dataSource = isRobot ? ssrData : clientData;
    let dataPost = dataSource.items;

    return (
      <>
        <PostMetaHeader elem={dataPost} />

        <div className="main-box main-content post-content col-12">
          <PostContent post={dataPost} handleFetch={this.handleFetch} />

          <PostShare />
          {mounted && <PostComment {...query} />}
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
