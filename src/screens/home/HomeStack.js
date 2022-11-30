import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import MenuScreen from './MenuScreen';
import LobbyScreen from './LobbyScreen';
import DashboardScreen from './DashboardScreen';
import ScoreboardScreen from './ScoreboardScreen';
import { useSelector } from 'react-redux';
import colors from '../../constants/colors';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import ColoredCircle from '../../components/ColoredCircle';
import PropertyInfoScreen from '../map/PropertyInfoScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  const player = useSelector((state) => state.player);
  const gameSession = useSelector((state) => state.session);
  const navigation = useNavigation();

  const pickFirstScreen = () => {
    if (gameSession.code)
      if (gameSession.start_date) return 'Dashboard';
      else return 'Lobby';
    else return 'Menu';
  };

  return (
    <Stack.Navigator initialRouteName={pickFirstScreen()}>
      <Stack.Screen options={{ headerShown: false }} name={'Menu'} component={MenuScreen} />
      <Stack.Screen options={{ headerShown: false }} name={'Lobby'} component={LobbyScreen} />
      <Stack.Screen
        options={dashboardOptions(player, navigation)}
        name={'Dashboard'}
        component={DashboardScreen}
      />
      <Stack.Screen
        name={'Scoreboard'}
        options={{ headerTitle: `Scoreboard ${gameSession.code}` }}
        component={ScoreboardScreen}
      />
      <Stack.Screen
        options={propertyInfoOptions}
        name={'MyPropertyInfo'}
        component={PropertyInfoScreen}
      />
    </Stack.Navigator>
  );
};

const dashboardOptions = (player, navigation) => ({
  headerTitle: '',
  headerLeft: () => (
    <View style={styles.headerTitle}>
      <ColoredCircle color={player.color} />
      <Text style={styles.headerText}>{player.name}</Text>
    </View>
  ),
  headerRight: () => (
    <Icon
      name={'stats-chart'}
      type={'ionicon'}
      color={colors.white}
      onPress={() => navigation.navigate('Scoreboard')}
      style={{ padding: 10, marginRight: 10 }}
    />
  ),
});
const propertyInfoOptions = ({ route }) => ({ headerTitle: route.params.title });

const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  headerText: {
    color: colors.white,
    fontFamily: 'bold',
    fontSize: 22,
    paddingBottom: 5,
    marginLeft: 10,
  },
});
export default HomeStack;
