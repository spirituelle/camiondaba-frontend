import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import Config from './../EndPoint'
// import markerIcon from 'assets/img/marker.png'
const libraries = ["places"];

const mapContainerStyle = {
  height: "70vh",
  width: "100%",
};


const mapStyles = [
  {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  }
];
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
//   scrollwheel: false,
};


export default function MapPosition({location ,center, marker,  ...rest}) {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: Config.apiKey,
    libraries,
  });
 
  
 
  React.useEffect(() => {
     
    
    
  }, [location])

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
        {...rest}
      >
        
              <Marker
              position={{ lat: marker.lat, lng: marker.lng }}
              animation={window.google.maps.Animation.DROP}
              icon={"/image/marker.png"}
             
            />
         
      </GoogleMap>
    </div>
  );
}
