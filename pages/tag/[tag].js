import React, { Component } from "react";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";

import { FetchTagPosts, ResetTagPosts } from "../../redux/actions";
import { getTagPosts } from "../../apis";

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

    if (isNull(query, "tag")) {
      Router.push(`/`);
    }
  }

  render() {
    const { query } = this.props;
    const params = {
      ...this.props,
      description: `cari semua artikel dengan tagar #${query.tag} hanya di Zurnal.co`,
      headerContent: `Tagar : ${capitalize(query.tag)}`,
    };

    return <ListItems {...params} />;
  }
}

const mapStateToProps = (state) => {
  return {
    clientData: state.tag,
  };
};

const mapDispatchToProps = (dispatch) => ({
  FetchPosts: (params) => {
    dispatch(FetchTagPosts(params));
  },
  ResetPosts: () => {
    dispatch(ResetTagPosts());
  },
});

export const getServerSideProps = async ({ req, query }) => {
  let shouldTrack = processShouldTrack(req);
  let userAgent = req.headers["user-agent"];
  let parameter = { shouldTrack, query, type: "tag" };

  return processSSR(userAgent, getTagPosts, parameter);
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(enhance(withListItems(Index)));
