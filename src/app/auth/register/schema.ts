import * as v from "valibot";

export const registerFields = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email"),
    v.email("Invalid email address")
  ),
  password: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your password"),
    v.minLength(8)
  ),
  password_repeat: v.pipe(
    v.string(),
    v.nonEmpty("Please rewrite your password"),
    v.minLength(8)
  ),
  user_name: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your username"),
    v.minLength(4, "Username must exceed 4 letters"),
    v.maxLength(31, "Username cannot exceed 31 letters"),
    v.regex(
      /^[a-zA-Z0-9-_]+$/i,
      "Username only contains uppercase letters, lowercase letters, numbers, hyphen, and underscore"
    )
  ),
  first_name: v.pipe(v.string(), v.nonEmpty("Please enter your first name")),
  last_name: v.pipe(v.string(), v.nonEmpty("Please enter your last name")),
});

export type RegisterFields = v.InferInput<typeof registerFields>;
