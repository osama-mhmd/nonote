import { getHabit } from "@/db/actions/habits/get-habits";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "@/styles/calendar.css";

export default async function Habit({
  params,
}: {
  params: { habit_id: string };
}) {
  const habit = await getHabit(params.habit_id);

  if (!habit) return "Something went wrong";

  const dates = ["2024-10-15", "2024-10-11"];

  return (
    <section className="mt-12">
      <div className="container">
        <h2>{habit.name}</h2>
        <p>{habit.quote}</p>
        {/* @ts-ignore */}
        <Calendar calendarType="islamic" minDetail="month" value={dates} />
      </div>
    </section>
  );
}
