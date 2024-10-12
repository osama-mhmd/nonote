export default interface Habit {
  id: string;
  user_id: string;
  name: string;
  quote: string;
  start_date: Date;
  frequency: "daily" | "weakly" | "monthly";
}
