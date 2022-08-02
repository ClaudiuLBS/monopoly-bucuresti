import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import DefaultScreen from '../../components/DefaultScreen';
import RestApi from '../../services/rest.service';
import colors from '../../constants/colors';
import { setProperties } from '../../redux/playerSlice';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const gameSession = useSelector((state) => state.session);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
    RestApi.player.properties(player.id).then((res) => dispatch(setProperties(res.data)));
  }, []);

  const renderProperties = () => {
    if (player.properties == null) return <ActivityIndicator size={'large'} color={colors.white} />;
    if (player.properties.length == 0) return <Text style={styles.subtitle}>No properties</Text>;

    return player.properties.map((item, index) => (
      <Text key={index} style={styles.subtitle}>
        {item.name}
      </Text>
    ));
  };

  return (
    <ScrollView style={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>{player.name}</Text>
        </View>
      </View>
      <DefaultScreen style={{ paddingTop: 20 }}>
        <View style={styles.section}>
          <Text style={styles.title}>Stats</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.subtitle}>color: </Text>
            <View style={[styles.circle, { backgroundColor: player.color }]} />
          </View>
          <Text style={styles.subtitle}>money: {player.money}$</Text>
          <Text style={styles.subtitle}>properties: 23</Text>
          <Text style={styles.subtitle}>soldiers: {player.soldiers}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Properties</Text>
          {renderProperties()}
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Game Log</Text>
          <Text style={styles.subtitle}>Nigga died</Text>
          <Text style={styles.subtitle}>Nigga died</Text>
          <Text style={styles.subtitle}>Nigga died</Text>
          <Text style={styles.subtitle}>Nigga died</Text>
          <Text style={styles.subtitle}>Nigga died</Text>
          <Text style={styles.subtitle}>Nigga died</Text>
          <Text style={styles.subtitle}>Nigga died</Text>
          <Text style={styles.subtitle}>Nigga died</Text>
          <Text style={styles.subtitle}>Nigga died</Text>
          <Text style={styles.subtitle}>Nigga died</Text>
          <Text style={styles.subtitle}>Nigga died</Text>
          <Text style={styles.subtitle}>Nigga died</Text>
          <Text style={styles.subtitle}>Nigga died</Text>
          <Text style={styles.subtitle}>Nigga died</Text>
          <Text style={styles.subtitle}>Nigga died</Text>
          <Text style={styles.subtitle}>Nigga died</Text>
        </View>
      </DefaultScreen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    borderBottomColor: '#00000040',
    borderBottomWidth: 4,
  },
  headerContent: {
    paddingVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  headerText: {
    color: colors.white,
    fontFamily: 'bold',
    fontSize: 22,
    paddingBottom: 5,
  },
  title: {
    color: colors.white,
    fontFamily: 'bold',
    fontSize: 20,
    backgroundColor: '#ffffff10',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    margin: -10,
    marginBottom: 0,
    padding: 10,
  },
  subtitle: {
    color: colors.white,
    fontFamily: 'bold',
    marginTop: 5,
    marginLeft: 10,
    fontSize: 17,
  },
  section: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#ffffff10',
    padding: 10,
    backgroundColor: colors.primary,
    marginBottom: 20,
  },
  circle: {
    marginTop: 7,
    marginLeft: 1,
    borderWidth: 1,
    borderColor: colors.white,
    width: 12,
    height: 12,
    borderRadius: 20,
  },
});
export default DashboardScreen;
