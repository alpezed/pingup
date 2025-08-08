import { APIError } from "better-auth/api";
import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";
import { catchAsync } from "../utils/catch-async.js";

export const signUp = catchAsync(async (req, res) => {
	const { name, email, password } = req.body;
	const username = email.split("@")[0];
	const data = await auth.api.signUpEmail({
		body: {
			name,
			username,
			email,
			password,
			image: "",
			callbackURL: "",
		},
	});
	data.user.username = username;
	data.user.cover_photo = "";
	if (!data.user) {
		return res.status(400).json({
			success: false,
			message: "Signup unsuccessful",
		});
	}
	res.status(201).json({
		success: true,
		data,
		message: "User created successfully",
	});
});

export const signIn = catchAsync(async (req, res) => {
	const headers = fromNodeHeaders(req.headers);
	const session = await auth.api.getSession({
		headers,
	});
	if (session?.user) {
		throw new APIError("BAD_REQUEST", {
			message: "User is already logged in",
		});
	}
	const { email, password } = req.body;
	const result = await auth.api.signInEmail({
		body: { email, password },
		headers,
		asResponse: true,
	});

	console.log({ result });

	if (!result) {
		throw new APIError(result.statusText, {
			message: result.message,
		});
	}
	res.status(200).json({
		success: true,
		data: result,
	});
});

export const logout = catchAsync(async (req, res) => {
	await auth.api.signOut({
		headers: fromNodeHeaders(req.headers),
	});
	res.status(200).json({ success: true, message: "Logged out successfully" });
});

export const forgotPassword = catchAsync(async (req, res) => {
	const data = await auth.api.requestPasswordReset({
		body: {
			email: req.body.email,
			redirectTo: "/reset-password",
		},
	});
	res.status(200).json(data);
});

export const resetPassword = catchAsync(async (req, res) => {
	const { password, token } = req.body;
	const data = await auth.api.resetPassword({
		body: {
			newPassword: password,
			token,
		},
	});
	res.status(200).json(data);
});
