import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DefaultScreen from '../../components/DefaultScreen';
import LoadingScreen from '../../components/LoadingScreen';
import colors from '../../constants/colors';
import RestApi from '../../services/rest.service';

const PropertyInfoScreen = ({ route }) => {
  const { property } = route.params;
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    RestApi.player
      .get(property.owner)
      .then((res) => setOwner(res.name))
      .catch((e) => setOwner('Nobody'));
  }, []);

  if (!owner) return <LoadingScreen />;

  return (
    <DefaultScreen style={{ paddingTop: 10 }}>
      <Text style={styles.text}>Owner: {owner}</Text>
      <Text style={styles.text}>
        Population: {property.owner ? '~' : ''}
        {property.population}
      </Text>
      <Text style={styles.text}>
        Soldiers: {property.owner ? '~' : ''}
        {property.soldiers}
      </Text>
      <Text style={styles.text}>
        Factories: {property.owner ? '~' : ''}
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
