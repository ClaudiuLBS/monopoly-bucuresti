import React from 'react';
import { StyleSheet, Text } from 'react-native';

const LobbyPlayer = ({ player }) => {
  return (
    <Text
      style={[
        styles.playerName,
        {
          borderColor: player.owner ? '#ffc800' : '#999999',
          borderTopColor: player.color,
        },
      ]}
    >
      {player.name}
    </Text>
  );
};
const styles = StyleSheet.create({
  playerName: {
    marginTop: 10,
    fontSize: 16,
    paddingVertical: 5,
    fontWeight: 'bold',
    borderRadius: 20,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 8,
    borderTopWidth: 5,
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default LobbyPlayer;
