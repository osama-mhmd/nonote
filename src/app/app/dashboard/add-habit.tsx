"use client";

import { Button } from "@/components/ui/button";
import {
  Panel,
  PanelBody,
  PanelHeader,
  PanelTrigger,
} from "@/components/ui/panel";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { habitFields, HabitFields } from "./schema";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import createHabit from "@/db/actions/habits/create";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

export default function AddHabit() {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
  } = useForm<HabitFields>({
    resolver: valibotResolver(habitFields),
  });

  async function onsubmit(data: HabitFields) {
    const result = await createHabit(data);

    if (!result) {
      toast.error("Something went wrong");
    } else {
      toast.success("Habit created successfully");
      window.location.reload(); // TODO: delete this and make it instead a live preview
    }
  }

  return (
    <Panel>
      <PanelTrigger>
        <div className="p-4 border-2 cursor-pointer border-green-400 hover:bg-green-300/50 transition rounded-md">
          <PlusCircle className="mx-auto" />
        </div>
      </PanelTrigger>
      <PanelBody>
        <PanelHeader>
          <h3 className="my-0">Create a habit</h3>
        </PanelHeader>
        <form
          onSubmit={handleSubmit(async (data) => await onsubmit(data))}
          className="flex flex-col gap-2 w-full"
        >
          <Input type="text" placeholder="Name" {...register("name")} />
          {errors.name && <p className="error">{errors.name.message}</p>}
          <Input type="text" placeholder="Quote" {...register("quote")} />
          {errors.quote && <p className="error">{errors.quote.message}</p>}
          <Select
            onValueChange={
              (val) =>
                setValue("frequency", val as "daily" | "weakly" | "monthly") // I Know This is weird
            }
            {...register("frequency")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select the frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weakly">Weakly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.frequency && (
            <p className="error">{errors.frequency.message}</p>
          )}
          <Button type="submit" loading={isSubmitting}>
            Add
          </Button>
        </form>
      </PanelBody>
    </Panel>
  );
}
