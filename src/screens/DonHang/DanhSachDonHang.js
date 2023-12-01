import moment from 'moment';
import React, {Component} from 'react';
import {
  ActionSheetIOS,
  Alert,
  FlatList,
  Picker,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Feather';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Block from '../../components/Block';
import {mainActions} from '../../state/main';
import {colors, styles as preStyles} from '../../theme';
import * as NavigationService from '../../utils/NavigationService';
import {scale} from '../../utils/responsive';

class Bills extends Component {
  static navigationOptions = ({navigation}) => {
    if (Platform.OS === 'android')
      return {
        headerTitle: 'Danh sách điều phối',
        headerRight: () => (
          <Block
            center
            row
            style={{
              transform: [{translateX: Platform.OS === 'android' ? 70 : 0}],
            }}>
            <Block onPress={navigation.getParam('handleChange')} row center>
              <Icon name="calendar" size={16} />
              <Text>{navigation.getParam('dateString')}</Text>
            </Block>

            <Picker
              style={{height: 50, width: 150}}
              mode="dropdown"
              selectedValue={navigation.getParam('ca')}
              onValueChange={navigation.getParam('pickerChange')}>
              <Picker.Item label="Ca Sáng" value={1} />
              <Picker.Item label="Ca Chiều" value={2} />
            </Picker>
          </Block>
        ),
      };
    return {
      headerTitle: 'Danh sách điều phối',
      headerLeft: () => {
        return (
          <Block onPress={navigation.getParam('handleChange')} row center>
            <Icon
              name="calendar"
              size={16}
              style={{marginLeft: 10}}
              color={colors.IOS_BTN}
            />
            <Text
              style={{
                marginLeft: 5,
                ...preStyles.bold,
                color: colors.IOS_BTN,
              }}>
              {navigation.getParam('dateString')}
            </Text>
          </Block>
        );
      },
      headerRight: () => (
        <Block center row>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => {
              ActionSheetIOS.showActionSheetWithOptions(
                {
                  options: ['Huỷ', 'Ca sáng', 'Ca chiều'],
                  cancelButtonIndex: 0,
                },
                navigation.getParam('pickerChange'),
              );
            }}>
            <Text style={{...preStyles.bold, color: colors.IOS_BTN}}>
              {navigation.getParam('ca') === 1 ? 'Ca sáng' : 'Ca chiều'}
            </Text>
          </TouchableOpacity>
        </Block>
      ),
    };
  };
  constructor(props) {
    super(props);
    const timestamp = props.form_data.ca.length
      ? props.form_data.ca[1].bat_dau
      : '13:58:05';
    this.state = {
      refreshing: false,
      show: false,
      showDetailsModal: false,
      date: new Date(),
      mode: 'date',
      ca: moment().isSameOrBefore(moment(timestamp, 'HH:mm:ss')) ? 1 : 2,
    };
  }

  setDate = (date) => {
    const prevDate = moment(this.state.date).format('DD/MM/YYYY');
    const nowDate = moment(date).format('DD/MM/YYYY');
    const {capNhatNgayHienTai, layDSDonHang, navigation} = this.props;

    if (prevDate !== nowDate) {
      capNhatNgayHienTai(moment(date).format('YYYY-MM-DD'));
      layDSDonHang(moment(date).format('YYYY-MM-DD'));
      this.setState(
        {
          show: false,
          date,
        },
        () => {
          navigation.setParams({
            dateString: moment(date).format('DD/MM'),
          });
        },
      );
    } else {
      this.setState({
        show: false,
      });
    }
  };

  setCa = (ca) => {
    const {capNhatCaHienTai, navigation} = this.props;
    if (ca) {
      navigation.setParams({ca});
      if (this.state.ca !== ca) {
        capNhatCaHienTai(ca);
        this.setState({ca});
      }
    }
  };

  show = () => this.setState({show: true});
  hide = () => this.setState({show: false});

  showDetails = () => this.setState({showDetailsModal: true});
  hideDetails = () => this.setState({showDetailsModal: false});

  UNSAFE_componentWillMount() {
    this.props.navigation.setParams({
      handleChange: this.show,
      dateString: moment().format('DD/MM'),
      ca: this.state.ca,
      pickerChange: this.setCa,
    });
  }

  componentDidMount() {
    const {navigation, cong_viec} = this.props;
    NavigationService.setNavigator(navigation);
    if (cong_viec && cong_viec.id) {
      navigation.navigate('ChiTietCongViec', {
        id_cong_viec: cong_viec.id,
        id_thong_bao: cong_viec.id_thong_bao,
      });
    }
  }

  renderItem = ({item, index}) => {
    return (
      <Block
        key={index}
        style={[styles.item]}
        row
        onPress={() =>
          this.props.navigation.navigate('TaoDHSctack', {
            itemEditting: item,
          })
        }>
        <Block style={styles.right}>
          <Block style={{marginLeft: -12}}>
            {item.khachhangdieuphois.map((el, id) => (
              <Block row center key={el.id}>
                <Text style={[styles.txtB, {marginLeft: 13}]}>
                  {el?.khachhang?.ten}
                </Text>
              </Block>
            ))}
          </Block>
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: colors.GRAY2,
              marginVertical: 5,
            }}
          />
          <Text style={[styles.t_2]}>
            Khu vực: <Text style={styles.txtB}>{item?.khuvuc?.ten}</Text>
          </Text>

          {item.xedieuphois.length ? (
            <>
              <Text style={[styles.t_2]}>
                Loại hàng hoá:{' '}
                <Text style={styles.txtB}>{item?.loai_hang_hoa}</Text>
              </Text>
              <Text style={[styles.t_2]}>
                Nơi lưu chứa:{' '}
                <Text style={styles.txtB}>{item?.noi_luu_chua}</Text>
              </Text>
              <Text style={[styles.t_2]}>
                Nơi xả: <Text style={styles.txtB}>{item?.noi_xa}</Text>
              </Text>
              <Text style={[styles.t_2]}>
                Khối lượng dự kiến:{' '}
                <Text style={styles.txtB}>{item?.khoi_luong_du_kien}</Text>
              </Text>
              <Text style={[styles.t_2]}>
                BKS Xe:{' '}
                <Text
                  style={
                    styles.txtB
                  }>{`${item.xedieuphois[0].bien_kiem_soat} - ${item.xedieuphois[0].dong_xe.gia_tri} khối`}</Text>
              </Text>
              {item.ghi_chu ? (
                <Text
                  style={[
                    styles.t_2,
                    {
                      color: colors.BLACK,
                      fontSize: 16,
                      fontWeight: Platform.select({
                        ios: '700',
                        android: 'bold',
                      }),
                    },
                  ]}>
                  <IconM
                    name="hand-pointing-right"
                    size={20}
                    color={colors.BLACK}
                  />{' '}
                  Ghi chú:{' '}
                  <Text
                    style={[
                      styles.txtB,
                      {
                        color: colors.ERROR,
                      },
                    ]}>
                    {item.ghi_chu}
                  </Text>
                </Text>
              ) : null}
              <Text style={[styles.t_2]}>
                Ngày thực hiện:{' '}
                <Text style={styles.txtB}>
                  {moment(item.ngay, 'YYYY-MM-DD HH:mm:ss').format(
                    'DD/MM/YYYY',
                  )}
                </Text>
              </Text>
              <Text style={[styles.t_2]}>
                Giờ xuất phát:{' '}
                <Text style={styles.txtB}>
                  {item.xedieuphois[0].gio_xuat_phat}
                </Text>
              </Text>
            </>
          ) : (
            <Block
              center
              style={{
                marginVertical: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('TaoDonHang', {
                    itemEditting: item,
                  });
                }}>
                <Text
                  style={{
                    color: colors.IOS_BTN,
                    fontWeight: Platform.select({
                      ios: '600',
                      android: 'bold',
                      fontSize: 16,
                    }),
                  }}>
                  Ấn để điều phối
                </Text>
              </TouchableOpacity>
            </Block>
          )}
        </Block>
        <TouchableOpacity
          onPress={() => {
            //

            const {xoaDieuPhoi} = this.props;
            Alert.alert(
              'Chú ý',
              'Bạn có chắc chắn muốn xoá điều phối này',
              [
                {
                  text: 'Không',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Xoá',
                  onPress: () => xoaDieuPhoi(item.id),
                  style: 'destructive',
                },
              ],
              {cancelable: false},
            );
          }}
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
          }}>
          <IconM name="close" color={colors.ERROR} size={24} />
        </TouchableOpacity>
      </Block>
    );
  };

  filterData = (arr) => {
    const {ca, date} = this.state;

    return arr.filter((el) => {
      if (ca !== el.ca_id) {
        return false;
      }

      return true;
    });
  };

  _onRefresh = () => {
    const {layDSDonHang, layThongTinDieuPhoi} = this.props;
    const {ca, date} = this.state;
    layDSDonHang(moment(date).format('YYYY-MM-DD'));
  };

  render() {
    const {navigation, danh_sach_don_hang, chi_tiet_dieu_phoi} = this.props;
    const {
      state: {show, date},
      filterData,
    } = this;
    return (
      <Block
        style={{
          flex: 1,
          backgroundColor: colors.BG_VIEW,
        }}>
        <FlatList
          data={filterData(danh_sach_don_hang)}
          keyExtractor={(item, index) => `${index}`}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Block middle center flex={1}>
              <Block row style={{marginTop: 20}}>
                <Icon name="slash" size={22} color={colors.ERROR} />
                <Text style={{marginLeft: 10, fontSize: 16}}>
                  Chưa có điều phối nào
                </Text>
              </Block>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 5,
                  paddingHorizontal: 20,
                }}>
                Tạo điều phối bằng cách chạm vào dấu{' '}
                <Icon name="plus" size={18} color={colors.PRIMARY} /> ở bên phải
                góc màn hình
              </Text>
            </Block>
          }
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={this._onRefresh}
              color={colors.PRIMARY}
            />
          }
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('TaoDHSctack')}
          style={styles.fab}>
          <Icon name="plus" color="white" size={24} />
        </TouchableOpacity>
        <DateTimePicker
          isVisible={show}
          locale="vi"
          onConfirm={this.setDate}
          onCancel={this.hide}
          date={date}
          confirmTextIOS="Chọn"
          cancelTextIOS="Huỷ"
          headerTextIOS="Chọn ngày"
        />
      </Block>
    );
  }
}

const mapStateToProps = (state) => ({
  form_data: state.main.form_data,
  danh_sach_don_hang: state.main.danh_sach_don_hang,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      layDSDonHang: mainActions.layDSDonHang,
      capNhatNgayHienTai: mainActions.capNhatNgayHienTai,
      capNhatCaHienTai: mainActions.capNhatCaHienTai,
      xoaDieuPhoi: mainActions.xoaDieuPhoi,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Bills);

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
    paddingVertical: scale(10),
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: colors.WHITE,
    borderRadius: 4,
    ...preStyles.shadow,
  },
  itemIcon: {
    width: 40,
  },
  t_0: {color: colors.PRIMARY, fontSize: 16, marginLeft: 2.5},
  t_1: {
    fontSize: 16,
  },
  t_2: {
    fontSize: 16,
    color: '#485460',
    marginVertical: 1.5,
  },
  txtB: {
    color: '#485460',
    fontSize: 16,
    fontWeight: Platform.select({android: 'bold', ios: '700'}),
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto-Medium',
    }),
  },
  left: {
    width: 50,
  },
  right: {
    paddingLeft: 5,
    paddingRight: 10,
    flex: 1,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    position: 'absolute',
    backgroundColor: colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    right: 15,
    bottom: 15,
  },
  line: {
    width: 10,
    height: '100%',
    backgroundColor: 'red',
  },
});
