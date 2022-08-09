import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../constants/colors';
import texts from '../constants/texts';
import { bringSoldiers, dropSoldiers, removeMoney } from '../redux/playerSlice';
import GameService from '../services/game.service';
import RestApi from '../services/rest.service';
import CustomButton from './CustomButton';
import CustomSlider from './CustomSlider';
import PopUp from './PopUp';
import TraitItem from './TraitItem';

const modals = {
  null: 0,
  buy: 1,
  attack: 2,
  bring: 3,
  drop: 4,
};

const LandLabel = ({ place, refresh }) => {
  if (!place || !place.property) return null;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [property, setProperty] = useState(null);
  const [modalVisible, showModal] = useState(0);
  const [alert, setAlert] = useState({ visible: false, title: '', subtitle: '' });
  const [soldiersCount, setSoldiersCount] = useState(0);
  const player = useSelector((state) => state.player);

  const loadProperty = () => {
    RestApi.property.get(place.property).then((res) => {
      setProperty(res);
    });
  };

  useEffect(() => {
    loadProperty();
  }, [place]);

  const handleBuyProperty = () => {
    GameService.buyProperty(player.id, place.property).then((res) => {
      loadProperty();
      dispatch(removeMoney(place.price));
      setAlert({
        visible: true,
        title: `Successfully bought property ${place.name}`,
        subtitle: texts.buyPropertySuccess,
      });
      showModal(modals.null);
      refresh();
    });
  };

  const handleAttack = () => {
    GameService.attack(player.id, place.property).then((res) => {
      dispatch(dropSoldiers(player.soldiers));
      if (res.win) {
        setAlert({ visible: true, title: 'You Won!', subtitle: texts.win(res.soldiers) });
        loadProperty();
        refresh();
      } else setAlert({ visible: true, title: 'You Lost!', subtitle: texts.lose });
      showModal(modals.null);
    });
  };

  const handleBringSoldiers = () => {
    GameService.bringSoldiers(player.id, place.property, soldiersCount).then((res) => {
      loadProperty();
      setAlert({
        visible: true,
        title: `You brought ${soldiersCount} soldiers`,
        subtitle: `Now you have ${player.soldiers + soldiersCount} active soldiers`,
      });
      dispatch(bringSoldiers(soldiersCount));
      showModal(modals.null);
      setSoldiersCount(0);
    });
  };

  const handleDropSoldiers = () => {
    GameService.dropSoldiers(player.id, place.property, soldiersCount).then((res) => {
      loadProperty();
      setAlert({
        visible: true,
        title: `You droped ${soldiersCount} soldiers`,
        subtitle: `Now you have ${player.soldiers - soldiersCount} active soldiers`,
      });
      dispatch(dropSoldiers(soldiersCount));
      showModal(modals.null);
      setSoldiersCount(0);
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
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.container}
        onPress={() =>
          navigation.navigate('PropertyInfo', { property: property.id, title: place.name })
        }
      >
        <Text style={styles.title}>{place.name}</Text>
        <View style={styles.specsContainer}>
          <TraitItem
            title={'Population'}
            value1={property.population}
            color={colors.yellow}
            iconName={'people'}
            iconType={'ionicon'}
            iconSize={22}
            style={{ flex: 1 }}
          />
          <TraitItem
            title={'Soldiers'}
            value1={property.soldiers}
            color={colors.lightBlue}
            iconName={'user-shield'}
            iconType={'font-awesome-5'}
            iconSize={16}
            style={{ flex: 1 }}
          />
          <TraitItem
            title={'Factories'}
            value1={property.factories}
            color={colors.pink}
            iconName={'factory'}
            iconType={'material-community'}
            iconSize={19}
            style={{ flex: 1 }}
          />
        </View>
        <CustomButton
          color={colors.green}
          active={player.money >= place.price}
          onPress={() => showModal(modals.buy)}
        >
          BUY {place.price}$
        </CustomButton>
        <PopUp
          title={`Buy ${place.name} for ${place.price}$`}
          info={texts.buyPropertyInfo}
          visible={modalVisible == modals.buy}
          onConfirm={handleBuyProperty}
          onCancel={() => showModal(modals.null)}
        />
        <PopUp
          title={alert.title}
          info={alert.subtitle}
          onlyInformative={true}
          visible={alert.visible}
          onCancel={() => setAlert({ visible: false, title: '', subtitle: '' })}
        />
      </TouchableOpacity>
    );

  //ATTACK PROPERTY
  if (property.owner != player.id)
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.container}
        onPress={() =>
          navigation.navigate('PropertyInfo', { property: property.id, title: place.name })
        }
      >
        <Text style={styles.title}>{place.name}</Text>
        <TraitItem
          title={'Owner'}
          value1={place.owner}
          color={colors.white}
          iconName={'user-tie'}
          iconType={'font-awesome-5'}
          iconSize={17}
        />
        <CustomButton
          active={player.soldiers > 0}
          color={colors.red}
          onPress={() => showModal(modals.attack)}
        >
          ATTACK
        </CustomButton>
        <PopUp
          title={`Attack ${place.name} with ${player.soldiers} soldiers?`}
          info={texts.attackInfo}
          visible={modalVisible == modals.attack}
          onConfirm={handleAttack}
          onCancel={() => showModal(modals.null)}
        />
        <PopUp
          title={alert.title}
          info={alert.subtitle}
          onlyInformative={true}
          visible={alert.visible}
          onCancel={() => setAlert({ visible: false, title: '', subtitle: '' })}
        />
      </TouchableOpacity>
    );

  //MY PROPERTY INFO
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() =>
        navigation.navigate('PropertyInfo', { property: property.id, title: place.name })
      }
    >
      <Text style={styles.title}>{place.name}</Text>
      <View style={styles.specsContainer}>
        <TraitItem
          title={'Population'}
          value1={property.population}
          color={colors.yellow}
          iconName={'people'}
          iconType={'ionicon'}
          iconSize={22}
          style={{ flex: 1 }}
        />
        <TraitItem
          title={'Soldiers'}
          value1={property.soldiers}
          color={colors.lightBlue}
          iconName={'user-shield'}
          iconType={'font-awesome-5'}
          iconSize={16}
          style={{ flex: 1 }}
        />
        <TraitItem
          title={'Factories'}
          value1={property.factories}
          color={colors.pink}
          iconName={'factory'}
          iconType={'material-community'}
          iconSize={19}
          style={{ flex: 1 }}
        />
      </View>
      <View style={styles.specsContainer}>
        <CustomButton
          style={styles.soldierButton}
          color={colors.red}
          onPress={() => showModal(modals.bring)}
        >
          <Icon name="upload" type="material-community" color={colors.red} />
        </CustomButton>
        <CustomButton
          style={styles.soldierButton}
          color={colors.lightBlue}
          onPress={() => showModal(modals.drop)}
        >
          <Icon name="download" type="material-community" color={colors.lightBlue} />
        </CustomButton>
      </View>

      {/* BRING SOLDIERS */}
      <PopUp
        title={texts.bringSoldiers}
        visible={modalVisible == modals.bring}
        info={texts.bringSoldiersInfo}
        onConfirm={handleBringSoldiers}
        onCancel={() => {
          showModal(modals.null);
          setSoldiersCount(0);
        }}
      >
        <CustomSlider
          min={0}
          max={property.soldiers}
          disabled={!property.soldiers}
          value={soldiersCount}
          onChange={setSoldiersCount}
        />
      </PopUp>

      {/* DROP SOLDIERS */}
      <PopUp
        title={texts.dropSoldiers}
        info={texts.dropSoldiersInfo}
        visible={modalVisible == modals.drop}
        onConfirm={handleDropSoldiers}
        onCancel={() => {
          showModal(modals.null);
          setSoldiersCount(0);
        }}
      >
        <CustomSlider
          min={0}
          max={player.soldiers}
          disabled={!player.soldiers}
          value={soldiersCount}
          onChange={setSoldiersCount}
        />
      </PopUp>
      <PopUp
        title={alert.title}
        info={alert.subtitle}
        onlyInformative={true}
        visible={alert.visible}
        onCancel={() => setAlert({ visible: false, title: '', subtitle: '' })}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '90%',
    backgroundColor: colors.primary + 'f0',
    borderWidth: 1,
    borderColor: colors.blueGray,
    bottom: 20,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    color: colors.white,
    fontFamily: 'bold',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: colors.white,
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
});

export default LandLabel;
