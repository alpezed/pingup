import { APIError } from "better-auth/api";
import { fromNodeHeaders } from "better-auth/node";

import { auth } from "../lib/auth.js";
import { catchAsync } from "../utils/catch-async.js";

export const protect = catchAsync(async (req, res, next) => {
	const headers = fromNodeHeaders(req.headers);

	const session = await auth.api.getSession({
		headers,
	});

	if (!session?.user) {
		throw new APIError("UNAUTHORIZED", {
			message: "Unauthorized",
		});
	}

	req.user = session.user;
	next();
});

export const restrictTo =
	(...allowedRoles) =>
	(req, res, next) => {
		if (!req.user || !allowedRoles.includes(req.user.role)) {
			return res
				.status(403)
				.json({ error: "Forbidden", message: "Insufficient permissions" });
		}
		next();
	};
