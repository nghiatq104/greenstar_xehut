import { StyleSheet } from "react-native";
import colors from "./colors";
import { fontSizes } from "./dimensions";

const typographies = StyleSheet.create({
  display4: {
    fontWeight: "400",
    fontSize: fontSizes.DISPLAY4
  },
  display3: {
    fontSize: fontSizes.DISPLAY3
  },
  display2: {
    fontSize: fontSizes.DISPLAY2
  },
  display1: {
    fontSize: fontSizes.DISPLAY1
  },
  headline: {
    fontSize: fontSizes.HEADLINE,
    fontWeight: '700'
  },
  title: {
    fontSize: fontSizes.TITLE
  },
  subtitle: {
    fontSize: fontSizes.SUBTITLE
  },
  subheading: {
    fontSize: fontSizes.BASE
  },
  body1: {
    fontSize: fontSizes.BODY
  },
  body2: {
    fontWeight: "700",
    fontSize: fontSizes.BODY
  },
  caption: {
    fontSize: fontSizes.CAPTION,
    color: colors.GRAY
  },
  header: {
    fontSize: fontSizes.BASE
  },
  body: {
    fontSize: fontSizes.BODY
  },
  small: {
    fontSize: fontSizes.SMALL
  }
});

export default typographies;
