import { Request, Response } from "express";
import { refreshMaxAgeSeconds, signAccess, signRefresh } from "../../libs/signJWT";
import db from "../../libs/db";
import { z } from "zod";
import bcrypt from 'bcrypt'
import { nameParser, passwordParser, usernameParser } from "../../libs/myParsers";

const reqParser = z.object({
    username: usernameParser,
    email: z.string().email(),
    password: passwordParser,
    name: nameParser
})

export default async function registerController(req: Request, res: Response) {
    try {
        const reqInps = reqParser.safeParse(req.body);

        if (!reqInps.success) {
            return res.status(400).json({ err: "Invalid Inputs" });
        }

        const { username, password, name, email } = reqInps.data;

        const foundUser = await db.user.findFirst({ where: { OR: [{ username }, { email }] } })

        if (foundUser) {
            return res.status(409).json({ err: "Register Failed. User already exists" });
        }

        const accessToken = signAccess({ username, name });
        const refreshToken = signRefresh({ username });
        const pwd = await bcrypt.hash(password, 10);

        await db.user.create({ data: { username, name, password: pwd, email, refresh: refreshToken } })

        res.cookie("refresh", refreshToken, { httpOnly: true, maxAge: refreshMaxAgeSeconds * 1000 });
        return res.status(200).json({ accessToken });
    } catch (error) {
        console.log(error);
        return res.status(409).json({ err: "Registeration Failed." })
    }
}