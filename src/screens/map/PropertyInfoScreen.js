import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../../components/CustomButton';
import CustomSlider from '../../components/CustomSlider';
import DefaultScreen from '../../components/DefaultScreen';
import LoadingScreen from '../../components/LoadingScreen';
import PopUp from '../../components/PopUp';
import TraitItem from '../../components/TraitItem';
import colors from '../../constants/colors';
import texts from '../../constants/texts';
import GameService from '../../services/game.service';
import RestApi from '../../services/rest.service';
import { dropSoldiers, removeMoney } from '../../redux/playerSlice';

const PropertyInfoScreen = ({ route }) => {
  const dispatch = useDispatch();
  const property_id = route.params.property;
  const inPlace = route.params.inPlace;

  const player = useSelector((state) => state.player);
  const [property, setProperty] = useState(null);
  const [populationToTrain, setPopulationToTrain] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadProperty();
  }, []);

  const loadProperty = () => {
    RestApi.property.info(property_id).then((res) => {
      setProperty(res);
    });
  };

  const handleBuyFactory = () => {
    GameService.buyFactory(player.id, property.id).then((res) => {
      if (!res) return;
      if (res.error) {
        Alert.alert('Failed', res.error);
      }
      setPopulationToTrain(0);
      dispatch(removeMoney(property.factory_price));
      loadProperty();
    });
  };

  const handleTrainSoldiers = () => {
    GameService.trainSoldiers(player.id, property.id, populationToTrain).then((res) => {
      if (!res) return;
      Alert.alert('Success');
      loadProperty();
      setModalVisible(false);
      setPopulationToTrain(0);
    });
  };

  const handleBuyProperty = () => {
    GameService.buyProperty(player.id, property.id).then((res) => {
      loadProperty();
      dispatch(removeMoney(property.price));
    });
  };

  const handleAttack = () => {
    GameService.attack(player.id, property.id).then((res) => {
      dispatch(dropSoldiers(player.soldiers));
      if (res.win) {
        Alert.alert('You won', `${res.soldiers} soldiers left`);
        loadProperty();
      } else Alert.alert('You lost', 'Maybe next time');
    });
  };

  if (!property) return <LoadingScreen />;

  if (!property.owner_id || property.owner_id == player.id)
    return (
      <DefaultScreen>
        <TraitItem
          title={'Population'}
          value1={property.population}
          value2={`${property.population_per_day}/day`}
          color={colors.yellow}
          iconName={'people'}
          iconType={'ionicon'}
          iconSize={22}
        />
        <TraitItem
          title={'Factories'}
          value1={property.factories}
          color={colors.pink}
          iconName={'factory'}
          iconType={'material-community'}
          iconSize={19}
        />
        <TraitItem
          title={'Revenue'}
          value1={`${property.money_per_day}/day`}
          color={colors.green}
          iconName={'money-bill'}
          iconType={'font-awesome-5'}
          iconSize={15}
        />
        <TraitItem
          title={'Defense Soldiers'}
          value1={property.soldiers}
          color={colors.lightBlue}
          iconName={'user-shield'}
          iconType={'font-awesome-5'}
          iconSize={16}
        />
        {property.owner_id == player.id ? (
          <>
            <CustomButton style={{ marginTop: 20 }} color={colors.pink} onPress={handleBuyFactory}>
              {texts.buyFactory(property.factory_price)}
            </CustomButton>
            <CustomButton
              active={property.population > 20}
              color={colors.lightBlue}
              onPress={() => setModalVisible(true)}
            >
              {texts.trainSoldiers}
            </CustomButton>
            <PopUp
              title={texts.trainSoldiers}
              visible={modalVisible}
              onConfirm={handleTrainSoldiers}
              onCancel={() => {
                setModalVisible(false);
                setPopulationToTrain(0);
              }}
            >
              <CustomSlider
                min={0}
                max={property.population - 20}
                disabled={!(player.soldiers - 20)}
                value={populationToTrain}
                onChange={setPopulationToTrain}
              />
            </PopUp>
          </>
        ) : (
          <>
            <TraitItem
              title={'Price'}
              value1={property.price}
              color={colors.red}
              iconName={'price-tag'}
              iconType={'entypo'}
              iconSize={16}
            />
            <CustomButton
              style={{ marginTop: 20 }}
              active={inPlace && player.money >= property.price}
              onPress={handleBuyProperty}
            >
              {texts.buyProperty(property.price)}
            </CustomButton>
          </>
        )}
      </DefaultScreen>
    );

  return (
    <DefaultScreen>
      <TraitItem
        title={'Owner'}
        value1={property.owner_name}
        color={colors.white}
        iconName={'user-tie'}
        iconType={'font-awesome-5'}
        iconSize={17}
      />
      <CustomButton
        active={inPlace && player.soldiers}
        onPress={handleAttack}
        style={{ marginTop: 20 }}
        color={colors.red}
      >
        Attack
      </CustomButton>
    </DefaultScreen>
  );
};
const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontSize: 19,
  },
});

export default PropertyInfoScreen;
