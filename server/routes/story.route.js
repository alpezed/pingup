import express from 'express';

import {
	createStory,
	deleteStory,
	getAllStories,
	getStory,
	imageKitImages,
	updateStory,
	uploadStoryMedias,
} from '../controllers/story.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router({ mergeParams: true });

router.use(protect);

router
	.route('/')
	.get(getAllStories)
	.post(uploadStoryMedias, imageKitImages, createStory);

router
	.route('/:id')
	.get(getStory)
	.put(uploadStoryMedias, imageKitImages, updateStory)
	.delete(deleteStory);

export default router;
