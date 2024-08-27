"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import createUser from "@/db/actions/create-user";
import Link from "next/link";

export default function Login() {
  return (
    <section className="mt-20">
      <div className="container flex items-center justify-center">
        <form action={createUser} className="flex flex-col gap-2 w-96">
          <h2 className="text-center mb-3">Register</h2>
          <Input
            type="text"
            placeholder="First name"
            name="first-name"
            required
          />
          <Input
            type="text"
            placeholder="Last name"
            name="last-name"
            required
          />
          <Input type="text" placeholder="Username" name="username" required />
          <Input type="email" placeholder="Email" name="email" required />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <Input
            type="password"
            placeholder="Repeat password"
            name="password-repeat"
            required
          />
          <Button type="submit">Register</Button>
          <Link href="/auth/login" className="link">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </section>
  );
}
