import loginController from "../controllers/Auth/loginController"
import logoutController from "../controllers/Auth/logoutController"
import refreshController from "../controllers/Auth/refreshController"
import registerController from "../controllers/Auth/registerController"
import { RoutesObj } from "../libs/types"

const authRoutes: RoutesObj = [
    {
        url: "/auth/login",
        method: "post",
        controller: loginController,
        middlewares: []
    },
    {
        url: "/auth/register",
        method: "post",
        controller: registerController,
        middlewares: []
    },
    {
        url: "/auth/refresh",
        method: "get",
        controller: refreshController,
        middlewares: []
    },
    {
        url: "/auth/logout",
        method: "post",
        controller: logoutController,
        middlewares: []
    }
]

export default authRoutes;