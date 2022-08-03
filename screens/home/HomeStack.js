import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { setCustomText } from 'react-native-global-props';
import { Ubuntu_400Regular, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import * as Font from 'expo-font';

import { setPlayer } from '../../redux/playerSlice';
import { setSession } from '../../redux/sessionSlice';
import InitService from '../../services/init.service';
import LoadingScreen from '../LoadingScreen';
import DashboardScreen from './DashboardScreen';
import MenuScreen from './MenuScreen';
import LobbyScreen from './LobbyScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Font.loadAsync({
      normal: Ubuntu_400Regular,
      bold: Ubuntu_500Medium,
    }).then(
      InitService.checkPlayer().then((data) => {
        dispatch(setSession(data.gameSession));
        dispatch(setPlayer(data.player));
        setCustomText({
          style: {
            fontFamily: 'normal',
          },
        });
        setLoading(false);
      })
    );
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Menu'} component={MenuScreen} />
      <Stack.Screen name={'Lobby'} component={LobbyScreen} />
      <Stack.Screen name={'Dashboard'} component={DashboardScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
