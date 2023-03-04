import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, View, Modal, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import { Icon } from '@rneui/themed';

import LoadingScreen from '../../components/LoadingScreen';
import InitService from '../../services/init.service';
import MapApi from '../../services/map.service';
import colors from '../../constants/colors';
import dimensions from '../../constants/dimensions';
import mapStyle from '../../constants/mapStyle';
import locations from '../../constants/locations';
import GameService from '../../services/game.service';
import LandLabel from '../../components/LandLabel';

const MapScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState({ property: null });
  const gameSession = useSelector((state) => state.session);

  useEffect(() => {
    getMapData();
    const refresh = setInterval(() => {
      getMapData();
    }, 60000);

    navigation.addListener('blur', (e) => {
      clearInterval(refresh);
    });

    getLocation();
    return () => clearInterval(refresh);
  }, []);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status != 'granted') return;

    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 5,
        timeInterval: 5000,
      },
      (location) => {
        if (location && gameSession.code && gameSession.start_date) {
          GameService.findLocation(
            location.coords.latitude,
            location.coords.longitude,
            gameSession.code
          ).then((res) => {
            if (res) setPlace(res);
          });
        }
      }
    );
  };

  const getMapData = () => {
    InitService.checkPlayer().then((result) => {
      if (result.gameSession)
        MapApi.getPaths(result.gameSession.code).then((res) => {
          if (res) {
            setData(res);
            setLoading(false);
          }
        });
      else setLoading(false);
    });
  };

  const renderOverlay = () => {
    if (!gameSession.code || !gameSession.start_date)
      return (
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <Icon name="alert-triangle" type="feather" color={colors.secondary} />
            <Text style={styles.overlayText}>
              {!gameSession.code ? 'Enter a game to use the map' : "This game hasn't started yet"}
            </Text>
          </View>
        </View>
      );
  };

  if (loading) return <LoadingScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={locations.bucuresti}
        customMapStyle={mapStyle}
        showsCompass={false}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
      >
        {data.map((item) => (
          <Polygon
            key={item.name}
            coordinates={item.coords}
            fillColor={item.color}
            strokeColor={colors.landStroke}
            strokeWidth={0.5}
            tappable
            onPress={() =>
              navigation.navigate('PropertyInfo', {
                property: item.id,
                title: item.name,
                inPlace: place.property == item.id,
              })
            }
          />
        ))}
      </MapView>
      <LandLabel place={place} refresh={getMapData} />
      {renderOverlay()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - dimensions.tabBarHeight,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#000000d0',
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff20',
    paddingVertical: 10,
  },
  overlayText: {
    color: colors.secondary,
    fontSize: 20,
  },
});

export default MapScreen;
