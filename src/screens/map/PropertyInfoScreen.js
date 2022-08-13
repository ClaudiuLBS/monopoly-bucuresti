import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
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
import PopUpLouncher from '../../components/PopUpLouncher';

const modals = {
  null: 0,
  buyProperty: 1,
  attack: 2,
  buyFactory: 3,
  trainSoldiers: 4,
};

const PropertyInfoScreen = ({ route }) => {
  const dispatch = useDispatch();
  const property_id = route.params.property;
  const inPlace = route.params.inPlace;

  const player = useSelector((state) => state.player);
  const [property, setProperty] = useState(null);
  const [alert, setAlert] = useState({ visible: false, title: '', subtitle: '' });
  const [populationToTrain, setPopulationToTrain] = useState(0);
  const [modalVisible, showModal] = useState(false);

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
      showModal(modals.null);
      if (!res) {
        setAlert({
          visible: true,
          title: 'Failed',
          subtitle: 'i donno why',
        });
        return;
      }
      if (res.error) {
        setAlert({
          visible: true,
          title: 'Failed',
          subtitle: res.error,
        });
        return;
      }
      setPopulationToTrain(0);
      dispatch(removeMoney(property.factory_price));
      setAlert({
        visible: true,
        title: 'Success',
        subtitle: texts.buyFactorySuccess,
      });
      loadProperty();
    });
  };

  const handleTrainSoldiers = () => {
    GameService.trainSoldiers(player.id, property.id, populationToTrain).then((res) => {
      if (!res) return;
      showModal(modals.null);
      setAlert({
        visible: true,
        title: 'Success',
        subtitle: texts.trainSoldiersSuccess,
      });
      loadProperty();
      setPopulationToTrain(0);
    });
  };

  const handleBuyProperty = () => {
    GameService.buyProperty(player.id, property.id).then((res) => {
      showModal(modals.null);
      loadProperty();
      dispatch(removeMoney(property.price));
      setAlert({
        visible: true,
        title: 'Success',
        subtitle: texts.buyPropertySuccess,
      });
    });
  };

  const handleAttack = () => {
    GameService.attack(player.id, property.id).then((res) => {
      showModal(modals.null);
      dispatch(dropSoldiers(player.soldiers));
      if (res.win) {
        setAlert({ visible: true, title: 'You Won!', subtitle: texts.win(res.soldiers) });
        loadProperty();
      } else setAlert({ visible: true, title: 'You Lost!', subtitle: texts.lose });
    });
  };

  const renderTraits = () => {
    if (!property.owner_id || property.owner_id == player.id)
      return (
        <>
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
          {!property.owner_id ? (
            <TraitItem
              title={'Price'}
              value1={property.price}
              color={colors.red}
              iconName={'price-tag'}
              iconType={'entypo'}
              iconSize={16}
            />
          ) : null}
        </>
      );
    else
      return (
        <TraitItem
          title={'Owner'}
          value1={property.owner_name}
          color={colors.white}
          iconName={'user-tie'}
          iconType={'font-awesome-5'}
          iconSize={17}
        />
      );
  };

  const renderButtons = () => {
    if (property.owner_id == player.id)
      return (
        <>
          <PopUpLouncher
            style={{ marginTop: 20 }}
            color={colors.pink}
            active={player.money >= property.factory_price}
            buttonText={texts.buyFactory(property.factory_price)}
            title={`Buy factory for ${property.factory_price}$`}
            info={texts.buyFactoryInfo(property.money_per_day / property.factories)}
            onConfirm={handleBuyFactory}
          />
          <PopUpLouncher
            active={property.population > 20}
            color={colors.lightBlue}
            buttonText={texts.trainSoldiers}
            title={texts.trainSoldiers}
            info={texts.trainSoldiersInfo}
            onConfirm={handleTrainSoldiers}
            onCancel={() => setPopulationToTrain(0)}
          >
            <CustomSlider
              max={property.population - 20}
              disabled={!(player.soldiers - 20)}
              value={populationToTrain}
              onChange={setPopulationToTrain}
            />
          </PopUpLouncher>
        </>
      );
    else if (!property.owner_id)
      return (
        <PopUpLouncher
          style={{ marginTop: 20 }}
          color={colors.green}
          active={inPlace && player.money >= property.price}
          buttonText={texts.buyProperty(property.price)}
          title={`Buy ${property.name} for ${property.price}$`}
          info={texts.buyPropertyInfo}
          onConfirm={handleBuyProperty}
        />
      );
    else
      return (
        <PopUpLouncher
          active={inPlace && player.soldiers}
          buttonText={'Attack'}
          style={{ marginTop: 20 }}
          color={colors.red}
          title={`Attack ${property.name} with ${player.soldiers} soldiers?`}
          info={texts.attackInfo}
          onConfirm={handleAttack}
        />
      );
  };

  if (!property) return <LoadingScreen />;

  return (
    <DefaultScreen>
      {renderTraits()}
      {renderButtons()}
      <PopUp
        title={alert.title}
        info={alert.subtitle}
        onlyInformative={true}
        visible={alert.visible}
        onCancel={() => setAlert({ visible: false, title: '', subtitle: '' })}
      />
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
