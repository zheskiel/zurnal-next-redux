import React, { Component } from "react";
import { connect } from "react-redux";

import HeaderSection from "../../Sections/Header";
import SidebarSection from "../../Sections/Sidebar";
import FooterSection from "../../Sections/Footer";
import FooterCategoriesSection from "../../Sections/FooterCategories";

class Layout extends Component {
  render() {
    return (
      <>
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
