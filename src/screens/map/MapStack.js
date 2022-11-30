import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MapScreen from './MapScreen';
import PropertyInfoScreen from './PropertyInfoScreen';
import { Icon } from '@rneui/themed';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

const MapStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Icon
            name='chevron-back'
            type='ionicon'
            color={colors.white}
            style={{ padding: 10 }}
            onPress={() => navigation.goBack()}
          />
        ),
      })}
    >
      <Stack.Screen options={{ headerShown: false }} name={'Map'} component={MapScreen} />
      <Stack.Screen options={propertyInfoOptions} name={'PropertyInfo'} component={PropertyInfoScreen} />
    </Stack.Navigator>
  );
};
const propertyInfoOptions = ({ route }) => ({ headerTitle: route.params.title });

export default MapStack;
