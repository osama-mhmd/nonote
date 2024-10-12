"use server";

import db from "@/db";
import { validateRequest } from "@/db/auth";
import { habitsRecordsTable, habitsTable } from "@/db/schemas/habits";
import { and, eq } from "drizzle-orm";

export default async function saveRecord(habit_id: string) {
  const { user } = await validateRequest();

  if (!user) return false;

  const rows = await db
    .select()
    .from(habitsTable)
    .where(and(eq(habitsTable.id, habit_id), eq(habitsTable.user_id, user.id)));

  if (rows.length === 0) return false;

  await db
    .insert(habitsRecordsTable)
    .values({ habit_id, date: new Date() })
    .catch(() => false);

  return true;
}
