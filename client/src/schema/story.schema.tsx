import { z } from "zod";

export const createStorySchema = z.object({
  text: z.string(),
  medias: z.array(z.file()),
  story_type: z.enum(["text", "media"]),
  background_color: z.string().optional(),
});

export const storySchema = z.object({
  _id: z.string(),
  text: z.string(),
  media_url: z.array(z.string()),
  likes: z.array(z.string()),
  comments: z.array(z.any()),
  story_type: z.enum(["text", "media"]),
  background_color: z.string(),
  user: z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
    image: z.string().optional().nullable(),
    username: z.string(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Story = z.infer<typeof storySchema>;

export type CreateStory = z.infer<typeof createStorySchema>;
