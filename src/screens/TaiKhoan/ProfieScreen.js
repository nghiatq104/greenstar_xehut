import React, { Component } from "react";
import { StyleSheet, Text, Platform, Linking } from "react-native";
import Image from "react-native-fast-image";
import ListItem from "../../components/items/ListItem";
import images from "../../constants/images";
import { colors, dimensions, fontSizes } from "../../constants/theme";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { RELEASE_ENDPOINT } from "../../constants/url";
import { authActions } from "../../state/authentication";
import { SwitchActions, ScrollView } from "react-navigation";
import { VERSION_NAME } from "../../constants/env";
import Block from "../../components/Block";

class ProfieScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Tài khoản",
    };
  };

  openAppDriver = () => {
    const url = Platform.select({
      android:
        "https://play.google.com/store/apps/details?id=com.greenstar.driver",
      ios:
        "https://apps.apple.com/vn/app/ng%C3%B4i-sao-xanh-t%C3%A0i-x%E1%BA%BF/id1492958521?l=vi",
    });
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };
  render() {
    const { navigation, profile, dang_xuat } = this.props;

    return (
      <Block style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block center style={{ paddingVertical: dimensions.LARGE }}>
            <Image
              source={
                profile.avatar_url
                  ? { uri: `${RELEASE_ENDPOINT}/${profile.avatar_url}` }
                  : images.userDefault
              }
              resizeMode="contain"
              style={{
                width: 90,
                height: 90,
                borderRadius: 45,
              }}
            />
            <Text style={styles.userName}>{profile.name}</Text>
            <Text style={styles.email}>{profile.email}</Text>
            {profile.role_id == 2 ? (
              <Text style={styles.admin}>ADMIN</Text>
            ) : null}
            <Block style={styles.block}>
              <ListItem
                onPress={() =>
                  navigation.navigate("ThongTinTaiXe", {
                    details: profile,
                  })
                }
              >
                <Text style={styles.f16}>Thông tin tài khoản</Text>
              </ListItem>
              <ListItem
                noBorder
                onPress={() => navigation.navigate("DoiMatKhau")}
              >
                <Text style={styles.f16}>Đổi mật khẩu</Text>
              </ListItem>
            </Block>

            <Block
              style={{ width: "100%", paddingTop: dimensions.XL }}
              onPress={() => {
                dang_xuat();
                navigation.dispatch(
                  SwitchActions.jumpTo({ routeName: "Auth" })
                );
              }}
            >
              <ListItem style={{ alignItems: "center" }}>
                <Text
                  style={[
                    { color: colors.ERROR, fontWeight: "bold" },
                    styles.f16,
                  ]}
                >
                  Đăng xuất
                </Text>
              </ListItem>
            </Block>
          </Block>
          <Block
            style={{
              paddingRight: 10,
              alignItems: "flex-end",
              marginBottom: 5,
            }}
          >
            <Text>Phiên bản: {VERSION_NAME}</Text>
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.auth.profile,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dang_xuat: authActions.logout,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfieScreen);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    // backgroundColor: colors.WHITE,
  },
  userName: {
    marginTop: dimensions.LARGE,
    fontSize: fontSizes.TITLE,
    fontWeight: "bold",
  },
  admin: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    marginTop: dimensions.SMALL,
    fontWeight: "400",
    color: colors.GRAY,
  },
  f16: {
    fontSize: 16,
  },
  block: {
    width: "100%",
    paddingTop: dimensions.XL,
    // elevation: 3,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    marginHorizontal: 10,
  },
});
