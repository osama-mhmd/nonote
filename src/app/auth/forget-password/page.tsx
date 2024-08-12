import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nonote | Forget password",
};

export default function Login() {
  return (
    <section className="mt-20">
      <div className="container flex items-center justify-center">
        <form
          action="/auth/forget-password"
          method="post"
          className="flex flex-col gap-2 w-96"
        >
          <h2 className="text-center mb-3">Reset password</h2>
          <Input type="text" placeholder="Email" required />
          <Button type="submit">Reset</Button>
        </form>
      </div>
    </section>
  );
}
