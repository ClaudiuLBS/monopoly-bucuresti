import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import colors from '../constants/colors';
import dimensions from '../constants/dimensions';

import mapStyle from '../constants/mapStyle';
import InitService from '../services/init.service';
import MapApi from '../services/map.service';
import LoadingScreen from './LoadingScreen';

const MapScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    InitService.checkPlayer().then((result) => {
      if (result.gameSession)
        MapApi.getPaths(result.gameSession.code).then((res) => {
          setData(res);
          setLoading(false);
        });
      else setLoading(false);
    });
    setTimeout(() => {
      setCounter(counter + 1);
    }, 60000);
  }, [counter]);
  if (loading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 44.4268,
          longitude: 26.1025,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
        customMapStyle={mapStyle}
        showsCompass={false}
      >
        {data.map((item) => (
          <Polygon
            key={item.name}
            coordinates={item.coords}
            fillColor={item.color}
            strokeColor={colors.landStroke}
            strokeWidth={1}
          />
        ))}
      </MapView>
    </View>
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
