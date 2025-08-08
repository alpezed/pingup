import express from "express";

import {
	forgotPassword,
	logout,
	signIn,
	signUp,
	resetPassword,
} from "../controllers/auth.controller.js";
import {
	addFollower,
	createUser,
	deleteMe,
	deleteUser,
	follow,
	getAllUsers,
	getMe,
	getUserById,
	removeFollower,
	unFollow,
	updateMe,
	updatePassword,
} from "../controllers/user.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";
import { upload } from "../config/multer.js";
import postRoutes from "./post.route.js";

const router = express.Router();

router.use("/:userId/posts", postRoutes);

router.post("/signup", signUp);
router.post("/login", signIn);
router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.use(protect);

router.post(
	"/create-admin",
	restrictTo("admin", "superadmin"),
	createUser("admin")
);
router.put("/update-password", updatePassword);
router.get("/me", getMe);
router.delete("/delete-me", deleteMe);
router.put(
	"/update-me",
	upload.fields([
		{ name: "image", maxCount: 1 },
		{ name: "cover", maxCount: 1 },
	]),
	updateMe
);
router.put("/:id/follow", addFollower, follow);
router.put("/:id/unfollow", removeFollower, unFollow);

router.route("/").get(getAllUsers).post(createUser("user"));
router.route("/:id").get(getUserById).delete(deleteUser);

export default router;
