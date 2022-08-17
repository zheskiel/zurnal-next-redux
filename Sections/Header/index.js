import React, { Component } from "react";
import Router from "next/router";

import DesktopMenu from "../../Components/Menus/DesktopMenu";
import MobileMenu from "../../Components/Menus/MobileMenu";

import { buildUrl, isMobileView } from "../../utils/helpers";

class HeaderSection extends Component {
  constructor(props) {
    super(props);

    this.state = { isMobile: "" };
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

  render() {
    const props = {
      handlePagination: (e) => this.handlePagination(e),
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
