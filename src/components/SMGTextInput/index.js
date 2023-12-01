import React, { useState, useMemo, forwardRef } from "react";
import { StyleSheet, Keyboard, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../theme";
import { scale } from "../../utils/responsive";
import Animated from "react-native-reanimated";
import { timing, string } from "react-native-redash";
import Icon from "react-native-vector-icons/Feather";
import SMGBorderlessBotton from "../SMGButton/SMGBorderlessBotton";
import Block from "../Block";

const { block, useCode, cond, eq, and, set, Clock, interpolate } = Animated;

const SMGTextInput = React.forwardRef((props, ref) => {
  const {
    value,
    onChangeText,
    placeholder,
    error = "",
    conainterStyle = {},
    submitEditing,
    placeholderStyle = {},
    ...rest
  } = props;
  const [isFocus, aniValue, hasValue, clock] = useMemo(
    () => [
      new Animated.Value(0),
      value ? new Animated.Value(0) : new Animated.Value(1),
      value ? new Animated.Value(1) : new Animated.Value(0),
      new Clock(),
    ],
    []
  );

  const onFocus = () => {
    console.log("focus");

    isFocus.setValue(1);
  };
  const onBlur = () => {
    console.log("blur");
    isFocus.setValue(0);
  };

  const onSubmitEditing = () => {
    console.log("submit");
    if (submitEditing) {
      submitEditing();
    } else {
      Keyboard.dismiss();
    }
  };

  useCode(
    block([
      cond(
        and(eq(isFocus, 1), eq(hasValue, 0)),
        set(aniValue, timing({ clock, from: aniValue, to: 0, duration: 100 }))
      ),
      cond(
        and(eq(isFocus, 0), eq(hasValue, 0)),
        set(aniValue, timing({ clock, from: aniValue, to: 1, duration: 100 }))
      ),
    ]),
    []
  );

  const inputRange = [0, 1];
  const translateY = interpolate(aniValue, {
    inputRange,
    outputRange: [5, 12.5],
  });
  const fontSize = interpolate(aniValue, {
    inputRange,
    outputRange: [10, 16],
  });
  return (
    <Block
      style={[
        styles.container,
        conainterStyle,
        { borderColor: error ? colors.ERROR : colors.GRAY },
      ]}
      {...rest}
    >
      <Animated.View
        style={[
          styles.label,
          {
            transform: [
              {
                translateY,
              },
            ],
          },
        ]}
      >
        <Animated.Text
          style={[
            placeholderStyle,
            {
              color: error ? colors.ERROR : colors.GRAY,
              fontSize,
              marginRight: 5,
            },
          ]}
        >
          {placeholder} {error}
        </Animated.Text>
        {error ? <Icon name="alert-circle" color={colors.ERROR} /> : null}
      </Animated.View>
      <TextInput
        value={value}
        ref={ref}
        onChangeText={(text) => {
          onChangeText(text);
          if (!text) {
            hasValue.setValue(0);
          } else hasValue.setValue(1);
        }}
        style={styles.input}
        onFocus={onFocus}
        returnKeyType="next"
        blurOnSubmit={false}
        onBlur={onBlur}
        // clearButtonMode="while-editing"
        onSubmitEditing={onSubmitEditing}
      />
      {value ? (
        <SMGBorderlessBotton
          style={styles.btnClose}
          onPress={() => {
            onChangeText("");
            ref.current.focus();
            hasValue.setValue(0);
          }}
        >
          <Icon name="x" size={20} />
        </SMGBorderlessBotton>
      ) : null}
    </Block>
  );
});

export default SMGTextInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,

    borderRadius: scale(5),
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  label: {
    position: "absolute",
    top: 0,
    left: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 40,
    flex: 1,
  },
  btnClose: {
    position: "absolute",
    top: 12.5,
    right: 15,
  },
});
