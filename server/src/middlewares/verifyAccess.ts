import { NextFunction, Request, Response } from "express";
import { accessPayloadParser, bearerJwtParser } from "../libs/myParsers";
import { verify } from "jsonwebtoken";
import { JWT_SECRETS } from "../libs/signJWT";


export default function verifyAccess(req: Request, res: Response, next: NextFunction) {
    try {
        const token = bearerJwtParser.parse(req.headers?.authorization || req.headers?.Authorization);
        verify(token, JWT_SECRETS.ACCESS_SECRET, (err, decoded) => {
            if (err) {
                return res.sendStatus(401);
            }

            const parsePayload = accessPayloadParser.safeParse(decoded);

            if (!parsePayload.success) {
                return res.sendStatus(401);
            }
            res.locals.username = parsePayload.data.username;
            res.locals.name = parsePayload.data.name;
            next();
        })

    } catch (error) {
        return res.sendStatus(401);
    }
}