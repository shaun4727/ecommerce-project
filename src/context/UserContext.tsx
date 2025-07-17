import { getSocket } from '@/lib/socket';
import { getCurrentUser } from '@/service/AuthService';
import { IUser } from '@/types';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Socket } from 'socket.io-client';

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  //   const socket = useMemo(() => io(process.env.NEXT_PUBLIC_BASE_SERVER!), []);

  const handleUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    const socketInstance = getSocket();
    setSocket(socketInstance);

    /**
     * what does the following code does?
     */
    return () => {
      // Only disconnect if you want to manually control connection lifecycle
      //   socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        socket,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context == undefined) {
    throw new Error('useUser must be used within the UserProvider context');
  }

  return context;
};

export default UserProvider;
