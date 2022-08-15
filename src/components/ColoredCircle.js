import React from 'react';
import { View } from 'react-native';
import colors from '../constants/colors';

const ColoredCircle = ({ color, size = 15, children, borderWidth = 1 }) => {
  return (
    <View
      style={{
        borderWidth: borderWidth,
        borderColor: colors.white,
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: color,
        justifyContent: 'center',
      }}
    >
      {children}
    </View>
  );
};

export default ColoredCircle;
