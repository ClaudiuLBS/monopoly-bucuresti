import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../components/CustomButton';
import DefaultScreen from '../components/DefaultScreen';
import CustomInput from '../components/CustomInput';

const SessionHomeScreen = ({ createSession, joinSession, firstScreen }) => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleCreateSession = () => {
    if (!name) {
      setError('Enter a name yo fuckin nigger');
      return;
    }
    createSession(name);
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
    const error = await joinSession(name, code);
    if (error) setError(error);
  };

  if (firstScreen != 'Home')
    return (
      <DefaultScreen>
        <Text>Nigga finnish your fuckin game</Text>
        <CustomButton onPress={() => navigation.navigate(firstScreen)}>Continue</CustomButton>
      </DefaultScreen>
    );

  return (
    <DefaultScreen style={{ justifyContent: 'center' }}>
      <CustomInput setText={setName}>name</CustomInput>
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

export default SessionHomeScreen;
