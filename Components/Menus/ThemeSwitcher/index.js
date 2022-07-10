import React, { Component } from "react";
import { connect } from "react-redux";

import { ToggleTheme } from "../../../redux/actions";

class ThemeSwitcher extends Component {
  switchBodyClass = (newTheme, oldTheme) => {
    let dom = document.body;
    if (oldTheme != null) dom.classList.remove(oldTheme);
    dom.classList.add(newTheme);
  };

  handleSwitch = () => {
    let lightTheme = "light";
    let darkTheme = "dark";

    Promise.resolve()
      .then(() => {
        const { theme } = this.props;

        let prevTheme = theme;
        let newTheme = theme == lightTheme ? darkTheme : lightTheme;

        this.switchBodyClass(newTheme, prevTheme);
      })
      .then(() => {
        const { ToggleTheme } = this.props;

        ToggleTheme();
      });
  };

  render() {
    const { theme } = this.props;
    const isLight = theme == "light";

    return (
      <>
        <i
          className={`fa fa-${isLight ? "moon" : "sun"}-o`}
          onClick={() => this.handleSwitch()}
        ></i>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

const mapDispatchToProps = (dispatch) => ({
  ToggleTheme: () => {
    dispatch(ToggleTheme());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitcher);
