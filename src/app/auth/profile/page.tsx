import SignOut from "./sign-out";

// import Image from "next/image";

export default function Profile() {
  return (
    <section className="mt-20">
      <div className="container">
        {/* <Image
          height={200}
          width={200}
          alt="profile pic"
          className="rounded-full bg-muted mx-auto"
          src={session.user.image!}
        /> */}
        <p className="rounded-md bg-muted my-3 p-3 flex items-center gap-1">
          Username: ss
        </p>
        <p className="rounded-md bg-muted my-3 p-3 flex items-center gap-1">
          Name: Ss
        </p>
        <p className="rounded-md bg-muted my-2 p-3 flex items-center gap-1">
          Email: s@s
        </p>
        <div className="text-center pt-4">
          <SignOut />
        </div>
      </div>
    </section>
  );
}
