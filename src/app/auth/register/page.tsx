"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import signup from "@/db/actions/create-user";
import Link from "next/link";
import { SubmitHandler, useForm, ErrorOption } from "react-hook-form";
import { registerFields, type RegisterFields } from './schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useEffect } from "react";

export default function Register({ searchParams }: { searchParams: { error: string } }) {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit
  } = useForm<RegisterFields>({ resolver: valibotResolver(registerFields) });

  useEffect(() => {
    // TODO: this way should be changed
    const error = searchParams.error;
    if (error) {
      if (error == "users_email_unique") setError("email", { message: "Email already exists" })
      if (error == "users_username_unique") setError("user_name", { message: "Username already exists" })
    }
  }, [searchParams.error])

  const onSumbit: SubmitHandler<RegisterFields> = async (data: RegisterFields) => {
    if (data.password != data.password_repeat) setError("password_repeat", {
      message: "Passwords must match!"
    })
    else {
      await signup(data);
    }
  };

  return (
    <section className="mt-20">
      <div className="container flex items-center justify-center">
        <form
          onSubmit={handleSubmit(async (data) => await onSumbit(data))}
          className="flex flex-col gap-2 w-96"
        >
          <h2 className="text-center mb-3">Register</h2>
          <Input
            type="text"
            placeholder="First name"
            {...register("first_name")}
          />
          {errors.first_name && <p className="error">{errors.first_name.message}</p>}
          <Input
            type="text"
            placeholder="Last name"
            {...(register("last_name"))}
          />
          {errors.last_name && <p className="error">{errors.last_name.message}</p>}
          <Input
            type="text"
            placeholder="Username"
            {...register("user_name")}
          />
          {errors.user_name && <p className="error">{errors.user_name.message}</p>}
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
          <Input
            type="password"
            placeholder="Repeat password"
            {...register("password_repeat")}
          />
          {errors.password_repeat && <p className="error">{errors.password_repeat.message}</p>}
          <Button type="submit" onClick={() => console.log(errors)}>
            Register
          </Button>
          <Link href="/auth/login" className="link">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </section>
  );
}
