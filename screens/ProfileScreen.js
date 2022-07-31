import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, TextInput, View } from 'react-native';
import GameSessionApi from '../services/game_session.service';
import InitService from '../services/init.service';
import LoadingScreen from './LoadingScreen';

const ProfileScreen = () => {
  const [gameSession, setGameSession] = useState(null);
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleCreateSession = async (name) => {
    const data = await GameSessionApi.createSession(name);
    setPlayer(data.player);
    setGameSession(data.gameSession);
  };

  const handleJoinSession = async (name, code) => {
    const data = await GameSessionApi.joinSession(name, code);
    setPlayer(data.player);
    setGameSession(data.gameSession);
  };

  const handleStartSession = async (code) => {
    const data = await GameSessionApi.startSession(code);
    console.log(data);
  };

  useEffect(() => {
    InitService.handleStorageKeys().then((data) => {
      setGameSession(data.gameSession);
      setPlayer(data.player);
      setLoading(false);
    });
  }, [player]);

  if (loading) return <LoadingScreen />;

  return (
    <View>
      {gameSession && <Text>{gameSession.code}</Text>}
      <Button title="create nigga" onPress={() => handleCreateSession('nigger')} />
      <Button title="join nigga" onPress={() => handleJoinSession('gigi', 3978)} />
      <Button title="start nigga" onPress={() => handleStartSession(3978)} />
    </View>
  );
};

export default ProfileScreen;
