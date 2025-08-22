import { mongoose } from 'mongoose';
import { ObjectId } from 'mongodb';
import db from '../config/db.js';

const connectionSchema = new mongoose.Schema(
	{
		from_user: {
			type: String,
			required: true,
		},
		to_user: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ['pending', 'accepted'],
			default: 'pending',
		},
	},
	{
		timestamps: true,
	}
);

// connectionSchema.index({ to_user: 1 }, { unique: true });

connectionSchema.statics.isConnected = async function (fromId, toId) {
	const connection = await this.exists({
		from_user: fromId,
		to_user: toId,
		status: 'accepted',
	});
	return connection;
};

connectionSchema.statics.hasPendingRequest = async function (fromId, toId) {
	const connection = await this.exists({
		from_user: fromId,
		to_user: toId,
		status: 'pending',
	});
	return connection;
};

connectionSchema.query.populateUser = async function (key = 'from_user') {
	const query = await this.find();

	const userIds = [...new Set(query.map(conn => conn[key]))];

	// Fetch all authors in one query
	const users = await db
		.collection('users')
		.find(
			{ _id: { $in: userIds.map(id => new ObjectId(id)) } },
			{
				projection: {
					_id: 1,
					name: 1,
					username: 1,
					email: 1,
					image: 1,
					bio: 1,
				},
			}
		)
		.toArray();

	// Create a map for quick lookup
	const usersMap = users.reduce((map, users) => {
		map[users._id.toString()] = users;
		return map;
	}, {});

	return query.map(connection => ({
		...connection.toObject(),
		[key]: usersMap[connection[key]] || null,
	}));
};

const Connection = mongoose.model('Connection', connectionSchema);

export default Connection;
