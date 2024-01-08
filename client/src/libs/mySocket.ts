import { io } from "socket.io-client";

const URL = "http://localhost:3200";

const mySocket = io(URL, {
    autoConnect: false,
    withCredentials: true
});

mySocket.onAny((event, ...args) => {
    console.log(event, args);
})

export default mySocket;