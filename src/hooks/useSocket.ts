// hooks/useSocket.ts
import { getSocket } from '@/lib/socket';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = getSocket();
    setSocket(socketInstance);

    return () => {
      // Optional cleanup
    };
  }, []);

  return socket;
};
