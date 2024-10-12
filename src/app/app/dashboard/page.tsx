import { Button } from "@/components/ui/button";
import { validateRequest } from "@/db/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { user } = await validateRequest();

  // just in case
  if (!user) redirect("/auth/login");

  return (
    <section>
      <div className="container mt-12">
        <h1>
          Hello, <span className="text-blue-500">{user.fullname}</span>
        </h1>
        <div className="flex flex-col gap-1 *:rounded-md *:p-4 *:px-6 *:flex *:pb-6 *:flex-col *:gap-4">
          <div className="bg-green-200">
            <h2 className="my-0">Habits 🔥</h2>
            <p className="flex flex-col gap-2 items-center">
              <i>No Habits</i>
              <Button>Create your first habit</Button>
            </p>
          </div>
          <div className="bg-blue-200">
            <h2 className="my-0">Notes 📝</h2>
            <p className="flex flex-col gap-2 items-center">
              <i>No Notes</i>
              <Button>Create your first note</Button>
            </p>
          </div>
          <div className="bg-blue-200">
            <h2 className="my-0">Capture ✅</h2>
            <p className="flex flex-col gap-2 items-center">
              <i>No Captures</i>
              <Button>Create your first capture</Button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
