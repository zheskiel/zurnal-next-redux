import React, { Component } from "react";
import { connect } from "react-redux";

import HeaderSection from "../../Sections/Header";
import SidebarSection from "../../Sections/Sidebar";
import FooterSection from "../../Sections/Footer";
import FooterCategoriesSection from "../../Sections/FooterCategories";

import AdsUnit from "../../Components/AdsUnit";

class Layout extends Component {
  render() {
    // should Ads (should show Ads Unit or not to show)
    const { theme, shouldAds = true } = this.props;

    return (
      <div className={theme}>
        <HeaderSection />

        <div id="main-container">
          <div id="main-wrapper">
            {shouldAds && <AdsUnit />}

            <div className="container">
              <div className="row">
                {this.props.children}

                <SidebarSection />
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
