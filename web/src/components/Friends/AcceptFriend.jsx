"use client";

import { toast } from "react-toastify";
import axios from "axios";

export default function AcceptFriend({ friendshipId }) {
  const acceptRequest = async (friendshipId) => {
    try {
      const response = await axios.post("/api/friends/accept", { friendshipId });
      toast.success(response.data)
    } catch (err) {
      console.log(err);
      toast.error("Unexpected Error");
    }
  };
  return <button onClick={() => acceptRequest(friendshipId)}>Accept</button>;
}
