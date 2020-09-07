import io from 'socket.io-client';

const DOMAIN_API = process.env.NODE_ENV === "production" ? "https://api2.eon.uz" : "http://192.168.1.37:4000"

const socket = io(DOMAIN_API);

export default socket;