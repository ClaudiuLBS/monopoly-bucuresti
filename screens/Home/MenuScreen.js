import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../../components/CustomButton';
import DefaultScreen from '../../components/DefaultScreen';
import CustomInput from '../../components/CustomInput';
import colors from '../../constants/colors';
import GameSessionApi from '../../services/session.service';
import { setPlayer } from '../../redux/playerSlice';
import { setSession } from '../../redux/sessionSlice';

const randomColor = () => {
  const result = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return result;
};

const MenuScreen = ({ firstScreen }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [color, setColor] = useState(randomColor());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    const joinSession = async (name, code, color) => {
      const data = await GameSessionApi.joinSession(name, code, color);
      if (data.error) return data.error;

      dispatch(setPlayer(data.player));
      dispatch(setSession(data.gameSession));
    };

    if (!name) {
      setError('Enter a name yo fuckin nigger');
      return;
    }
    if (code.length != 4) {
      setError('Code must have 4 digits yo faggot');
      return;
    }
    setLoading(true);
    const error = await joinSession(name, code, color);
    setLoading(false);

    if (error) setError(error);
    else navigation.navigate('Lobby');
  };

  const renderColorPicker = () => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: color,
          width: 40,
          height: 40,
          borderRadius: 50,
          marginHorizontal: 10,
          borderWidth: 2,
          borderColor: colors.white,
        }}
        activeOpacity={0.9}
        onPress={() => setColor(randomColor())}
      />
    );
  };

  if (firstScreen != 'Menu')
    return (
      <DefaultScreen>
        <Text style={{ color: colors.blueGray }}>{player.name} finnish your fuckin game</Text>
        <CustomButton onPress={() => navigation.navigate(firstScreen)}>Continue</CustomButton>
      </DefaultScreen>
    );

  return (
    <DefaultScreen style={{ justifyContent: 'center' }}>
      {loading ? <ActivityIndicator size={'large'} style={{ marginBottom: 10 }} /> : null}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CustomInput setText={setName} style={{ flex: 1 }}>
          name
        </CustomInput>
        {renderColorPicker()}
      </View>
      <CustomButton onPress={handleCreateSession}>Create Session</CustomButton>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <CustomInput setText={setCode} maxLength={4}>
          code
        </CustomInput>
        <CustomButton style={styles.joinSession} onPress={handleJoinSession}>
          Join Session
        </CustomButton>
      </View>
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
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
    borderTopWidth: 2,
    borderTopColor: 'red',
    marginTop: 5,
    borderRadius: 100,
    fontFamily: 'bold',
  },
});

export default MenuScreen;
