import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GameSessionApi from '../services/game_session.service';
import InitService from '../services/init.service';
import LoadingScreen from './LoadingScreen';
import SessionGameScreen from './SessionGameScreen';
import SessionHomeScreen from './SessionHomeScreen';
import SessionLobbyScreen from './SessionLobbyScreen';

const Stack = createStackNavigator();

const SessionStack = () => {
  const [gameSession, setGameSession] = useState(null);
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState('');

  const pickScreen = (gameSession, player) => {
    if (gameSession && player) {
      if (gameSession.start_date) setScreen('Game');
      else setScreen('Lobby');
    } else setScreen('Home');
  };

  const handleCreateSession = async (name, color) => {
    const data = await GameSessionApi.createSession(name, color);
    setPlayer(data.player);
    setGameSession(data.gameSession);
  };

  const handleJoinSession = async (name, code, color) => {
    const data = await GameSessionApi.joinSession(name, code, color);
    if (data.error) return data.error;

    setPlayer(data.player);
    setGameSession(data.gameSession);
  };

  const handleStartSession = async (code) => {
    const data = await GameSessionApi.startSession(code);
    return data;
  };

  useEffect(() => {
    InitService.checkPlayer().then((data) => {
      pickScreen(data.gameSession, data.player);
      setGameSession(data.gameSession);
      setPlayer(data.player);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        children={() => (
          <SessionHomeScreen
            createSession={handleCreateSession}
            firstScreen={screen}
            joinSession={handleJoinSession}
          />
        )}
      />
      <Stack.Screen
        name="Lobby"
        children={() => (
          <SessionLobbyScreen
            owner={player.owner}
            code={gameSession.code}
            startSession={handleStartSession}
          />
        )}
      />
      <Stack.Screen
        name="Game"
        children={() => <SessionGameScreen player={player} gameSession={gameSession} />}
      />
    </Stack.Navigator>
  );
};

export default SessionStack;
