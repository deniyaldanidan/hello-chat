import { NextFunction, Request, RequestHandler, Response } from "express";
import { Server, Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"


interface ServerToClientEvents extends DefaultEventsMap {
    welcome: (info: string) => void
}

interface ClientToServerEvents extends DefaultEventsMap {

}

interface SocketData {

}

export type MyServerType = Server<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, SocketData>;

export interface MySocketType extends Socket<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, SocketData> {
    username?: string
}

type middlewareFN = (req: Request, res: Response, next: NextFunction) => void;

export type RoutesObj = {
    url: string,
    method: "get" | "post" | "put" | "delete",
    controller: RequestHandler,
    middlewares: middlewareFN[]
}[]