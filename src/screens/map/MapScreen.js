import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Polygon } from 'react-native-maps';
import * as Location from 'expo-location';

import LoadingScreen from '../../components/LoadingScreen';
import InitService from '../../services/init.service';
import MapApi from '../../services/map.service';
import colors from '../../constants/colors';
import dimensions from '../../constants/dimensions';
import mapStyle from '../../constants/mapStyle';
import locations from '../../constants/locations';
import GameService from '../../services/game.service';
import { useSelector } from 'react-redux';
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
        if (location) {
          GameService.findLocation(
            location.coords.latitude,
            location.coords.longitude,
            gameSession.code
          ).then((res) => setPlace(res));
        }
      }
    );
  };

  const getMapData = () => {
    InitService.checkPlayer().then((result) => {
      if (result.gameSession)
        MapApi.getPaths(result.gameSession.code).then((res) => {
          setData(res);
          setLoading(false);
        });
      else setLoading(false);
    });
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
      >
        {data.map((item) => (
          <Polygon
            key={item.name}
            coordinates={item.coords}
            fillColor={item.color}
            strokeColor={colors.landStroke}
            strokeWidth={0.5}
            onPress={() =>
              navigation.navigate('PropertyInfo', {
                property: item.id,
                title: item.name,
                buyable: place.property == item.id,
              })
            }
            tappable
          />
        ))}
      </MapView>
      <LandLabel place={place} refresh={getMapData} />
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
});

export default MapScreen;
