import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';

import DefaultScreen from '../components/DefaultScreen';
import LobbyPlayer from '../components/LobbyPlayer';
import colors from '../constants/colors';
import GameSessionApi from '../services/game_session.service';
import RestApi from '../services/rest.service';

const LobbyScreen = ({ code, owner, startSession }) => {
  const navigation = useNavigation();

  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refresh = setInterval(() => {
      GameSessionApi.getPlayers(code).then((res) => {
        setPlayers(res);
        RestApi.gameSession.get(res[0].game_session).then((res1) => {
          setLoading(false);
          if (res1 && res1.start_date) {
            navigation.navigate('Game');
            clearInterval(refresh);
          }
        });
      });
    }, 5000);
  }, []);

  const handleStartSession = async () => {
    setLoading(true);
    const data = await startSession(code);
    if (data.error) {
      setError(data.error);
      return;
    }
    navigation.navigate('Game');
    setLoading(false);
  };
  return (
    <DefaultScreen>
      <Text style={styles.code}>{code}</Text>
      {owner && <CustomButton onPress={handleStartSession}>START</CustomButton>}

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
    backgroundColor: colors.secondary,
    borderRadius: 100,
    color: '#fff',
    fontWeight: 'bold',
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
