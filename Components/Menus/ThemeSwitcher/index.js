import React, { Component } from "react";
import { connect } from "react-redux";

import { ToggleTheme } from "../../../redux/actions";

class ThemeSwitcher extends Component {
  render() {
    const { theme, ToggleTheme } = this.props;
    const isLight = theme == "light";

    return (
      <>
        <i
          className={`fa fa-${isLight ? "moon" : "sun"}-o`}
          onClick={ToggleTheme}
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
