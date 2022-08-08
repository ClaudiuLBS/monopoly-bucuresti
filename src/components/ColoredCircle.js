import React from 'react';
import { View } from 'react-native';
import colors from '../constants/colors';

const ColoredCircle = ({ color, size = 15 }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.white,
        width: size,
        height: size,
        borderRadius: 20,
        backgroundColor: color,
      }}
    />
  );
};

export default ColoredCircle;
