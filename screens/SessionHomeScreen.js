import React from 'react';
import { Button, View } from 'react-native';

const SessionHomeScreen = ({ createSession, joinSession }) => {
  return (
    <View>
      <Button title="create session" onPress={() => createSession('becali')} />
      <Button title="join session" onPress={() => joinSession('gigi', 3978)} />
    </View>
  );
};

export default SessionHomeScreen;
