import fs from 'fs';
import { APIError } from 'better-auth/api';

import { catchAsync } from '../utils/catch-async.js';
import Post from '../models/post.model.js';
import imagekit from '../config/imagekit.js';
import { upload } from '../config/multer.js';
import Like from '../models/like.model.js';

export const uploadPostImages = upload.array('images', 100);

export const imageKitImages = catchAsync(async (req, res, next) => {
	let images = [];

	if (req.files && req.files.length > 0) {
		const uploadResults = await Promise.allSettled(
			req.files.map(async file => {
				const uploaded = await imagekit.upload({
					file: fs.readFileSync(file.path),
					fileName: file.filename,
				});

				return imagekit.url({
					path: uploaded.filePath,
					transformation: [
						{ width: '700' },
						{ quality: 'auto' },
						{ format: 'webp' },
					],
				});
			})
		);

		images = uploadResults
			.filter(result => result.status === 'fulfilled')
			.map(result => result.value);
	}

	// Handle URLs sent as fields (FormData sends strings)
	if (req.body.images) {
		const existingUrls = Array.isArray(req.body.images)
			? req.body.images
			: [req.body.images];

		images.push(...existingUrls.filter(url => /^https?:\/\//.test(url)));
	}

	req.postImages = images;
	next();
});

export const createPost = catchAsync(async (req, res) => {
	const { body } = req.body;

	if (!body && req.files.length === 0) {
		return res.status(400).json({
			success: false,
			message: 'Post body is required',
		});
	}

	const newPost = await Post.create({
		body,
		image_urls: req.postImages,
		author: req.user.id,
	});

	res.status(201).json({
		success: true,
		data: newPost,
	});
});

export const getAllPosts = catchAsync(async (req, res) => {
	let filter = {};
	if (req.params.userId) {
		filter = { author: req.params.userId };
	}

	const posts = await Post.findWithAuthor(filter, {
		populateAuthor: true,
	});

	res.json({
		success: true,
		data: posts,
	});
});

export const getPost = catchAsync(async (req, res, next) => {
	let filter = { _id: req.params.id };
	if (req.params.userId) {
		Object.assign(filter, { author: req.params.userId });
	}

	const post = await Post.findOne(filter).populateAuthor();

	if (!post) {
		return next(
			new APIError('NOT_FOUND', {
				message: 'Post not found!',
			})
		);
	}

	res.json({
		status: 'success',
		data: post,
	});
});

export const updatePost = catchAsync(async (req, res) => {
	const { body } = req.body;

	const updatedPost = await Post.findByIdAndUpdate(
		req.params.id,
		{
			body,
			image_urls: req.postImages,
		},
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		status: 'success',
		data: updatedPost,
	});
});

export const deletePost = catchAsync(async (req, res) => {
	const post = await Post.deleteOne({ _id: req.params.id });

	if (!post) {
		return next(
			new APIError('NOT_FOUND', { message: 'No post found with that ID' })
		);
	}

	res.status(204).json({
		status: 'success',
	});
});

export const addLike = catchAsync(async (req, res, next) => {
	if (await Like.hasLiked(req.user.id, req.params.postId)) {
		return next(
			new APIError('CONFLICT', {
				message: 'User has already liked this post',
			})
		);
	}
	await Like.create({
		user: req.user.id,
		post: req.params.postId,
	});
	next();
});

export const likePost = catchAsync(async (req, res) => {
	const post = await Post.findByIdAndUpdate(
		req.params.postId,
		{ $addToSet: { likes: req.user.id } },
		{ new: true }
	);

	res.status(200).json({
		status: 'success',
		data: post,
	});
});

export const removeLike = catchAsync(async (req, res, next) => {
	await Like.deleteOne({
		user: req.user.id,
		post: req.params.postId,
	});
	next();
});

export const unLikePost = catchAsync(async (req, res) => {
	await Post.findByIdAndUpdate(
		req.params.postId,
		{ $pull: { likes: req.user.id } },
		{ new: true }
	);
	res.status(200).json({
		status: 'success',
	});
});
