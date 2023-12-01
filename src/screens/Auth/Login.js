import { Formik } from "formik";
import React, { Component } from "react";
import { Dimensions, Image, StatusBar, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as yup from "yup";
import Block from "../../components/Block";
import SMGAuthTextInput from "../../components/SMGTextInput/AuthTextInput";
import { VERSION_NAME } from "../../constants/env";
import images from "../../constants/images";
import { dimensions } from "../../constants/theme";
import { RELEASE_ENDPOINT } from "../../constants/url";
import { authActions } from "../../state/authentication";
import { sharedActions } from "../../state/shared";
import { colors, fontSizes, styles as preStyles } from "../../theme";
import { storeT } from "../../utils/http";
import * as NavigationService from "../../utils/NavigationService";
import { scale, verticalScale } from "../../utils/responsive";

const validationSchema = yup.object().shape({
  username: yup.string().required("Bắt buộc"),
  password: yup.string().required("Bắt buộc"),
});

const initialValues = {
  username: "",
  password: "",
};

class LoginScreen extends Component {
  state = {
    username: "",
    visible: false,
  };
  async componentDidMount() {
    NavigationService.setNavigator(this.props.navigation);
    const username = await storeT.getUsername();
    this.setState({ username });
  }

  render() {
    const { login } = this.props;

    return (
      <>
        <StatusBar backgroundColor="white" />
        <Block flex={1} style={{ backgroundColor: colors.WHITE }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1 }}
          >
            <Formik
              validateOnChange={false}
              validationSchema={validationSchema}
              enableReinitialize={true}
              initialValues={{
                ...initialValues,
                username: this.state.username,
              }}
              onSubmit={(values) => {
                const prevUsername = storeT.getUsername();
                if (values.username !== prevUsername) {
                  storeT.setUsername(values.username);
                }
                login(values);
              }}
            >
              {({
                values,
                errors,
                handleChange,
                handleSubmit,
                resetForm,
                setValues,
                setFieldValue,
              }) => {
                return (
                  <Block flex={1}>
                    <Block padding={dimensions.XL} flex={1} middle center>
                      <Block center middle>
                        <Image
                          source={images.logo}
                          style={{ width: 150, height: 150 }}
                        />
                      </Block>

                      <SMGAuthTextInput
                        icon="user"
                        value={values.username}
                        error={errors.username}
                        containerStyle={styles.textInput}
                        placeholder="Tên đăng nhập"
                        onChangeText={handleChange("username")}
                        resetForm={resetForm}
                        keyboardType="phone-pad"
                      />
                      <SMGAuthTextInput
                        icon="key"
                        value={values.password}
                        error={errors.password}
                        containerStyle={styles.textInput}
                        secureTextEntry
                        placeholder="Mật khẩu"
                        onChangeText={handleChange("password")}
                        onSubmitEditing={handleSubmit}
                      />
                      <Block
                        style={styles.loginBtn}
                        center
                        onPress={handleSubmit}
                      >
                        <Text
                          style={{
                            color: colors.WHITE,
                            fontSize: fontSizes.BASE,
                          }}
                        >
                          Đăng nhập
                        </Text>
                      </Block>
                    </Block>
                  </Block>
                );
              }}
            </Formik>
          </ScrollView>
          <Block
            style={{ paddingLeft: 10, paddingBottom: 5 + getBottomSpace() }}
            center
            onPress={() =>
              this.setState((prev) => ({
                visible: !prev.visible,
              }))
            }
          >
            {this.state.visible ? <Text>{RELEASE_ENDPOINT}</Text> : null}
            <Text>Phiên bản: {VERSION_NAME}</Text>
          </Block>
        </Block>
      </>
    );
  }
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  background: {
    width: width,
    height: height,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: verticalScale(150),
  },
  textInput: {
    height: scale(60),
    marginTop: dimensions.MEDIUM,
    width: "100%",
    backgroundColor: colors.GRAY4,
  },
  loginBtn: {
    width: "80%",
    marginTop: scale(dimensions.LARGE),
    backgroundColor: "#05c46b",
    padding: dimensions.LARGE - 5,
    borderRadius: 3,
    elevation: 3,
    ...preStyles.shadow,
  },
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      login: authActions.login,
      connectionChange: sharedActions.connectionChange,
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(LoginScreen);
