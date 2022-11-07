import React, { Component } from "react";
import { connect } from "react-redux";
import ContentLoader from "react-content-loader";

import { isMobileView } from "../../../utils/helpers";

class PostImageSkeleton extends Component {
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
      return <rect x="0" y="0" rx="1" ry="3" width="80" height="80" />;
    };

    const MobileSkeleton = () => {
      return <rect x="3%" y="0" rx="3" ry="3" width="80" height="80" />;
    };

    const Skeleton = () => {
      const { isMobile } = this.state;
      const { theme } = this.props;
      const isLight = theme == "light";

      return (
        <ContentLoader
          speed={2}
          style={{ width: 80 }}
          width={80}
          height={80}
          backgroundColor={isLight ? "#f3f3f3" : "#272727"}
          foregroundColor={isLight ? "#ecebeb" : "#3b3b3b"}
        >
          {!isMobile ? <DesktopSkeleton /> : <MobileSkeleton />}
        </ContentLoader>
      );
    };

    return <Skeleton />;
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(PostImageSkeleton);
