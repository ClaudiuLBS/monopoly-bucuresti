import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

import colors from '../constants/colors';
import dimensions from '../constants/dimensions';
import mapStyle from '../constants/mapStyle';
import InitService from '../services/init.service';
import MapApi from '../services/map.service';
import LoadingScreen from './LoadingScreen';
import locations from '../constants/locations';

const LOCATION_TASK_NAME = 'background-location-task';

const MapScreen = () => {
  const [data, setData] = useState([]);
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLocation = async () => {
    await Location.requestForegroundPermissionsAsync();
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status != 'granted') return;

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.High,
      timeInterval: 60000,
    });

    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 5,
        timeInterval: 10000,
      },
      (location) => {
        if (location) {
          setCoords({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
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

  useEffect(() => {
    getLocation();
    getMapData();
    const refresh = setInterval(() => {
      getMapData();
    }, 60000);
    return () => clearInterval(refresh);
  }, []);
  if (loading || !coords) return <LoadingScreen />;

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
            strokeWidth={2}
          />
        ))}
      </MapView>
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

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    console.log(error.message);
    return;
  }
  if (data) {
    const { locations } = data;
    console.log(locations);
    // do something with the locations captured in the background
  }
});

export default MapScreen;
