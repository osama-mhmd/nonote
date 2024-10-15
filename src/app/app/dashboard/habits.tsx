"use client";

import Habit from "@/types/habit";
import AddHabit from "./add-habit";
import Link from "next/link";
import {
  Panel,
  PanelBody,
  PanelHeader,
  PanelTrigger,
} from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import saveRecord from "@/db/actions/habits/save-record";
import { toast } from "sonner";

export default async function Habits({ habits }: { habits: Habit[] }) {
  const makeRecord = async (id: string) => {
    const result = await saveRecord(id);

    if (result) toast.success("Record saved");
    else toast.error("Something went wrong");
  };

  return (
    <div className="bg-green-200">
      <h2 className="my-0">Habits 🔥</h2>
      <div className="flex *:w-full flex-col gap-2">
        {habits.map((habit, index) => {
          return (
            <Panel key={index}>
              <PanelTrigger>
                <div className="rounded-md bg-green-300 p-4 cursor-pointer">
                  <Link
                    className="text-xl underline text-blue-100"
                    href={`/app/dashboard/habits/${habit.id}`}
                  >
                    {habit.name}
                  </Link>
                  {/* TODO: Add streak */}
                </div>
              </PanelTrigger>
              <PanelBody>
                <PanelHeader>
                  <h3 className="my-0">{habit.name}</h3>
                </PanelHeader>
                <p>{habit.quote}</p>
                <div className="m-1 rounded-md bg-gray-800 p-4 text-center">
                  <Button onClick={() => makeRecord(habit.id)}>
                    Save Record
                  </Button>
                </div>
              </PanelBody>
            </Panel>
          );
        })}
        {!habits.length && <i>No habits</i>}
        <AddHabit />
      </div>
    </div>
  );
}
