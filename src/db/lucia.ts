import { Lucia } from "lucia";
import { adapter } from "./adapter";

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      fullname: attributes.fullName,
      username: attributes.userName,
      email: attributes.email,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  hashedPassword: string;
  plan: "basic" | "pro" | "ultimate";
}
