import type { NextApiRequest, NextApiResponse } from 'next';
import { initSocket } from "@/backend/WebSockets";

export default function handler(req:NextApiRequest, res:NextApiResponse) {
    if(!(res.socket as any).server.io) {
        console.log("Initializing Socket.io");
        initSocket((res.socket as any).server);
        (res.socket as any).server.io = true;
    } else {
        console.log("Socket.io already initialized");
    }

    res.end();
}