import { Formik } from "formik";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, TextInput } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Feather";
import * as yup from "yup";
import { colors } from "../../constants/theme";
import Block from "../Block";

const validationSchema = yup.object().shape({
  hang_hoa_chinh: yup.string().required("Bắt buộc"),
  tong_khoi_luong: yup.string().required("Bắt buộc"),
});

const SMGModalBT = ({ xe_id, xe_dieu_phoi_id, onSubmit }) => {
  const [isVisible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <>
      <Block row onPress={showModal} style={styles.btn}>
        <Icon name="activity" size={20} color={colors.WHITE} />
        <Text style={{ marginLeft: 5, color: colors.WHITE, fontSize: 16 }}>
          Báo bán thẳng
        </Text>
      </Block>
      <Modal isVisible={isVisible} useNativeDriver>
        <Formik
          initialValues={{
            hang_hoa_chinh: "",
            tong_khoi_luong: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            hideModal();
            onSubmit({
              xe_id,
              xe_dieu_phoi_id,
              hang_hoa_chinh: values.hang_hoa_chinh,
              tong_khoi_luong: values.tong_khoi_luong,
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
              <Block style={styles.modal}>
                <Block center middle style={styles.header}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: Platform.OS === "android" ? "bold" : "500",
                      color: colors.BLACK,
                    }}
                  >
                    Báo bán thẳng
                  </Text>
                </Block>
                <Block style={styles.body}>
                  <Block>
                    <Block row>
                      <Text
                        style={[
                          styles.field,
                          {
                            color: errors.hang_hoa_chinh
                              ? colors.ERROR
                              : colors.BLACK,
                          },
                        ]}
                      >
                        Phế liệu/Chất thải
                      </Text>
                      <Block flex={1} />
                      {errors.hang_hoa_chinh ? (
                        <Text
                          style={{
                            color: colors.ERROR,
                          }}
                        >
                          {errors.hang_hoa_chinh}
                        </Text>
                      ) : null}
                    </Block>
                    <TextInput
                      placeholder="Ấn để nhập..."
                      style={styles.input}
                      value={values.hang_hoa_chinh}
                      onChangeText={handleChange("hang_hoa_chinh")}
                    />
                  </Block>

                  <Block>
                    <Block row>
                      <Text
                        style={[
                          styles.field,
                          {
                            color: errors.hang_hoa_chinh
                              ? colors.ERROR
                              : colors.BLACK,
                          },
                        ]}
                      >
                        Khối lượng (kilogram)
                      </Text>
                      <Block flex={1} />
                      {errors.tong_khoi_luong ? (
                        <Text
                          style={{
                            color: colors.ERROR,
                          }}
                        >
                          {errors.tong_khoi_luong}
                        </Text>
                      ) : null}
                    </Block>
                    <TextInput
                      placeholder="Ấn để nhập..."
                      style={styles.input}
                      keyboardType="number-pad"
                      value={values.tong_khoi_luong}
                      onChangeText={handleChange("tong_khoi_luong")}
                    />
                  </Block>
                </Block>
                <Block
                  row
                  style={{
                    backgroundColor: colors.GRAY3,
                    height: 50,
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4,
                  }}
                >
                  <Block
                    flex={1}
                    middle
                    center
                    onPress={hideModal}
                    style={{
                      borderRightColor: colors.GRAY3,
                      borderRightWidth: 2 * StyleSheet.hairlineWidth,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>Huỷ</Text>
                  </Block>

                  <Block flex={1} middle center onPress={handleSubmit}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: colors.ERROR,
                        fontWeight: "bold",
                      }}
                    >
                      Bán
                    </Text>
                  </Block>
                </Block>
              </Block>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default SMGModalBT;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.WHITE,
    borderRadius: 4,
  },
  header: {
    height: 50,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  input: {
    height: 35,
    backgroundColor: "#F4F6F8",
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 4,
    marginTop: 5,
    marginBottom: 7.6,
  },
  field: {
    marginLeft: 5,
    fontSize: 16,
  },
  body: {
    paddingHorizontal: 15,
  },
  btn: {
    backgroundColor: colors.ERROR,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2.5,
  },
});
