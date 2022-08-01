import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../../components/CustomButton';
import DefaultScreen from '../../components/DefaultScreen';
import CustomInput from '../../components/CustomInput';
import colors from '../../constants/colors';

const randomColor = () => {
  const result = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return result;
};

const MenuScreen = ({ createSession, joinSession, firstScreen }) => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [color, setColor] = useState(randomColor());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateSession = async () => {
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
        <Text style={{ color: colors.blueGray }}>Nigga finnish your fuckin game</Text>
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
    fontWeight: 'bold',
  },
});

export default MenuScreen;
