"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import createWorkspace from "@/db/actions/workspaces/create";
import { useForm } from "react-hook-form";

export default function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<{ name: string; description: string }>();

  const onsubmit = async (data: { name: string; description: string }) => {
    const err = await createWorkspace(data);

    if (err) {
      if (err.message == "invalid-code")
        setError("name", {
          message: err.message,
        });
    }
  };

  return (
    <section className="mt-4">
      <div className="container flex items-center justify-center">
        <form
          onSubmit={handleSubmit(async (data) => await onsubmit(data))}
          className="flex flex-col gap-2 w-96"
        >
          <h3 className="text-center mb-3">Create workspace</h3>
          <Input
            placeholder="Name"
            {...register("name", {
              required: "Please enter the name",
            })}
          />
          <Input
            placeholder="Description (optional)"
            {...register("description")}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
          <Button loading={isSubmitting}>Create</Button>
        </form>
      </div>
    </section>
  );
}
