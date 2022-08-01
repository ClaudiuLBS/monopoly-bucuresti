import React from 'react';
import { Text, View } from 'react-native';
import DefaultScreen from '../components/DefaultScreen';

const SessionGameScreen = ({ player, gameSession }) => {
  return (
    <DefaultScreen>
      <Text>{player.name}</Text>
      <Text>{player.money}</Text>
      <Text>{gameSession.code}</Text>
    </DefaultScreen>
  );
};

export default SessionGameScreen;
