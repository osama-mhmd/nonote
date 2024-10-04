"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useState } from "react";
import {
  getTokenHash,
  verifyResetPasswordTokenCode,
} from "@/db/utils/password-token";
import Result from "@/types/result";
import { getUserByUsername } from "@/db/utils/get-user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const forgetPasswordFields = v.object({
  code: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your code"),
    v.minLength(8),
    v.maxLength(8),
  ),
});
export type ForgetPasswordFields = v.InferInput<typeof forgetPasswordFields>;

export default function CodeForm({ username }: { username: string }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgetPasswordFields>({
    resolver: valibotResolver(forgetPasswordFields),
  });
  const [isLoading, setLoadingState] = useState(false);
  const router = useRouter();

  async function onsubmit(data: ForgetPasswordFields) {
    setLoadingState(true);

    const user = await getUserByUsername(username);

    // this will not happen, but just in case
    if (!user) {
      toast.error("User not found");
      return;
    }

    const result = await verifyResetPasswordTokenCode(data.code, user.id);

    if (result == Result.Success) {
      const token = await getTokenHash(data.code);

      if (token == "invalid-code") {
        toast.error("Invalid code");

        return;
      }

      router.push("/auth/forget-password/" + token);
    }
    if (result == Result.InvalidCode) {
      toast.error("Invalid code");
    }
    if (result == Result.ExpiredCode) {
      toast.error("Expired code");
    }

    setLoadingState(false);
  }

  return (
    <form
      onSubmit={handleSubmit(async (data) => await onsubmit(data))}
      className="flex flex-col gap-2 w-full max-w-96"
    >
      <h2 className="text-center mb-3">Reset Password</h2>
      <Input type="text" placeholder="Username" disabled value={username} />
      <Input type="text" placeholder="Code" {...register("code")} />
      {errors.code && <p className="error">{errors.code.message}</p>}
      <Button type="submit" loading={isLoading}>
        Reset
      </Button>
    </form>
  );
}
