import { Lucia } from "lucia";
import { getAdpater } from "./adapter";

export const lucia = new Lucia(await getAdpater(), {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}
