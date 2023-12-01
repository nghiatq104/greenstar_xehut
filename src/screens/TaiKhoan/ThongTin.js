import React, { useState } from "react";
import { Dimensions, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../theme";
import { securePhone, secureEmail } from "../../utils/transforms";
import Image from "react-native-fast-image";
import moment from "moment";
import { RELEASE_ENDPOINT } from "../../constants/url";
import images from "../../constants/images";
import Block from "../../components/Block";

const { width } = Dimensions.get("window");

const TTItem = ({ borderBottom, borderTop, left, right, iconL }) => {
  const stylesItem = {
    ...(borderBottom && styles.borderBottom),
    ...(borderTop && styles.borderTop),
  };
  return (
    <Block row style={[styles.item, stylesItem]} space="between" center>
      {iconL ? (
        left ? (
          left
        ) : (
          "Chưa có"
        )
      ) : (
        <Text style={styles.txtL}>{left ? left : ""}</Text>
      )}
      <Text style={styles.txtR}>{right ? right : "Chưa có"}</Text>
    </Block>
  );
};

const ThongTinNguoiDung = ({ navigation }) => {
  const details = navigation.getParam("details");
  const {
    ten,
    cmnd,
    ngay_sinh,
    ngay_vao_cong_ty,
    ngay_cap,
    so_dien_thoai,
    dia_chi,
    username,
    email,
    avatar_url,
    so_nam_lam_viec,
  } = details;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block flex={1}>
        <Block style={styles.cate}>
          <TTItem
            borderTop
            left={
              <Image
                style={styles.avatar}
                resizeMode="contain"
                source={
                  avatar_url
                    ? { uri: `${RELEASE_ENDPOINT}/${avatar_url}` }
                    : images.userDefaul
                }
              />
            }
            iconL
            right={"Ảnh đại diện"}
          />
          <TTItem borderTop left="Tên đăng nhập" right={username} />
          <TTItem borderTop left="Số điện thoại" right={so_dien_thoai} />
        </Block>
        <Block style={styles.cate}>
          <TTItem borderBottom left="Tên của bạn" right={ten} />
          <TTItem borderBottom left="Số CMND/CCCD" right={securePhone(cmnd)} />
          <TTItem borderBottom left="Email" right={email} />
          <TTItem
            borderBottom
            left="Ngày sinh"
            right={
              ngay_sinh
                ? moment(ngay_sinh, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY")
                : "Chưa có"
            }
          />
          <TTItem left="Địa chỉ" right={dia_chi} />
        </Block>
        <Block style={styles.cate}>
          <TTItem
            borderBottom
            left="Ngày vào công ty"
            right={
              ngay_vao_cong_ty
                ? moment(ngay_vao_cong_ty, "YYYY-MM-DD HH:mm:ss").format(
                    "DD/MM/YYYY"
                  )
                : "Chưa có"
            }
          />
          <TTItem left="Số năm làm việc" right={so_nam_lam_viec} />
        </Block>
      </Block>
    </ScrollView>
  );
};

ThongTinNguoiDung.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Thông tin tài khoản",
  };
};

export default ThongTinNguoiDung;

const styles = StyleSheet.create({
  cate: {
    paddingHorizontal: 10,
    backgroundColor: colors.WHITE,
    marginBottom: 20,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  txtL: {
    fontSize: 16,
    color: colors.BLACK,
    fontWeight: "500",
  },
  txtR: {
    fontSize: 14,
    color: colors.GRAY,
    maxWidth: width * 0.7,
  },
  borderTop: {
    borderTopColor: colors.GRAY2,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  borderBottom: {
    borderBottomColor: colors.GRAY2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
