import React from 'react';
import { Button, View } from 'react-native';

const SessionLobbyScreen = ({ code, owner, startSession }) => {
  return (
    <View>
      <Text>{code} lobby</Text>
      {owner && <Button title="start nigga" onPress={() => startSession(code)} />}
    </View>
  );
};

export default SessionLobbyScreen;
