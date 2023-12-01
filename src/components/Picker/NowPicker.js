import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Feather";
import { colors } from "../../constants/theme";
import Block from "../Block";

const { width, height } = Dimensions.get("window");

export class PickerItem extends Component {
  state = {
    visible: false,
    so_luong: "",
  };

  show = () => {
    this.setState({ visible: true, so_luong: this.props.item.so_luong + "" });
  };
  hide = () => {
    this.setState({ visible: false });
  };
  onCancel = () => {
    this.hide();
    this.setState({ so_luong: this.props.item.so_luong + "" });
  };
  onDone = () => {
    this.hide();
    this.props.onChange(+this.state.so_luong);
  };
  onChangeText = (so_luong) => {
    this.setState({ so_luong: so_luong.replace(/[^0-9]/g, "") });
  };
  render() {
    const {
      item,
      onAdd,
      onMinus,
      onChange,
      noPadding,
      noBorderBottom,
      labelStyle,
    } = this.props;
    const { visible, so_luong } = this.state;
    return (
      <Block
        flex={1}
        style={[
          styles.pickerItem,
          noPadding && { paddingHorizontal: 0 },
          noBorderBottom && { borderBottomWidth: 0 },
        ]}
        row
        center
        space="between"
      >
        <Block flex={1}>
          <Text style={[styles.txtItem, labelStyle]}>{item.ten}</Text>
        </Block>
        <Block row center>
          <Block
            style={[styles.btnI, styles.btnItemL]}
            onPress={onMinus}
            disabled={item.count === 0}
          >
            <Icon name="minus" size={16} color={colors.GRAY} />
          </Block>
          <Block onPress={this.show} style={{ width: 70 }} center>
            <Text style={[styles.addI]}>{item.so_luong}</Text>
          </Block>
          <TouchableOpacity
            style={[styles.btnI, styles.btnItemR]}
            onPress={onAdd}
          >
            <Icon name="plus" size={16} color="white" />
          </TouchableOpacity>
        </Block>
        <Modal
          isVisible={visible}
          onBackdropPress={this.hide}
          onBackButtonPress={this.hide}
          useNativeDriver
          avoidKeyboard
        >
          <Block flex={1} middle center>
            <Block style={{ width: 0.9 * width, backgroundColor: "white" }}>
              <Block middle center style={{ height: 50 }}>
                <Text style={{ fontSize: 16 }}>Số lượng</Text>
              </Block>
              <TextInput
                autoFocus
                selectTextOnFocus
                textAlign={"center"}
                keyboardType="decimal-pad"
                value={`${so_luong}`}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onDone}
                style={{
                  borderWidth: 3 * StyleSheet.hairlineWidth,
                  borderColor: colors.GRAY3,
                  marginHorizontal: 10,
                  marginBottom: 10,
                  height: 40,
                }}
              />
              <Block row style={{ backgroundColor: colors.GRAY3, height: 50 }}>
                <Block
                  flex={1}
                  middle
                  center
                  style={{
                    borderRightColor: colors.GRAY3,
                    borderRightWidth: 2 * StyleSheet.hairlineWidth,
                  }}
                  onPress={this.onCancel}
                >
                  <Text style={{ fontSize: 16 }}>Huỷ</Text>
                </Block>

                <Block flex={1} middle center onPress={this.onDone}>
                  <Text style={{ fontSize: 16, color: colors.ERROR }}>
                    Xong
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </Modal>
      </Block>
    );
  }
}

PickerItem.defaultProps = {
  onChange: () => {},
  allowInput: false,
};

const styles = StyleSheet.create({
  pickerItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 2 * StyleSheet.hairlineWidth,
    borderBottomColor: colors.GRAY3,
  },
  txtItem: {
    fontSize: 15,
    color: "black",
  },
  btnI: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  btnItemR: {
    backgroundColor: "red",
  },
  btnItemL: {
    borderColor: colors.GRAY,
    borderWidth: 2 * StyleSheet.hairlineWidth,
  },
  addI: {
    fontSize: 16,
  },
  modalContainer: {
    width,
    height: height * 0.75,
    backgroundColor: "white",
  },
  modalHeader: {
    height: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.GRAY3,
    paddingHorizontal: 10,
  },
  modalFooter: {
    paddingHorizontal: 30,
    height: 60,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY3,
  },
  popup: {
    position: "absolute",
    bottom: 20 + getBottomSpace(),
    width: 0.9 * width,
    left: 0.05 * width,
    backgroundColor: colors.PRIMARY,
    flexWrap: "wrap",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  txtPopup: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  txtBtn: {
    fontSize: 16,
    color: colors.ERROR,
  },
  txtTitle: {
    fontSize: 18,
    color: colors.BLACK,
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 2 * StyleSheet.hairlineWidth,
  },
});
