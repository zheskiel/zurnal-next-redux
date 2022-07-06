import React, { Component } from "react";

import MetaHeader from "../MetaHeader";
import PostsList from "../../Sections/PostsList";

class ListItems extends Component {
  render() {
    const {
      isRobot,
      type,
      router,
      ssrData,
      clientData,
      description,
      headerContent,
    } = this.props;

    const { query } = router;
    const _type = query[type];

    let isLoading = !isRobot ? clientData.loading : false;

    let dataSource = isRobot ? ssrData : clientData;
    let dataItems = dataSource.items;
    let dataPosts = dataItems.data;

    return (
      <>
        <MetaHeader title={_type} description={description} type={_type} />

        {headerContent && <h1>{headerContent}</h1>}

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

export default ListItems;
