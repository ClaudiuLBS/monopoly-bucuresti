import { Slider } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

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

const PropertyInfoScreen = ({ route }) => {
  const property_id = route.params.property;
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
      console.log(res);
    });
  };

  const handleBuyFactory = () => {
    GameService.buyFactory(player.id, property.id).then((res) => {
      if (!res) return;
      Alert.alert('Success');
      loadProperty();
      setPopulationToTrain(0);
    });
  };

  const handleTrainSoldiers = () => {
    GameService.trainSoldiers(player.id, property.id, populationToTrain).then((res) => {
      if (!res) return;
      Alert.alert('Success');
      loadProperty();
      setModalVisible(false);
    });
  };

  if (!property) return <LoadingScreen />;

  if (property.owner_id == player.id)
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
          title={'Money'}
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
        <CustomButton color={colors.pink} onPress={handleBuyFactory}>
          {texts.buyFactory(property.factory_price)}
        </CustomButton>
        <CustomButton color={colors.lightBlue} onPress={() => setModalVisible(true)}>
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
      </DefaultScreen>
    );

  return (
    <DefaultScreen>
      <Text style={styles.text}>Owner: {property.owner_name}</Text>
      <Text style={styles.text}>
        Population: {property.owner != player.id ? '~' : ''}
        {property.population}
      </Text>
      <Text style={styles.text}>
        Soldiers: {property.owner != player.id ? '~' : ''}
        {property.soldiers}
      </Text>
      <Text style={styles.text}>
        Factories: {property.owner != player.id ? '~' : ''}
        {property.factories}
      </Text>
      <Text style={styles.text}>
        {property.owner ? `Bought for ${property.price}$` : `price: ${property.price}$`}
      </Text>
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
