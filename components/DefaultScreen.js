import React from 'react';
import { View } from 'react-native';
import Constants from 'expo-constants';
import colors from '../constants/colors';

const DefaultScreen = ({ children, style }) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={[
          {
            width: '90%',
            alignSelf: 'center',
            flex: 1,
          },
          style,
        ]}
      >
        {children}
      </View>
    </View>
  );
};

export default DefaultScreen;
