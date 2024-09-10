"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { verify } from "@/db/actions/verify-email";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";

export default function VerifyForm({ text }: { text: string | ReactNode }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<{ code: string }>();
  const [isLoading, setLoadingState] = useState(false);

  const onsubmit = async (data: { code: string }) => {
    setLoadingState(true);

    const err = await verify(data.code);

    if (err) {
      if (err.message == "invalid-code")
        setError("code", {
          message: "Invalid code",
        });
    }

    setLoadingState(false);
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => await onsubmit(data))}
      className="flex flex-col gap-2 w-96"
    >
      <span className="text-muted-foreground mb-2">{text}</span>
      <Input
        placeholder="Code"
        {...register("code", {
          required: "Please enter the code",
          minLength: {
            value: 8,
            message: "Code consists of 8 digits",
          },
          maxLength: {
            value: 8,
            message: "Code consists of 8 digits",
          },
        })}
      />
      {errors.code && <span className="error">{errors.code.message}</span>}
      <Button loading={isLoading}>Verify</Button>
    </form>
  );
}
