// eslint-disable-next-line node/no-extraneous-import

'use client';
import { useGoogleMap } from '@/context/GoogleMapContext';
import { useUser } from '@/context/UserContext';

import { useSearchParams } from 'next/navigation';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

const TrackAgentOnDelivery: React.FC = () => {
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 23.780048010192353,
    lng: 90.39873861913912,
  });

  //   const pickedOrder = useAppSelector(pickedOrderSelector);
  const { GoogleMap, MarkerF } = useGoogleMap();

  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId');

  const { socket } = useUser();

  useEffect(() => {
    if (!socket || !orderId) return;

    socket.emit('join_order', { orderId });

    const handleLocation = (location: any) => {
      setCurrentLocation((prev) =>
        prev.lat === location.lat && prev.lng === location.lng ? prev : location
      );
    };

    socket.on('share_with_user', handleLocation);

    /**
     * get lat, lng of an address
     */

    return () => {
      socket.off('share_with_user', handleLocation);
    };
  }, [socket, orderId]);

  const containerStyle = {
    width: '90%',
    height: '500px',
  };

  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  return (
    <div className="flex justify-center">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        onLoad={onLoad}
        zoom={14}
        onUnmount={onUnmount}
      >
        <MarkerF
          position={currentLocation}
          title="Current location of agent"
          icon={{
            url: '/images/carIcon.png',
            scaledSize: new google.maps.Size(80, 80),
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default memo(TrackAgentOnDelivery);
