import React, { PureComponent } from "react";

export default function ListItems(WrapperComponent) {
  return class extends PureComponent {
    componentDidMount() {
      const { isRobot } = this.props;

      if (isRobot) return;

      this.processFetching();
    }

    componentDidUpdate(prevProps) {
      const { isRobot, type } = this.props;

      const { query: prevQuery } = prevProps;
      const { query: thisQuery } = this.props;

      if (
        !isRobot &&
        (prevQuery.page !== thisQuery.page ||
          prevQuery[type] !== thisQuery[type])
      ) {
        this.processFetching();
      }
    }

    processFetching = () => {
      const { query } = this.props;
      const { page } = query;

      this.handleFetch(page);
    };

    handleFetch = async (page = 1) => {
      const { query, FetchPosts } = this.props;

      let params = { ...query, page };

      await FetchPosts(params);
    };

    render() {
      return <WrapperComponent {...this.props} />;
    }
  };
}
