import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import CustomButton from '../../components/CustomButton';
import DefaultScreen from '../../components/DefaultScreen';
import LobbyPlayer from '../../components/LobbyPlayer';
import GameSessionApi from '../../services/session.service';
import RestApi from '../../services/rest.service';
import colors from '../../constants/colors';
import PopUp from '../../components/PopUp';
import { deleteSession, setStartDate } from '../../redux/sessionSlice';
import { config } from '../../config';
import { deletePlayer, setOwner } from '../../redux/playerSlice';

const LobbyScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const gameSession = useSelector((state) => state.session);

  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, showModal] = useState(false);

  let handleRefresh;
  useEffect(() => {
    refresh();
    handleRefresh = setInterval(() => {
      refresh();
    }, 5000);

    navigation.addListener('blur', (e) => {
      clearInterval(handleRefresh);
    });

    return () => clearInterval(handleRefresh);
  }, []);

  const refresh = async () => {
    RestApi.gameSession.topPlayers(gameSession.code).then((res) => {
      if (res && res.filter((x) => x.id == player.id)[0].owner == true && player.owner == false)
        dispatch(setOwner());
      setPlayers(res);
      RestApi.gameSession.get(player.game_session).then((res1) => {
        setLoading(false);
        if (res1 && res1.start_date) {
          clearInterval(handleRefresh);
          navigation.navigate('Dashboard');
        }
      });
    });
  };

  const handleStartSession = async () => {
    const startSession = async (code) => {
      const data = await GameSessionApi.startSession(code);
      if (data.start_date) dispatch(setStartDate(data.start_date));
      return data;
    };

    setLoading(true);
    const data = await startSession(gameSession.code);
    if (data.error) {
      setError(data.error);
      return;
    }
    navigation.navigate('Dashboard');
    setLoading(false);
  };

  const handleLeaveSession = async () => {
    GameSessionApi.leaveSession(player.id).then((res) => {
      showModal(false);
      if (res.error.length > 0) setError(res.error);
      else {
        SecureStore.setItemAsync(config.player_id, '');
        dispatch(deletePlayer());
        dispatch(deleteSession());
        clearInterval(handleRefresh);
        navigation.navigate('Menu');
      }
    });
  };

  return (
    <DefaultScreen>
      <Text style={styles.code}>{gameSession.code}</Text>
      {player.owner && <CustomButton onPress={handleStartSession}>START</CustomButton>}

      <FlatList
        style={styles.playersList}
        data={players}
        renderItem={({ item }) => <LobbyPlayer player={item} />}
        keyExtractor={(player, index) => index}
        ListHeaderComponent={
          loading ? <ActivityIndicator size={'large'} style={styles.loading} /> : null
        }
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
    </DefaultScreen>
  );
};

const styles = StyleSheet.create({
  code: {
    width: '100%',
    textAlign: 'center',
    fontSize: 36,
    marginVertical: 5,
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.primary,
    color: colors.white,
    fontFamily: 'bold',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.white + '10',
  },
  error: {
    fontSize: 22,
    textAlign: 'center',
    color: 'red',
    fontFamily: 'bold',
    alignItems: 'center',
    marginTop: 30,
  },
  loading: {
    marginTop: 10,
  },
  playersList: {
    borderTopWidth: 2,
    borderTopColor: colors.secondary,
    marginTop: 10,
  },
});
export default LobbyScreen;
