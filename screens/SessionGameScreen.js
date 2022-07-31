import React from 'react';
import { Text, View } from 'react-native';

const SessionGameScreen = ({ player, gameSession }) => {
  return (
    <View>
      <Text>{player.name}</Text>
      <Text>{gameSession.code} started</Text>
    </View>
  );
};

export default SessionGameScreen;
