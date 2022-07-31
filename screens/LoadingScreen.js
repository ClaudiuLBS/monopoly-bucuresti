import React from 'react';
import { ActivityIndicator } from 'react-native';

const LoadingScreen = () => {
  return (
    <ActivityIndicator
      size={'large'}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
    />
  );
};

export default LoadingScreen;
