import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import GoogleMapReact, { DirectionsRenderer } from "google-map-react";
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
  const setMap = (args) => {
    const map = args.map;
    const maps = args.maps;
    if (maps && typeof maps.DirectionsRenderer === "function") {
      // clean previous directions rendered to the map;
      const origin = new google.maps.LatLng(originLatitude, originLongitude)
      const destination = new google.maps.LatLng(destinationLatitude, destinationLongitude)
      const directionsDisplay = new maps.DirectionsRenderer({
        suppressMarkers: true
      });

      directionsDisplay.setOptions({
        polylineOptions: {
          strokeColor: strokeColor,
          strokeWeight: strokeWidth,
        },
      });
      directionsDisplay.setMap(map);
      const request = {
        origin,
        destination,
        travelMode: "DRIVING",
      };
      var icons = {
        start: new google.maps.MarkerImage(
         originMarkerSource === 'custom' ? originMarkerImage : defaultMarker,
         new google.maps.Size( 44, 32 ),
         new google.maps.Point( 0, 0 ),
         new google.maps.Point( 22, 32 )
        ),
        end: new google.maps.MarkerImage(
         destinationMarkerSource === 'custom' ? destinationMarkerImage : defaultMarker,
         new google.maps.Size( 44, 32 ),
         new google.maps.Point( 0, 0 ),
         new google.maps.Point( 22, 32 )
        )
       };
      const directionsService = new maps.DirectionsService();
      directionsService.route(request, (result, status) => {
        if (status === "OK") {
          debugger
          directionsDisplay.setDirections(result);
          var leg = result.routes[ 0 ].legs[ 0 ];
          onDirectionsReady(leg.distance.value, leg.duration.value)
          new google.maps.Marker({
            position: leg.start_location,
            map: map,
            icon: icons.start
          })
          new google.maps.Marker({
            position: leg.end_location,
            map: map,
            icon: icons.end
          })
        }
      });
    }
  };

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={{
          lat: originLatitude,
          lng: originLongitude,
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={setMap}
        defaultZoom={13}
      >
      </GoogleMapReact>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default OverviewMap;
