import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import mySocket from "../libs/mySocket";
import useAuth from "../hooks/useAuth";


export default function AuthInit() {

    const { authState } = useAuth();


    useEffect(() => {
        if (authState.authed === true) {
            mySocket.auth = { token: authState.token };
            mySocket.connect();
        }

        const welcomeListener = (info: string) => {
            console.log(info);
        };

        if (mySocket.active) {
            mySocket.on("welcome", welcomeListener)
        }

        return () => {
            if (mySocket.active) {
                mySocket.disconnect()
                mySocket.off("welcome", welcomeListener)
            }
        }
    }, [authState])

    return <Outlet />
}