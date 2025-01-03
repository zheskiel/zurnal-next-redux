import React, { Component } from "react";
import { connect } from "react-redux";

import ThemeSwitcher from "../ThemeSwitcher";
import Menus from "../desktop";

class DesktopMenu extends Component {
  render() {
    const { isFixed, theme, handlePagination, isSearch, toggleSearch } =
      this.props;

    const Img = theme == "dark" ? `zurnal_logo_dark` : `zurnal_logo`;
    const LogoImage = `https://www.zurnal.co/images/${Img}.png`;

    return (
      <header id="header" className="main-header">
        <div className="top-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-8 f-left">
                <ul>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Term of Services</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">EULA</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                </ul>
              </div>

              <div className="col-4 f-right">
                <ul className="soc-nav-menu">
                  <li className="theme-switcher">
                    <a>
                      <ThemeSwitcher />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="header-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-4">
                <div className="site-brand">
                  <a href="/" onClick={(e) => handlePagination(e)}>
                    <img src={LogoImage} alt="zurnal" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`header-container ${isFixed ? "fixed" : ""}`}>
          <div className="header-bottom-wrapper">
            <div className="container">
              <div className="row">
                <Menus toggleSearch={toggleSearch} />
              </div>
            </div>
          </div>

          {isSearch && (
            <div className="container search-container">
              <div className="search-wrapper">
                <input type="input" placeholder="Search Here..." />
                <button onClick={toggleSearch}>X</button>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(DesktopMenu);
