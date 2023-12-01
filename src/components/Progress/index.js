import React from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { colors } from "../../constants/theme";
import Block from "../Block";

const Progress = ({ isFetching }) => {
  if (isFetching)
    return (
      <Block
        middle
        center
        style={{
          position: "absolute",
          ...StyleSheet.absoluteFillObject,
        }}
      >
        <Block
          flex={1}
          middle
          center
          style={{
            position: "absolute",
            opacity: 0.4,
            backgroundColor: "black",
            ...StyleSheet.absoluteFillObject,
          }}
        />
        <Block
          row
          center
          style={{
            backgroundColor: "#d2dae2",
            borderRadius: 3,
            paddingVertical: 7,
            paddingHorizontal: 20,
          }}
        >
          <ActivityIndicator color={colors.PRIMARY} size={30} />
          <Text style={{ marginLeft: 10, color: "black", fontSize: 16 }}>
            Đang xử lý
          </Text>
        </Block>
      </Block>
    );
  return null;
};

const mapStateToProps = (state) => ({
  isFetching: state.shared.isFetching,
});

export default connect(mapStateToProps)(Progress);
