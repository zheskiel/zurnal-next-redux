import React, { PureComponent } from "react";

import * as gtag from "../utils/gtag";

export default function ListItems(WrapperComponent) {
  return class extends PureComponent {
    componentDidMount() {
      const { isRobot } = this.props;

      if (isRobot) return;

      this.fetchAndTrack();
    }

    componentDidUpdate(prevProps) {
      const { isRobot, type } = this.props;

      if (
        !isRobot &&
        (prevProps.query.page !== this.props.query.page ||
          prevProps.query[type] !== this.props.query[type])
      ) {
        this.fetchAndTrack();
      }
    }

    fetchAndTrack() {
      console.log("fetch & track");

      Promise.resolve()
        .then(() => console.log(">>>>>>>>>>>>>>>>>"))
        .then(() => {
          const { query } = this.props;
          const { page = 1 } = query;

          console.log("fetch ", page);

          this.handleFetch(page);
        })
        .then(() => {
          // Only track when normal user, not bot
          const { router } = this.props;
          const { asPath: url } = router;

          console.log("track  ", url);

          gtag.pageEvent(url);
        })
        .then(() => console.log("<<<<<<<<<<<<<<<<<"));
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
