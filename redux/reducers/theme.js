import cookieCutter from "cookie-cutter";

import { TOGGLE_THEME } from "../actions/types";

const defaultTheme =
  typeof window !== "undefined" ? localStorage?.getItem("theme") : null;

const themes = ["light", "dark"];
const initialState = {
  isLight: true,
  theme: defaultTheme ? defaultTheme : themes[0],
};

export default function ThemeReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      var _isLight = !state.isLight;
      var selectedTheme = themes[_isLight ? 0 : 1];
      var newState = {
        isLight: _isLight,
        theme: selectedTheme,
      };

      if (typeof window !== "undefined") {
        cookieCutter.set("theme", selectedTheme);
        localStorage.setItem("theme", selectedTheme);
      }

      return { ...state, ...newState };
    default:
      return state;
  }
}
