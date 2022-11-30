import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '@rneui/themed';

import colors from '../constants/colors';

const TraitItem = ({ title, value1, value2, color, iconName, iconType, iconSize, style }) => {
  return (
    <View style={style}>
      <View style={styles.subtitleContainer}>
        <Icon name={iconName} type={iconType} color={color} size={iconSize} />
        <Text style={[styles.subtitle, { color }]}>{title}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.tableItem, { color }]}>{value1}</Text>
        {value2 != undefined ? <Text style={[styles.tableItem, { color }]}>{value2}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableItem: {
    marginBottom: 10,
    marginHorizontal: 5,
    fontSize: 17,
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#ffffff10',
    borderRadius: 5,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  subtitle: {
    color: colors.white,
    fontFamily: 'bold',
    marginVertical: 5,
    marginLeft: 5,
    fontSize: 16,
    alignSelf: 'center',
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TraitItem;
