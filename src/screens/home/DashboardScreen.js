import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import DefaultScreen from '../../components/DefaultScreen';
import RestApi from '../../services/rest.service';
import colors from '../../constants/colors';
import { setProperties } from '../../redux/playerSlice';
import { Icon } from '@rneui/base';

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

  return (
    <ScrollView style={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <View style={[styles.circle, { backgroundColor: player.color }]} />
          <Text style={styles.headerText}>{player.name}</Text>
        </View>
        <Icon name={'stats-chart'} type={'ionicon'} color={colors.white} />
      </View>
      <DefaultScreen style={{ paddingTop: 20 }}>
        <View style={styles.section}>
          <Text style={styles.title}>Stats</Text>

          <StatsItem
            title={'Money'}
            value1={1500}
            value2={'100/day'}
            color={colors.green}
            iconName={'money-bill'}
            iconType={'font-awesome-5'}
            iconSize={15}
          />

          <StatsItem
            title={'Population'}
            value1={1500}
            value2={'100/day'}
            color={colors.yellow}
            iconName={'people'}
            iconType={'ionicon'}
            iconSize={22}
          />

          <StatsItem
            title={'Factories'}
            value1={132}
            color={colors.pink}
            iconName={'factory'}
            iconType={'material-community'}
            iconSize={19}
          />

          <StatsItem
            title={'Defense Soldiers'}
            value1={12312}
            color={colors.lightBlue}
            iconName={'user-shield'}
            iconType={'font-awesome-5'}
            iconSize={16}
          />

          <StatsItem
            title={'Active Soldiers'}
            value1={131}
            color={colors.red}
            iconName={'user-ninja'}
            iconType={'font-awesome-5'}
            iconSize={16}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Properties</Text>
          <RenderProperties properties={player.properties} />
        </View>
      </DefaultScreen>
    </ScrollView>
  );
};

const StatsItem = ({ title, value1, value2, color, iconName, iconType, iconSize }) => {
  return (
    <View>
      <View style={styles.subtitleContainer}>
        <Icon name={iconName} type={iconType} color={color} size={iconSize} />
        <Text style={[styles.subtitle, { color }]}>{title}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.tableItem, { color }]}>{value1}</Text>
        {value2 ? <Text style={[styles.tableItem, { color }]}>{value2}</Text> : null}
      </View>
    </View>
  );
};

const RenderProperties = ({ properties }) => {
  if (properties == null) return <ActivityIndicator size={'large'} color={colors.white} />;
  if (properties.length == 0) return <Text style={styles.subtitle}>No properties</Text>;

  return properties.map((item, index) => (
    <View key={index}>
      <Text style={styles.subtitle}>{item.name}</Text>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <View style={styles.propertyItemContainer}>
          <Icon name={'people'} type={'ionicon'} color={colors.yellow} size={22} />
          <Text style={[styles.propertyItemText, { color: colors.yellow }]}>13122</Text>
        </View>

        <View style={styles.propertyItemContainer}>
          <Icon name={'factory'} type={'material-community'} color={colors.pink} size={20} />
          <Text style={[styles.propertyItemText, { color: colors.pink }]}>1312</Text>
        </View>

        <View style={styles.propertyItemContainer}>
          <Icon name={'user-shield'} type={'font-awesome-5'} color={colors.lightBlue} size={15} />
          <Text style={[styles.propertyItemText, { color: colors.lightBlue }]}>6542</Text>
        </View>
      </View>
    </View>
  ));
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
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
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableItem: {
    marginBottom: 10,
    marginHorizontal: 5,
    fontSize: 17,
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#ffffff10',
    borderRadius: 5,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  section: {
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#ffffff10',
    padding: 10,
    backgroundColor: colors.primary,
    marginBottom: 20,
  },
  circle: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.white,
    width: 15,
    height: 15,
    borderRadius: 20,
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
