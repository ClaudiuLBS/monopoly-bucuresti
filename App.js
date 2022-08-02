import React, { useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Icon } from '@rneui/base';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

import HomeStack from './screens/Home/HomeStack';
import MapScreen from './screens/MapScreen';
import dimensions from './constants/dimensions';
import colors from './constants/colors';
import { store } from './redux/store';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status != 'granted') return;

  await Location.watchPositionAsync({
    accuracy: Location.Accuracy.High,
    distanceInterval: 5,
    timeInterval: 5000,
  });
};

const Tab = createBottomTabNavigator();
export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    getLocation();
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));
  }, []);

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}
