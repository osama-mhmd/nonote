"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { registerFields } from "../register/schema";
import { InferInput, pick } from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { newPassword } from "@/db/actions/new-password";
import { NewPasswordResult as Result } from "@/db/result";
import { useState } from "react";
import { toast } from "sonner";

const forgetPasswordFields = pick(registerFields, ["user_name"]);
export type ForgetPasswordFields = InferInput<typeof forgetPasswordFields>;

export default function UsernameForm({
  stater,
}: {
  stater: (username: string) => void;
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgetPasswordFields>({
    resolver: valibotResolver(forgetPasswordFields),
  });
  const [isLoading, setLoadingState] = useState(false);

  async function onsubmit(data: ForgetPasswordFields) {
    setLoadingState(true);

    const result = await newPassword(data.user_name);

    console.log(result);

    if (result == Result.UserNotFound) {
      setLoadingState(false);

      toast.error("User not found");

      return;
    }
    if (result == Result.Success) {
      setLoadingState(false);

      toast.success("Email sent, please check out your inbox");
    }
    if (result == Result.SentAnotherOne) {
      setLoadingState(false);

      toast.success("We have sent another email, please check out your inbox");
    }
    if (result == Result.AlreadySent) {
      setLoadingState(false);

      toast.success(
        "We have already sent an email, please check out your inbox",
      );
    }

    stater(data.user_name);
  }

  return (
    <form
      onSubmit={handleSubmit(async (data) => await onsubmit(data))}
      className="flex flex-col gap-2 w-full max-w-96"
    >
      <h2 className="text-center mb-3">Reset Password</h2>
      <Input type="text" placeholder="Username" {...register("user_name")} />
      {errors.user_name && <p className="error">{errors.user_name.message}</p>}
      <Button type="submit" loading={isLoading}>
        Reset
      </Button>
    </form>
  );
}
