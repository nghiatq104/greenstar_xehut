//Bao cao
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {
  createStackNavigator,
  HeaderBackButton,
  TransitionPresets,
} from 'react-navigation-stack';
import {BottomTabBar, createBottomTabNavigator} from 'react-navigation-tabs';
import DoiMatKhau from '../screens/Auth/DoiMatKhau';
//Xac thuc
import LoginScreen from '../screens/Auth/Login';
//Don Hang
import DanhSachDonHang from '../screens/DonHang/DanhSachDonHang';
import TaoDonHang from '../screens/DonHang/TaoDonHang';
import XacNhanDonHang from '../screens/DonHang/XacNhanDonHang';
//Splash screen
import SplashScreen from '../screens/SplashScreen';
//Tai khoan
import TaiKhoan from '../screens/TaiKhoan/ProfieScreen';
import ThongTinTaiXe from '../screens/TaiKhoan/ThongTin';
import {colors} from '../theme';
import NotificationIcon from './NotificationIcon';
import DanhSachThongBao from '../screens/ThongBao/DanhSachThongBao';

const styles = StyleSheet.create({
  label: {fontSize: 13, textAlign: 'center'},
});

const navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <HeaderBackButton
      onPress={() => navigation.goBack(null)}
      label="Quay lại"
    />
  ),
});

const defaultNavigationOptions = {
  cardOverlayEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
};

const DHStack = createStackNavigator(
  {
    DanhSachDonHang,
  },
  {
    initialRouteName: 'DanhSachDonHang',
    defaultNavigationOptions: {
      ...defaultNavigationOptions,
      headerBackTitle: 'Quay lại',
    },
    navigationOptions: ({navigation}) => {
      let tabBarVisible = true;
      if (navigation.state.index > 0) {
        tabBarVisible = false;
      }
      return {
        tabBarVisible,
      };
    },
  },
);

const taiKhoanStack = createStackNavigator(
  {
    TaiKhoan,
    DoiMatKhau,
    ThongTinTaiXe,
  },
  {
    initialRouteName: 'TaiKhoan',
    defaultNavigationOptions,
    navigationOptions: ({navigation}) => {
      let tabBarVisible = true;
      if (navigation.state.index > 0) {
        tabBarVisible = false;
      }
      return {
        tabBarVisible,
      };
    },
  },
);

const thongBaoStack = createStackNavigator(
  {
    DanhSachThongBao,
  },
  {
    initialRouteName: 'DanhSachThongBao',
    defaultNavigationOptions: {
      headerTitle: 'Thông báo',
      ...defaultNavigationOptions,
    },
    navigationOptions: {
      title: 'Thông báo',
    },
  },
);

const mainTabNavigator = createBottomTabNavigator(
  {
    DonHang: {
      screen: DHStack,
      navigationOptions: {
        tabBarLabel: <Text style={styles.label}>Điều phối</Text>,
        tabBarIcon: ({focused, ...props}) => (
          <IconM
            name="truck-fast"
            {...props}
            color={focused ? colors.PRIMARY : 'black'}
            size={22}
          />
        ),
      },
    },
    ThongBao: {
      screen: thongBaoStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused, ...props}) => (
          <NotificationIcon {...{focused}} {...props} />
        ),
      }),
    },
    TaiKhoan: {
      screen: taiKhoanStack,
      navigationOptions: {
        tabBarLabel: <Text style={styles.label}>Tài khoản</Text>,
        tabBarIcon: ({focused, ...props}) => (
          <IconM
            name="account"
            {...props}
            color={focused ? colors.PRIMARY : 'black'}
            size={22}
          />
        ),
      },
    },
  },

  {
    initialRouteName: 'DonHang',
    tabBarComponent: (props) => <BottomTabBar {...props} />,
    tabBarOptions: {
      activeTintColor: colors.PRIMARY,
      inactiveTintColor: colors.BLACK,
      showLabel: true,
    },
  },
);

const taoDHSctack = createStackNavigator(
  {
    TaoDonHang: {screen: TaoDonHang, navigationOptions},
    XacNhanDonHang: {screen: XacNhanDonHang, navigationOptions},
  },
  {
    initialRouteName: 'TaoDonHang',
    mode: 'modal',
    defaultNavigationOptions,
  },
);

const appStack = createStackNavigator(
  {
    MainTab: mainTabNavigator,
    TaoDHSctack: taoDHSctack,
  },
  {
    initialRouteName: 'MainTab',
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions,
  },
);

const authStack = createStackNavigator(
  {
    LoginScreen,
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions,
  },
);

const mainNavigator = createSwitchNavigator(
  {
    SplashScreen: SplashScreen,
    Auth: authStack,
    Main: appStack,
  },
  {
    initialRouteName: 'SplashScreen',
  },
);

export default createAppContainer(mainNavigator);
