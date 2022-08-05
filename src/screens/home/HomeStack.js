import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import MenuScreen from './MenuScreen';
import LobbyScreen from './LobbyScreen';
import DashboardScreen from './DashboardScreen';
import ScoreboardScreen from './ScoreboardScreen';
import { useSelector } from 'react-redux';
import colors from '../../constants/colors';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import ColoredCircle from '../../components/ColoredCircle';

const Stack = createStackNavigator();

const HomeStack = () => {
  const player = useSelector((state) => state.player);
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Menu'} component={MenuScreen} />
      <Stack.Screen name={'Lobby'} component={LobbyScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
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
              style={{ marginRight: 20 }}
            />
          ),
        }}
        name={'Dashboard'}
        component={DashboardScreen}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name={'Scoreboard'}
        component={ScoreboardScreen}
      />
    </Stack.Navigator>
  );
};

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
