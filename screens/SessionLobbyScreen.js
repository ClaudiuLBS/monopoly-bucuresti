import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';

import DefaultScreen from '../components/DefaultScreen';
import colors from '../constants/colors';
import GameSessionApi from '../services/game_session.service';
import RestApi from '../services/rest.service';

const SessionLobbyScreen = ({ code, owner, startSession }) => {
  const navigation = useNavigation();

  const [players, setPlayers] = useState([]);
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // GameSessionApi.getPlayers(code).then((res) => {
    //   setPlayers(res);
    //   RestApi.gameSession.get(res[0].game_session).then((res1) => {
    //     if (res1 && res1.start_date) navigation.navigate('Game');
    //   });
    // });
    // setTimeout(() => {
    //   setCounter(counter + 1);
    // }, 5000);
  }, [counter]);

  const handleStartSession = async () => {
    setMessage('Starting Game...');
    const data = await startSession(code);
    if (data.error) {
      setMessage(data.error);
      return;
    }
    if (data.message) {
      setMessage(data.message);
      return;
    }
    navigation.navigate('Game');
  };
  return (
    <DefaultScreen>
      <Text style={styles.code}>{code}</Text>
      {owner && <CustomButton onPress={handleStartSession}>START</CustomButton>}
      <View style={{ borderTopWidth: 2, borderTopColor: colors.secodary, marginTop: 10 }}>
        {players.map((player, index) => (
          <Text
            key={index}
            style={[
              styles.playerName,
              {
                borderColor: player.owner ? '#ffc800' : '#999999',
                borderTopColor: player.color,
              },
            ]}
          >
            {player.name}
          </Text>
        ))}
      </View>
      {message ? <Text style={styles.message}>{message}</Text> : null}
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
    backgroundColor: colors.secodary,
    borderRadius: 100,
    color: '#fff',
    fontWeight: 'bold',
  },
  playerName: {
    marginTop: 10,
    fontSize: 16,
    paddingVertical: 5,
    fontWeight: 'bold',
    borderRadius: 20,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 8,
    borderTopWidth: 5,
    textAlign: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 22,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 30,
    color: colors.primary,
    fontWeight: 'bold',
  },
});
export default SessionLobbyScreen;
