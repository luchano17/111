import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, NativeModules } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import defaultMarker from "./assets/marker.png.png";

const OverviewMap = ({
  originLatitude = 0,
  originLongitude = 0,
  destinationLatitude = 0,
  destinationLongitude = 0,
  apiKey = "",
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
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: originLatitude || 0,
          longitude: originLongitude || 0,
					latitudeDelta: 0,
					longitudeDelta: 0.05,
        }}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: originLatitude || 0,
            longitude: originLongitude || 0,
          }}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Image
            resizeMode="contain"
            source={
              originMarkerImage && originMarkerSource === "custom"
                ? originMarkerImage?.uri
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
            latitude: destinationLatitude || 0,
            longitude: destinationLongitude || 0,
          }}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Image
            resizeMode="contain"
            source={
              destinationMarkerImage && destinationMarkerSource === "custom"
                ? destinationMarkerImage?.uri
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
            latitude: originLatitude || 0,
            longitude: originLongitude || 0,
          }}
          destination={{
            latitude: destinationLatitude || 0,
            longitude: destinationLongitude || 0,
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
