import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import router from './routes/router';
import cookieParser from 'cookie-parser';
import { initializeSocket } from './socket';
import { MyServerType } from './libs/types';
import socktAuth from './middlewares/socktAuth';


const ALLOWED_ORIGIN = "http://localhost:5173";
const app = express();

app.use(cors({ origin: ALLOWED_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

const httpServer = createServer(app);
const io: MyServerType = new Server(httpServer, {
    cors: {
        origin: ALLOWED_ORIGIN,
        credentials: true
    }
});

io.use(socktAuth);
initializeSocket(io);

httpServer.listen(3200, () => {
    console.log(`Server is running on Port: ${3200}`)
})