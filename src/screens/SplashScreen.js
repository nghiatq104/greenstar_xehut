import React, {useEffect, useMemo} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Easing,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Block from '../components/Block';
import images from '../constants/images';
import {authActions} from '../state/authentication';
import {colors} from '../theme';
import * as NavigationService from '../utils/NavigationService';
import {verticalScale} from '../utils/responsive';

const {width, height} = Dimensions.get('window');
function SplashScreen({navigation, splashScreen}) {
  const spinValue = useMemo(() => new Animated.Value(0));

  const handleWhenOpenApp = async () => {
    splashScreen();
  };

  useEffect(() => {
    NavigationService.setNavigator(navigation);
    Animated.spring(spinValue, {
      toValue: 1,
      speed: 10,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(handleWhenOpenApp);
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>
      <StatusBar backgroundColor="#05c46b" />
      <Block flex={1} style={{backgroundColor: 'white'}}>
        <Block
          style={{
            ...styles.background,
            position: 'absolute',
            left: 0,
            top: 0,
          }}
          center>
          <Animated.Image
            source={images.logo}
            style={{
              ...styles.logo,
              transform: [{rotate: spin}],
            }}
          />

          <ActivityIndicator color={colors.PRIMARY} size="large" />
        </Block>
      </Block>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    width: width,
    height: height,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: verticalScale(150),
  },
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      splashScreen: authActions.splashScreen,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(SplashScreen);
