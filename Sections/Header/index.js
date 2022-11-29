import React, { Component } from "react";
import Router from "next/router";

import DesktopMenu from "../../Components/Menus/DesktopMenu";
import MobileMenu from "../../Components/Menus/MobileMenu";

import { buildUrl, isMobileView } from "../../utils/helpers";

const initialState = {
  isMobile: "",
  isSearch: false,
};

class HeaderSection extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentDidMount() {
    this.calculateHeader();

    window.addEventListener("resize", this.calculateHeader);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.calculateHeader);
  }

  calculateHeader = () => {
    this.setState({
      isMobile: isMobileView(window.innerWidth),
    });
  };

  handlePagination = (e) => {
    e.preventDefault();

    Promise.resolve()
      .then(() => {
        let url = buildUrl("/");

        Router.push(url);
      })
      .then(() => setTimeout(() => window.scrollTo(0, 0), 1000));
  };

  toggleSearch = (e) => {
    this.setState({
      isSearch: !this.state.isSearch,
    });
  };

  render() {
    const props = {
      handlePagination: (e) => this.handlePagination(e),
      toggleSearch: (e) => this.toggleSearch(e),
      ...this.props,
      ...this.state,
    };

    return (
      <>
        {this.state.isMobile ? (
          <MobileMenu {...props} />
        ) : (
          <DesktopMenu {...props} />
        )}
      </>
    );
  }
}

export default HeaderSection;
