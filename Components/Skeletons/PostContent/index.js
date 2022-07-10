import React, { Component } from "react";
import { connect } from "react-redux";
import ContentLoader from "react-content-loader";

import { isMobileView } from "../../../utils/helpers";

class PostContentSkeleton extends Component {
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
          <rect x="0" y="17" rx="3" ry="3" width="100%" height="35" />
          <rect x="0" y="60" rx="3" ry="3" width="90%" height="35" />

          <rect x="0" y="120" rx="3" ry="3" width="100%" height="420" />
        </>
      );
    };

    const MobileSkeleton = () => {
      return (
        <>
          <rect x="0" y="17" rx="3" ry="3" width="20%" height="35" />
          <rect x="0" y="60" rx="3" ry="3" width="100%" height="25" />
          <rect x="0" y="100" rx="3" ry="3" width="80%" height="25" />

          <rect x="0" y="180" rx="3" ry="3" width="100%" height="420" />
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
          height={isMobile ? 390 : 600}
          backgroundColor={isLight ? "#f3f3f3" : "#272727"}
          foregroundColor={isLight ? "#ecebeb" : "#272727"}
        >
          {isMobile ? <MobileSkeleton /> : <DesktopSkeleton />}
        </ContentLoader>
      );
    };

    return (
      <div className="col-lg-12 col-md-12" style={{ padding: "0px 25px" }}>
        <Skeleton />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(PostContentSkeleton);
