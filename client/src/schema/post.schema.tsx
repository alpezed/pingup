import { z } from "zod";

const FileType = typeof File !== "undefined" ? z.file() : z.any();

export const createPostSchema = z.object({
	body: z.string(),
	images: z.array(z.union([z.url(), FileType])),
});

export const authorSchema = z.object({
	_id: z.string(),
	name: z.string(),
	email: z.string(),
	image: z.string().optional().nullable(),
	username: z.string(),
});

export const postSchema = z.object({
	_id: z.string(),
	body: z.string(),
	image_urls: z.array(z.string()),
	likes: z.array(z.string()),
	comments: z.array(z.any()),
	author: authorSchema,
	createdAt: z.string(),
	updatedAt: z.string(),
});

export type Post = z.infer<typeof postSchema>;

export type Author = z.infer<typeof authorSchema>;

export type CreatePost = z.infer<typeof createPostSchema>;
