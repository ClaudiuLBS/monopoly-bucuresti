import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

import ColoredCircle from '../../components/ColoredCircle';
import LoadingScreen from '../../components/LoadingScreen';
import PopUpLouncher from '../../components/PopUpLouncher';
import PlayerLabel from '../../components/PlayerLabel';
import RestApi from '../../services/rest.service';
import GameSessionApi from '../../services/session.service';
import { deletePlayer } from '../../redux/playerSlice';
import { deleteSession } from '../../redux/sessionSlice';
import colors from '../../constants/colors';
import { config } from '../../config';

const ScoreboardScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const gameSession = useSelector((state) => state.session);
  const player = useSelector((state) => state.player);

  const [players, setPlayers] = useState(null);

  useEffect(() => {
    RestApi.gameSession.topPlayers(gameSession.code).then((res) => setPlayers(res));
  }, []);

  const handleLeaveSession = async () => {
    GameSessionApi.leaveSession(player.id).then((res) => {
      SecureStore.setItemAsync(config.player_id, '');
      dispatch(deletePlayer());
      dispatch(deleteSession());
      navigation.navigate('Menu');
    });
  };

  if (players === null) return <LoadingScreen />;
  return (
    <>
      <ScrollView style={{ paddingTop: 20 }}>
        {players.map((player, index) => {
          if (index > 2)
            return (
              <PlayerLabel
                key={index}
                style={{ marginHorizontal: 30 }}
                player={player}
                score={player.properties}
              />
            );
          else {
            const fontSize = 26 - index * 2;
            const circleSize = fontSize - 5;
            const marginHorizontal = 15 + index * 5;
            return (
              <PlayerLabel
                key={index}
                style={{ marginHorizontal }}
                player={player}
                score={player.properties}
                circleSize={circleSize}
                fontSize={fontSize}
              />
            );
          }
        })}
      </ScrollView>
      <PopUpLouncher
        buttonText={'LEAVE'}
        color={colors.red}
        title="Are you sure you wanna leave?"
        info="You can join back with the same code if there are any players left, but you will lose all your proress"
        onConfirm={handleLeaveSession}
      />
    </>
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
