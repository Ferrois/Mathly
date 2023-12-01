import Requests from "@/components/Friends/Requests";
import UsernameChooser from "@/components/Profile/UsernameChooser";
import React from "react";

function Page() {
  return (
      <div className="flex flex-col items-center h-auto w-full">
        Profile
        <UsernameChooser/>
        <Requests/>
      </div>
  );
}

export default Page;
