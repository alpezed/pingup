import fs from "fs";
import { fromNodeHeaders } from "better-auth/node";
import { ObjectId } from "mongodb";
import { APIError } from "better-auth/api";

import { catchAsync } from "../utils/catch-async.js";
import { auth } from "../lib/auth.js";
import imagekit from "../config/imagekit.js";
import db from "../config/db.js";

export const getAllUsers = catchAsync(async (req, res) => {
	const userId = new ObjectId(String(req.user.id));
	const users = await db
		.collection("users")
		.find({
			role: "user",
			_id: { $ne: userId },
		})
		.toArray();

	res.json({
		success: true,
		data: users,
	});
});

export const getUserById = catchAsync(async (req, res) => {
	const { id } = req.params;

	const user = await auth.api.listUsers({
		query: {
			filterField: "id",
			filterValue: id,
			limit: 1,
		},
		headers: fromNodeHeaders(req.headers),
	});

	if (!user || user.users.length === 0) {
		return res.status(404).json({
			success: false,
			message: "User not found",
		});
	}

	res.status(200).json({
		success: true,
		data: user.users[0],
	});
});

export const getMe = catchAsync(async (req, res) => {
	return res.json({
		success: true,
		data: req.user,
	});
});

export const createUser = (role = "user") =>
	catchAsync(async (req, res) => {
		const { name, email, password } = req.body;
		const username = email.split("@")[0];
		const newUser = await auth.api.createUser({
			body: {
				email,
				password,
				name,
				role,
				data: {
					username,
					image: "",
					cover_photo: "",
					followers: [],
					following: [],
				},
			},
		});
		return res.json({
			success: true,
			data: newUser,
		});
	});

export const updatePassword = catchAsync(async (req, res) => {
	const { newPassword, currentPassword } = req.body;
	const data = await auth.api.changePassword({
		body: { newPassword, currentPassword, revokeOtherSessions: true },
		headers: fromNodeHeaders(req.headers),
	});

	res.json(data);
});

export const updateMe = catchAsync(async (req, res) => {
	const { name, username, bio, location } = req.body;

	const profile = req.files.image && req.files.image[0];
	const cover = req.files.cover && req.files.cover[0];

	if (profile) {
		const image = await imagekit.upload({
			file: fs.readFileSync(profile.path),
			fileName: profile.filename,
		});

		const imageUrl = await imagekit.url({
			path: image.filePath,
			transformation: [
				{ width: "500" },
				{ quality: "auto" },
				{ format: "webp" },
			],
		});

		req.profile = imageUrl;
	}

	if (cover) {
		const image = await imagekit.upload({
			file: fs.readFileSync(cover.path),
			fileName: cover.filename,
		});

		const imageUrl = await imagekit.url({
			path: image.filePath,
			transformation: [
				{ width: "1280" },
				{ quality: "auto" },
				{ format: "webp" },
			],
		});

		req.cover = imageUrl;
	}

	const data = await auth.api.updateUser({
		body: {
			name,
			username,
			bio,
			location,
			image: req.profile,
			cover_photo: req.cover,
		},
		headers: fromNodeHeaders(req.headers),
	});

	res.json(data);
});

export const deleteMe = catchAsync(async (req, res) => {
	const deletedUser = await auth.api.removeUser({
		body: { userId: req.user.id },
		headers: fromNodeHeaders(req.headers),
	});

	res.status(204).json({
		success: true,
		data: deletedUser,
	});
});

export const deleteUser = catchAsync(async (req, res) => {
	const deletedUser = await auth.api.removeUser({
		body: { userId: req.params.id },
		headers: fromNodeHeaders(req.headers),
	});

	res.status(204).json({
		success: true,
		data: deletedUser,
	});
});

export const addFollower = catchAsync(async (req, res, next) => {
	const followingUser = await db.collection("users").updateOne(
		{
			_id: new ObjectId(String(req.params.id)),
		},
		{
			$addToSet: { followers: req.user.id },
		}
	);

	if (followingUser.matchedCount === 0) {
		throw new APIError("NOT_FOUND", {
			message: "User to follow not found",
		});
	}

	next();
});

export const follow = catchAsync(async (req, res) => {
	const headers = fromNodeHeaders(req.headers);

	if (!ObjectId.isValid(req.params.id)) {
		throw new APIError("BAD_REQUEST", {
			message: "Invalid ID",
		});
	}

	const currentFollowing = req.user?.following ?? [];

	if (currentFollowing.includes(req.params.id)) {
		throw new APIError("BAD_REQUEST", {
			message: "You already followed the user",
		});
	}

	if (req.params.id) {
		currentFollowing.push(req.params.id);
	}

	await auth.api.updateUser({
		body: {
			following: currentFollowing,
		},
		headers,
	});

	res.status(201).json({
		success: true,
	});
});

export const removeFollower = catchAsync(async (req, res, next) => {
	await db.collection("users").updateOne(
		{
			_id: new ObjectId(String(req.params.id)),
		},
		{
			$pull: { followers: req.user.id },
		}
	);
	next();
});

export const unFollow = catchAsync(async (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		throw new APIError("BAD_REQUEST", {
			message: "Invalid ID",
		});
	}

	const currentFollowing = req.user?.following ?? [];

	if (!currentFollowing.includes(req.params.id)) {
		throw new APIError("BAD_REQUEST", {
			message: "You are not following this user.",
		});
	}

	const following = currentFollowing.filter(id => id !== req.params.id);

	await auth.api.updateUser({
		body: {
			following,
		},
		headers: fromNodeHeaders(req.headers),
	});

	res.status(201).json({
		success: true,
	});
});
