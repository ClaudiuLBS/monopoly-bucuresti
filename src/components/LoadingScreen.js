import React from 'react';
import { ActivityIndicator } from 'react-native';
import colors from '../constants/colors';

const LoadingScreen = () => {
  return (
    <ActivityIndicator
      size={'large'}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: colors.background,
        width: '100%',
      }}
      color={colors.white}
    />
  );
};

export default LoadingScreen;
