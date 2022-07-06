import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";

import { FetchPosts, ResetPosts } from "../../redux/actions";
import { getPosts } from "../../apis";

import ListItems from "../../Components/ListItems";
import withListItems from "../../HOC/withListItems";

import { capitalize, processSSR } from "../../utils/helpers";

class Index extends Component {
  render() {
    const { type, query } = this.props;
    const params = {
      ...this.props,
      description: `cari semua artikel dari ${type} hanya di Zurnal.co`,
      headerContent: `Semua artikel : ${capitalize(query.username)}`,
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
  let userAgent = req.headers["user-agent"];
  let parameter = { query, type: "username" };

  return processSSR(userAgent, getPosts, parameter);
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(enhance(withListItems(Index)));
