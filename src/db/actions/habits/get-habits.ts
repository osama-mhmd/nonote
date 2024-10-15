"use server";

import db from "@/db";
import { validateRequest } from "@/db/auth";
import { habitsTable } from "@/db/schemas/habits";
import { and, eq } from "drizzle-orm";

export default async function getHabits() {
  const { user } = await validateRequest();

  if (!user) return false;

  const habits = await db
    .select()
    .from(habitsTable)
    .where(eq(habitsTable.user_id, user.id));

  return habits;
}

export async function getHabit(habit_id: string) {
  const { user } = await validateRequest();

  if (!user) return false;

  const habits = await db
    .select()
    .from(habitsTable)
    .where(and(eq(habitsTable.id, habit_id), eq(habitsTable.user_id, user.id)));

  return habits[0];
}
