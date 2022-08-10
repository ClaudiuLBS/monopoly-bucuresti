import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Icon } from '@rneui/base';

import DefaultScreen from '../../components/DefaultScreen';
import LoadingScreen from '../../components/LoadingScreen';
import RestApi from '../../services/rest.service';
import colors from '../../constants/colors';
import TraitItem from '../../components/TraitItem';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const player = useSelector((state) => state.player);
  const [stats, setStats] = useState(null);
  const [properties, setProperties] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
    refresh();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refresh();
    });

    return unsubscribe;
  }, [navigation]);

  const refresh = async () => {
    setRefreshing(true);
    RestApi.player.properties(player.id).then((res) => {
      RestApi.player.stats(player.id).then((res1) => {
        setProperties(res);
        setStats(res1);
        setRefreshing(false);
      });
    });
  };

  const RenderProperties = ({ properties }) => {
    if (properties == null) return <ActivityIndicator size={'large'} color={colors.white} />;
    if (properties.length == 0) return <Text style={styles.subtitle}>No properties</Text>;

    return properties.map((item, index) => (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ backgroundColor: '#ffffff05', marginTop: 10, borderRadius: 5 }}
        key={index}
        onPress={() =>
          navigation.navigate('MyPropertyInfo', { property: item.id, title: item.name })
        }
      >
        <Text style={styles.subtitle}>{item.name}</Text>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <View style={styles.propertyItemContainer}>
            <Icon name={'people'} type={'ionicon'} color={colors.yellow} size={22} />
            <Text style={[styles.propertyItemText, { color: colors.yellow }]}>
              {item.population}
            </Text>
          </View>

          <View style={styles.propertyItemContainer}>
            <Icon name={'factory'} type={'material-community'} color={colors.pink} size={20} />
            <Text style={[styles.propertyItemText, { color: colors.pink }]}>{item.factories}</Text>
          </View>

          <View style={styles.propertyItemContainer}>
            <Icon name={'user-shield'} type={'font-awesome-5'} color={colors.lightBlue} size={15} />
            <Text style={[styles.propertyItemText, { color: colors.lightBlue }]}>
              {item.soldiers}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  if (stats === null || properties === null) return <LoadingScreen />;

  return (
    <ScrollView style={styles.page}>
      <DefaultScreen>
        <View style={styles.section}>
          <View style={[styles.title, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={{ color: colors.white, fontFamily: 'bold', fontSize: 20 }}>Stats</Text>
            {refreshing ? <ActivityIndicator /> : null}
          </View>

          <TraitItem
            title={'Money'}
            value1={stats.money}
            value2={`${stats.money_per_day}/day`}
            color={colors.green}
            iconName={'money-bill'}
            iconType={'font-awesome-5'}
            iconSize={15}
          />

          <TraitItem
            title={'Population'}
            value1={stats.population}
            value2={`${stats.population_per_day}/day`}
            color={colors.yellow}
            iconName={'people'}
            iconType={'ionicon'}
            iconSize={22}
          />

          <TraitItem
            title={'Factories'}
            value1={stats.factories}
            color={colors.pink}
            iconName={'factory'}
            iconType={'material-community'}
            iconSize={19}
          />

          <TraitItem
            title={'Defense Soldiers'}
            value1={stats.defense_soldiers}
            color={colors.lightBlue}
            iconName={'user-shield'}
            iconType={'font-awesome-5'}
            iconSize={16}
          />

          <TraitItem
            title={'Active Soldiers'}
            value1={stats.active_soldiers}
            color={colors.red}
            iconName={'user-ninja'}
            iconType={'font-awesome-5'}
            iconSize={16}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Properties</Text>
          <RenderProperties properties={properties} />
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
  title: {
    color: colors.white,
    fontFamily: 'bold',
    fontSize: 20,
    backgroundColor: '#ffffff10',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    margin: -10,
    marginBottom: 0,
    padding: 10,
  },
  subtitle: {
    color: colors.white,
    fontFamily: 'bold',
    marginVertical: 5,
    marginLeft: 5,
    fontSize: 16,
    alignSelf: 'center',
  },
  section: {
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#ffffff10',
    padding: 10,
    backgroundColor: colors.primary,
    marginBottom: 20,
  },
  propertyItemContainer: {
    // marginBottom: 10,
    marginHorizontal: 5,
    flex: 1,
    backgroundColor: '#ffffff10',
    borderRadius: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  propertyItemText: {
    fontSize: 17,
    textAlign: 'center',
    flex: 1,
  },
});
export default DashboardScreen;
