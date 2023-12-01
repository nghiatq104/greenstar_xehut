import React from "react";
import { Keyboard, Platform, StyleSheet, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import { colors } from "../../theme";
import { scale } from "../../utils/responsive";
import Block from "../Block";

const SMGAuthTextInput = React.forwardRef((props, ref) => {
  const {
    icon,
    value,
    onChangeText,
    placeholder,
    error = "",
    containerStyle = {},
    submitEditing,
    placeholderStyle = {},
    secureTextEntry,
    resetForm = () => {},
    keyboardType,
    ...rest
  } = props;

  const onSubmitEditing = () => {
    if (submitEditing) {
      submitEditing();
    } else {
      Keyboard.dismiss();
    }
  };

  const onDelete = () => {
    onChangeText("");
  };

  return (
    <Block
      style={[
        styles.container,
        containerStyle,
        { borderColor: error ? colors.ERROR : "transparent" },
      ]}
      {...rest}
    >
      <Block style={[styles.label]}>
        <Block style={{ width: 24, height: 24 }} center middle>
          <Icon
            style={{ fontSize: 16 }}
            name={icon}
            color={error ? colors.ERROR : colors.PRIMARY_DARK}
          />
        </Block>
        <Text
          style={[
            placeholderStyle,
            {
              color: error ? colors.ERROR : colors.PRIMARY_DARK,

              marginRight: 5,
            },
          ]}
        >
          {placeholder}
        </Text>
        {error ? <Icon name="alert-circle" color={colors.ERROR} /> : null}
      </Block>
      <Block row>
        <TextInput
          value={value}
          ref={ref}
          onChangeText={(text) => {
            onChangeText(text);
          }}
          style={styles.input}
          returnKeyType="next"
          keyboardType={keyboardType}
          blurOnSubmit={false}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
        />
        {value ? (
          <TouchableOpacity
            onPress={onDelete}
            style={{
              width: 24,
              height: 24,
            }}
          >
            <Icon name="x" size={20} />
          </TouchableOpacity>
        ) : null}
      </Block>
    </Block>
  );
});

export default SMGAuthTextInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: scale(5),
    backgroundColor: colors.GRAY3,
    paddingTop: 6,
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  input: {
    transform: [{ translateY: Platform.OS === "android" ? -12.5 : 0 }],
    flex: 1,
    marginLeft: 5,
  },
  btnClose: {
    position: "absolute",
    top: 12.5,
    right: 15,
  },
});
