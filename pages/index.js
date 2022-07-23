import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";

import { FetchPosts, ResetPosts } from "../redux/actions";
import { getPosts } from "../apis";

import withListItems from "../HOC/withListItems";
import ListItems from "../Components/ListItems";

import { processSSR, processShouldTrack } from "../utils/helpers";

class Index extends Component {
  render() {
    return <ListItems {...this.props} />;
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
  let shouldTrack = processShouldTrack(req);

  let userAgent = req.headers["user-agent"];
  let parameter = { shouldTrack, query, type: "index" };

  return processSSR(userAgent, getPosts, parameter);
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(enhance(withListItems(Index)));
