import _ from 'lodash';
import moment from 'moment';
import React, {Component} from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Colors, Picker, Text as TxT} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import Block from '../../components/Block';
import Footer from '../../components/Footer';
import {colors, styles as sharedStyles} from '../../theme';

const {width, height} = Dimensions.get('window');
const options = [
  {label: 'Ca sáng', value: '1'},
  {label: 'Ca chiều', value: '2'},
];

class DonHang extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: navigation.getParam('itemEditting')
        ? 'Chỉnh sửa điều phối'
        : 'Tạo điều phối',
    };
  };

  constructor(props) {
    super(props);
    const timestamp = props.form_data.ca.length
      ? props.form_data.ca[1].bat_dau
      : '13:58:05';
    this.state = {
      show: false,
      show2: false,
      ngay_lam_viec: moment().isAfter(moment(timestamp, 'HH:mm:ss'))
        ? new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        : new Date(),
      gio_xuat_phat: new Date(),
      mode: 'date',
      ca_lam_viec: moment().isSameOrBefore(moment(timestamp, 'HH:mm:ss'))
        ? options[1]
        : options[0],
      khu_vuc: null,
      khach_hang: [],
      danh_sach_khach_hang: [],
      danh_sach_xe: null,
      vat_tu: [],
      ghi_chu: '',
      loai_hang_hoa: '',
      kl_du_kien: '0',
      noi_luu_chua: '',
      noi_xa: '',
      danh_sach_ca_lam_viec: [],
      da_chon_khach_hang: true,
      da_chon_xe: true,
      da_nhap_hang_hoa: true,
      editID: null,
      khach_hangs: null,
    };
  }

  componentDidMount() {
    const {navigation, form_data} = this.props;
    const {vat_tu, ca, xe} = form_data;

    const itemEditting = navigation.getParam('itemEditting');

    if (itemEditting) {
      const {
        dieu_phoi_id,
        ca_id,
        xedieuphois,
        ngay,
        khachhangdieuphois,
        loai_hang_hoa,
        khoi_luong_du_kien,
        noi_luu_chua,
        noi_xa,
        khuvuc,
      } = itemEditting;
      const {data} = this.props.form_data.khach_hang[khuvuc.ten];
      this.setState({
        editID: dieu_phoi_id,
        danh_sach_ca_lam_viec: ca.map((el) => ({
          ...el,
          label: el.ten,
          value: el.id,
        })),
        ngay_lam_viec: moment(ngay, 'YYYY-MM-DD').toDate(),
        ca_lam_viec: ca_id == 1 ? options[0] : options[1],
        gio_xuat_phat: xedieuphois?.length
          ? moment(xedieuphois[0].gio_xuat_phat, 'HH:mm:ss').toDate()
          : new Date(),
        khu_vuc: {
          label: khuvuc.ten,
          value: khuvuc.ten,
        },
        khach_hangs: data.find(
          (el) => el.id === khachhangdieuphois[0].khach_hang_id,
        ),

        danh_sach_xe:
          xedieuphois.length != 0
            ? xe.find((item) => item.id === xedieuphois[0].xe_id)
            : null,
        ghi_chu: '',
        loai_hang_hoa: loai_hang_hoa ?? '',
        kl_du_kien: khoi_luong_du_kien ? khoi_luong_du_kien + '' : '0',
        noi_luu_chua: noi_luu_chua ?? '',
        noi_xa: noi_xa ?? '',
      });
    } else {
      this.setState({
        // vat_tu: vat_tu.map(el => ({ ...el, so_luong: 0 })),
        danh_sach_ca_lam_viec: ca.map((el) => ({
          ...el,
          label: el.ten,
          value: el.id,
        })),
      });
    }
  }

  setDate = (date) => {
    this.setState({
      show: false,
      ngay_lam_viec: date,
    });
  };

  show = () => {
    this.setState({
      show: true,
    });
  };
  hide = () => {
    this.setState({
      show: false,
    });
  };

  onSelectCar = (arr) => {
    this.setState((prev) => ({
      danh_sach_xe: arr,
    }));
  };
  onSelectTools = (arr) => {
    this.setState((prev) => ({
      vat_tu: arr,
    }));
  };

  show2 = () => {
    this.setState({
      show2: true,
    });
  };

  setDate2 = (date) => {
    this.setState({
      show2: false,
      gio_xuat_phat: date,
    });
  };

  hide2 = () => {
    this.setState({
      show2: false,
    });
  };

  render() {
    const {
      show,
      show2,
      ngay_lam_viec,
      ca_lam_viec,
      mode,
      gio_xuat_phat,
      danh_sach_khach_hang,
      danh_sach_xe,
      danh_sach_ca_lam_viec,
      ghi_chu,
      da_chon_khach_hang,
      da_chon_xe,
      loai_hang_hoa,
      kl_du_kien,
      noi_luu_chua,
      noi_xa,
      khu_vuc,
      khach_hangs,
      da_nhap_hang_hoa,
    } = this.state;
    const {
      navigation,
      form_data: {khach_hang, chat_thai, xe},
    } = this.props;

    return (
      <Block
        style={{backgroundColor: colors.GRAY3, paddingHorizontal: 5}}
        flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={[styles.cate, {marginTop: 5}]}>
            <Block onPress={this.show} style={{marginBottom: 10}}>
              <TxT marginB-10 style={styles.title}>
                Chọn ngày làm việc
              </TxT>
              <Text black style={styles.date}>
                {moment(ngay_lam_viec).format('DD/MM/YYYY')}
              </Text>
            </Block>
            <Block onPress={this.show2} style={{marginBottom: 10}}>
              <TxT marginB-10 style={styles.title}>
                Chọn thời gian xuất phát
              </TxT>
              <Text black style={styles.date}>
                {moment(gio_xuat_phat).format('HH:mm')}
              </Text>
            </Block>
            <TxT marginB-10 style={styles.title}>
              Chọn ca làm việc
            </TxT>
            <Picker
              value={ca_lam_viec}
              placeholder="Ấn để chọn"
              enableModalBlur={false}
              onChange={(ca_lam_viec) => this.setState({ca_lam_viec})}
              topBarProps={{title: 'Chọn ca làm việc'}}
              style={{color: Colors.black}}
              searchStyle={{
                color: Colors.blue30,
                placeholderTextColor: Colors.dark50,
              }}
              // onSearchChange={value => console.warn('value', value)}
            >
              {_.map(danh_sach_ca_lam_viec, (option) => (
                <Picker.Item
                  key={option.value}
                  value={option}
                  disabled={option.disabled}
                />
              ))}
            </Picker>

            <DateTimePicker
              isVisible={show}
              onConfirm={this.setDate}
              onCancel={this.hide}
              date={ngay_lam_viec}
              locale="vi"
              confirmTextIOS="Chọn"
              cancelTextIOS="Huỷ"
              titleIOS="Chọn ngày"
            />

            <DateTimePicker
              titleIOS="Chọn thời gian"
              isVisible={show2}
              mode="time"
              onConfirm={this.setDate2}
              onCancel={this.hide2}
              date={gio_xuat_phat}
              locale="vi"
              confirmTextIOS="Chọn"
              cancelTextIOS="Huỷ"
            />
          </Block>

          <Block
            style={[
              styles.cate,
              !da_chon_khach_hang && {borderRightColor: colors.ERROR},
            ]}>
            <TxT marginB-10 style={styles.title}>
              Chọn khu vực
            </TxT>
            <Picker
              value={khu_vuc}
              placeholder="Ấn để chọn"
              enableModalBlur={false}
              onChange={(khu_vuc) => {
                this.setState({khu_vuc, khach_hangs: null});
              }}
              topBarProps={{title: 'Chọn khu vực'}}
              style={{color: Colors.black}}
              searchStyle={{
                color: Colors.blue30,
                placeholderTextColor: Colors.dark50,
              }}
              showSearch>
              {_.map(
                Object.keys(khach_hang).map((el) => ({
                  label: el,
                  value: el,
                })),
                (option) => (
                  <Picker.Item key={option} value={option} />
                ),
              )}
            </Picker>
            <TxT style={[styles.title]}>Chọn khách hàng</TxT>
            <Picker
              value={khach_hangs}
              placeholder="Ấn để chọn"
              enableModalBlur={false}
              onChange={(khach_hangs) => this.setState({khach_hangs})}
              topBarProps={{title: 'Chọn khách hàng'}}
              style={{color: Colors.black}}
              searchStyle={{
                color: Colors.blue30,
                placeholderTextColor: Colors.dark50,
              }}
              showSearch>
              {khu_vuc && khach_hang[khu_vuc.value]
                ? _.map(khach_hang[khu_vuc.value].data, (option) => (
                    <Picker.Item key={option} value={option} />
                  ))
                : null}
            </Picker>
          </Block>

          <Block
            style={[
              styles.cate,
              !da_chon_xe && {borderRightColor: colors.ERROR},
            ]}>
            <TxT
              style={[
                styles.title,
                {
                  marginTop: 10,
                },
              ]}>
              Chọn xe
            </TxT>
            <Picker
              value={danh_sach_xe}
              placeholder="Ấn để chọn"
              enableModalBlur={false}
              onChange={(danh_sach_xe) => this.setState({danh_sach_xe})}
              topBarProps={{title: 'Chọn ca làm việc'}}
              style={{color: Colors.black}}
              mode="SINGLE"
              searchStyle={{
                color: Colors.blue30,
                placeholderTextColor: Colors.dark50,
              }}
              showSearch>
              {_.map(xe, (option) => (
                <Picker.Item
                  key={option.value}
                  value={option}
                  disabled={option.disabled}
                />
              ))}
            </Picker>
          </Block>

          <Block style={[styles.cate]}>
            <Text style={[styles.title, {marginBottom: 10}]}>
              Loại hàng hoá
            </Text>
            <TextInput
              underlineColorAndroid={
                da_nhap_hang_hoa ? colors.GRAY2 : colors.ERROR
              }
              style={[
                Platform.select({
                  ios: [
                    styles.input,
                    {
                      borderBottomColor: da_nhap_hang_hoa
                        ? colors.GRAY2
                        : colors.ERROR,
                    },
                  ],
                  android: {},
                }),
                {
                  marginBottom: 5,
                },
              ]}
              placeholder="Ấn để nhập..."
              scrollEnabled
              placeholderTextColor={colors.GRAY}
              value={loai_hang_hoa}
              onChangeText={(loai_hang_hoa) => this.setState({loai_hang_hoa})}
            />
            <Text style={[styles.title, {marginBottom: 10}]}>
              Khối lượng dự kiến
            </Text>
            <TextInput
              underlineColorAndroid={colors.GRAY2}
              style={[
                Platform.select({
                  ios: styles.input,
                  android: {},
                }),
                {
                  marginBottom: 5,
                },
              ]}
              placeholder="Ấn để nhập..."
              scrollEnabled
              keyboardType="numeric"
              placeholderTextColor={colors.GRAY}
              value={kl_du_kien}
              onChangeText={(kl_du_kien) => this.setState({kl_du_kien})}
            />
            <Text style={[styles.title, {marginBottom: 10}]}>Nơi lưu chứa</Text>
            <TextInput
              underlineColorAndroid={colors.GRAY2}
              style={[
                Platform.select({
                  ios: styles.input,
                  android: {},
                }),
                {
                  marginBottom: 5,
                },
              ]}
              placeholder="Ấn để nhập..."
              scrollEnabled
              placeholderTextColor={colors.GRAY}
              value={noi_luu_chua}
              onChangeText={(noi_luu_chua) => this.setState({noi_luu_chua})}
            />
            <Text style={[styles.title, {marginBottom: 10}]}>Nơi xả</Text>
            <TextInput
              underlineColorAndroid={colors.GRAY2}
              style={[
                Platform.select({
                  ios: styles.input,
                  android: {},
                }),
                {
                  marginBottom: 5,
                },
              ]}
              placeholder="Ấn để nhập..."
              scrollEnabled
              placeholderTextColor={colors.GRAY}
              value={noi_xa}
              onChangeText={(noi_xa) => this.setState({noi_xa})}
            />
            {/* <Text style={[styles.title, { marginBottom: 10 }]}>Ghi chú</Text>
            <TextInput
              style={styles.note}
              multiline
              placeholder="Ấn để nhập ghi chú..."
              scrollEnabled
              placeholderTextColor={colors.GRAY}
              value={ghi_chu}
              onChangeText={(ghi_chu) => this.setState({ ghi_chu })}
            /> */}
          </Block>
          <Footer onPress={this.handleSubmit} />
        </ScrollView>
      </Block>
    );
  }

  handleSubmit = () => {
    const {khach_hangs, danh_sach_xe, loai_hang_hoa, khu_vuc} = this.state;
    if (!khu_vuc || khu_vuc.length === 0) {
      this.setState({da_chon_khach_hang: false});
      return showMessage({
        message: 'Bạn chưa chọn khu vực',
        type: 'danger',
        icon: {icon: 'danger', position: 'left'},
      });
    }

    this.setState({da_chon_khach_hang: true});
    if (!khach_hangs || khach_hangs.length === 0) {
      this.setState({da_chon_khach_hang: false});
      return showMessage({
        message: 'Bạn chưa chọn khách hàng',
        type: 'danger',
        icon: {icon: 'danger', position: 'left'},
      });
    }

    this.setState({da_chon_khach_hang: true});

    if (!danh_sach_xe) {
      this.setState({da_chon_xe: false});
      return showMessage({
        message: 'Bạn chưa chọn xe',
        type: 'danger',
        icon: {icon: 'danger', position: 'left'},
      });
    }

    this.setState({da_chon_xe: true});

    if (!loai_hang_hoa) {
      this.setState({da_nhap_hang_hoa: false});
      return showMessage({
        message: 'Bạn chưa nhập loại hàng hoá',
        type: 'danger',
        icon: {icon: 'danger', position: 'left'},
      });
    }

    this.setState({da_nhap_hang_hoa: true});
    const itemEditting = this.props.navigation.getParam('itemEditting');
    if (itemEditting?.xedieuphois.length) {
      this.props.navigation.navigate('XacNhanDonHang', {
        draft: {
          ...this.state,
          dieu_phoi_id: itemEditting ? itemEditting.dieu_phoi_id : null,
        },
        canEdit: itemEditting?.id,
      });
    } else {
      this.props.navigation.navigate('XacNhanDonHang', {
        draft: {
          ...this.state,
          don_dieu_phoi_id: itemEditting ? itemEditting.id : null,
        },
        canEdit: false,
      });
    }
  };

  handleChange = (key, idx, step, min = 0) => () => {
    let newValue =
      idx !== null ? this.state[key][idx].so_luong : +this.state[key];
    newValue = _.max([newValue + step, min]);
    if (idx !== null) this.state[key][idx].so_luong = newValue;
    else this.state[key] = `${newValue}`;
    if (key === 'vat_tu') {
      this.setState({});
    } else this.setState({});
  };

  onChange = (key, idx) => (value) => {
    if (idx !== null) this.state[key][idx].so_luong = value;
    else {
      this.state[key] = `${value}`;
    }
    this.setState({});
  };

  onDelete = (id) => () => {
    this.state.danh_sach_xe.splice(id, 1);
    this.setState({});
  };

  hienThiDanhSachXeDaChon = () => {
    const {danh_sach_xe} = this.state;
    return danh_sach_xe.map((el, idx) => (
      <Block key={idx} style={styles.item} row center space="between">
        <Text style={styles.itemT}>
          {el.ten}- {el.dong_xe.gia_tri} tấn
        </Text>
        <TouchableOpacity onPress={this.onDelete(idx)}>
          <Icon name="x" color={colors.ERROR} size={24} />
        </TouchableOpacity>
      </Block>
    ));
  };
}

const mapStateToProps = (state) => ({
  form_data: state.main.form_data,
});

export default connect(mapStateToProps)(DonHang);

const styles = StyleSheet.create({
  cate: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    ...sharedStyles.shadow,
    marginBottom: 10,
    borderRightColor: colors.WHITE,
    borderRightWidth: 4,
    borderRadius: 4,
    marginHorizontal: 0.5,
  },
  title: {
    fontSize: 16,
    ...sharedStyles.bold,
    marginBottom: 7,
    marginTop: 3,
  },
  header: {
    position: 'absolute',
    width,
    top: 0,
    left: 0,
    height: 50,
  },
  note: {
    borderWidth: 2 * StyleSheet.hairlineWidth,
    color: colors.BLACK,
    borderColor: colors.GRAY2,
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 10,
    borderRadius: 4,
    minHeight: 60,
  },
  date: {
    fontSize: 16,
    color: colors.IOS_BTN,
  },
  input: {
    borderBottomColor: colors.GRAY3,
    borderBottomWidth: 0.8,
    paddingBottom: 10,
  },
  item: {
    paddingVertical: 7.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.GRAY2,
  },
  itemT: {
    fontSize: 16,
  },
});
