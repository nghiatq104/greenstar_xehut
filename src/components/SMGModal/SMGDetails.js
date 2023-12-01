import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Feather";
import IconFA from "react-native-vector-icons/FontAwesome5";
import { colors, styles as ShareStyles } from "../../theme";
import { scale, verticalScale } from "../../utils/responsive";
import Block from "../Block";

const { width, height } = Dimensions.get("window");

const SMGDetails = ({
  chi_tiet_dieu_phoi,
  optional,
  showStatusDescription,
}) => {
  const [isVisible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <View style={styles.container}>
      <Block row style={styles.detailsContainer} onPress={showModal}>
        <Block row center>
          <Icon name="trello" size={22} />
          <Text style={styles.txtDetails}>Chi tiết</Text>
        </Block>
        {optional ? (
          <Block row>
            <Block row style={styles.box2}>
              <IconFA name="calendar-check" size={18} />
              <Text style={styles.countTxt}>
                {chi_tiet_dieu_phoi.don_dieu_phoi}
              </Text>
            </Block>
            <Block row style={styles.box2}>
              <IconFA name="truck-moving" size={18} />
              <Text style={styles.countTxt}>{chi_tiet_dieu_phoi.xe}</Text>
            </Block>
            <Block row style={styles.box2}>
              <IconFA name="people-carry" size={18} />
              <Text style={styles.countTxt}>
                {chi_tiet_dieu_phoi.cong_nhan}
              </Text>
            </Block>
            <Block row style={styles.box2}>
              <IconFA name="walking" size={18} />
              <Text style={styles.countTxt}>{chi_tiet_dieu_phoi.thoi_vu}</Text>
            </Block>
          </Block>
        ) : (
          <Block row>
            <Block row style={styles.box2}>
              <IconFA name="calendar-check" size={18} />
              <Text style={styles.countTxt}>
                {chi_tiet_dieu_phoi.don_dieu_phoi}
                {`/${chi_tiet_dieu_phoi.don_dat_hang}`}
              </Text>
            </Block>
            <Block row style={styles.box2}>
              <IconFA name="truck-moving" size={18} />
              <Text style={styles.countTxt}>
                {chi_tiet_dieu_phoi.xe}
                {`/${chi_tiet_dieu_phoi.yeu_cau_xe}`}
              </Text>
            </Block>
            <Block row style={styles.box2}>
              <IconFA name="people-carry" size={18} />
              <Text style={styles.countTxt}>
                {chi_tiet_dieu_phoi.cong_nhan}/
                {chi_tiet_dieu_phoi.yeu_cau_cong_nhan}
              </Text>
            </Block>
            <Block row style={styles.box2}>
              <IconFA name="walking" size={18} />
              <Text style={styles.countTxt}>
                {chi_tiet_dieu_phoi.thoi_vu}/
                {chi_tiet_dieu_phoi.yeu_cau_thoi_vu}
              </Text>
            </Block>
          </Block>
        )}

        <Modal
          isVisible={isVisible}
          onBackdropPress={hideModal}
          onBackButtonPress={hideModal}
          avoidKeyboard
          useNativeDriver
        >
          <Block flex={1} center middle>
            <Block
              style={{
                width: 0.9 * width,
                backgroundColor: "white",
                borderRadius: 5,
              }}
            >
              <Block
                middle
                center
                style={{
                  height: 50,
                  backgroundColor: colors.GRAY3,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    color: colors.BLACK,
                  }}
                >
                  Chi tiết điều phối {optional ? "công việc" : "lịch xe"}
                </Text>
              </Block>
              <Block padding={[10, 10]}>
                {optional ? (
                  <>
                    <Text style={styles.cate}>Số công việc</Text>
                    <Block row style={styles.box}>
                      <IconFA
                        name="calendar"
                        size={18}
                        style={styles.preIcon}
                      />
                      <Text style={styles.countTxt}>
                        <Text style={styles.mark}>
                          {chi_tiet_dieu_phoi.don_dieu_phoi}
                        </Text>{" "}
                        công việc
                      </Text>
                    </Block>
                    <Text style={styles.cate}>Tổng điều động</Text>
                    <Block row style={styles.box}>
                      <IconFA
                        name="truck-moving"
                        size={18}
                        style={styles.preIcon}
                      />
                      <Text style={styles.countTxt}>
                        <Text style={styles.mark}>{chi_tiet_dieu_phoi.xe}</Text>{" "}
                        xe
                      </Text>
                    </Block>
                    <Block row style={styles.box}>
                      <IconFA
                        name="people-carry"
                        size={18}
                        style={styles.preIcon}
                      />
                      <Text style={styles.countTxt}>
                        <Text style={styles.mark}>
                          {chi_tiet_dieu_phoi.cong_nhan}
                        </Text>{" "}
                        công nhân
                      </Text>
                    </Block>
                    <Block row style={styles.box}>
                      <IconFA name="walking" size={18} style={styles.preIcon} />
                      <Text style={styles.countTxt}>
                        <Text style={styles.mark}>
                          {chi_tiet_dieu_phoi.thoi_vu}
                        </Text>{" "}
                        thời vụ
                      </Text>
                    </Block>
                  </>
                ) : (
                  <>
                    <Text style={styles.cate}>Đã xử lý</Text>
                    <Block row style={styles.box}>
                      <IconFA
                        name="calendar"
                        size={18}
                        style={styles.preIcon}
                      />
                      <Text style={styles.countTxt}>
                        <Text style={styles.mark}>
                          {chi_tiet_dieu_phoi.don_dieu_phoi}/
                          {chi_tiet_dieu_phoi.don_dat_hang}
                        </Text>{" "}
                        lịch xe
                      </Text>
                    </Block>
                    <Text style={styles.cate}>Tổng điều động</Text>
                    <Block row style={styles.box}>
                      <IconFA
                        name="truck-moving"
                        size={18}
                        style={styles.preIcon}
                      />
                      <Text style={styles.countTxt}>
                        <Text style={styles.mark}>
                          {chi_tiet_dieu_phoi.xe}/
                          {chi_tiet_dieu_phoi.yeu_cau_xe}
                        </Text>{" "}
                        xe
                      </Text>
                    </Block>
                    <Text style={styles.cate}>Yêu cầu</Text>
                    <Block row style={styles.box}>
                      <IconFA
                        name="people-carry"
                        size={18}
                        style={styles.preIcon}
                      />
                      <Text style={styles.countTxt}>
                        <Text style={styles.mark}>
                          {chi_tiet_dieu_phoi.yeu_cau_cong_nhan}
                        </Text>{" "}
                        công nhân
                      </Text>
                    </Block>
                    <Block row style={styles.box}>
                      <IconFA name="walking" size={18} style={styles.preIcon} />
                      <Text style={styles.countTxt}>
                        <Text style={styles.mark}>
                          {chi_tiet_dieu_phoi.yeu_cau_thoi_vu}
                        </Text>{" "}
                        thời vụ
                      </Text>
                    </Block>
                  </>
                )}
              </Block>
              <Block
                row
                style={{
                  backgroundColor: colors.GRAY3,
                  height: 50,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                }}
              >
                <Block flex={1} middle center onPress={hideModal}>
                  <Text style={{ fontSize: 18, color: colors.ERROR }}>
                    Xong
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </Modal>
      </Block>
      {showStatusDescription ? (
        <Block
          row
          space="around"
          style={{
            marginBottom: 8,
          }}
        >
          <Block row center>
            <View
              style={[
                styles.block,
                {
                  backgroundColor: colors.WARNING,
                },
              ]}
            />
            <Text style={styles.mark}>Mới tạo</Text>
          </Block>
          <Block row center>
            <View
              style={[
                styles.block,
                {
                  backgroundColor: colors.PRIMARY,
                },
              ]}
            />
            <Text style={styles.mark}>Đã điều phối</Text>
          </Block>
          <Block row center>
            <View
              style={[
                styles.block,
                {
                  backgroundColor: colors.ERROR,
                },
              ]}
            />
            <Text style={styles.mark}>Đã huỷ</Text>
          </Block>
        </Block>
      ) : null}
    </View>
  );
};

export default SMGDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    ...ShareStyles.shadow,
  },
  detailsContainer: {
    paddingTop: 10,
    paddingBottom: 5,
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  countTxt: {
    fontSize: 16,
    marginLeft: 5,
  },
  txtDetails: {
    fontSize: 16,
    marginLeft: 5,
  },
  box: {
    marginLeft: verticalScale(17.5),
    marginVertical: 2.5,
  },
  box2: {
    marginLeft: verticalScalele(8),
  },
  preIcon: {
    width: scale(30),
  },
  mark: {
    color: colors.ERROR,
  },
  cate: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "500",
    marginVertical: 5,
  },
  block: {
    width: 20,
    height: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: colors.PRIMARY,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  mark: {
    fontWeight: Platform.select({ android: "bold", ios: "700" }),
    marginLeft: 5,
  },
});
