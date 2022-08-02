import { Icon } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../constants/colors';
import { addProperty, removeMoney } from '../redux/playerSlice';
import GameService from '../services/game.service';
import RestApi from '../services/rest.service';
import CustomButton from './CustomButton';

const LandLabel = ({ place }) => {
  if (!place || !place.property) return null;

  const dispatch = useDispatch();
  const [property, setProperty] = useState(null);
  const player = useSelector((state) => state.player);

  useEffect(() => {
    RestApi.property.get(place.property).then((res) => {
      setProperty(res);
    });
  }, []);

  const handleBuyProperty = () => {
    GameService.buyProperty(player.id, place.property).then((res) => {
      const newProperty = {
        id: property.id,
        name: place.name,
        population: property.population,
        soldiers: property.soldiers,
        factories: property.factories,
      };
      dispatch(addProperty(newProperty));
      dispatch(removeMoney(place.price));
    });
  };

  // LOADING
  if (!property || !player.id)
    return (
      <View style={[styles.container, { paddingVertical: 50 }]}>
        <ActivityIndicator color={colors.primary} size={'large'} />
      </View>
    );

  // BUY PROPERTY
  if (!property.owner)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{place.name}</Text>
        <View style={styles.specsContainer}>
          <View style={styles.specsItem}>
            <Text style={styles.specsLabel}>population</Text>
            <Text>{property.population}</Text>
          </View>
          <View style={styles.specsItem}>
            <Text style={styles.specsLabel}>soldiers</Text>
            <Text>{property.soldiers}</Text>
          </View>
          <View style={styles.specsItem}>
            <Text style={styles.specsLabel}>factories</Text>
            <Text>{property.factories}</Text>
          </View>
        </View>
        <CustomButton
          color={colors.primary}
          active={player.money >= place.price}
          onPress={handleBuyProperty}
        >
          BUY {place.price}$
        </CustomButton>
      </View>
    );

  //ATTACK PROPERTY
  if (property.owner != player.id)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{place.name}</Text>
        <View style={styles.specsContainer}>
          <Text style={styles.specsLabel}>Owner:</Text>
          <Text style={styles.specsValue}>Geani</Text>
        </View>
        <CustomButton color={colors.primary}>ATTACK</CustomButton>
      </View>
    );

  //MY PROPERTY INFO
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{place.name}</Text>
      <View style={styles.specsContainer}>
        <View style={styles.specsItem}>
          <Text style={styles.specsLabel}>population</Text>
          <Text>{property.population}</Text>
        </View>
        <View style={styles.specsItem}>
          <Text style={styles.specsLabel}>soldiers</Text>
          <Text>{property.soldiers}</Text>
        </View>
        <View style={styles.specsItem}>
          <Text style={styles.specsLabel}>factories</Text>
          <Text>{property.factories}</Text>
        </View>
      </View>
      <View style={styles.specsContainer}>
        <CustomButton style={styles.soldierButton} color={colors.primary}>
          <Icon name="upload" type="material-community" />
        </CustomButton>
        <CustomButton style={styles.soldierButton} color={colors.primary}>
          <Icon name="download" type="material-community" />
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '90%',
    backgroundColor: colors.blueGray,
    bottom: 20,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: colors.primary,
    textAlign: 'center',
  },
  specsContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-around',
  },
  specsItem: {
    flex: 1,
    alignItems: 'center',
  },
  specsLabel: {
    fontWeight: 'bold',
  },
  specsValue: {
    marginHorizontal: 5,
  },
  soldierButton: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default LandLabel;
