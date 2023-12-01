import React, {Component} from 'react';
import {Animated, StyleSheet, View, TouchableOpacity} from 'react-native';
import {dimensions, colors} from '../constants/theme';

export default class Block extends Component {
  handleMargins() {
    const {margin} = this.props;
    if (typeof margin === 'number') {
      return {
        margin,
      };
    }

    if (typeof margin === 'object') {
      const marginSize = Object.keys(margin).length;
      switch (marginSize) {
        case 1:
          return {
            margin: margin[0],
          };
        case 2:
          return {
            marginVertical: margin[0],
            marginHorizontial: margin[1],
          };
        case 3:
          return {
            marginTop: margin[0],
            marginBottom: margin[2],
            marginHorizontial: margin[1],
          };
        default:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[3],
          };
      }
    }
  }

  handlePaddings() {
    const {padding} = this.props;
    if (typeof padding === 'number') {
      return {
        padding,
      };
    }

    if (typeof padding === 'object') {
      const paddingSize = Object.keys(padding).length;
      switch (paddingSize) {
        case 1:
          return {
            padding: padding[0],
          };
        case 2:
          return {
            paddingVertical: padding[0],
            paddingHorizontial: padding[1],
          };
        case 3:
          return {
            paddingTop: padding[0],
            paddingBottom: padding[2],
            paddingHorizontial: padding[1],
          };
        default:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[3],
          };
      }
    }
  }

  render() {
    const {
      flex,
      row,
      column,
      center,
      middle,
      left,
      right,
      top,
      bottom,
      card,
      shadow,
      color,
      space,
      padding,
      margin,
      animated,
      wrap,
      style,
      onPress,
      children,
      ...props
    } = this.props;

    const blockStyles = [
      styles.block,
      flex && {flex},
      flex === false && {flex: 0}, // reset / disable flex
      row && styles.row,
      column && styles.column,
      center && styles.center,
      middle && styles.middle,
      left && styles.left,
      right && styles.right,
      top && styles.top,
      bottom && styles.bottom,
      margin && {...this.handleMargins()},
      padding && {...this.handlePaddings()},
      card && styles.card,
      shadow && styles.shadow,
      space && {justifyContent: `space-${space}`},
      wrap && {flexWrap: 'wrap'},
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && {backgroundColor: color}, // custom backgroundColor
      style, // rewrite predefined styles
    ];

    if (animated) {
      return (
        <Animated.View style={blockStyles} {...props}>
          {children}
        </Animated.View>
      );
    }

    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress} style={blockStyles} {...props}>
          {children}
        </TouchableOpacity>
      );
    }

    return (
      <View style={blockStyles} {...props}>
        {children}
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  block: {
    display: 'flex',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  card: {
    borderRadius: dimensions.MEDIUM,
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  top: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  shadow: {
    shadowColor: colors.BLACK,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 13,
    elevation: 3,
  },
  accent: {backgroundColor: colors.ACCENT},
  primary: {backgroundColor: colors.PRIMARY},
  secondary: {backgroundColor: colors.SECONDARY},
  tertiary: {backgroundColor: colors.TERTIARY},
  black: {backgroundColor: colors.BLACK},
  white: {backgroundColor: colors.WHITE},
  gray: {backgroundColor: colors.GRAY},
  gray2: {backgroundColor: colors.GRAY2},
  gray3: {backgroundColor: colors.GRAY3},
  gray4: {backgroundColor: colors.GRAY4},
});
