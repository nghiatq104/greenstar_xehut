import React from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import Block from "../Block";

const SMGBorderlessBotton = ({ children, onPress, radius = 20, ...props }) => {
  return (
    <Block
      style={{ width: 2 * radius, height: 2 * radius }}
      middle
      center
      {...props}
    >
      <BorderlessButton onPress={onPress}>
        <Block style={{ padding: 2.5 }}>{children}</Block>
      </BorderlessButton>
    </Block>
  );
};

export default SMGBorderlessBotton;
