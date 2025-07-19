'use client';

import { useGoogleMap } from '@/context/GoogleMapContext';
import { useUser } from '@/context/UserContext';
import { useEffect } from 'react';

interface AgentLocationTracker {
  target: {
    lat: number;
    lng: number;
    radius?: number; // optional in meters
  };
}

const getDistanceInMeters = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371000; // radius of Earth in meters
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function AgentLocationTracker() {
  const { user, socket } = useUser();
  const { deliveryAddress, shippingAddress } = useGoogleMap();

  const target = {
    ...deliveryAddress,
    radius: 12,
  };

  const getAgentLocation = () => {
    if (!navigator.geolocation) {
      console.error('❌ Geolocation is not supported by this browser.');
      return;
    }

    const radius = target.radius || 50;

    // First, try to get initial location once
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        const distance = getDistanceInMeters(
          latitude,
          longitude,
          target.lat,
          target.lng
        );

        // console.log(
        //   `📍 Initial Position: (${latitude}, ${longitude}), Distance: ${distance}m`
        // );

        socket?.emit('realtime_location', {
          ...deliveryAddress,
          ...shippingAddress,
        });

        if (distance <= radius) {
          console.log(
            '🎯 Already within target radius. Skipping live tracking.'
          );
          return;
        }

        // Now start watchPosition for live updates
        const watchId = navigator.geolocation.watchPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;

            const distance = getDistanceInMeters(
              latitude,
              longitude,
              target.lat,
              target.lng
            );

            // console.log(
            //   `📍 Watching: (${latitude}, ${longitude}), Distance: ${distance}m`
            // );

            socket?.emit('realtime_location', {
              ...deliveryAddress,
              ...shippingAddress,
              latitude,
              longitude,
            });

            if (distance <= radius) {
              console.log('✅ Reached target location. Stopping tracking.');
              navigator.geolocation.clearWatch(watchId);
            }
          },
          (err) => {
            console.error('watchPosition error:', err.message);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 2000,
            timeout: 30000,
          }
        );

        // Return cleanup function
        return () => navigator.geolocation.clearWatch(watchId);
      },
      (err) => {
        console.error('getCurrentPosition fallback error:', err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
      }
    );
  };

  useEffect(() => {
    if (
      user?.role === 'agent' &&
      deliveryAddress?.lat &&
      deliveryAddress?.lng
    ) {
      getAgentLocation();
    }
  }, [user?.role, deliveryAddress]);

  return null; // nothing to render
}
