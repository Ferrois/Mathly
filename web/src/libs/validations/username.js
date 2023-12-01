import { z } from "zod";

export const usernameValidator = z.object({
  username: z.string().min(3).max(16),
});
