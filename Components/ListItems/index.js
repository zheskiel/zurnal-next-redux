import React, { Component } from "react";

import MetaHeader from "../../Components/MetaHeader";
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
    const title = query[type]?.replace(/-/g, " ");

    let isLoading = !isRobot ? clientData.loading : false,
      dataSource = isRobot ? ssrData : clientData,
      dataItems = dataSource.items,
      dataPosts = dataItems.data;

    let params = { title, type, description };

    return (
      <>
        <MetaHeader {...params} />

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
