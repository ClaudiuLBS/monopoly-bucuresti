import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Slider, Icon } from '@rneui/themed';

import colors from '../constants/colors';

const CustomSlider = ({ min = 0, max, disabled = false, value, onChange }) => {
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
              color={`hsl(${value % 360},60%,55%)`}
              size={30}
              style={{ flex: 1 }}
            />
            <Text style={[styles.text, { color: `hsl(${value % 360},60%,55%)` }]}>{value}</Text>
          </View>
        ),
      }}
      allowTouchTrack
      thumbStyle={styles.thumbStyle}
      trackStyle={styles.trackStyle}
      maximumTrackTintColor={`hsl(${value % 360},60%,55%)`}
      minimumTrackTintColor={`hsl(${value % 360},60%,55%)`}
      style={{ marginVertical: 10 }}
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
    backgroundColor: 'red',
    borderColor: 'red',
    color: 'red',
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'bold',
    color: colors.blueGray,
  },
  thumbContainer: {
    justifyContent: 'space-between',
    bottom: 6,
    right: 12,
  },
});

export default CustomSlider;
