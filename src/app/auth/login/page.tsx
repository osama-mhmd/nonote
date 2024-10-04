"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GithubIcon from "@/components/icons/github";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { registerFields } from "../register/schema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { InferInput, pick } from "valibot";
import { login } from "@/db/actions/users/login";
import { useState } from "react";
import { toast } from "sonner";

const loginFields = pick(registerFields, ["user_name", "password"]);
export type LoginFields = InferInput<typeof loginFields>;

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFields>({ resolver: valibotResolver(loginFields) });
  const [isLoading, setLoadingState] = useState(false);

  async function onsubmit(data: LoginFields) {
    setLoadingState(true);

    const err = await login(data);

    console.log(err);

    if (err) {
      setLoadingState(false);

      toast.error(err.message);
    }
  }

  return (
    <section className="mt-6 sm:mt-12">
      <div className="container flex items-center flex-col gap-6 justify-center">
        <form
          onSubmit={handleSubmit(async (data) => await onsubmit(data))}
          className="flex flex-col gap-2 w-full max-w-96"
        >
          <h2 className="text-center mb-3">Login</h2>
          <Input
            type="text"
            placeholder="Username"
            {...register("user_name")}
          />
          {errors.user_name && (
            <p className="error">{errors.user_name.message}</p>
          )}
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
          <Link href="/auth/forget-password" className="mb-2 link">
            Forget password?
          </Link>
          <Button type="submit" loading={isLoading}>
            Login
          </Button>
          <Link href="/auth/register" className="link">
            Don{"'"}t have an account? Create Account
          </Link>
        </form>
        <div className="grid w-full max-w-96 [&>*>svg]:me-1">
          <Button variant="outline">
            <GithubIcon /> Sign in with github
          </Button>
        </div>
      </div>
    </section>
  );
}
