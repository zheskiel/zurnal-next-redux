import React, { Component } from "react";
import { connect } from "react-redux";

import HeaderSection from "../../Sections/Header";
import SidebarSection from "../../Sections/Sidebar";
import FooterSection from "../../Sections/Footer";
import FooterCategoriesSection from "../../Sections/FooterCategories";

class Layout extends Component {
  render() {
    const { theme } = this.props;

    return (
      <div className={`${theme}`}>
        <HeaderSection />

        <div id="main-container">
          <div id="main-wrapper">
            <div className="container">
              <div className="row">
                {this.props.children}

                <SidebarSection />
              </div>

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
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
