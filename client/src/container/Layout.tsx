import { Outlet } from 'react-router-dom';
import { cn } from '../libs/utils';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Switch } from '@nextui-org/react';
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import useAuth from '../hooks/useAuth';
import { basicApi } from '../libs/myAxios';


const basicFlexClasses = "flex items-center gap-x-space";
const basicMenuClasses = "text-lg font-jost font-medium capitalize tracking-wide cursor-pointer duration-150 ease-in-out hover:text-accent hover:underline";

export default function Layout() {
    const [isDark, setIsDark] = useState<boolean>(() => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    });
    const { authState, resetAuth } = useAuth()

    const logout = async () => {
        try {
            await basicApi.post("/auth/logout");
            resetAuth()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`${isDark ? "dark" : "light"} flex flex-col gap-0 min-h-screen bg-background text-foreground`}>
            <header className={cn(basicFlexClasses, "bg-secBackground px-space py-4 justify-between")}>
                <div className='text-xl font-playfair tracking-wider'>Hello Chat</div>
                <div className={cn(basicFlexClasses, "gap-x-6")}>
                    {
                        authState.authed === true ? (
                            <>
                                <div className={cn(basicMenuClasses, "hover:no-underline hover:text-foreground cursor-default")}>
                                    Hi, {authState.name}</div>
                                <button className={basicMenuClasses} onClick={logout} >Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={basicMenuClasses}>Login</Link>
                                <Link to="/register" className={basicMenuClasses}>Register</Link>
                            </>
                        )
                    }

                    <Switch isSelected={isDark} onValueChange={(val) => setIsDark(val)} size='sm' endContent={<BsFillMoonStarsFill />} startContent={<BsFillSunFill />} classNames={{
                        wrapper: "bg-secondary w-[3rem]",
                        endContent: "text-background",
                        thumb: "group-data-[selected=true]:ml-[1.5rem]"
                    }} />
                </div>
            </header>
            <main className="flex-grow flex flex-col">
                <Outlet />
            </main>
            <footer className='text-center text-sm px-space pt-3 pb-4 bg-secBackground' >&copy; 2024 Dani's products. All rights reserved.</footer>
        </div>
    )
}