import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

const CustomButton = ({ style, color = colors.blueGray, onPress, children }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[styles.button, style, { borderColor: color }]}
    >
      <Text style={[styles.text, { color: color }]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderRadius: 100,
    paddingVertical: 10,
    marginVertical: 5,
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CustomButton;
