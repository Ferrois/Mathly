import { z } from "zod";

export const usernameValidator = z.object({
  username: z.string(),
});
