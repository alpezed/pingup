import express from "express";

import {
	addLike,
	createPost,
	deletePost,
	getAllPosts,
	getPost,
	imageKitImages,
	likePost,
	removeLike,
	unLikePost,
	updatePost,
	uploadPostImages,
} from "../controllers/post.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router({ mergeParams: true });

router.use(protect);

router.put("/:postId/like", addLike, likePost);
router.put("/:postId/unlike", removeLike, unLikePost);

router
	.route("/")
	.get(getAllPosts)
	.post(uploadPostImages, imageKitImages, createPost);

router
	.route("/:id")
	.get(getPost)
	.put(uploadPostImages, imageKitImages, updatePost)
	.delete(deletePost);

export default router;
