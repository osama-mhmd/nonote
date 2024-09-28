"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { InferInput, pick } from "valibot";
import { useState } from "react";
import { registerFields } from "../../register/schema";
import { changePassword } from "@/db/actions/new-password";
import { ChangePasswordResult } from "@/db/result";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const resetPasswordFields = pick(registerFields, [
  "password",
  "password_repeat",
]);
export type ResetPasswordFields = InferInput<typeof resetPasswordFields>;

export default function ResetPassword({
  params: { token },
}: {
  params: { token: string };
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ResetPasswordFields>({
    resolver: valibotResolver(resetPasswordFields),
  });
  const [isLoading, setLoadingState] = useState(false);
  const router = useRouter();

  async function onsubmit(data: ResetPasswordFields) {
    if (data.password !== data.password_repeat) {
      toast.error("Passwords don't match");
      return;
    }

    setLoadingState(true);

    const result = await changePassword(token, data.password);

    if (result == ChangePasswordResult.InvalidPassword) {
      toast.error("Invalid password");

      return;
    }

    if (result == ChangePasswordResult.InvalidTokenHash) {
      toast.error("Invalid token hash");

      return;
    }

    // not possible, but just in case
    if (result == ChangePasswordResult.NoUser) {
      toast.error("User not found");

      return;
    }

    if (result == ChangePasswordResult.Success) {
      toast.success("Password changed successfully");

      router.push("/auth/login");
    }

    setLoadingState(false);
  }

  return (
    <section className="mt-6 sm:mt-12">
      <div className="container flex items-center flex-col gap-6 justify-center">
        <form
          onSubmit={handleSubmit(async (data) => await onsubmit(data))}
          className="flex flex-col gap-2 w-full max-w-96"
        >
          <h2 className="text-center mb-3">Reset Password</h2>
          <Input
            type="password"
            placeholder="New password"
            {...register("password")}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
          <Input
            type="password"
            placeholder="Repeat password"
            {...register("password_repeat")}
          />
          {errors.password_repeat && (
            <p className="error">{errors.password_repeat.message}</p>
          )}
          <Button type="submit" loading={isLoading}>
            Reset
          </Button>
        </form>
      </div>
    </section>
  );
}
