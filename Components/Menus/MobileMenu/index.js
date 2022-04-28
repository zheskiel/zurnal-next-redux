import React, { Component } from "react";
import { connect } from "react-redux";

import Link from "next/link";

import Menus from "../../Menus";

class MobileMenu extends Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
