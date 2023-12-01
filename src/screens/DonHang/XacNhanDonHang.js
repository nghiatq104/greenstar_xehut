import moment from "moment";
import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Block from "../../components/Block";
import Footer from "../../components/Footer";
import { mainActions } from "../../state/main";
import { colors, styles as shareStyles } from "../../theme";

class XacNhanDonHang extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Xác nhận điều phối",
    };
  };

  handleSubmit = () => {
    const { navigation, taoDonHang, suaLichXe } = this.props;
    const draft = navigation.getParam("draft");
    const canEdit = navigation.getParam("canEdit");
    if (canEdit) {
      console.log("cap nhat lich xe", +canEdit);
      suaLichXe({
        id: +canEdit,
        details: draft,
      });
    } else {
      taoDonHang(draft);
    }
  };
  render() {
    const { navigation, taoDonHang } = this.props;
    const draft = navigation.getParam("draft");
    const canEdit = navigation.getParam("canEdit");
    return (
      <Block
        flex={1}
        style={{ backgroundColor: colors.GRAY3, paddingHorizontal: 5 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block
            style={[
              styles.cate,
              {
                marginTop: 5,
              },
            ]}
          >
            <Text style={[styles.title]}>Thông tin điều phối</Text>
            <Block style={shareStyles.wrap}>
              <Text style={styles.txt}>
                Ngày làm việc:{" "}
                <Text>{moment(draft.ngay_lam_viec).format("DD/MM/YYYY")}</Text>
              </Text>
              <Text style={styles.txt}>
                Ca làm việc: <Text>{draft.ca_lam_viec.label}</Text>
              </Text>
              <Text style={styles.txt}>
                Giờ xuất phát:{" "}
                <Text>{moment(draft.gio_xuat_phat).format("HH:mm")}</Text>
              </Text>
            </Block>
          </Block>
          <Block style={styles.cate}>
            <Item label="Khu vực" value={draft.khu_vuc.label} />
            <Text style={[styles.title]}>Khách hàng</Text>
            <Block style={shareStyles.wrap}>
              <Text style={styles.txt}>{draft.khach_hangs.ten}</Text>
            </Block>
          </Block>
          <Block style={styles.cate}>
            <Text style={[styles.title]}>Xe</Text>
            <Block style={shareStyles.wrap}>
              <Text style={styles.txt}>{draft.danh_sach_xe.label}</Text>
            </Block>
          </Block>

          <Block style={[styles.cate, { marginBottom: 10 }]}>
            <Item label="Loại hàng hoá" value={draft.loai_hang_hoa} />
            <Item label="Khối lượng dự kiến" value={draft.kl_du_kien} />
            <Item label="Nơi lưu chứa" value={draft.noi_luu_chua} />
            <Item label="Nơi xả" value={draft.noi_xa} />
            {/* <Text style={[styles.title]}>Ghi chú</Text> */}
            {/* <View style={shareStyles.wrap}>
              <Text style={styles.txt}>
                {draft.ghi_chu ? draft.ghi_chu : "Không có ghi chú"}
              </Text>
            </View> */}
          </Block>
          <Footer
            onPress={this.handleSubmit}
            label={canEdit ? "Cập nhật điều phối" : "Tạo điều phối"}
          />
        </ScrollView>
      </Block>
    );
  }
}

const Item = ({ label, value }) => {
  return (
    <View>
      <Text style={[styles.title]}>{label}</Text>
      <View
        style={[
          shareStyles.wrap,
          {
            marginBottom: 10,
          },
        ]}
      >
        <Text style={styles.txt}>{value ? value : "Chưa có"}</Text>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      taoDonHang: mainActions.taoDonHang,
      suaLichXe: mainActions.suaDonHang,
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(XacNhanDonHang);

XacNhanDonHang.navigationOptions = () => {
  return {
    headerTitle: "Xác nhận lịch xe",
  };
};

const styles = StyleSheet.create({
  cate: {
    padding: 15,
    backgroundColor: "white",
    marginBottom: 5,
    marginHorizontal: 1,
    ...shareStyles.shadow,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    ...shareStyles.bold,
  },
  txt: {
    fontSize: 16,
    marginBottom: 1,
  },
});
