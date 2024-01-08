import { Request, Response } from "express";
import { jwtParser } from "../../libs/myParsers";
import db from "../../libs/db";


export default async function logoutController(req: Request, res: Response) {
    try {
        const cookieParser = jwtParser.safeParse(req.cookies?.refresh);

        if (!cookieParser.success) return res.sendStatus(204);

        const refreshCookie = cookieParser.data;

        const foundUser = await db.user.findFirst({ where: { refresh: refreshCookie } });

        if (foundUser) {
            await db.user.update({
                where: {
                    id: foundUser.id
                },
                data: {
                    refresh: ""
                }
            })
        }

        res.cookie("refresh", "", { maxAge: 0, httpOnly: true });

        return res.sendStatus(204);
    } catch (error) {
        console.log(error);

        res.cookie("refresh", "", { maxAge: 0, httpOnly: true, sameSite: "none", secure: false });
        return res.sendStatus(204);
    }
}