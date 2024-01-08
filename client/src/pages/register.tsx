import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { basicApi } from "../libs/myAxios";
import useAuth from "../hooks/useAuth";
import { AxiosError } from "axios";
import validator from "validator";

const inputClasses = {
    input: "text-lg",
    label: "text-lg",
    errorMessage: "text-sm text-danger font-medium",
    description: "text-sm text-info font-medium"
};

const parser = z.object({
    username: z.string().trim().min(2, "Atleast 2 chars required.").max(24, "Only 24 chars allowed.").refine(val => validator.isAlphanumeric(val, "en-US", { ignore: "-_" }), "Should only contain alphanumeric and -_ chars."),
    email: z.string().email(),
    password: z.string().trim().min(6, "Atleast 6 chars required.").max(30, "Only 30 chars allowed."),
    name: z.string().trim().min(2, "Atleast 2 chars required.").max(30, "Only 30 chars allowed.")
})

export default function Register() {

    const { setAuth } = useAuth();

    const { handleSubmit, control, formState, setError } = useForm<z.infer<typeof parser>>({
        resolver: zodResolver(parser),
        mode: "onSubmit",
        defaultValues: {
            username: "",
            password: "",
            name: "",
            email: ""
        }
    })

    const onSubmit: SubmitHandler<z.infer<typeof parser>> = async data => {
        try {
            const res = await basicApi.post("/auth/register", data);
            const resData = await res.data;
            setAuth(resData?.accessToken);
        } catch (error) {
            console.log(error);
            let message = "Registration Failed";
            if (error instanceof AxiosError) {
                message = error?.response?.data?.err ?? "Registration Failed";
            }
            setError("root", { message })
        }
    }

    return (
        <div className="w-full max-w-[500px] mx-auto my-8">
            <h1 className="text-center text-2xl font-playfair mb-2" >Register</h1>
            <div className="text-center text-base text-danger font-medium h-6">{formState?.errors?.root?.message ?? ""}</div>
            <form className="flex flex-col items-center gap-y-4 mt-5 mb-7" onSubmit={handleSubmit(onSubmit)} >
                <Controller control={control} name="name"
                    render={({ field, fieldState: { error } }) => <Input type="text" label="Name" variant="underlined" classNames={inputClasses} {...field} description="Enter your name here" errorMessage={error?.message ?? ""} />} />
                <Controller control={control} name="username"
                    render={({ field, fieldState: { error } }) => <Input type="text" label="Username" variant="underlined" classNames={inputClasses} {...field} description="Enter your username here" errorMessage={error?.message ?? ""} />} />
                <Controller control={control} name="email" render={({ field, fieldState: { error } }) => <Input label="Email" type="email" variant="underlined" classNames={inputClasses} {...field} description="Enter your email here" errorMessage={error?.message ?? ""} />} />
                <Controller control={control} name="password"
                    render={({ field, fieldState: { error } }) => <Input type="password" label="Password" variant="underlined" classNames={inputClasses} {...field} description="Enter your password here" errorMessage={error?.message ?? ""} />} />
                <Button type='submit' color="primary" isLoading={false} className="mt-5 text-lg w-40">Register</Button>
            </form>
            <div className="text-center text-lg">
                <span>If you have already registered? </span>
                <Link to="/login" className="font-medium duration-150 ease-in-out hover:text-accent hover:underline" >Login here</Link>
            </div>
        </div>
    )
}