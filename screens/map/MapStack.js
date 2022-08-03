import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MapScreen from './MapScreen';
import PropertyInfoScreen from './PropertyInfoScreen';

const Stack = createStackNavigator();

const MapStack = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Map'} component={MapScreen} />
      <Stack.Screen name={'PropertyInfo'} component={PropertyInfoScreen} />
    </Stack.Navigator>
  );
};

export default MapStack;
