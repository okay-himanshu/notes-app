"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { IoIosArrowForward } from "react-icons/io";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { ENV_CONFIG } from '@/config/env_config';


type FormState = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

const initialFormState: FormState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
}

export default function Signup() {

    const [form, setForm] = useState<FormState>(initialFormState)

    const navigate = useRouter()

    const changeFunction = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleSignup = async (): Promise<void> => {
        try {
            const { data } = await axios.post(`${ENV_CONFIG.API_ENDPOINT}/user/signup`, form)
            console.log(data.success)
            if (data.success) {
                setForm(initialFormState)
                navigate.push('/auth/login')
                console.log('signup successfully')
            } else {
                console.log("Something went wrong", data.message)
            }

        } catch (error) {
            if (error) {
                const typedError = error as Error;
                console.log(typedError.message)
            }
        }
    }

    return (
        <>
            <main className="flex justify-center mt-10">
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                    <h1 className="text-3xl font-bold">Signup</h1>
                    <Input
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={form.name}
                        handleChange={changeFunction}
                    />
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={form.email}
                        handleChange={changeFunction}
                    />
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={form.password}
                        handleChange={changeFunction}
                    />
                    <Input
                        type="password"
                        placeholder="Confirm password"
                        className=""
                        name="confirmPassword"
                        value={form.confirmPassword}
                        handleChange={changeFunction}
                    />
                    <Button
                        title="Signup"
                        icon={<IoIosArrowForward />}
                        className=""
                        handleClick={handleSignup}
                    />
                </form>
            </main>
        </>
    );
}
