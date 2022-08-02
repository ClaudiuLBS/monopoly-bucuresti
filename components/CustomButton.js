import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

const CustomButton = ({ style, color = colors.blueGray, onPress, children, active = true }) => {
  return (
    <TouchableOpacity
      activeOpacity={active ? 0.6 : 1}
      onPress={active ? onPress : null}
      style={[styles.button, style, { borderColor: active ? color : color + '80' }]}
    >
      <Text style={[styles.text, { color: active ? color : color + '80' }]}>{children}</Text>
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
    fontFamily: 'bold',
  },
});

export default CustomButton;
