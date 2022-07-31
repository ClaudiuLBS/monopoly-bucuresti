import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import { cartiere } from '../constants/cartiere';
import mapStyle from '../constants/mapStyle';

const MapScreen = () => {
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
      >
        {cartiere.map((item) => (
          <Polygon
            key={item.name}
            coordinates={item.coordinates}
            fillColor={'#3aeb3444'}
            strokeColor={'#f59ad8'}
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
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
