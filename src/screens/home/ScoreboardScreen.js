import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ColoredCircle from '../../components/ColoredCircle';

import DefaultScreen from '../../components/DefaultScreen';
import colors from '../../constants/colors';

const players = [
  {
    name: 'Ion balamachea',
    properties: 8,
    color: 'red',
  },
  {
    name: 'Gica Mahmu',
    properties: 7,
    color: 'blue',
  },
  {
    name: 'Petrache Bulanaru',
    properties: 6,
    color: 'yellow',
  },
  {
    name: 'Morcov Paraschiv',
    properties: 5,
    color: 'green',
  },
  {
    name: 'Maraca Sandra',
    properties: 4,
    color: 'purple',
  },
  {
    name: 'Hulm Capadastru',
    properties: 3,
    color: 'pink',
  },
];

const ScoreboardScreen = () => {
  return (
    <ScrollView style={{ paddingTop: 20 }}>
      {players.map((player, index) => {
        if (index > 2)
          return (
            <View key={index} style={styles.container}>
              <ColoredCircle color={player.color} />
              <Text numberOfLines={1} style={styles.name}>
                {player.name}
              </Text>
              <Text style={styles.score}>{player.properties}</Text>
            </View>
          );
        else {
          const fontSize = 26 - index * 2;
          const circleSize = fontSize - 5;
          const marginHorizontal = 15 + index * 5;
          return (
            <View key={index} style={[styles.container, { marginHorizontal }]}>
              <ColoredCircle color={player.color} size={circleSize} />
              <Text numberOfLines={1} style={[styles.name, { fontSize }]}>
                {player.name}
              </Text>
              <Text style={[styles.score, { fontSize }]}>{player.properties}</Text>
            </View>
          );
        }
      })}
    </ScrollView>
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
    marginHorizontal: 30,
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
export default ScoreboardScreen;
