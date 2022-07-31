import React from 'react';
import { View } from 'react-native';
import Constants from 'expo-constants';

const DefaultScreen = ({ children, style }) => {
  return (
    <View
      style={[
        {
          paddingTop: Constants.statusBarHeight,
          width: '90%',
          alignSelf: 'center',
          flex: 1,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default DefaultScreen;
