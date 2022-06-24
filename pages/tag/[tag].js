import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";

import { FetchTagPosts, ResetTagPosts } from "../../redux/actions";
import { getTagPosts } from "../../apis";

import PostsList from "../../Sections/PostsList";
import MetaHeader from "../../Components/MetaHeader/index";

import { processSSR } from "../../utils/helpers";

class Index extends Component {
  componentDidMount() {
    const { isRobot, query } = this.props;

    if (isRobot) return;

    const { page } = query;

    this.handleFetch(page);
  }

  componentDidUpdate(prevProps) {
    const { isRobot } = this.props;

    if (
      !isRobot &&
      (prevProps.query.page !== this.props.query.page ||
        prevProps.query.tag) !== this.props.query.tag
    ) {
      const { query } = this.props;
      const { page } = query;

      this.handleFetch(page);
    }
  }

  componentWillUnmount() {
    const { isRobot } = this.props;

    if (!isRobot) this.props.ResetTagPosts();
  }

  handleFetch = async (page = 1) => {
    const { query, FetchTagPosts } = this.props;

    let params = { ...query, page };

    await FetchTagPosts(params);
  };

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
  let parameter = { query };

  return processSSR(userAgent, getTagPosts, parameter);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
