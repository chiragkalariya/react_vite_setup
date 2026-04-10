import { io } from 'socket.io-client'

const socketUrl = import.meta.env.VITE_SOCKET_URL ?? import.meta.env.VITE_API_URL ?? '/'

export const socket = io(socketUrl, {
  autoConnect: false,
  transports: ['websocket'],
  withCredentials: true,
})
