import { Request, Response, Router } from "express";

import { RoutesObj } from "../libs/types";
import authRoutes from "./authRoutes";
import searchRoutes from "./searchRoutes";

const routesObj: RoutesObj = [
    ...authRoutes,
    ...searchRoutes
];

const router = Router();

routesObj.forEach(rte => {
    router[rte.method](rte.url, ...rte.middlewares, rte.controller)
});

export default router;