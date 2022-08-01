import { StatusBar, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import HomeStack from './screens/Home/HomeStack';
import MapScreen from './screens/MapScreen';
import dimensions from './constants/dimensions';
import colors from './constants/colors';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: dimensions.tabBarHeight,
            backgroundColor: colors.primary,
            paddingTop: 5,
          },
          tabBarActiveTintColor: colors.white,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" type="entypo" size={size} color={color} />
            ),
            tabBarLabelStyle: { fontSize: 12, paddingBottom: 3 },
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="map-marked-alt" type="font-awesome-5" size={size} color={color} />
            ),
            tabBarLabelStyle: { fontSize: 12, paddingBottom: 3 },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
