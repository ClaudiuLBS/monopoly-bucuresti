import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';
import ColoredCircle from './ColoredCircle';

const LobbyPlayer = ({ player, score = null }) => {
  return (
    // <Text
    //   style={[
    //     styles.playerName,
    //     {
    //       borderColor: player.color,
    //     },
    //   ]}
    // >
    //   {player.name}
    // </Text>
    <View style={styles.container}>
      <ColoredCircle color={player.color} />
      <Text numberOfLines={1} style={styles.name}>
        {player.name}
      </Text>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffffff10',
    justifyContent: 'space-between',
    borderRadius: 4,
  },
  name: {
    color: colors.white,
    fontSize: 20,
    flex: 1,
    marginHorizontal: 10,
    textAlign: 'center',
  },
});

export default LobbyPlayer;
