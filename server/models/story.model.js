import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import db from '../config/db.js';

const storySchema = new mongoose.Schema(
	{
		text: {
			type: String,
		},
		story_type: {
			type: String,
			enum: ['text', 'media'],
			default: 'text',
		},
		background_color: {
			type: String,
			default: '#ffffff',
		},
		media_url: [{ type: String }],
		likes: [
			{
				type: String,
			},
		],
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
		user: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

// Methods for manual population with String IDs
storySchema.statics.findWithUser = async function (filter, options = {}) {
	const stories = await this.find(filter).sort({ createdAt: -1 });

	if (options.populateUser) {
		// Get all unique user IDs
		const userIds = [...new Set(stories.map(story => story.user))];

		// Fetch all users in one query
		const users = await db
			.collection('users')
			.find(
				{ _id: { $in: userIds.map(id => new ObjectId(id)) } },
				{ projection: { name: 1, username: 1, email: 1, image: 1, _id: 1 } }
			)
			.toArray();

		// Create a map for quick lookup
		const userMap = users.reduce((map, user) => {
			map[user._id.toString()] = user;
			return map;
		}, {});

		// Attach user data to stories
		return stories.map(story => ({
			...story.toObject(),
			user: userMap[story.user] || null,
		}));
	}

	return stories;
};

storySchema.statics.findOneWithUser = async function (filter, options = {}) {
	const story = await this.findOne(filter);

	if (!story) return null;

	if (options.populateUser) {
		const user = await db
			.collection('users')
			.findOne(
				{ _id: new ObjectId(story.user) },
				{ projection: { username: 1, email: 1, name: 1, _id: 1, image: 1 } }
			);

		return {
			...story.toObject(),
			user: user,
		};
	}

	return story;
};

// Your existing custom method (keeping for reference)
storySchema.query.populateUser = async function () {
	const query = await this.findOne();

	const storyUser = await db.collection('users').findOne(
		{ _id: new ObjectId(query._doc.user) },
		{
			projection: { username: 1, email: 1, name: 1, _id: 1, image: 1 },
		}
	);

	return {
		...query._doc,
		user: storyUser,
	};
};

const Story = mongoose.model('Story', storySchema);

export default Story;
