import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from './DashboardScreen';
import MenuScreen from './MenuScreen';
import LobbyScreen from './LobbyScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Menu'} component={MenuScreen} />
      <Stack.Screen name={'Lobby'} component={LobbyScreen} />
      <Stack.Screen name={'Dashboard'} component={DashboardScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
