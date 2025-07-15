'use client';

import { MapProvider } from '@/context/GoogleMapContext';
import UserProvider from '@/context/UserContext';
import StoreProvider from './StoreProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <StoreProvider>
        <MapProvider>{children}</MapProvider>
      </StoreProvider>
    </UserProvider>
  );
};

export default Providers;
