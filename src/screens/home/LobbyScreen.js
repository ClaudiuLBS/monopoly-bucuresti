import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import CustomButton from '../../components/CustomButton';
import DefaultScreen from '../../components/DefaultScreen';
import PlayerLabel from '../../components/PlayerLabel';
import GameSessionApi from '../../services/session.service';
import RestApi from '../../services/rest.service';
import colors from '../../constants/colors';
import { deleteSession, setStartDate } from '../../redux/sessionSlice';
import { config } from '../../config';
import { deletePlayer, setOwner } from '../../redux/playerSlice';
import PopUpLouncher from '../../components/PopUpLouncher';

const LobbyScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const gameSession = useSelector((state) => state.session);

  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
          dispatch(setStartDate(res.start_date));
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
      <View style={{ justifyContent: 'center' }}>
        <Text style={styles.code}>{gameSession.code}</Text>
        {loading ? (
          <ActivityIndicator
            size={'large'}
            color={colors.white}
            style={{ position: 'absolute', right: 10 }}
          />
        ) : null}
      </View>

      {player.owner && (
        <CustomButton color={colors.white} onPress={handleStartSession}>
          START
        </CustomButton>
      )}

      <FlatList
        style={styles.playersList}
        data={players}
        renderItem={({ item }) => <PlayerLabel player={item} />}
        keyExtractor={(player, index) => index}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <PopUpLouncher
        buttonText={'LEAVE'}
        color={colors.red}
        title="Are you sure you wanna leave?"
        info="You can join back with the same code if there are any players left"
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
  playersList: {
    borderTopWidth: 2,
    borderTopColor: colors.primary,
    marginTop: 10,
    paddingTop: 10,
  },
});
export default LobbyScreen;
