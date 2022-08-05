import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MapScreen from './MapScreen';
import PropertyInfoScreen from './PropertyInfoScreen';

const Stack = createStackNavigator();

const MapStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name={'Map'} component={MapScreen} />
      <Stack.Screen
        options={({ route }) => ({ headerTitle: route.params.property.name })}
        name={'PropertyInfo'}
        component={PropertyInfoScreen}
      />
    </Stack.Navigator>
  );
};

export default MapStack;
