import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

const userInfer = inferAdditionalFields({
	user: {
		username: { type: "string" },
		cover_photo: { type: "string" },
		bio: { type: "string" },
		location: { type: "string" },
		followers: { type: "string[]" },
		following: { type: "string[]" },
		role: { type: "string" },
	},
});

export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	plugins: [userInfer],
	fetchOptions: {
		credentials: 'include',
		mode: 'cors',
	},
});
