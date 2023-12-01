import React from "react";
import { StyleSheet, Text } from "react-native";
import { colors, dimensions } from "../../constants/theme";
import Block from "../Block";

function ListItem({ first, last, style, onPress, noBorder, ...props }) {
  return (
    <Block style={{ backgroundColor: "white", ...style }} onPress={onPress}>
      {first ? (
        <Block
          style={{
            height: noBorder ? 0 : StyleSheet.hairlineWidth,
            backgroundColor: colors.GRAY,
          }}
        />
      ) : null}
      <Block style={{ padding: 10 }} row>
        {props.children}
      </Block>
      <Block
        style={{
          marginHorizontal: last ? 0 : 10,
          height: noBorder ? 0 : StyleSheet.hairlineWidth,
          backgroundColor: colors.GRAY2,
        }}
      />
    </Block>
  );
}

export default ListItem;
