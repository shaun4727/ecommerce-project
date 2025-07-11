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
          map.setZoom(14);
        }
      );
    }

    setMap(map);
  }, []);

  const onLoadPolyLine = (polyline: any) => {
    console.log('polyline: ', polyline);
  };

  //   const path = [
  //     // { lat: 23.7806, lng: 90.407 }, // Shahbagh
  //     // { lat: 23.774, lng: 90.3654 }, // Dhanmondi
  //     // { lat: 23.7614, lng: 90.429 }, // Badda
  //     // { lat: 23.7465, lng: 90.376 }, // New Market
  //     { lat: 23.780048010192353, lng: 90.39943694233332 }, // mohakhali kacha bazar
  //     { lat: 23.753338836891928, lng: 90.39943694233332 }, // JMI extension
  //   ];

  const testPath = [
    { lat: 23.780048010192353, lng: 90.39873861913912 }, // Mohakhali Flyover start
    { lat: 23.773911203285273, lng: 90.40143170405953 }, // Near Govt. Science College
    { lat: 23.770788907464315, lng: 90.40115275433233 }, // Tejgaon College area
    { lat: 23.76986595032364, lng: 90.40098109296174 }, // Farmgate Flyover North
    { lat: 23.767568347726048, lng: 90.40048756652133 }, // Farmgate center
    { lat: 23.76298321335498, lng: 90.39991223408825 }, // Green Road area
    { lat: 23.753338836891928, lng: 90.39943694233332 },
  ];

  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 6,
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

        <PolylineF onLoad={onLoadPolyLine} path={testPath} options={options} />
      </GoogleMap>
    </div>
  ) : (
    ''
  );
};

export default memo(TrackAgentOnDelivery);
