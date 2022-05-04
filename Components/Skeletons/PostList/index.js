import React, { Component } from "react";
import { connect } from "react-redux";
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
          <rect x="3%" y="10" rx="3" ry="3" width="94%" height="100" />
          <rect x="3%" y="130" rx="3" ry="3" width="94%" height="100" />
          <rect x="3%" y="250" rx="3" ry="3" width="94%" height="100" />
          <rect x="3%" y="370" rx="3" ry="3" width="94%" height="100" />
          <rect x="3%" y="490" rx="3" ry="3" width="94%" height="100" />
        </>
      );
    };

    const Skeleton = () => {
      const { isMobile } = this.state;
      const { theme } = this.props;
      const isLight = theme == "light";

      return (
        <ContentLoader
          speed={2}
          style={{ width: "100%" }}
          width={"100%"}
          height={isMobile ? 610 : 380}
          backgroundColor={isLight ? "#f3f3f3" : "#272727"}
          foregroundColor={isLight ? "#ecebeb" : "#272727"}
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

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PostListSkeleton);
