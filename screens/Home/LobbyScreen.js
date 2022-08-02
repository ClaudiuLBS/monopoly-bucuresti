import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../../components/CustomButton';
import DefaultScreen from '../../components/DefaultScreen';
import LobbyPlayer from '../../components/LobbyPlayer';
import GameSessionApi from '../../services/session.service';
import RestApi from '../../services/rest.service';
import colors from '../../constants/colors';
import { setStartDate } from '../../redux/sessionSlice';

const LobbyScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const gameSession = useSelector((state) => state.session);

  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refresh();
    const handleRefresh = setInterval(() => {
      refresh();
    }, 5000);

    return () => clearInterval(handleRefresh);
  }, []);

  const refresh = async () => {
    GameSessionApi.getPlayers(gameSession.code).then((res) => {
      setPlayers(res);
      RestApi.gameSession.get(res[0].game_session).then((res1) => {
        setLoading(false);
        if (res1 && res1.start_date) {
          navigation.navigate('Dashboard');
          clearInterval(refresh);
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
    borderRadius: 20,
    color: colors.white,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: colors.white + '10',
  },
  error: {
    fontSize: 22,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 30,
    color: 'red',
    fontWeight: 'bold',
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
