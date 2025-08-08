import { APIError } from "better-auth/api";
import { fromNodeHeaders } from "better-auth/node";

import { auth } from "../lib/auth.js";

export const protect = async (req, res, next) => {
	const headers = fromNodeHeaders(req.headers);
	try {
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
	} catch (err) {
		if (err instanceof APIError) {
			return res.status(err.statusCode).json({
				success: false,
				message: err.message,
			});
		}
		console.error("Session middleware error:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

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
