import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Login() {
  return (
    <section className="mt-20">
      <div className="container flex items-center justify-center">
        <form
          action="/register"
          method="post"
          className="flex flex-col gap-2 w-96"
        >
          <h2 className="text-center mb-3">Register</h2>
          <Input type="text" placeholder="First name" required />
          <Input type="text" placeholder="Last name" required />
          <Input type="text" placeholder="Username" required />
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Password" required />
          <Input type="password" placeholder="Repeat password" required />
          <Button type="submit">Register</Button>
          <Link href="/auth/login" className="link">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </section>
  );
}
