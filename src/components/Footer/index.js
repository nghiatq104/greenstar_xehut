import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { colors } from "../../theme";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Block from "../Block";

const { width, height } = Dimensions.get("window");

const Footer = ({ onPress, label = "Tiếp tục" }) => {
  return (
    <Block style={styles.footer} middle center padding={[10, 20]}>
      <TouchableOpacity style={styles.btnFooter} onPress={onPress}>
        <Text style={styles.txtBtn}>{label}</Text>
      </TouchableOpacity>
      <Block style={{ height: getBottomSpace() }} />
    </Block>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    // backgroundColor: "white"
  },
  btnFooter: {
    width: 0.7 * width,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    backgroundColor: colors.PRIMARY,
    borderRadius: 5,
  },
  txtBtn: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: "500",
    textTransform: "uppercase",
  },
});
