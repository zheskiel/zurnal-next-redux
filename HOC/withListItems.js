import React, { PureComponent } from "react";

export default function ListItems(WrapperComponent) {
  return class extends PureComponent {
    componentDidMount() {
      const { isRobot } = this.props;

      if (isRobot) return;

      let { page } = query;

      this.handleFetch(page);
    }

    componentDidUpdate(prevProps) {
      const { isRobot, type } = this.props;

      if (
        !isRobot &&
        (prevProps.query.page !== this.props.query.page ||
          prevProps.query[type] !== this.props.query[type])
      ) {
        const { query } = this.props;
        const { page } = query;

        this.handleFetch(page);
      }
    }

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
