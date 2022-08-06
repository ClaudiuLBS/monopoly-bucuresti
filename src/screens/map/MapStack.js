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
        options={propertyInfoOptions}
        name={'PropertyInfo'}
        component={PropertyInfoScreen}
      />
    </Stack.Navigator>
  );
};
const propertyInfoOptions = ({ route }) => ({ headerTitle: route.params.title });

export default MapStack;
