import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../theme";
import Block from "../Block";

const { width, height } = Dimensions.get("window");
const UnitPicker = ({ isVisible, onCancel, onSubmit, data, selected }) => {
  console.log("render");

  const [selectedItem, setselectedItem] = useState(selected);
  const renderItem = ({ item, index }) => {
    return (
      <Block
        key={"init" + index}
        style={styles.item}
        row
        center
        onPress={() => setselectedItem(item)}
      >
        <Text
          style={{
            fontSize: 16,
            color: selectedItem.id === item.id ? colors.IOS_BTN : "black",
            flex: 1,
          }}
        >
          {item.ten}
        </Text>
        {selectedItem.id === item.id ? (
          <Icon name="check-circle" size={20} color={colors.SUCCESS} />
        ) : null}
      </Block>
    );
  };
  return (
    <Modal isVisible={isVisible}>
      <Block flex={1} middle center>
        <Block style={styles.modal}>
          <View style={styles.block}>
            <Text style={styles.title}>Chọn đơn vị</Text>
          </View>
          <Block style={styles.content}>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => "unit" + index}
              renderItem={renderItem}
              ListEmptyComponent={<Text>Chưa có đơn vị nào</Text>}
            />
          </Block>
          <Block row center space="around" style={styles.btn}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.can}>HUỶ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSubmit(selectedItem)}>
              <Text style={styles.ok}>ĐỒNG Ý</Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    </Modal>
  );
};

export default UnitPicker;

const styles = StyleSheet.create({
  modal: {
    width: 0.7 * width,
    height: 350,
    backgroundColor: "white",
    borderRadius: 4,
  },
  block: {
    justifyContent: "center",
    height: 40,
    backgroundColor: colors.GRAY3,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  content: {
    paddingHorizontal: 15,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: Platform.select({
      ios: "600",
      android: "bold",
    }),
    textAlign: "center",
  },
  btn: {
    height: 45,
    backgroundColor: colors.GRAY3,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  ok: {
    color: "#007aff",
    fontSize: 16,
    fontWeight: Platform.select({
      ios: "600",
      android: "bold",
    }),
  },
  can: {
    color: "red",
    fontSize: 16,
    fontWeight: Platform.select({
      ios: "600",
      android: "bold",
    }),
  },
  item: {
    height: 40,
    alignItems: "center",
    marginBottom: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.PLACEHOLDER,
  },
});
