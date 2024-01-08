import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from 'bcrypt';
import { refreshMaxAgeSeconds, signAccess, signRefresh } from "../../libs/signJWT";
import { passwordParser, usernameParser } from "../../libs/myParsers";
import db from "../../libs/db";

const reqParser = z.object({
    unameOrEmail: z.string().email().or(usernameParser),
    password: passwordParser
})

export default async function loginController(req: Request, res: Response) {
    try {
        const reqInps = reqParser.safeParse(req.body);

        if (!reqInps.success) {
            return res.status(400).json({ err: "Invalid Inputs" });
        }

        const { unameOrEmail, password } = reqInps.data;

        const foundUser = await db.user.findFirst({ where: { OR: [{ username: unameOrEmail }, { email: unameOrEmail }] } });

        if (!foundUser) {
            return res.status(409).json({ err: "Login Failed. No such user is found" });
        }

        const match = await bcrypt.compare(password, foundUser.password);

        if (!match) {
            return res.status(409).json({ err: "Login Failed." })
        }

        const accessToken = signAccess({ username: foundUser.username, name: foundUser.name });
        const refreshToken = signRefresh({ username: foundUser.username });

        await db.user.update({
            where: {
                id: foundUser.id
            },
            data: {
                refresh: refreshToken
            }
        });

        res.cookie("refresh", refreshToken, { httpOnly: true, maxAge: refreshMaxAgeSeconds * 1000 });

        res.status(200).json({ accessToken });
    } catch (error) {
        console.log(error);
        return res.status(409).json({ err: "Login Failed." })
    }
}