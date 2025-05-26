'use client';

import UserProvider from '@/context/UserContext';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      {children}
      {/* <StoreProvider>{children}</StoreProvider> */}
    </UserProvider>
  );
};

export default Providers;
