"use client";

import UsernameChooser from "@/components/Profile/UsernameChooser";
import React from "react";

function Page() {
  return (
    <div className="w-full h-auto overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col items-center h-auto w-full">
        Profile
        <UsernameChooser />
      </div>
    </div>
  );
}

export default Page;
