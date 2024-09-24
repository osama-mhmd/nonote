"use client";

import CodeForm from "./code-form";
import UsernameForm from "./username-form";
import { useState } from "react";

export default function ForgetPassword() {
  const [username, setUsername] = useState("");

  console.log(username);

  return (
    <section className="mt-6 sm:mt-12">
      <div className="container flex items-center flex-col gap-6 justify-center">
        {!username && <UsernameForm stater={setUsername} />}
        {username && <CodeForm username={username} />}
      </div>
    </section>
  );
}
