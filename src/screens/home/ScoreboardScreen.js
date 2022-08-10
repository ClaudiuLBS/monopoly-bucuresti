import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import ColoredCircle from '../../components/ColoredCircle';
import LoadingScreen from '../../components/LoadingScreen';
import colors from '../../constants/colors';
import RestApi from '../../services/rest.service';
import GameSessionApi from '../../services/session.service';
import { useNavigation } from '@react-navigation/native';
import { deletePlayer } from '../../redux/playerSlice';
import { deleteSession } from '../../redux/sessionSlice';
import { config } from '../../config';
import CustomButton from '../../components/CustomButton';
import PopUp from '../../components/PopUp';

const ScoreboardScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const gameSession = useSelector((state) => state.session);
  const player = useSelector((state) => state.player);

  const [players, setPlayers] = useState(null);
  const [modalVisible, showModal] = useState(null);

  useEffect(() => {
    RestApi.gameSession.topPlayers(gameSession.code).then((res) => setPlayers(res));
  }, []);

  const handleLeaveSession = async () => {
    GameSessionApi.leaveSession(player.id).then((res) => {
      showModal(false);
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
      <CustomButton onPress={() => showModal(true)} color={colors.red}>
        LEAVE
      </CustomButton>
      <PopUp
        title="Are you sure you wanna leave?"
        info="You can join back with the same code if there are any players left"
        visible={modalVisible}
        onCancel={() => showModal(false)}
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
