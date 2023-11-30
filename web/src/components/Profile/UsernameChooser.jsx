"use client"

import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameValidator } from "@/libs/validations/username";

export default function UsernameChooser() {
  const setUsername = async (username) => {
    try {
      const validatedUsername = usernameValidator.parse({ username });
      const response = await axios.post("/api/profile/username/set", {
        username: validatedUsername,
      });
      toast.success(response.data);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error("Invalid Input!");
        setError("username", { message: err.message });
        return;
      }
      if (err instanceof AxiosError) {
        toast.error(err.response?.data);
        setError("username", { message: err.response?.data });
        return;
      }
      toast.error("Something went wrong");
      setError("username", { message: "Something went wrong" });
    }
  };

  const onSubmit = (data) => {
    setUsername(data.username);
  };

  const { register, handleSubmit, setError, errors } = useForm({ resolver: zodResolver(usernameValidator) });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <label>Choose your username</label>
      <div className="mt-2 flex gap-4">
        <input
          {...register("username")}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          placeholder="jonanthan yeo"
        ></input>
        <button type="submit">Select</button>
      </div>
      <p className="mt-1 text-sm text-red-600">{errors?.username?.message}</p>
    </form>
  );
}
