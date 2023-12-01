import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { colors } from "../theme";
import { Badge } from "react-native-ui-lib";

const NotificationIcon = ({ focused, so_thong_bao_chua_doc, ...props }) => {
  return (
    <View>
      <Icon
        name="bell"
        {...props}
        color={focused ? colors.PRIMARY : "black"}
        size={22}
      />
      {so_thong_bao_chua_doc ? (
        <Badge
          size="small"
          label={so_thong_bao_chua_doc ? so_thong_bao_chua_doc.toString() : "0"}
          labelFormatterLimit={2}
          containerStyle={{
            position: "absolute",
            top: -3,
            right: -5,
          }}
          backgroundColor={colors.ERROR}
        />
      ) : null}
    </View>
  );
};

const mapStateToProps = ({ main: { danh_sach_thong_bao } }) => ({
  so_thong_bao_chua_doc: danh_sach_thong_bao.filter((e) => !e.read_at).length,
});

export default connect(mapStateToProps)(NotificationIcon);

const styles = StyleSheet.create({});
