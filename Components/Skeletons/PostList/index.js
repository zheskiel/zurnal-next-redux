import React, { Component } from "react";
import ContentLoader from "react-content-loader";

class PostListSkeleton extends Component {
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
      return (
        <ContentLoader
          speed={2}
          style={{ width: "100%" }}
          width={"100%"}
          height={380}
          backgroundColor={"#f3f3f3"}
          foregroundColor={"#ecebeb"}
        >
          <DesktopSkeleton />
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
