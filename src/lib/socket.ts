// lib/socket.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(
      process.env.NEXT_PUBLIC_BASE_SERVER || 'http://localhost:5000',
      {
        withCredentials: true,
        autoConnect: true,
        transports: ['websocket', 'polling'],
      }
    );
  }
  return socket;
};
