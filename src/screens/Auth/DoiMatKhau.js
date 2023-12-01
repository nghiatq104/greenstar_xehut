import React, { useState } from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors } from "../../theme";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Formik } from "formik";
import * as yup from "yup";
import { authActions } from "../../state/authentication";
import Block from "../../components/Block";

const validationSchema = yup.object().shape({
  old_password: yup.string().required("Mật khẩu hiện tại không được để trống"),
  new_password: yup.string().required("Mật khẩu mới không được để trống"),
  confirm_new_password: yup
    .string()
    .oneOf([yup.ref("new_password"), null], "Mật khẩu không trùng nhau"),
});

const initialValues = {
  old_password: "",
  new_password: "",
  confirm_new_password: "",
};
const DoiMatKhau = ({ doiMatKhau }) => {
  const [secureTextEntry_1, setSecureTextEntry_1] = useState(true);
  const [secureTextEntry_2, setSecureTextEntry_2] = useState(true);
  const [secureTextEntry_3, setSecureTextEntry_3] = useState(true);
  return (
    <Formik
      validateOnChange={false}
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={(values) => {
        doiMatKhau({
          old_password: values.old_password,
          new_password: values.new_password,
        });
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block flex={1} style={styles.container}>
              <Block
                style={[
                  styles.item,
                  {
                    borderBottomColor: errors.old_password
                      ? colors.ERROR
                      : colors.GRAY2,
                  },
                ]}
              >
                <Text style={styles.title}>Nhập mật khẩu hiện tại</Text>
                <Block row center style={styles.subItem}>
                  <Icon name="key" size={22} />
                  <TextInput
                    placeholder="Nhập mật khẩu hiện tại"
                    style={styles.input}
                    onChangeText={handleChange("old_password")}
                    value={values.old_password}
                    secureTextEntry={secureTextEntry_1}
                  />
                  {values.old_password ? (
                    <TouchableOpacity
                      onPress={() => setSecureTextEntry_1(!secureTextEntry_1)}
                    >
                      <Icon
                        name={secureTextEntry_1 ? "eye" : "eye-off"}
                        size={22}
                      />
                    </TouchableOpacity>
                  ) : null}
                </Block>
                {errors.old_password ? (
                  <Text style={styles.error}>{errors.old_password}</Text>
                ) : null}
              </Block>
              <Block
                style={[
                  styles.item,
                  {
                    borderBottomColor: errors.new_password
                      ? colors.ERROR
                      : colors.GRAY2,
                  },
                ]}
              >
                <Text style={styles.title}>Nhập mật khẩu mới</Text>
                <Block row center style={styles.subItem}>
                  <Icon name="key" size={22} />
                  <TextInput
                    placeholder="Nhập mật khẩu mới"
                    style={styles.input}
                    onChangeText={handleChange("new_password")}
                    value={values.new_password}
                    secureTextEntry={secureTextEntry_2}
                  />
                  {values.new_password ? (
                    <TouchableOpacity
                      onPress={() => setSecureTextEntry_2(!secureTextEntry_2)}
                    >
                      <Icon
                        name={secureTextEntry_2 ? "eye" : "eye-off"}
                        size={20}
                      />
                    </TouchableOpacity>
                  ) : null}
                </Block>
                {errors.new_password ? (
                  <Text style={styles.error}>{errors.new_password}</Text>
                ) : null}
              </Block>
              <Block
                style={[
                  styles.item,
                  {
                    borderBottomColor: errors.old_password
                      ? colors.ERROR
                      : colors.GRAY2,
                  },
                ]}
              >
                <Text style={styles.title}>Nhập lại mật khẩu mới</Text>
                <Block row center style={styles.subItem}>
                  <Icon name="key" size={22} />
                  <TextInput
                    placeholder="Nhập lại mật khẩu mới"
                    style={styles.input}
                    onChangeText={handleChange("confirm_new_password")}
                    value={values.confirm_new_password}
                    secureTextEntry={secureTextEntry_3}
                  />
                  {values.confirm_new_password ? (
                    <TouchableOpacity
                      onPress={() => setSecureTextEntry_3(!secureTextEntry_3)}
                    >
                      <Icon
                        name={secureTextEntry_3 ? "eye" : "eye-off"}
                        size={20}
                      />
                    </TouchableOpacity>
                  ) : null}
                </Block>
                {errors.confirm_new_password ? (
                  <Text style={styles.error}>
                    {errors.confirm_new_password}
                  </Text>
                ) : null}
              </Block>
              <Block style={styles.btn} middle center onPress={handleSubmit}>
                <Text style={styles.txtBtn}>CẬP NHẬT</Text>
              </Block>
            </Block>
          </ScrollView>
        );
      }}
    </Formik>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      doiMatKhau: authActions.doiMatKhau,
    },
    dispatch
  );
const DoiMatKhauContainer = connect(
  null,
  mapDispatchToProps
)(DoiMatKhau);
export default DoiMatKhauContainer;

DoiMatKhauContainer.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Đổi mật khẩu",
  };
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.WHITE,
  },
  input: {
    flex: 1,
    marginLeft: Platform.select({ android: 0, ios: 5 }),
  },
  item: {
    borderBottomWidth: 2 * StyleSheet.hairlineWidth,
    marginTop: Platform.select({ android: 0, ios: 10 }),
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  btn: {
    height: 45,
    backgroundColor: colors.PRIMARY,
    marginTop: 10,
    borderRadius: 5,
  },
  txtBtn: {
    color: "white",
    fontSize: 16,
  },
  error: {
    color: colors.ERROR,
  },
  subItem: {
    marginTop: 7,
  },
});
