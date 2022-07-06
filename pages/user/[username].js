import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";

import { FetchPosts, ResetPosts } from "../../redux/actions";
import { getPosts } from "../../apis";

import PostsList from "../../Sections/PostsList";
import MetaHeader from "../../Components/MetaHeader/index";

import { capitalize, processSSR } from "../../utils/helpers";

import ListItems from '../../HOC/ListItems';

class Index extends Component {
  render() {
    const { isRobot, clientData, ssrData, router } = this.props;
    const { query } = router;
    const { username } = query;

    let isLoading = !isRobot ? clientData.loading : false;

    let dataSource = isRobot ? ssrData : clientData;
    let dataItems = dataSource.items;
    let dataPosts = dataItems.data;

    return (
      <>
        <MetaHeader
          title={username}
          description={`cari semua artikel dari ${username} hanya di Zurnal.co`}
          type="user"
        />

        <h1>Semua artikel : {capitalize(username)}</h1>

        <PostsList
          isLoading={isLoading}
          items={dataItems}
          posts={dataPosts}
          handleFetch={this.handleFetch}
        />
      </>
    );
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListItems(Index))
);
