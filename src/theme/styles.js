import {StyleSheet, Platform} from 'react-native';
// import {colors} from '.';

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2.0,
    elevation: 1,
  },
  bold: {
    fontWeight: Platform.select({
      ios: '600',
      android: 'bold',
    }),
  },
  wrap: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 7.5,
    marginTop: 10,
    borderRadius: 4,
  },
});

export default styles;
