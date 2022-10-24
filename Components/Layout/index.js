import React, { Component } from "react";
import { connect } from "react-redux";

import HeaderSection from "../../Sections/Header";
import SidebarSection from "../../Sections/Sidebar";
import FooterSection from "../../Sections/Footer";
import FooterCategoriesSection from "../../Sections/FooterCategories";

import AdsUnit from "../../Components/AdsUnit";

const initialState = {
  isFixed: false,
};

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll);
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll);
  };

  handleScroll = () => {
    let scrollPosition = window.pageYOffset;
    let fixed = scrollPosition >= 125;

    this.setState({ isFixed: fixed });
  };

  render() {
    // should Ads (should show Ads Unit or not to show)
    const { theme, shouldAds = true } = this.props;

    return (
      <div className={theme}>
        <HeaderSection {...this.state} />

        <div id="main-container">
          <div id="main-wrapper">
            {shouldAds && <AdsUnit />}

            <div className="container">
              <div className="row">
                {this.props.children}

                <SidebarSection {...this.state} />
              </div>
            </div>

            {shouldAds && <AdsUnit />}

            <div className="container">
              <FooterCategoriesSection />
            </div>
          </div>
        </div>

        <FooterSection />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(Layout);
