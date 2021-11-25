import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, NativeModules } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import defaultMarker from "./assets/marker.png.png";

const OverviewMap = ({
  originLatitude,
  originLongitude,
  destinationLatitude,
  destinationLongitude,
  apiKey,
  originMarkerImage,
  originMarkerSource,
  destinationMarkerImage,
  destinationMarkerSource,
  strokeColor = "#000",
  strokeWidth = 1,
  onDirectionsReady = (distance, duration) => null
}) => {

	useEffect(() => {
		if (Platform.OS === 'ios') {
			var KeyModule = NativeModules.KeyModule
			KeyModule.addEvent(apiKey)
		}
	}, [apiKey])

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <MapView
        initialRegion={{
          latitude: originLatitude,
          longitude: originLongitude,
					latitudeDelta: 0,
					longitudeDelta: 0.05,
        }}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: originLatitude,
            longitude: originLongitude,
          }}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Image
            resizeMode="contain"
            source={
              originMarkerImage && originMarkerSource === "custom"
                ? originMarkerImage
                : defaultMarker
            }
            style={{
              height: 41,
              width: 25,
            }}
          />
        </Marker>
        <Marker
          coordinate={{
            latitude: destinationLatitude,
            longitude: destinationLongitude,
          }}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Image
            resizeMode="contain"
            source={
              destinationMarkerImage && destinationMarkerSource === "custom"
                ? destinationMarkerImage
                : defaultMarker
            }
            style={{
              height: 41,
              width: 25,
            }}
          />
        </Marker>
        <MapViewDirections
          origin={{
            latitude: originLatitude,
            longitude: originLongitude,
          }}
          destination={{
            latitude: destinationLatitude,
            longitude: destinationLongitude,
          }}
          apikey={apiKey}
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
          onReady={result => {
            onDirectionsReady(
              result.distance * 1000,
              result.duration * 60
            )
          }}
        />
      </MapView>
    </View>
  );
};

export default OverviewMap;
