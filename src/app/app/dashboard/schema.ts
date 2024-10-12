import * as v from "valibot";

export const habitFields = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Please enter the habit name")),
  quote: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your quote to keep motivated"),
  ),
  frequency: v.pipe(
    v.union([v.literal("daily"), v.literal("weakly"), v.literal("monthly")]),
    v.nonEmpty("Please enter the frequency"),
  ),
});

export type HabitFields = v.InferInput<typeof habitFields>;
