import { Icon } from '@rneui/base';
import { Slider } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../constants/colors';
import texts from '../constants/texts';
import { addProperty, bringSoldiers, dropSoldiers, removeMoney } from '../redux/playerSlice';
import GameService from '../services/game.service';
import RestApi from '../services/rest.service';
import CustomButton from './CustomButton';
import PopUp from './PopUp';

const modals = {
  null: 0,
  buy: 1,
  attack: 2,
  bring: 3,
  drop: 4,
};

const LandLabel = ({ place, refresh }) => {
  if (!place || !place.property) return null;

  const dispatch = useDispatch();
  const [property, setProperty] = useState(null);
  const [modalVisible, showModal] = useState(0);
  const [soldiersCount, setSoldiersCount] = useState(0);
  const player = useSelector((state) => state.player);

  const loadProperty = () => {
    RestApi.property.get(place.property).then((res) => {
      setProperty(res);
    });
  };

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
        owner: player.id,
      };
      setProperty(newProperty);
      dispatch(addProperty(newProperty));
      dispatch(removeMoney(place.price));
      showModal(modals.null);
      refresh();
    });
  };

  const handleAttack = () => {
    GameService.attack(player.id, place.property).then((res) => {
      showModal(modals.null);
      dispatch(dropSoldiers(player.soldiers));
      if (res.win) {
        Alert.alert('You won', `${res.soldiers} soldiers left`);
        const newProperty = {
          id: property.id,
          name: place.name,
          population: property.population,
          soldiers: res.soldiers,
          factories: property.factories,
          owner: player.id,
        };
        setProperty(newProperty);
        dispatch(addProperty(newProperty));
        refresh();
      } else Alert.alert('You lost', 'Maybe next time');
    });
  };

  const handleBringSoldiers = () => {
    GameService.bringSoldiers(player.id, place.property, soldiersCount).then((res) => {
      setProperty({
        id: property.id,
        name: property.name,
        population: property.population,
        soldiers: res.soldiers,
        factories: property.factories,
        owner: player.id,
      });
      dispatch(bringSoldiers(soldiersCount));
      setSoldiersCount(0);
      showModal(modals.null);
    });
  };

  const handleDropSoldiers = () => {
    GameService.dropSoldiers(player.id, place.property, soldiersCount).then((res) => {
      setProperty({
        id: property.id,
        name: property.name,
        population: property.population,
        soldiers: res.soldiers,
        factories: property.factories,
        owner: player.id,
      });
      dispatch(dropSoldiers(soldiersCount));
      setSoldiersCount(0);
      showModal(modals.null);
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
          onPress={() => showModal(modals.buy)}
        >
          BUY {place.price}$
        </CustomButton>
        <PopUp
          title={`Buy ${place.name} for ${place.price}$`}
          visible={modalVisible == modals.buy}
          onConfirm={handleBuyProperty}
          onCancel={() => showModal(modals.null)}
        />
      </View>
    );

  //ATTACK PROPERTY
  if (property.owner != player.id)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{place.name}</Text>
        <View style={[styles.specsContainer, { justifyContent: 'center' }]}>
          <Text style={styles.specsLabel}>Owner:</Text>
          <Text style={styles.specsValue}>{place.owner}</Text>
        </View>
        <CustomButton
          active={player.soldiers > 0}
          color={colors.primary}
          onPress={() => showModal(modals.attack)}
        >
          ATTACK
        </CustomButton>
        <PopUp
          title={`Attack ${place.name} with ${player.soldiers} soldiers?`}
          visible={modalVisible == modals.attack}
          onConfirm={handleAttack}
          onCancel={() => showModal(modals.null)}
        />
      </View>
    );

  const renderSliderThumb = () => (
    <View style={{ justifyContent: 'space-between', bottom: 6, right: 12 }}>
      <Icon
        name="human-scooter"
        type="material-community"
        color={colors.primary}
        size={30}
        style={{ flex: 1 }}
      />
      <Text style={{ flex: 1, textAlign: 'center', fontFamily: 'bold' }}>{soldiersCount}</Text>
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
        <CustomButton
          style={styles.soldierButton}
          color={colors.primary}
          onPress={() => showModal(modals.bring)}
        >
          <Icon name="upload" type="material-community" />
        </CustomButton>
        <CustomButton
          style={styles.soldierButton}
          color={colors.primary}
          onPress={() => showModal(modals.drop)}
        >
          <Icon name="download" type="material-community" />
        </CustomButton>
      </View>

      {/* BRING SOLDIERS */}
      <PopUp
        title={texts.bringSoldiers}
        visible={modalVisible == modals.bring}
        onConfirm={handleBringSoldiers}
        onCancel={() => {
          showModal(modals.null);
          setSoldiersCount(0);
        }}
      >
        <Slider
          minimumValue={0}
          maximumValue={property.soldiers}
          disabled={!property.soldiers}
          step={1}
          value={soldiersCount}
          onValueChange={setSoldiersCount}
          thumbProps={{
            children: renderSliderThumb(),
          }}
          allowTouchTrack
          thumbStyle={styles.thumbStyle}
          trackStyle={styles.trackStyle}
          style={{ marginTop: 10 }}
        />
      </PopUp>

      {/* DROP SOLDIERS */}
      <PopUp
        title={texts.dropSoldiers}
        visible={modalVisible == modals.drop}
        onConfirm={handleDropSoldiers}
        onCancel={() => {
          showModal(modals.null);
          setSoldiersCount(0);
        }}
      >
        <Slider
          minimumValue={0}
          maximumValue={player.soldiers}
          disabled={!player.soldiers}
          step={1}
          value={soldiersCount}
          onValueChange={setSoldiersCount}
          thumbProps={{
            children: renderSliderThumb(),
          }}
          allowTouchTrack
          thumbStyle={styles.thumbStyle}
          trackStyle={styles.trackStyle}
        />
      </PopUp>
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
    fontFamily: 'bold',
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
    fontFamily: 'bold',
  },
  specsValue: {
    marginHorizontal: 5,
  },
  soldierButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  thumbStyle: {
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff00',
    width: 'auto',
    height: 'auto',
  },
  trackStyle: {
    width: '95%',
  },
});

export default LandLabel;
