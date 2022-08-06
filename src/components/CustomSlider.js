import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '@rneui/base';
import { Slider } from '@rneui/themed';

import colors from '../constants/colors';

const CustomSlider = ({ min, max, disabled, value, onChange }) => {
  return (
    <Slider
      minimumValue={min}
      maximumValue={max}
      disabled={disabled}
      step={1}
      value={value}
      onValueChange={onChange}
      thumbProps={{
        children: (
          <View style={styles.thumbContainer}>
            <Icon
              name="human-scooter"
              type="material-community"
              color={colors.primary}
              size={30}
              style={{ flex: 1 }}
            />
            <Text style={styles.text}>{value}</Text>
          </View>
        ),
      }}
      allowTouchTrack
      thumbStyle={styles.thumbStyle}
      trackStyle={styles.trackStyle}
      style={{ marginTop: 10 }}
    />
  );
};

const styles = StyleSheet.create({
  thumbStyle: {
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff00',
    width: 'auto',
    height: 'auto',
  },
  trackStyle: {
    width: '95%',
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'bold',
  },
  thumbContainer: {
    justifyContent: 'space-between',
    bottom: 6,
    right: 12,
  },
});

export default CustomSlider;
