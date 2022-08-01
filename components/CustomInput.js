import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import colors from '../constants/colors';

const CustomInput = ({ children, style, setText, color = colors.secondary, maxLength = 25 }) => {
  return (
    <TextInput
      style={[styles.textInput, style, { borderColor: color, color: color }]}
      placeholder={`${children}...`}
      placeholderTextColor={colors.secondary + '70'}
      maxLength={maxLength}
      onChangeText={(text) => setText(text)}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    paddingVertical: 8,
    borderRadius: 100,
    marginVertical: 5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 30,
  },
});

export default CustomInput;
