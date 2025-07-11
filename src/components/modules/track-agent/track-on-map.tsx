// eslint-disable-next-line node/no-extraneous-import

'use client';
import { GoogleMap, PolylineF, useJsApiLoader } from '@react-google-maps/api';
import { memo, useCallback, useState } from 'react';

const TrackAgentOnDelivery: React.FC = () => {
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAUF9iPbyH4nrwkZXVza__RSrSWiNOKsuo',
  });

  const args = {
    options: {
      algorithm: undefined,
    },
  };
  const containerStyle = {
    width: '90%',
    height: '500px',
  };

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          map.setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          map.setZoom(18);
        }
      );
    }

    setMap(map);
  }, []);

  const onLoadPolyLine = (polyline: any) => {
    console.log('polyline: ', polyline);
  };

  const path = [
    { lat: 23.7806, lng: 90.407 }, // Shahbagh
    { lat: 23.774, lng: 90.3654 }, // Dhanmondi
    { lat: 23.7614, lng: 90.429 }, // Badda
    { lat: 23.7465, lng: 90.376 }, // New Market
  ];

  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: [
      { lat: 23.7806, lng: 90.407 }, // Shahbagh
      { lat: 23.774, lng: 90.3654 }, // Dhanmondi
      { lat: 23.7614, lng: 90.429 }, // Badda
      { lat: 23.7465, lng: 90.376 }, // New Market
    ],
    zIndex: 1,
  };

  return isLoaded ? (
    <div className="flex justify-center">
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* <GoogleMarkerClusterer {...args}>
          {(clusterer) => (
            <>
              <MarkerF
                key={1}
                position={currentLocation}
                clusterer={clusterer}
                title="Current location of agent"
              />
            </>
          )}
        </GoogleMarkerClusterer> */}

        <PolylineF onLoad={onLoadPolyLine} path={path} options={options} />
      </GoogleMap>
    </div>
  ) : (
    ''
  );
};

export default memo(TrackAgentOnDelivery);
