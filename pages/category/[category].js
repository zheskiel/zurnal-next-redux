import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";

import { FetchPosts, ResetPosts } from "../../redux/actions";
import { getPosts } from "../../apis";

import PostsList from "../../Sections/PostsList";
import MetaHeader from "../../Components/MetaHeader/index";

import { processSSR } from "../../utils/helpers";

class Index extends Component {
  componentDidMount() {
    const { isRobot, query } = this.props;

    if (isRobot) return;

    let { page } = query;

    this.handleFetch(page);
  }

  componentDidUpdate(prevProps) {
    const { isRobot } = this.props;

    if (!isRobot && prevProps.query.category !== this.props.query.category) {
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
    const { isRobot, clientData, ssrData, router } = this.props;
    const { query } = router;
    const { category } = query;

    let isLoading = clientData.loading;

    let dataSource = isRobot ? ssrData : clientData;
    let dataItems = dataSource.items;
    let dataPosts = dataItems.data;

    return (
      <>
        <MetaHeader
          title={category}
          description={`cari semua artikel dari kategori ${category} hanya di Zurnal.co`}
          type="category"
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
  let parameter = { query };

  return processSSR(userAgent, getPosts, parameter);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
