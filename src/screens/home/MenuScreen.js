import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../../components/CustomButton';
import DefaultScreen from '../../components/DefaultScreen';
import CustomInput from '../../components/CustomInput';
import ColoredCircle from '../../components/ColoredCircle';
import colors from '../../constants/colors';
import GameSessionApi from '../../services/session.service';
import { setPlayer } from '../../redux/playerSlice';
import { setSession } from '../../redux/sessionSlice';
import texts from '../../constants/texts';

function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const randomColor = () => {
  const hue = Math.floor(Math.random() * 361);
  const result = hslToHex(hue, 60, 55);
  return result;
};

const MenuScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const gameSession = useSelector((state) => state.session);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [color, setColor] = useState(randomColor());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const pickScreen = () => {
    setError('');
    if (gameSession && player) {
      if (gameSession.start_date) navigation.navigate('Dashboard');
      else navigation.navigate('Lobby');
    }
  };

  const handleCreateSession = async () => {
    const createSession = async (name, color) => {
      const data = await GameSessionApi.createSession(name, color);
      dispatch(setPlayer(data.player));
      dispatch(setSession(data.gameSession));
    };

    if (!name) {
      setError('Enter a name yo fuckin nigger');
      return;
    }
    setLoading(true);
    await createSession(name, color);
    setLoading(false);
    navigation.navigate('Lobby');
  };

  const handleJoinSession = async () => {
    let screen = 'Lobby';
    const joinSession = async (name, code, color) => {
      const data = await GameSessionApi.joinSession(name, code, color);
      if (data.error) return data.error;
      if (data.gameSession.start_date) screen = 'Dashboard';
      dispatch(setPlayer(data.player));
      dispatch(setSession(data.gameSession));
    };

    if (!name) {
      setError(texts.enterNameError);
      return;
    }
    if (code.length != 4) {
      setError(texts.codeVerifError);
      return;
    }
    setLoading(true);
    const error = await joinSession(name, code, color);
    setLoading(false);
    if (error) setError(error);
    else navigation.navigate(screen);
  };

  const renderColorPicker = () => {
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: 10,
        }}
        activeOpacity={0.9}
        onPress={() => setColor(randomColor())}
      >
        <ColoredCircle color={player.color ? player.color : color} size={40} borderWidth={2}>
          {loading ? <ActivityIndicator size={'large'} color={colors.white} /> : null}
        </ColoredCircle>
      </TouchableOpacity>
    );
  };

  return (
    <DefaultScreen style={{ justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CustomInput setText={setName} style={{ flex: 1 }} editable={gameSession.id == null}>
          name
        </CustomInput>
        {renderColorPicker()}
      </View>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <CustomInput setText={setCode} maxLength={4} editable={gameSession.id == null}>
          code
        </CustomInput>
        <CustomButton
          active={!gameSession.id && !loading}
          style={styles.joinSession}
          onPress={handleJoinSession}
        >
          {texts.joinGame}
        </CustomButton>
      </View>
      <CustomButton active={!gameSession.id && !loading} onPress={handleCreateSession}>
        {texts.createGame}
      </CustomButton>
      {!gameSession.id ? null : (
        <CustomButton color={colors.green} onPress={pickScreen}>
          {texts.continueGame}
        </CustomButton>
      )}
      {error ? <Text style={styles.error}>Error - {error}</Text> : null}
    </DefaultScreen>
  );
};

const styles = StyleSheet.create({
  joinSession: {
    flex: 1,
    marginLeft: 10,
  },
  error: {
    color: colors.red,
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: colors.red,
    marginTop: 5,
    borderRadius: 100,
  },
});

export default MenuScreen;
