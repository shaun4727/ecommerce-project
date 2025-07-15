'use client';

import { useGoogleMap } from '@/context/GoogleMapContext';
import { useUser } from '@/context/UserContext';
import { pickedOrderSelector } from '@/redux/features/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import { useEffect, useRef, useState } from 'react';

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
const testPath = [
  { lat: 23.780048010192353, lng: 90.39873861913912 },
  { lat: 23.773911203285273, lng: 90.40143170405953 },
  { lat: 23.770788907464315, lng: 90.40115275433233 },
  { lat: 23.76986595032364, lng: 90.40098109296174 },
  { lat: 23.767568347726048, lng: 90.40048756652133 },
  { lat: 23.76298321335498, lng: 90.39991223408825 },
  { lat: 23.753338836891928, lng: 90.39943694233332 },
  { lat: 23.780048010192353, lng: 90.39873861913912 },
  { lat: 23.773911203285273, lng: 90.40143170405953 },
  { lat: 23.770788907464315, lng: 90.40115275433233 },
  { lat: 23.76986595032364, lng: 90.40098109296174 },
  { lat: 23.767568347726048, lng: 90.40048756652133 },
  { lat: 23.76298321335498, lng: 90.39991223408825 },
  { lat: 23.753338836891928, lng: 90.39943694233332 },
  { lat: 23.780048010192353, lng: 90.39873861913912 },
  { lat: 23.773911203285273, lng: 90.40143170405953 },
  { lat: 23.770788907464315, lng: 90.40115275433233 },
  { lat: 23.76986595032364, lng: 90.40098109296174 },
  { lat: 23.767568347726048, lng: 90.40048756652133 },
  { lat: 23.76298321335498, lng: 90.39991223408825 },
  { lat: 23.753338836891928, lng: 90.39943694233332 },
  { lat: 23.780048010192353, lng: 90.39873861913912 },
  { lat: 23.773911203285273, lng: 90.40143170405953 },
  { lat: 23.770788907464315, lng: 90.40115275433233 },
  { lat: 23.76986595032364, lng: 90.40098109296174 },
  { lat: 23.767568347726048, lng: 90.40048756652133 },
  { lat: 23.76298321335498, lng: 90.39991223408825 },
  { lat: 23.753338836891928, lng: 90.39943694233332 },
  { lat: 23.780048010192353, lng: 90.39873861913912 },
  { lat: 23.773911203285273, lng: 90.40143170405953 },
  { lat: 23.770788907464315, lng: 90.40115275433233 },
  { lat: 23.76986595032364, lng: 90.40098109296174 },
  { lat: 23.767568347726048, lng: 90.40048756652133 },
  { lat: 23.76298321335498, lng: 90.39991223408825 },
  { lat: 23.753338836891928, lng: 90.39943694233332 },
  { lat: 23.753338836891928, lng: 90.39943694233332 },
  { lat: 23.780048010192353, lng: 90.39873861913912 },
  { lat: 23.773911203285273, lng: 90.40143170405953 },
  { lat: 23.770788907464315, lng: 90.40115275433233 },
  { lat: 23.76986595032364, lng: 90.40098109296174 },
  { lat: 23.767568347726048, lng: 90.40048756652133 },
  { lat: 23.76298321335498, lng: 90.39991223408825 },
  { lat: 23.753338836891928, lng: 90.39943694233332 },
  { lat: 23.780048010192353, lng: 90.39873861913912 },
  { lat: 23.773911203285273, lng: 90.40143170405953 },
  { lat: 23.770788907464315, lng: 90.40115275433233 },
  { lat: 23.76986595032364, lng: 90.40098109296174 },
  { lat: 23.767568347726048, lng: 90.40048756652133 },
  { lat: 23.76298321335498, lng: 90.39991223408825 },
  { lat: 23.753338836891928, lng: 90.39943694233332 },
  { lat: 23.753338836891928, lng: 90.39943694233332 },
  { lat: 23.780048010192353, lng: 90.39873861913912 },
  { lat: 23.773911203285273, lng: 90.40143170405953 },
  { lat: 23.770788907464315, lng: 90.40115275433233 },
  { lat: 23.76986595032364, lng: 90.40098109296174 },
  { lat: 23.767568347726048, lng: 90.40048756652133 },
  { lat: 23.76298321335498, lng: 90.39991223408825 },
  { lat: 23.753338836891928, lng: 90.39943694233332 },
  { lat: 23.780048010192353, lng: 90.39873861913912 },
  { lat: 23.773911203285273, lng: 90.40143170405953 },
  { lat: 23.770788907464315, lng: 90.40115275433233 },
  { lat: 23.76986595032364, lng: 90.40098109296174 },
  { lat: 23.767568347726048, lng: 90.40048756652133 },
  { lat: 23.76298321335498, lng: 90.39991223408825 },
  { lat: 23.753338836891928, lng: 90.39943694233332 },
];
export default function AgentLocationTracker() {
  const pickedOrder = useAppSelector(pickedOrderSelector);
  const [locIndex, setLocIndex] = useState(0);
  const locIndexRef = useRef(0);
  const posInterval = useRef<NodeJS.Timeout | null>(null);

  const { user, socket } = useUser();
  const { deliveryAddress } = useGoogleMap();

  const target = {
    ...deliveryAddress,
    radius: 12,
  };
  const getAgentLocation = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported');
      return;
    }

    const radius = target.radius || 50; // default: 50 meters

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const distance = getDistanceInMeters(
          latitude,
          longitude,
          target.lat,
          target.lng
        );

        console.log(
          `📍 Current: (${latitude}, ${longitude}), Distance: ${distance}m`
        );
        socket!.emit(`realtime_location`, { lat: latitude, lng: longitude });

        if (distance <= radius) {
          console.log('🎯 Target reached! Stopping tracking.');
          navigator.geolocation.clearWatch(watchId);
        }
      },
      (err) => {
        console.error('Location error:', err.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 10000,
      }
    );

    // Cleanup on unmount
    return () => navigator.geolocation.clearWatch(watchId);
  };

  //   const testUserLocation = () => {
  //     const index = locIndexRef.current;

  //     if (index < testPath.length) {
  //       const location = {
  //         pickedOrder: pickedOrder,
  //         location: testPath[index],
  //       };

  //       socket!.emit(`realtime_location`, location);

  //       locIndexRef.current += 1;
  //       setLocIndex(locIndexRef.current); // for UI sync/debug
  //     } else {
  //       if (posInterval.current) clearInterval(posInterval.current);
  //     }
  //   };

  useEffect(() => {
    if (user?.role === 'agent' && pickedOrder.destination.area) {
      //   getAgentLocation();
      getAgentLocation();
    }

    // posInterval.current = setInterval(testUserLocation, 2000);

    // return () => {
    //   if (posInterval.current) clearInterval(posInterval.current);
    // };
  }, []);

  return null; // nothing to render
}
