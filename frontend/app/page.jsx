"use client";

import React, { useEffect } from "react";
import { UserButton, SignedIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function Page() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();


  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div>Home page</div>

      <SignedIn>
        <UserButton />
      </SignedIn>

      <div>Hello {user?.firstName}!</div>
    </>
  );
}

export default Page;
