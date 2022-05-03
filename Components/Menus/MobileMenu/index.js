import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import Link from "next/link";

import Menus from "../../Menus";

class MobileMenu extends Component {
  componentDidMount() {
    this.props.router.events.on("routeChangeComplete", this.removeStuckClass);
  }

  componentWillUnMount() {
    this.props.router.events.off("routeChangeComplete", this.removeStuckClass);
  }

  removeStuckClass = () => {
    const ref = document.querySelector(".sidebar-menus");

    if (ref.classList.contains("is_stuck")) {
      ref.classList.remove("is_stuck");
    }
  };

  handleClick = () => {
    const ref = document.querySelector(".sidebar-menus");

    ref.classList.toggle("is_stuck");
  };

  render() {
    return (
      <header id="header" className="main-header">
        <div className="sidebar-menus-wrapper">
          <div className="sidebar-menus">
            <Menus />
          </div>
        </div>

        <div className="mobile-header">
          <div className="left-section" onClick={this.handleClick}>
            <i className="fa fa-bars"></i>
          </div>
          <div className="center-section">
            <Link href={{ pathname: `/` }}>
              <img src="https://www.zurnal.co/images/zurnal_logo.png" />
            </Link>
          </div>
          <div className="right-section">
            <i className="fa fa-search"></i>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MobileMenu)
);
