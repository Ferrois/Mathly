"use client";

import Link from "next/link";
import Brand from "./Brand";
import { useSession } from "next-auth/react";
import SignOut from "./SignOut";
import { usePathname } from "next/navigation";

const ignorePaths = ["/login", "/register"];

const Navbar = ({ landingPage = false }) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Ignore paths
  if (ignorePaths.includes(pathname)) {
    return null;
  }

  // Not logged in
  if (!session?.user) {
    return (
      <div className="w-full bg-slate-50">
        <nav className=" container relative flex flex-wrap items-center justify-between p-2 px-6 mx-auto lg:justify-between sm:w-5/6">
          <Brand />
          <Link
            href="/login"
            className="flex justify-center bg-gray-900 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-gray-800"
          >
            Sign in
          </Link>
        </nav>
      </div>
    );
  }

  return (
    <>
      {!landingPage && (
        <div className="w-full bg-slate-50 shadow-md">
          <nav className=" container relative flex flex-wrap items-center justify-between p-2 px-6 mx-auto lg:justify-between sm:w-5/6">
            <div className="flex justify-between items-center gap-8">
              <Brand />
              <Link href="/home">Home</Link>
              <Link href="/chat/656c9cc435012c0993153be7">Chat</Link> 
              <Link href="/friends">Friends</Link>
              <Link href="/profile">Profile</Link>
            </div>
            <SignOut />
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
