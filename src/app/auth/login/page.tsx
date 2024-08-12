import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Login() {
  return (
    <section className="mt-20">
      <div className="container flex items-center justify-center">
        <form
          action="/login"
          method="post"
          className="flex flex-col gap-2 w-96"
        >
          <h2 className="text-center mb-3">Login</h2>
          <Input type="text" placeholder="Email" required />
          <Input type="password" placeholder="Password" required />
          <Link href="/auth/forget-password" className="mb-2 link">
            Forget password?
          </Link>
          <Button type="submit">Login</Button>
          <Link href="/auth/register" className="link">
            Don{"'"}t have an account? Create Account
          </Link>
        </form>
      </div>
    </section>
  );
}
