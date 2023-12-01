import React from "react";
import { Linking, StyleSheet, Text } from "react-native";
import { showMessage } from "react-native-flash-message";
import Icon from "react-native-vector-icons/Feather";
import { colors } from "../../theme";
import Block from "../Block";

const SMGPhoneCall = ({ phone_number }) => {
  const onCall = () => {
    const phoneNumber = `tel:${phone_number}`;
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          showMessage({
            message: "Số điện thoại không hợp lệ",
            type: "danger",
            icon: { icon: "danger", position: "left" },
          });
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Block center middle style={styles.btn} onPress={onCall}>
      <Block row center>
        <Icon name="phone-call" size={18} color={colors.WHITE} />
        <Text style={styles.txt}>{phone_number}</Text>
      </Block>
    </Block>
  );
};

export default SMGPhoneCall;

const styles = StyleSheet.create({
  btn: {
    borderColor: colors.PRIMARY,
    borderWidth: 2 * StyleSheet.hairlineWidth,
    borderRadius: 5,
    backgroundColor: colors.PRIMARY,
    paddingVertical: 2.5,
    paddingHorizontal: 5,
  },
  txt: { marginLeft: 7, fontSize: 14, color: colors.WHITE },
});
