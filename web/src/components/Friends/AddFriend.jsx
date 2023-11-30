"use client"

import { addFriendValidator } from "@/libs/validations/add-friend";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AddFriend() {
  const addFriend = async (email) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });
      const response = await axios.post("/api/friends/add", {
        email: validatedEmail,
      });
      toast.success(response.data);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error("Invalid Input!");
        setError("email", { message: err.message });
        return;
      }
      if (err instanceof AxiosError) {
        toast.error(err.response?.data);
        setError("email", { message: err.response?.data });
        return;
      }
      toast.error("Something went wrong");
      setError("email", { message: "Something went wrong" });
    }
  };

  const onSubmit = (data) => {
    addFriend(data.email);
  };

  const { register, handleSubmit, setError, errors } = useForm({ resolver: zodResolver(addFriendValidator) });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <label>Add friend by E-Mail</label>
      <div className="mt-2 flex gap-4">
        <input
          {...register("email")}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          placeholder="you@example.com"
        ></input>
        <button type="submit">Add</button>
      </div>
      <p className="mt-1 text-sm text-red-600">{errors?.email?.message}</p>
    </form>
  );
}
