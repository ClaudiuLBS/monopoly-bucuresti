import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../constants/colors';

const LobbyPlayer = ({ player }) => {
  return (
    <Text
      style={[
        styles.playerName,
        {
          borderColor: player.owner ? colors.owner : colors.notOwner,
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
    paddingBottom: 5,
    paddingTop: 10,
    fontFamily: 'bold',
    borderRadius: 20,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 8,
    borderTopWidth: 5,
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: colors.blueGray,
    color: colors.primary,
  },
});

export default LobbyPlayer;
