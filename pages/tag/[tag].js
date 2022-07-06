import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";

import { FetchTagPosts, ResetTagPosts } from "../../redux/actions";
import { getTagPosts } from "../../apis";

import PostsList from "../../Sections/PostsList";
import MetaHeader from "../../Components/MetaHeader/index";

import { capitalize, processSSR } from "../../utils/helpers";

import ListItems from '../../HOC/ListItems';

class Index extends Component {
  render() {
    const { isRobot, clientData, ssrData, router } = this.props;
    const { query } = router;
    const { tag } = query;

    let isLoading = !isRobot ? clientData.loading : false;

    let dataSource = isRobot ? ssrData : clientData;
    let dataItems = dataSource.items;
    let dataPosts = dataItems.data;

    return (
      <>
        <MetaHeader
          title={tag}
          description={`cari semua artikel dengan tagar #${tag} hanya di Zurnal.co`}
          type="tag"
        />

        <h1>Tagar : {capitalize(tag)}</h1>

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
    clientData: state.tag,
  };
};

const mapDispatchToProps = (dispatch) => ({
  FetchTagPosts: (params) => {
    dispatch(FetchTagPosts(params));
  },
  ResetTagPosts: () => {
    dispatch(ResetTagPosts());
  },
});

export const getServerSideProps = async ({ req, query }) => {
  let userAgent = req.headers["user-agent"];
  let parameter = { query, type: 'tag' };

  return processSSR(userAgent, getTagPosts, parameter);
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListItems(Index))
);
