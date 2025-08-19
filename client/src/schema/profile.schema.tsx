import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z.string(),
  location: z.string().optional(),
  image: z.any().nullable(),
  cover: z.any().nullable(),
});

export type Profile = z.infer<typeof profileSchema>;
