import mongoose from "mongoose";
import db from "../config/db.js";
import { ObjectId } from "mongodb";

const postSchema = new mongoose.Schema(
	{
		body: {
			type: String,
		},
		image_urls: [{ type: String }],
		likes: [{ type: String }],
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
		author: { type: String, required: true },
	},
	{ timestamps: true }
);

// Methods for manual population with String IDs
postSchema.statics.findWithAuthor = async function (filter, options = {}) {
	const posts = await this.find(filter);

	if (options.populateAuthor) {
		// Get all unique author IDs
		const authorIds = [...new Set(posts.map(post => post.author))];

		// Fetch all authors in one query
		const authors = await db
			.collection("users")
			.find(
				{ _id: { $in: authorIds.map(id => new ObjectId(id)) } },
				{ projection: { name: 1, username: 1, email: 1, image: 1, _id: 1 } }
			)
			.toArray();

		// Create a map for quick lookup
		const authorMap = authors.reduce((map, author) => {
			map[author._id.toString()] = author;
			return map;
		}, {});

		// Attach author data to posts
		return posts.map(post => ({
			...post.toObject(),
			author: authorMap[post.author] || null,
		}));
	}

	return posts;
};

postSchema.statics.findOneWithAuthor = async function (filter, options = {}) {
	const post = await this.findOne(filter);

	if (!post) return null;

	if (options.populateAuthor) {
		const author = await db
			.collection("users")
			.findOne(
				{ _id: new ObjectId(post.author) },
				{ projection: { username: 1, email: 1, name: 1, _id: 1, image: 1 } }
			);

		return {
			...post.toObject(),
			author: author,
		};
	}

	return post;
};

// Your existing custom method (keeping for reference)
postSchema.query.populateAuthor = async function () {
	const query = await this.findOne();

	const postAuthor = await db.collection("users").findOne(
		{ _id: new ObjectId(query._doc.author) },
		{
			projection: { username: 1, email: 1, name: 1, _id: 1, image: 1 },
		}
	);

	return {
		...query._doc,
		author: postAuthor,
	};
};

const Post = mongoose.model("Post", postSchema);

export default Post;
