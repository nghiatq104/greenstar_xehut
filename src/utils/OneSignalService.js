import OneSignal from "react-native-onesignal";

export const sendTag = (key, value) => {
  OneSignal.sendTag(key, value + "");
};
