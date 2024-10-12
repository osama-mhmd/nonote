"use client";

import Habit from "@/types/habit";
import AddHabit from "./add-habit";

export default async function Habits({ habits }: { habits: Habit[] }) {
  return (
    <div className="bg-green-200">
      <h2 className="my-0">Habits 🔥</h2>
      <div className="flex *:w-full flex-col gap-2">
        {habits.map((habit, index) => {
          return (
            <div key={index} className="rounded-md bg-green-300 p-4">
              <h3 className="my-0">{habit.name}</h3>
              {/* TODO: Add streak */}
            </div>
          );
        })}
        {!habits.length && <i>No habits</i>}
        <AddHabit />
      </div>
    </div>
  );
}
