import { NavigationActions } from "react-navigation";

const config = {};

export function setNavigator(nav) {
  if (nav) {
    config.navigator = nav;
  }
}

export function navigate(routeName, params) {
  try {
    if (config.navigator && routeName) {
      let action = NavigationActions.navigate({ routeName, params });
      config.navigator.dispatch(action);
    }
  } catch (error) {
    console.log(error);
  }
}

export function getCurrentRoute() {
  if (config.navigator) {
    return config.navigator.state.routeName;
  }
  return null;
}

export function goBack() {
  if (config.navigator) {
    let action = NavigationActions.back({});
    config.navigator.dispatch(action);
  }
}
