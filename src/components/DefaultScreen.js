import React from 'react';
import { View } from 'react-native';

const DefaultScreen = ({ children, style }) => {
  return (
    <View
      style={[
        {
          width: '90%',
          alignSelf: 'center',
          flex: 1,
          paddingTop: 20,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default DefaultScreen;
