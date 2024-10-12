"use server";

import db from "@/db";
import { validateRequest } from "@/db/auth";
import { habitsTable } from "@/db/schemas/habits";
import Habit from "@/types/habit";
import { generateIdFromEntropySize } from "lucia";

export default async function createHabit(
  habit: Omit<Habit, "id" | "user_id" | "start_date">,
) {
  const { user } = await validateRequest();

  if (!user) return false;

  const id = generateIdFromEntropySize(16);

  await db
    .insert(habitsTable)
    .values({
      user_id: user.id,
      id,
      name: habit.name,
      quote: habit.quote,
      start_date: new Date(),
      frequency: habit.frequency,
    })
    .catch((e) => {
      console.log(e);
      return false;
    });

  return true;
}
