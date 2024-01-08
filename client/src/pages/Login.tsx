import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { basicApi } from "../libs/myAxios";
import { AxiosError } from "axios";
import useAuth from "../hooks/useAuth";

const inputClasses = {
    input: "text-lg",
    label: "text-lg",
    errorMessage: "text-sm text-danger font-medium",
    description: "text-sm text-info font-medium"
};

const parser = z.object({
    unameOrEmail: z.string().email().or(z.string().trim().min(2, "Min 2 chars required.").max(40, "Only 40 chars allowed.")),
    password: z.string().trim().min(6, "Min 6 chars required.").max(40, "Only 40 chars allowed.")
})

export default function Login() {
    const { setAuth } = useAuth()

    const { handleSubmit, control, formState, setError } = useForm<z.infer<typeof parser>>({
        resolver: zodResolver(parser),
        mode: "onSubmit",
        defaultValues: {
            unameOrEmail: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<z.infer<typeof parser>> = async (data) => {
        try {
            const res = await basicApi.post("/auth/login", data);
            const resData = await res.data;
            setAuth(resData?.accessToken);
        } catch (error) {
            console.log(error);
            let message = "Login Failed";
            if (error instanceof AxiosError) {
                message = error?.response?.data?.err ?? "Login Failed";
            }
            setError("root", { message: message });
        }
    }

    return (
        <div className="w-full max-w-[500px] mx-auto my-8">
            <h1 className="text-center text-2xl font-playfair mb-2" >Login</h1>
            <div className="text-center text-base text-danger font-medium h-6">{formState?.errors?.root?.message ?? ""}</div>
            <form className="flex flex-col items-center gap-y-5 mt-5 mb-10" onSubmit={handleSubmit(onSubmit)}>
                <Controller control={control} name="unameOrEmail" render={({ field, fieldState: { error } }) =>
                    <Input label="Username or Email" variant="underlined" classNames={inputClasses} description="Enter your username or email here" errorMessage={error?.message} {...field} required />
                } />
                <Controller
                    control={control}
                    name="password"
                    render={({ field, fieldState: { error } }) =>
                        <Input type="password" label="Password" variant="underlined" classNames={inputClasses} description="Enter your password here" errorMessage={error?.message} {...field} required />
                    }
                />
                <Button type="submit" color="primary" isLoading={false} className="mt-5 text-lg w-40">Login</Button>
            </form>
            <div className="text-center text-lg">
                <span>If you haven't registered yet? </span>
                <Link to="/register" className="font-medium duration-150 ease-in-out hover:text-accent hover:underline" >register here</Link>
            </div>
        </div>
    )
}