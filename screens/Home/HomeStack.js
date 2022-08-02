import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

import InitService from '../../services/init.service';
import LoadingScreen from '../LoadingScreen';
import DashboardScreen from './DashboardScreen';
import MenuScreen from './MenuScreen';
import LobbyScreen from './LobbyScreen';
import { setPlayer } from '../../redux/playerSlice';
import { setSession } from '../../redux/sessionSlice';

const Stack = createStackNavigator();

const HomeStack = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState('');

  const pickScreen = (gameSession, player) => {
    if (gameSession && player) {
      if (gameSession.start_date) setScreen('Dashboard');
      else setScreen('Lobby');
    } else setScreen('Menu');
  };

  useEffect(() => {
    InitService.checkPlayer().then((data) => {
      pickScreen(data.gameSession, data.player);
      dispatch(setSession(data.gameSession));
      dispatch(setPlayer(data.player));
      setLoading(false);
    });
  });

  if (loading) return <LoadingScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Menu" children={() => <MenuScreen firstScreen={screen} />} />
      <Stack.Screen name="Lobby" component={LobbyScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
