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
import CustomSlider from './CustomSlider';
import PopUp from './PopUp';
import PopUpLouncher from './PopUpLouncher';
import TraitItem from './TraitItem';

const LandLabel = ({ place, refresh }) => {
  if (!place || !place.property) return null;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);

  const [property, setProperty] = useState(null);
  const [alert, setAlert] = useState({ visible: false, title: '', subtitle: '' });
  const [soldiersCount, setSoldiersCount] = useState(0);

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
      setSoldiersCount(0);
    });
  };

  const renderBuyProperty = () => {
    if (property.owner) return null;

    return (
      <>
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
        <PopUpLouncher
          color={colors.green}
          active={player.money >= place.price}
          buttonText={`BUY ${place.price}$`}
          title={`Buy ${place.name} for ${place.price}$`}
          info={texts.buyPropertyInfo}
          onConfirm={handleBuyProperty}
        />
      </>
    );
  };

  const renderAttackProperty = () => {
    if (property.owner && property.owner != player.id)
      return (
        <>
          <Text style={styles.title}>{place.name}</Text>
          <TraitItem
            title={'Owner'}
            value1={place.owner}
            color={colors.white}
            iconName={'user-tie'}
            iconType={'font-awesome-5'}
            iconSize={17}
          />
          <PopUpLouncher
            buttonText={'Attack'}
            active={player.soldiers > 0}
            color={colors.red}
            title={`Attack ${place.name} with ${player.soldiers} soldiers?`}
            info={texts.attackInfo}
            onConfirm={handleAttack}
          />
        </>
      );
  };

  const renderMyProperty = () => {
    if (property.owner && property.owner === player.id)
      return (
        <>
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
            {/* BRING SOLDIERS */}
            <PopUpLouncher
              buttonText={<Icon name="upload" type="material-community" color={colors.red} />}
              style={styles.soldierButton}
              color={colors.red}
              active={property.soldiers > 0}
              title={texts.bringSoldiers}
              info={texts.bringSoldiersInfo}
              onConfirm={handleBringSoldiers}
              onCancel={() => setSoldiersCount(0)}
            >
              <CustomSlider
                min={0}
                max={property.soldiers}
                disabled={!property.soldiers}
                value={soldiersCount}
                onChange={setSoldiersCount}
              />
            </PopUpLouncher>

            {/* DROP SOLDIERS */}
            <PopUpLouncher
              buttonText={
                <Icon name="download" type="material-community" color={colors.lightBlue} />
              }
              style={styles.soldierButton}
              color={colors.lightBlue}
              active={player.soldiers > 0}
              title={texts.dropSoldiers}
              info={texts.dropSoldiersInfo}
              onConfirm={handleDropSoldiers}
              onCancel={() => setSoldiersCount(0)}
            >
              <CustomSlider
                min={0}
                max={player.soldiers}
                disabled={!player.soldiers}
                value={soldiersCount}
                onChange={setSoldiersCount}
              />
            </PopUpLouncher>
          </View>
        </>
      );
  };

  // LOADING
  if (!property || !player.id)
    return (
      <View style={[styles.container, { paddingVertical: 50 }]}>
        <ActivityIndicator color={colors.primary} size={'large'} />
      </View>
    );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() =>
        navigation.navigate('PropertyInfo', { property: property.id, title: place.name })
      }
    >
      {renderBuyProperty()}
      {renderAttackProperty()}
      {renderMyProperty()}
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
