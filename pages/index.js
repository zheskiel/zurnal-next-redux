import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";

import { FetchPosts, ResetPosts } from "../redux/actions";
import { getPosts } from "../apis";

import PostsList from "../Sections/PostsList";
import MetaHeader from "../Components/MetaHeader";

import { processSSR } from "../utils/helpers";

class Index extends Component {
  componentDidMount() {
    const { isRobot, query } = this.props;

    if (isRobot) return;

    let { page } = query;

    this.handleFetch(page);
  }

  componentDidUpdate(prevProps) {
    const { isRobot } = this.props;

    if (!isRobot && prevProps.query.page !== this.props.query.page) {
      const { query } = this.props;

      let { page } = query;

      this.handleFetch(page);
    }
  }

  componentWillUnmount() {
    const { isRobot } = this.props;

    if (!isRobot) this.props.ResetPosts();
  }

  handleFetch = async (page = 1) => {
    const { query, FetchPosts } = this.props;

    let params = { ...query, page };

    await FetchPosts(params);
  };

  render() {
    const { isRobot, ssrData, clientData } = this.props;

    let isLoading = (!isRobot) ? clientData.loading : false;

    let dataSource = isRobot ? ssrData : clientData;
    let dataItems = dataSource.items;
    let dataPosts = dataItems.data;

    return (
      <>
        <MetaHeader type="index" />

        <PostsList isLoading={isLoading} items={dataItems} posts={dataPosts} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clientData: state.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FetchPosts: (params) => {
      dispatch(FetchPosts(params));
    },
    ResetPosts: () => {
      dispatch(ResetPosts());
    },
  };
};

export const getServerSideProps = async ({ req, query }) => {
  let userAgent = req.headers["user-agent"];
  let parameter = { query };

  return processSSR(userAgent, getPosts, parameter);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
