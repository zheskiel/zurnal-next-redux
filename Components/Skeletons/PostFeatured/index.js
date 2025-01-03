import React, { Component } from "react";
import { connect } from "react-redux";
import ContentLoader from "react-content-loader";

import { isMobileView } from "../../../utils/helpers";

class PostFeaturedImageSkeleton extends Component {
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
      return <rect x="0" y="0" rx="3" ry="3" width="100%" height="350" />;
    };

    const MobileSkeleton = () => {
      return <rect x="0" y="0" rx="3" ry="3" width="100%" height="208" />;
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
          height={isMobile ? 208 : 350}
          backgroundColor={isLight ? "#f3f3f3" : "#272727"}
          foregroundColor={isLight ? "#ecebeb" : "#3b3b3b"}
        >
          {isMobile ? <MobileSkeleton /> : <DesktopSkeleton />}
        </ContentLoader>
      );
    };

    return <Skeleton />;
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(PostFeaturedImageSkeleton);
