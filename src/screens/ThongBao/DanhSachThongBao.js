import moment from "moment";
import "moment/locale/vi";
import React, { Component } from "react";
import { FlatList, RefreshControl, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Block from "../../components/Block";
import { mainActions } from "../../state/main";
import { colors } from "../../theme";

moment.locale("vi");
const getTheme = (item) => {
  let color;
  let message;
  let icon;
  const isLeft = item.message.includes("mới");

  let coms = "";
  if (item.khach_hangs && item.khach_hangs.length) {
    item.khach_hangs.map((el) => (coms += el + ", "));
  }
  switch (item.notification_type) {
    case "dynamic":
      icon = "message-circle";
      message = (
        <>
          <Text style={styles.text} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.text}>{item.message}</Text>
        </>
      );
      color = colors.WARNING;
      break;

    default:
      if (isLeft) {
        icon = "file-plus";
        color = colors.PRIMARY;
      } else {
        icon = "file-minus";
        color = colors.ERROR;
      }
      message =
        item.khach_hangs && item.khach_hangs.length ? (
          isLeft ? (
            <Text style={{ fontSize: 16 }} numberOfLines={2}>
              Công việc{" "}
              <Text style={[{ color: colors.PRIMARY }, styles.bold]}>mới</Text>{" "}
              được điều phối{" "}
              <Text style={styles.bold}>
                {item.tong_xe ? item.tong_xe + " xe" : ""}
              </Text>{" "}
              tới <Text style={styles.bold}>{coms.slice(0, -2)}</Text>
            </Text>
          ) : (
            <Text style={{ fontSize: 16 }} numberOfLines={2}>
              <Text style={[{ color: colors.ERROR }, styles.bold]}>Đã huỷ</Text>{" "}
              công việc tới <Text style={styles.bold}>{coms.slice(0, -2)}</Text>
            </Text>
          )
        ) : (
          <Text style={styles.text} numberOfLines={2}>
            {item.message}
          </Text>
        );
      break;
  }

  return [color, message, icon];
};

class DanhSachThongBao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideReaded: false,
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Thông báo",
      headerRight: () => {
        const hideReaded = navigation.getParam("hideReaded");
        const toggle = navigation.getParam("toggle");
        return (
          <Block onPress={toggle} style={{ marginRight: 15 }}>
            <Icon name={hideReaded ? "bell" : "bell-off"} size={20} />
          </Block>
        );
      },
    };
  };

  toggle = () =>
    this.setState(
      (prev) => ({
        hideReaded: !prev.hideReaded,
      }),
      () =>
        this.props.navigation.setParams({
          hideReaded: this.state.hideReaded,
        })
    );

  componentDidMount() {
    const { layDSThongBao, navigation } = this.props;
    // layDSThongBao();
    navigation.setParams({
      hideReaded: this.state.hideReaded,
      toggle: this.toggle,
    });
  }

  onRead = (asRead, id, id_cong_viec) => () => {
    if (this.props.profile?.role_id == 2) {
      return !asRead && this.props.docThongBao(id);
    }
    if (!asRead) {
      if (id_cong_viec) {
        this.props.navigation.navigate("ChiTietCongViec", {
          id_cong_viec,
          id_thong_bao: id,
        });
      } else {
        this.props.docThongBao(id);
      }
    } else {
      if (id_cong_viec) {
        this.props.navigation.navigate("ChiTietCongViec", {
          id_cong_viec,
        });
      }
    }
  };

  hienThiDSThongBao = ({ item, index }) => {
    const asRead = item.read_at ? 1 : 0;
    const creata_at = moment(item.created_at, "YYYY-MM-DD hh:mm:ss");
    const isAfterYes = creata_at.isBefore(moment().subtract("days", 1));
    const leftString = `${creata_at.format("D")} thg ${creata_at.format(
      "M"
    )} lúc ${creata_at.format("HH:mm")}`;

    const [color, message, icon] = getTheme(item);

    return (
      <Block
        row
        style={[
          styles.item,
          {
            backgroundColor: asRead ? colors.WHITE : colors.NOTI_UNREAD,
            borderBottomColor: asRead ? colors.WHITE : colors.GRAY3,
          },
        ]}
        onPress={() => {
          if (item.notification_type !== "dynamic") {
            this.onRead(asRead, item.id, item.stop_id)();
          }
        }}
      >
        <Block style={styles.icon} middle center>
          <Block style={[styles.border]} middle center>
            <Icon name={icon} size={25} color={color} />
          </Block>
        </Block>
        <Block style={{ paddingLeft: 15 }} flex={1}>
          {message}
          <Text style={styles.subText}>
            {isAfterYes ? leftString : creata_at.fromNow()}
          </Text>
        </Block>
      </Block>
    );
  };

  render() {
    const { navigation, danh_sach_thong_bao, layDSThongBao } = this.props;
    const { hideReaded } = this.state;
    return (
      <Block
        flex={1}
        style={{
          backgroundColor: colors.WHITE,
        }}
      >
        <FlatList
          data={
            hideReaded
              ? danh_sach_thong_bao.filter((e) => !e.read_at)
              : danh_sach_thong_bao
          }
          keyExtractor={(item, index) => index + ""}
          renderItem={this.hienThiDSThongBao}
          ListEmptyComponent={
            <Block middle center flex={1}>
              <Block row style={{ marginTop: 20 }}>
                <Icon name="bell" size={22} color={colors.ERROR} />
                <Text style={{ marginLeft: 10, fontSize: 16 }}>
                  {hideReaded
                    ? "Chưa có thông báo chưa đọc nào"
                    : "Chưa có thông báo nào"}
                </Text>
              </Block>
            </Block>
          }
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={layDSThongBao}
              color={colors.PRIMARY}
            />
          }
        />
      </Block>
    );
  }
}

const mapStateToProps = (state) => ({
  danh_sach_thong_bao: state.main.danh_sach_thong_bao,
  profile: state.auth.profile,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      layDSThongBao: mainActions.layDSThongBao,
      docThongBao: mainActions.docThongBao,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DanhSachThongBao);

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: colors.GRAY3,
    borderBottomWidth: 3 * StyleSheet.hairlineWidth,
  },
  icon: {
    width: 40,
  },
  border: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: colors.GRAY3,
    borderWidth: 3 * StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 16,
  },
  subText: {
    fontSize: 13,
    marginTop: 3,
  },
  bold: {
    fontWeight: "bold",
  },
});
