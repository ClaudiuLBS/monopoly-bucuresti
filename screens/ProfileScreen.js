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
    const data = await GameSessionApi.createSession('nigger');
    setPlayer(data.player);
    setGameSession(data.gameSession);
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
      {true && <Text>{gameSession.code}</Text>}
      <Button title="press me nigga" onPress={() => handleCreateSession('nigger')} />
    </View>
  );
};

export default ProfileScreen;
