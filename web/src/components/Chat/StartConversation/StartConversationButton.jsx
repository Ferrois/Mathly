"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";

export default function StartConversationButton({ id }) {
  const handleStart = async (id) => {
    try {
      const response = await axios.post("/api/conversation/start", { id });
      toast.success(response.data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong...");
    }
  };

  return <Button onClick={() => handleStart(id)}>Chat</Button>;
}
