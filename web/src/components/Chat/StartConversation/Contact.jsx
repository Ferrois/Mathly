import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import StartConversationButton from "./StartConversationButton";

function Contact({ id, username, name, image, type, subject }) {
  return (
      <div className="flex gap-3 my-1 border-gray-200 border p-2 rounded-md shadow-sm">
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-black font-semibold">{name}</p>
          {username ? <p>@{username}</p> : null}
        </div>
        <div className="flex-1"></div>
        <StartConversationButton id={id}/>
      </div>
  );
}

export default Contact;
