import React, { useState } from "react";
import useSWR from "swr";
import { basicApi } from "../libs/myAxios";
import { jwtDecode } from 'jwt-decode';
import { z } from 'zod';


const defaultAuthState: authState = {
    authed: false
}

export const AuthContext = React.createContext<{ authState: authState, setAuth: (accessToken: string) => void, resetAuth: emptyFn }>({
    authState: defaultAuthState,
    setAuth: () => { },
    resetAuth: () => { }
});

const jwtParser = z.object({
    username: z.string(),
    name: z.string()
})

const refreshFetcher = (url: string) => basicApi.get(url).then(res => res.data.accessToken);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [authState, setAuthState] = useState<authState>(defaultAuthState);

    const { isLoading } = useSWR("/auth/refresh", refreshFetcher, {
        onSuccess: (data) => {
            setAuth(data)
        },
        onError: (err) => {
            console.log(err);
            setAuthState(defaultAuthState)
        },
        errorRetryCount: 0,
        revalidateOnFocus: false
    });

    function setAuth(accessToken: string) {
        const parsedData = jwtParser.safeParse(jwtDecode(accessToken));

        if (parsedData.success) {
            setAuthState({
                authed: true,
                ...parsedData.data,
                token: accessToken
            })
        }
    }

    function resetAuth() {
        setAuthState(defaultAuthState)
    }

    return (
        <AuthContext.Provider value={{ authState: isLoading ? { authed: "loading" } : authState, setAuth, resetAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;