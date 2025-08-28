import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { SocketMessage } from "../types/websocket";

let io: IOServer | null = null;

export const initSocket = (server: HTTPServer) => {
    if (io) return io;

    io = new IOServer(server, {
        path: "/api/socketio",
        cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("message", (msg: SocketMessage) => {
            console.log("Received message", msg);
            io?.emit("message", msg);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    return io;
};
