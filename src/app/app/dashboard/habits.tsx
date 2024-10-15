import Habit from "@/types/habit";
import AddHabit from "./add-habit";
import Link from "next/link";
import {
  Panel,
  PanelBody,
  PanelHeader,
  PanelTrigger,
} from "@/components/ui/panel";
import SaveRecordButton from "./save-record";
import getRecords from "@/db/actions/habits/get-records";
import HabitLink from "./habit-link";

export default async function Habits({ habits }: { habits: Habit[] }) {
  const today = new Date();

  return (
    <div className="bg-green-200 dark:bg-green-900">
      <h2 className="my-0">Habits 🔥</h2>
      <div className="flex *:w-full flex-col gap-2">
        {habits.map(async (habit, index) => {
          const records = await getRecords(habit.id);
          let isToday = false;

          const dates = records
            ? records.map((el) => {
                return el.record_date;
              })
            : [];

          if (dates[dates.length - 1]) {
            if (dates[dates.length - 1].getDate() == today.getDate())
              isToday = true;
          }

          return (
            <Panel key={index}>
              <PanelTrigger>
                <div className="rounded-md bg-green-300 dark:bg-green-800 p-4 cursor-pointer">
                  <HabitLink name={habit.name} id={habit.id} />
                  {/* TODO: Add streak */}
                </div>
              </PanelTrigger>
              <PanelBody>
                <PanelHeader>
                  <h3 className="my-0">{habit.name}</h3>
                </PanelHeader>
                <p>{habit.quote}</p>
                <div className="m-1 rounded-md bg-gray-200 dark:bg-gray-800 p-4 text-center">
                  {isToday ? (
                    <p className="text-muted-foreground font-bold">
                      Done Today 💪, Keep Going 🔥
                    </p>
                  ) : (
                    <SaveRecordButton habitId={habit.id} />
                  )}
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
