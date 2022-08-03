import React, { useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { Ubuntu_400Regular, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { setCustomText } from 'react-native-global-props';
import { Provider, useDispatch } from 'react-redux';
import { Icon } from '@rneui/base';
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';
import * as Device from 'expo-device';
import * as Font from 'expo-font';

import HomeStack from './screens/home/HomeStack';
import MapStack from './screens/map/MapStack';
import dimensions from './constants/dimensions';
import colors from './constants/colors';
import { config } from './config';
import InitService from './services/init.service';
import { setSession } from './redux/sessionSlice';
import { setPlayer } from './redux/playerSlice';
import LoadingScreen from './components/LoadingScreen';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Tab = createBottomTabNavigator();

const Routes = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      SecureStore.setItemAsync(config.push_token, token)
    );
    Font.loadAsync({
      ubuntu: Ubuntu_400Regular,
      bold: Ubuntu_500Medium,
    }).then(
      InitService.checkPlayer().then((data) => {
        dispatch(setSession(data.gameSession));
        dispatch(setPlayer(data.player));
        setCustomText({
          style: {
            fontFamily: 'ubuntu',
          },
        });
        setLoading(false);
      })
    );
  }, []);

  const MyTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: colors.background,
      card: colors.primary,
    },
  };

  if (loading) return <LoadingScreen />;

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: dimensions.tabBarHeight,
            paddingTop: 5,
          },
          tabBarActiveTintColor: colors.white,
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" type="entypo" size={size} color={color} />
            ),
            tabBarLabel: 'Home',
            tabBarLabelStyle: { fontSize: 12, paddingBottom: 3 },
          }}
        />

        <Tab.Screen
          name="MapStack"
          component={MapStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="map-marked-alt" type="font-awesome-5" size={size} color={color} />
            ),
            tabBarLabel: 'Map',
            tabBarLabelStyle: { fontSize: 12, paddingBottom: 3 },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

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

export default Routes;
