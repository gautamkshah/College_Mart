import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { screenHeight } from '@utils/scalling';
import { Colors } from '@utils/Constants';
import { useAuthStorage } from '@state/authStorage';

const LiveMap = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStorage();
  const { currentOrder } = useAuthStorage();

  console.log(user);
  console.log(currentOrder);
  
  console.log(currentOrder?.pickUpLocation.latitude);
  console.log(currentOrder?.deliveryLocation.latitude);
  console.log(currentOrder?.deliveryLocation.longitude)
  console.log(currentOrder?.pickUpLocation.longitude)


  const userLocation = user?.liveLocation
    ? { latitude: currentOrder?.pickUpLocation.latitude, longitude: currentOrder?.pickUpLocation.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 }
    : null;

  const deliveryBoyLocation = currentOrder?.deliveryLocation
    ? { latitude: currentOrder?.deliveryLocation.latitude, longitude: currentOrder?.deliveryLocation.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 }
    : null;

  // Create a list of markers
  const markers = [
    userLocation ? { coordinate: userLocation, title: 'User', image: require('@assets/images/motorcycle_15303325.png') } : null,
    deliveryBoyLocation ? { coordinate: deliveryBoyLocation, title: 'Delivery Boy', image: require('@assets/images/delivery_boy.png') } : null,
  ].filter(Boolean); // Remove null values

  // Default region (centered on the user, or fallback to default)
  const [region, setRegion] = useState(
    userLocation || { latitude: 0, longitude: 0, latitudeDelta: 0.02, longitudeDelta: 0.02 }
  );

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // Simulating map load delay
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Fetching live location...</Text>
        </View>
      ) : (
        <MapView style={styles.map} region={region} showsUserLocation showsMyLocationButton>
          {/* Rendering Markers Dynamically */}
          {markers.map((marker, index) => 
            marker && (
              <Marker key={index} coordinate={marker.coordinate} title={marker.title}>
                <Image source={marker.image} style={styles.markerImage} />
              </Marker>
            )
          )}

          {/* Draw a straight line between the two points */}
          {markers.length === 2 && (
            <Polyline coordinates={markers.map(m => m!.coordinate)} strokeColor={Colors.secondary} strokeWidth={3} />
          )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.35,
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: Colors.secondary,
  },
  map: {
    flex: 1,
  },
  markerImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default LiveMap;
