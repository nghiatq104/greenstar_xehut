import { Platform } from "react-native";

export const VERSION_CODE = 11;
export const VERSION_NAME = "1.0.10";
export const APP_STORE_URL = Platform.select({
  android:
    "https://play.google.com/store/apps/details?id=com.greenstar.manager",
  ios:
    "https://apps.apple.com/vn/app/ng%C3%B4i-sao-xanh-qu%E1%BA%A3n-l%C3%BD/id1493150708?l=vi",
});
