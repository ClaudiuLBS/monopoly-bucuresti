import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';
import ColoredCircle from './ColoredCircle';

const PlayerLabel = ({ player, score = null, fontSize = 20, circleSize = 15, style }) => {
  return (
    <View style={[styles.container, style]}>
      <ColoredCircle color={player.color} size={circleSize} />
      <Text numberOfLines={1} style={[styles.name, { fontSize }]}>
        {player.name}
      </Text>
      <Text style={[styles.score, { fontSize }]}>{score}</Text>
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
  score: {
    color: colors.white,
    fontSize: 20,
  },
});

export default PlayerLabel;
