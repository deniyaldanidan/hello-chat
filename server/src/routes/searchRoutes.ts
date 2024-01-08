import db from "../libs/db";
import { RoutesObj } from "../libs/types";
import verifyAccess from "../middlewares/verifyAccess";
import { Request, Response } from "express";


const searchRoutes: RoutesObj = [
    {
        url: "/search-users/:searchKey",
        method: "get",
        controller: async (req: Request, res: Response) => {
            const searchKey = req.params.searchKey;
            const users = await db.user.findMany({
                where: {
                    OR: [
                        { username: { contains: searchKey } },
                        { name: { contains: searchKey } }
                    ]
                },
                select: {
                    username: true,
                    name: true
                }
            });
            return res.json(users)
        },
        middlewares: [verifyAccess]
    }
]

export default searchRoutes;