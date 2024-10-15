import { getHabit } from "@/db/actions/habits/get-habits";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "@/styles/calendar.css";
import getRecords from "@/db/actions/habits/get-records";

export default async function Habit({
  params,
}: {
  params: { habit_id: string };
}) {
  const habit = await getHabit(params.habit_id);

  if (!habit) return "Something went wrong";

  const records = await getRecords(params.habit_id);

  const dates = records
    ? records.map((el) => {
        return el.record_date;
      })
    : [];

  console.log(dates);
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
