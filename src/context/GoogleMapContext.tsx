import SpinnerLoader from '@/components/loaders/loader-component';
import { getDeliveryAddressFromAgentOrder } from '@/service/Product';
import { IAgentOrder, IUser } from '@/types';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserContext';

interface IDeliveryAddress {
  lat: number;
  lng: number;
}

interface IMapProviderValues {
  children: React.ReactNode;
  deliveryAddress: IDeliveryAddress;
  GoogleMap: typeof GoogleMap;
  MarkerF: typeof MarkerF;
}

const MapContext = createContext<IMapProviderValues | undefined>(undefined);

interface MapProviderProps {
  children: React.ReactNode;
}

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [shippingAddress, setShippingAddress] = useState<IAgentOrder>();
  const [deliveryAddress, setDeliveryAddress] = useState<IDeliveryAddress>({
    lat: 0,
    lng: 0,
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAUF9iPbyH4nrwkZXVza__RSrSWiNOKsuo',
    libraries: ['places'],
  });

  const { user } = useUser();

  const getDeliveryAddress = async (user: IUser) => {
    try {
      const res = await getDeliveryAddressFromAgentOrder(user.userId);
      setShippingAddress(res.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      getDeliveryAddress(user);
    }
  }, [user]);

  /**
   * calculation of destination lat,lng starts
   */

  const getLatLngFromAddress = (
    address: string
  ): Promise<google.maps.LatLngLiteral> => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          resolve({
            lat: lat(),
            lng: lng(),
          });
        } else {
          reject(`Geocode was not successful: ${status}`);
        }
      });
    });
  };

  useEffect(() => {
    if (!isLoaded) return;
    // const coords = pickedOrder;
    const shippingAddr = `${shippingAddress?.destination.street_or_building_name}, ${shippingAddress?.destination.area}, ${shippingAddress?.destination.city}, ${shippingAddress?.destination.zip_code}, Bangladesh`;
    getLatLngFromAddress(shippingAddr)
      .then((cords) => {
        setDeliveryAddress(cords);
      })
      .catch((err) => console.log(err));
  }, [isLoaded]);

  /**
   * calculation of destination lat,lng ends
   */

  if (!isLoaded) return <SpinnerLoader />;

  return (
    <MapContext.Provider
      value={{
        deliveryAddress,
        children,
        GoogleMap,
        MarkerF,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useGoogleMap = () => {
  const context = useContext(MapContext);

  if (context == undefined) {
    throw new Error(
      'useGoogleMap must be used within the UserProvider context'
    );
  }

  return context;
};
