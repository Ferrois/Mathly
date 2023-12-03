"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function SignOut() {
  return (
    <Button
      // className="flex justify-center bg-gray-900 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-gray-800"
      onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
    >
      <LogOut />{' '}
      Sign Out
    </Button>
  );
}
