import React from "react";
import { StyleSheet, Text } from "react-native";

const SMGText = ({ children, color, fontSize, margin, style, ...props }) => {
  const handleMargins = () => {
    if (typeof margin === "number") {
      return {
        margin
      };
    }

    if (typeof margin === "object") {
      const marginSize = Object.keys(margin).length;
      switch (marginSize) {
        case 1:
          return {
            margin: margin[0]
          };
        case 2:
          return {
            marginVertical: margin[0],
            marginHorizontial: margin[1]
          };
        case 3:
          return {
            marginTop: margin[0],
            marginBottom: margin[2],
            marginHorizontial: margin[1]
          };
        default:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[3]
          };
      }
    }
  };

  const handlePaddings = () => {
    if (typeof padding === "number") {
      return {
        padding
      };
    }

    if (typeof padding === "object") {
      const paddingSize = Object.keys(padding).length;
      switch (paddingSize) {
        case 1:
          return {
            padding: padding[0]
          };
        case 2:
          return {
            paddingVertical: padding[0],
            paddingHorizontial: padding[1]
          };
        case 3:
          return {
            paddingTop: padding[0],
            paddingBottom: padding[2],
            paddingHorizontial: padding[1]
          };
        default:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[3]
          };
      }
    }
  };
  const textStyles = [
    styles.defaultStyles,
    color && {
      color
    },
    fontSize && {
      fontSize
    },
    margin && handleMargins(),

    style
  ];
  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
};

export default SMGText;

const styles = StyleSheet.create({
  defaultStyles: {
    fontSize: 16
  }
});
