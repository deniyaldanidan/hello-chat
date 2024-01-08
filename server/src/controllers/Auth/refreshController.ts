import { Request, Response } from "express";
import { jwtParser, refreshPayloadParser } from "../../libs/myParsers";
import jwt from 'jsonwebtoken';
import { JWT_SECRETS, signAccess } from "../../libs/signJWT";
import { z } from "zod";
import db from "../../libs/db";




export default function refreshController(req: Request, res: Response) {
    try {
        const cookieParser = jwtParser.safeParse(req.cookies?.refresh);
        if (!cookieParser.success) {
            return res.sendStatus(401)
        }
        const refreshCookie = cookieParser.data;

        jwt.verify(refreshCookie, JWT_SECRETS.REFRESH_SECRET, async (err, decoded) => {
            if (err) {
                return res.sendStatus(401);
            }
            const parsedDecoded = refreshPayloadParser.safeParse(decoded);
            if (!parsedDecoded.success) {
                return res.sendStatus(401);
            }
            const { username } = parsedDecoded.data;
            const foundUser = await db.user.findFirst({ where: { AND: [{ username }, { refresh: refreshCookie }] } })

            if (!foundUser) {
                return res.sendStatus(401);
            }
            const accessToken = signAccess({ username: foundUser.username, name: foundUser.name });
            return res.status(200).json({ accessToken });
        })

    } catch (error) {
        console.log(error);
        return res.status(401);
    }
}