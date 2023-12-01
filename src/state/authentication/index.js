import { createAction, handleActions } from "redux-actions";

export const authTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  DOI_MAT_KHAU: "DOI_MAT_KHAU",
  SPLASH_SCREEN: "SPLASH_SCREEN"
};

const login = createAction(authTypes.LOGIN);
const logout = createAction(authTypes.LOGOUT);
const doiMatKhau = createAction(authTypes.DOI_MAT_KHAU);
const splashScreen = createAction(authTypes.SPLASH_SCREEN);

export const authActions = {
  login,
  logout,
  doiMatKhau,
  splashScreen
};

const initialState = {
  profile: {}
};

export const authReducers = handleActions(
  {
    [authTypes.LOGIN_SUCCESS]: (state, action) => {
      return {
        ...state,
        profile: action.payload
      };
    },
    [authTypes.LOGOUT]: (state, action) => {
      return {
        ...initialState
      };
    }
  },
  initialState
);
