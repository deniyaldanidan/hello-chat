import { Server } from "socket.io";
import { MyServerType, MySocketType } from "../libs/types";

const EVENT_ENUMS = {

}

const connectionEvent = (socket: MySocketType, io: MyServerType) => {
    const myUsername = socket?.username ?? "";
    console.log(myUsername, " is connected");
    socket.join(myUsername);
    io.to(myUsername).emit("welcome", `Hello ${socket?.username}`)

    socket.on("disconnect", () => {
        console.log(socket?.username, " is disconnected");
    })

}

function initializeSocket(io: MyServerType) {
    io.on("connection", (socket) => connectionEvent(socket, io));
}

export { initializeSocket };