import { z } from "zod";

const fileSchema = z
	.instanceof(File)
	.refine(file => file.size > 0, "File is required");

export const profileSchema = z.object({
	name: z.string().min(1, {
		message: "Name is required",
	}),
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	bio: z.string(),
	location: z.string(),
	image: fileSchema.nullable(),
	cover: fileSchema.nullable(),
});

export type Profile = z.infer<typeof profileSchema>;
