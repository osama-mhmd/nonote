"use client";

import { Button } from "@/components/ui/button";
import { Edit, LogOut } from "lucide-react";
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
        <p className="rounded-md bg-muted my-2 p-3 flex items-center gap-1">
          Name: Osama Mohammed <Edit height={20} width={20} />
        </p>
        <p className="rounded-md bg-muted my-2 p-3 flex items-center gap-1">
          Username: os-mhmd <Edit height={20} width={20} />
        </p>
        <p className="rounded-md bg-muted my-2 p-3 flex items-center gap-1">
          Email: docosmo010@gmail.com <Edit height={20} width={20} />
        </p>
        <Button variant="destructive" onClick={logOut}>
          Log out <LogOut className="ms-2" />
        </Button>
      </div>
    </section>
  );
}
