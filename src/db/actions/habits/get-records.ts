"use server";

import db from "@/db";
import { validateRequest } from "@/db/auth";
import { habitsRecordsTable, habitsTable } from "@/db/schemas/habits";
import { and, eq } from "drizzle-orm";

export default async function getRecords(habit_id: string) {
  const { user } = await validateRequest();

  if (!user) return false;

  const records = await db
    .select({
      record_date: habitsRecordsTable.date,
    })
    .from(habitsRecordsTable)
    .innerJoin(habitsTable, eq(habitsTable.user_id, user.id))
    .where(and(eq(habitsRecordsTable.habit_id, habit_id)));

  return records;
}
