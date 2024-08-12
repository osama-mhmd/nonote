"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Profile() {
  const logOut = () => {
    console.log("Cannot log out");
  };

  return (
    <section className="mt-20">
      <div className="container">
        <Image
          height={200}
          width={200}
          alt="profile pic"
          className="rounded-full bg-muted mx-auto"
          src="/test.png"
        />
        <p className="rounded-md bg-muted my-2 p-3">Name: Osama Mohammed</p>
        <p className="rounded-md bg-muted my-2 p-3">Username: os-mhmd</p>
        <p className="rounded-md bg-muted my-2 p-3">
          Email: docosmo010@gmail.com
        </p>
        <Button variant="destructive" onClick={logOut}>
          Log out
        </Button>
      </div>
    </section>
  );
}
