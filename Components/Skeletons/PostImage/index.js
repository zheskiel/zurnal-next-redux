import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentLoader from 'react-content-loader';

import { isMobileView } from '../../../utils/helpers';

class PostImageSkeleton extends Component {
  constructor(props) {
    super(props);

    this.state = { isMobile: '' };
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
          <rect x='0' y='0' rx='1' ry='3' width='100%' height='210' />
        </>
      );
    };

    const MobileSkeleton = () => {
      return (
        <>
          <rect x='3%' y='0' rx='3' ry='3' width='80' height='80' />
        </>
      );
    };

    const Skeleton = () => {
      const { isMobile } = this.state;
      const { theme } = this.props;
      const isLight = theme == 'light';

      return (
        <ContentLoader
          speed={2}
          style={{ width: '100%' }}
          width={isMobile ? 80 : '100%'}
          height={isMobile ? 80 : 210}
          backgroundColor={isLight ? '#f3f3f3' : '#272727'}
          foregroundColor={isLight ? '#ecebeb' : '#272727'}
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
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PostImageSkeleton);