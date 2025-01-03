import React, { Component } from "react";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";

import { FetchPosts, ResetPosts } from "../../redux/actions";
import { getPosts } from "../../apis";

import ListItems from "../../Components/ListItems";
import withListItems from "../../HOC/withListItems";

import {
  isNull,
  capitalize,
  processSSR,
  processShouldTrack,
} from "../../utils/helpers";

class Index extends Component {
  componentDidMount() {
    const { query } = this.props;

    if (isNull(query, "username")) {
      Router.push(`/`);
    }
  }

  render() {
    const { query } = this.props;
    const username = query.username;
    const headerText = username.replace(/-/g, " ");
    const params = {
      ...this.props,
      description: `cari semua artikel dari ${query.username} hanya di Zurnal.co`,
      headerContent: `Semua artikel : ${capitalize(headerText)}`,
    };

    return <ListItems {...params} />;
  }
}

const mapStateToProps = (state) => {
  return {
    clientData: state.posts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  FetchPosts: (params) => {
    dispatch(FetchPosts(params));
  },
  ResetPosts: () => {
    dispatch(ResetPosts());
  },
});

export const getServerSideProps = ({ req, query }) => {
  let shouldTrack = processShouldTrack(req);
  let userAgent = req.headers["user-agent"];
  let parameter = { shouldTrack, query, type: "username" };

  return processSSR(userAgent, getPosts, parameter);
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(enhance(withListItems(Index)));
