import React, { Component } from "react";

import DesktopMenu from "../../Components/Menus/DesktopMenu";
import MobileMenu from "../../Components/Menus/MobileMenu";

import { isMobileView } from "../../utils/helpers";

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

  render() {
    const { isMobile } = this.state;

    return <>{isMobile ? <MobileMenu /> : <DesktopMenu />}</>;
  }
}

export default HeaderSection;
