import React, { Component } from "react";
import ContentLoader from "react-content-loader";

import { isMobileView } from "../../../utils/helpers";

class PostListSkeleton extends Component {
  constructor(props) {
    super(props);

    this.state = { isMobile: "" };
  }

  componentDidMount() {
    this.setState({
      isMobile: isMobileView(window.innerWidth),
    });
  }

  render() {
    const DesktopSkeleton = () => {
      return (
        <>
          <rect x="0" y="0" rx="3" ry="3" width="49%" height="300" />
          <rect x="52%" y="0" rx="3" ry="3" width="49%" height="300" />
        </>
      );
    };

    const MobileSkeleton = () => {
      return (
        <>
          <rect x="3%" y="0" rx="3" ry="3" width="94%" height="300" />
          <rect x="3%" y="330" rx="3" ry="3" width="94%" height="300" />
        </>
      );
    };

    const Skeleton = () => {
      const { isMobile } = this.state;

      return (
        <ContentLoader
          speed={2}
          style={{ width: "100%" }}
          width={"100%"}
          height={isMobile ? 650 : 380}
          backgroundColor={"#f3f3f3"}
          foregroundColor={"#ecebeb"}
        >
          {isMobile ? <MobileSkeleton /> : <DesktopSkeleton />}
        </ContentLoader>
      );
    };

    return (
      <div className="main-box main-content col-12">
        <div className="main-box-inside">
          <Skeleton />
        </div>
      </div>
    );
  }
}

export default PostListSkeleton;
