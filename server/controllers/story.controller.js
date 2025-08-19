import fs from 'fs';
import { APIError } from 'better-auth/api';

import { catchAsync } from '../utils/catch-async.js';
import Story from '../models/story.model.js';
import imagekit from '../config/imagekit.js';
import { upload } from '../config/multer.js';

export const uploadStoryMedias = upload.array('medias', 100);

export const imageKitImages = catchAsync(async (req, res, next) => {
	let medias = [];

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
						{ width: '500' },
						{ quality: 'auto' },
						{ format: 'webp' },
					],
				});
			})
		);

		medias = uploadResults
			.filter(result => result.status === 'fulfilled')
			.map(result => result.value);
	}

	// Handle URLs sent as fields (FormData sends strings)
	if (req.body.medias) {
		const existingUrls = Array.isArray(req.body.medias)
			? req.body.medias
			: [req.body.medias];

		medias.push(...existingUrls.filter(url => /^https?:\/\//.test(url)));
	}

	req.medias = medias;
	next();
});

export const createStory = catchAsync(async (req, res) => {
	const { text, story_type, background_color } = req.body;

	if (!text && req.files.length === 0) {
		return res.status(400).json({
			success: false,
			message: 'Story body is required',
		});
	}

	const newStory = await Story({
		text,
		story_type,
		user: req.user.id,
	});

	if (story_type === 'text') {
		newStory.background_color = background_color;
	} else {
		newStory.media_url = req.medias;
	}
	await newStory.save();

	res.status(201).json({
		success: true,
		data: newStory,
	});
});

export const getAllStories = catchAsync(async (req, res) => {
	let filter = {};
	if (req.params.userId) {
		filter = { author: req.params.userId };
	}

	const stories = await Story.findWithUser(filter, {
		populateUser: true,
	});

	res.json({
		success: true,
		data: stories,
	});
});

export const getStory = catchAsync(async (req, res, next) => {
	let filter = { _id: req.params.id };
	if (req.params.userId) {
		Object.assign(filter, { author: req.params.userId });
	}

	const story = await Story.findOne(filter).populateUser();

	if (!story) {
		return next(
			new APIError('NOT_FOUND', {
				message: 'Story not found!',
			})
		);
	}

	res.json({
		status: 'success',
		data: story,
	});
});

export const updateStory = catchAsync(async (req, res) => {
	const { body } = req.body;

	const updatedStory = await Story.findByIdAndUpdate(
		req.params.id,
		{
			body,
			media_url: req.medias,
		},
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		status: 'success',
		data: updatedStory,
	});
});

export const deleteStory = catchAsync(async (req, res) => {
	const story = await Story.deleteOne({ _id: req.params.id });

	if (!story) {
		return next(
			new APIError('NOT_FOUND', { message: 'No story found with that ID' })
		);
	}

	res.status(204).json({
		status: 'success',
	});
});
