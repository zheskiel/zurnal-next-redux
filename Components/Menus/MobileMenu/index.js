import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import Link from "next/link";

import ThemeSwitcher from "../ThemeSwitcher";
import Menus from "../../Menus";

class MobileMenu extends Component {
  componentDidMount() {
    this.props.router.events.on("routeChangeComplete", this.removeStuckClass);
  }

  componentWillUnMount() {
    this.props.router.events.off("routeChangeComplete", this.removeStuckClass);
  }

  removeStuckClass = () => {
    const ref = document.querySelector(".sidebar-background");

    if (ref.classList.contains("is_stuck")) {
      ref.classList.remove("is_stuck");
    }
  };

  handleClick = () => {
    const ref = document.querySelector(".sidebar-background");

    ref.classList.toggle("is_stuck");
  };

  render() {
    const { theme } = this.props;
    const Img = theme == 'dark' ? `zurnal_logo_dark` : `zurnal_logo`;
    const LogoImage = `https://www.zurnal.co/images/${Img}.png`;

    return (
      <header id="header" className="main-header">
        <div className="mobile-header">
          <div className="left-section" onClick={this.handleClick}>
            <i className="fa fa-bars"></i>
          </div>
          <div className="center-section">
            <Link href={{ pathname: `/` }}>
              <img src={LogoImage} />
            </Link>
          </div>
          <div className="right-section">
            <div className="section-detail">
              <ThemeSwitcher />
            </div>
            <div className="section-detail">
              <i className="fa fa-search"></i>
            </div>
          </div>
        </div>

        <div className="sidebar-menus-wrapper">
          <div className="sidebar-background" onClick={this.handleClick}>
            <div className="sidebar-menus">
              <Menus />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});
const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MobileMenu)
);
